import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';
import * as Issue from './schema/issue';
import * as Vote from './schema/vote';
import * as User from './schema/user';
import * as Resource from './schema/resource';
import * as Geometry from './schema/geometry';
import * as Location from './schema/location';
import * as disasterKit from './schema/disasterKit';

import * as emissionsReduction from './schema/emissionsReduction';
import { issueUrl, voteUrl, userUrl, resourceUrl, emissionsReductionUrl, disasterKitUrl } from './apiroutes';
import { filter } from 'lodash';
import googleMaps from '@google/maps';
// import translate from "google-translate-api";

const googleMapsClient = googleMaps.createClient({
    key: 'AIzaSyCzKZZwaTQgfPXm5ZQa7V6ht0dHXz3wKi8',
    Promise: Promise
});
// translate('I spea Dutch!', { from: 'en', to: 'nl' }).then(res => {
//     console.log(res.text);
//     //=> Ik spreek Nederlands! 
//     console.log(res.from.text.autoCorrected);
//     //=> true 
//     console.log(res.from.text.value);
//     //=> I [speak] Dutch! 
//     console.log(res.from.text.didYouMean);
//     //=> false 
// }).catch(err => {
//     console.error(err);
// });

const types = [];
const queries = [];
const mutations = [];
const schemas = [Issue, Vote, User, Resource, emissionsReduction, Geometry, Location, disasterKit];

schemas.forEach(function(s) {
    types.push(s.types);
    queries.push(s.queries);
    mutations.push(s.mutations);
});
const typeDefs = `  
${types.join('\n')}      
  type Query {
    ${queries.join('\n')}    
  }
  type Mutation {
    ${mutations.join('\n')}    
  }`;
const resolvers = {
    Query: {
        issue: (_, args) => axios.get(`${issueUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        vote: (_, args) => axios.get(`${voteUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        user: (_, args) => axios.get(`${userUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        resource: (_, args) => axios.get(`${resourceUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        emissionsReduction: (_, args) => axios.get(`${emissionsReductionUrl}/${args.id}`).then(res => res.data).catch(err => console.error(err)),
        getAllIssues: () => axios.get(issueUrl).then(res => res.data).catch(err => console.error(err)),
        getAllVotes: () => axios.get(voteUrl).then(res => res.data).catch(err => console.error(err)),
        getAllUsers: () => axios.get(userUrl).then(res => res.data).catch(err => console.error(err)),
        getAllDisasterKit: () => axios.get(disasterKitUrl).then(res => res.data).catch(err => console.error(err)),
        getAllResource: () => axios.get(resourceUrl).then(res => res.data).catch(err => console.error(err)),
        getAllemissionsReduction: () => axios.get(emissionsReductionUrl).then(res => res.data).catch(err => console.error(err)),
        getResourcesFromGoogle: (_, args) => {
            let result = [];
            let locationp = [args.lat, args.lng];
            let languagep = args.lang;
            args.ltype.map((item) => {
                let typeb = item;
                result = result.concat(googleMapsClient.placesNearby({
                        language: languagep,
                        location: locationp,
                        radius: 5000,
                        opennow: true,
                        type: item
                    }).asPromise()
                    .then((response) => {
                        let values = response.json.results;
                        values.map(item => {
                            item.value = Math.floor(Math.random() * 100);
                            item.color = item.value < 40 ? "#C90500" : item.value < 65 ? "#C96500" : "#10A400";
                            item.types = typeb;
                        });
                        return values;
                    })
                    .catch((err) => {
                        console.log(err);
                    }));
            });

            return Promise.all(result).then(function(values) {
                let res = [];
                values.map(item => {
                    res = res.concat(item);
                });
                return res;
            });
        }
    },
    Issue: {
        vote: (issue) => axios.get(voteUrl).then(({ data }) => filter(data, { issueId: issue.id })).catch(err => console.error(err))
    },
    User: {
        vote: (user) => axios.get(voteUrl).then(({ data }) => filter(data, { userId: user.id })).catch(err => console.error(err))
    },
    Vote: {
        user: (vote) => axios.get(userUrl).then(({ data }) => filter(data, { id: vote.userId })).catch(err => console.error(err)),
        issue: (vote) => axios.get(issueUrl).then(({ data }) => filter(data, { id: vote.issueId })).catch(err => console.error(err))
    },
    Mutation: {
        addIssue(_, {
            id,
            name,
            description
        }) {
            return axios.post(issueUrl, {
                id,
                name,
                description
            }).then(res => res.data);
        },
        addVote(_, {
            id,
            date,
            user
        }) {
            return axios.post(voteUrl, {
                id,
                date,
                user
            }).then(res => res.data);
        },
        addUser(_, {
            id,
            name,
            email,
            username,
            image
        }) {
            return axios.post(userUrl, {
                id,
                name,
                email,
                username,
                image
            }).then(res => res.data);
        }
    }
};
const executableSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
    mutations: mutations
});
const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: executableSchema,
    context: {}
}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
app.listen(process.env.PORT || 4000, () => {
    console.log('Go to http://localhost:4000/graphiql to run queries!');
});
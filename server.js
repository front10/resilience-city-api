import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';
import * as Issue from './schema/issue';
import * as Vote from './schema/vote';
import * as User from './schema/user';

import { issueUrl, voteUrl, userUrl } from './apiroutes';
import { filter } from 'lodash';
const types = [];
const queries = [];
const mutations = [];
const schemas = [Issue, Vote, User];

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

        getAllIssues: () => axios.get(issueUrl).then(res => res.data).catch(err => console.error(err)),
        getAllVotes: () => axios.get(voteUrl).then(res => res.data).catch(err => console.error(err)),
        getAllUsers: () => axios.get(userUrl).then(res => res.data).catch(err => console.error(err))
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
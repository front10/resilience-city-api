export const types = `
"Vote entitie"
    type Vote {        
        id: Int!
        date: String!       
        user: User!
        issue: Issue!
    }
`;

export const queries = `
    vote(id: Int!): Vote
    getAllVotes: [Vote]
    
`;
export const mutations = `
    addVote(id:Int, date:String, user:Int): Vote!
`;
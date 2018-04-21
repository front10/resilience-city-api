export const types = `
"Issue entitie"
    type Issue {        
        id: Int!
        name: String
        description: String
        vote: [Vote]
    }
`;

export const queries = `
    issue(id: Int!): Issue
    getAllIssues: [Issue]
    
`;
export const mutations = `
    addIssue(id:Int, name:String, description:String): Issue!
`;
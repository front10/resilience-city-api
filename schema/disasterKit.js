export const types = `
"disasterKit entitie"
    type disasterKit {        
        id: String!
        name: [textTranslate]      
    }
`;

export const queries = `
disasterKit(id: String!): disasterKit
    getAllDisasterKit: [disasterKit]  
`;
export const mutations = `
    addDisasterKit(id:String, name:String): disasterKit!
`;
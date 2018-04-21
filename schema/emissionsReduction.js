export const types = `
"emissionsReduction entitie"
    type emissionsReduction {        
        id: Int!
        name: String!     
        value: Int!          
    }
`;

export const queries = `
    emissionsReduction(id: Int!): emissionsReduction
    getAllemissionsReduction: [emissionsReduction]
    
`;
export const mutations = `
    addemissionsReduction(id:Int, name:String, value:Int): emissionsReduction!
`;
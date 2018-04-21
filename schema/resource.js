export const types = `
"Resource entitie"
    type Resource {        
        id: Int!
        name: String!     
        category: String  
        latitude: Float
        longitude: Float
    }
`;

export const queries = `
    resource(id: Int!): Resource
    getAllResource: [Resource]
    
`;
export const mutations = `
    addResource(id:Int, name:String, category:String, latitude:Float, longitude:Float): Resource!
`;
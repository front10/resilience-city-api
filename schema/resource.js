export const types = `
"Resource entitie"
    type Resource {        
        id: String!
        name: String!     
        icon: String 
        geometry: Geometry
        vecinity: String
        rating: Float
    }
`;

export const queries = `
    resource(id: String!): Resource
    getAllResource: [Resource]
    getResourcesFromGoogle(lat: Float, lng:Float): [Resource]
    
`;
export const mutations = `
    addResource(id:String, name:String, icon:String): Resource!
`;
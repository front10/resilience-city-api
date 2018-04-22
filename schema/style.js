export const types = `
"Style entitie"
    type Style {        
        id: String!
        color: String!       
        background: String!       
    }
`;

export const queries = `
Style(id: String!): Style
    getAllStyle: [Style]  
`;
export const mutations = `
   
`;
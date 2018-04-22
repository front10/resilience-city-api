export const types = `
"Image entitie"
    type Image {        
        id: String!
        src: String!       
    }
`;

export const queries = `
Image(id: String!): Image
    getAllImage: [Image]  
`;
export const mutations = `
   
`;
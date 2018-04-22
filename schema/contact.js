export const types = `
"Contact entitie"
    type Contact {        
        id: String!
        icon: String!       
        value: [textTranslate]       
    }
`;

export const queries = `
     contact(id: String!): Contact
     getAllContact: [Contact]  
`;
export const mutations = `
   
`;
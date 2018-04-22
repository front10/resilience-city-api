export const types = `
"phoneWebsite entitie"
    type phoneWebsite {        
        id: String!
        name: [textTranslate]       
        value: [textTranslate]
        tty: String
        phone: String
        url: String

    }
`;

export const queries = `
phoneWebsite(id: String!): phoneWebsite
     getAllPhoneWebsite: [phoneWebsite]  
`;
export const mutations = `
   
`;
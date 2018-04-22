export const types = `
"Translation entitie"
    type Translation {        
        text: String
        from: translationFrom,
        raw: String         
    }
`;

export const queries = `
    getTranslation(textIn: String!, from:String!, to:String!): Translation  
`;
export const mutations = `
    
`;
export const types = `
"huracaneWarning entitie"
    type huracaneWarning {        
        id: String!
        type: String!
        title: [textTranslate]
        bodyImage:[Image]
        bodyText: [textTranslate]
        style: Style
    }
`;

export const queries = `
    huracaneWarning(id: String!): huracaneWarning
    getAllHuracaneWarning: [huracaneWarning]  
`;
export const mutations = `    
`;
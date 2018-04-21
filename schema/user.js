export const types = `
"User entitie"
    type User {        
        id: Int!
        firstName: String!  
        lastName: String!       
        email: String
        username: String!
        image: String
        vote: [Vote]
        gender: String

    }
`;

export const queries = `
    user(id: Int!): User
    getAllUsers: [User]
    
`;
export const mutations = `
    addUser(id:Int, name:String, email:String, username:String, image:String): User!
`;
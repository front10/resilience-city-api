export const types = `
"Carrier entitie"
type Carrier {
    id: Int!
    name: String
    doctor: [Doctor]
    rank: Float
    medicalPlane: [medicalPlane]
  }
`;

export const queries = `
    carrier(id: Int!): Carrier
    getAllCarrier: [Carrier]    
`;
export const mutations = `

`;
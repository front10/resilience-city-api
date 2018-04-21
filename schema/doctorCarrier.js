export const types = `
"Doctor Carrier many to many ralation"
type doctorCarrier {
    id: Int!    
    doctor: Doctor
    carrier: Carrier    
  }
`;

export const queries = `
doctorCarrier(id: Int!): doctorCarrier   
getAllCarrierByDoctor(doctor: Int!): [Carrier]
getAllDoctorByCarrier(carrier: Int!): [Doctor]
`;
export const mutations = `

`;
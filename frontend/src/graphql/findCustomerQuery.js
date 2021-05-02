import { gql } from "@apollo/client"

export const FILTER_CUSTOMER = gql`
    query filterCustomer($userId: MongoID!) {
        customer(filter: { _id: $userId }) {
            address {
                address
                subDistrict
                district
                country
                zipcode
                province
                tel
            }
        }
    }
`

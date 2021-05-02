import { gql } from "@apollo/client"

export const CREATE_CUSTOMER_MUTATION = gql`
    mutation createCustomer(
        $username: String!
        $password: String!
        $name: String!
    ) {
        createUser(
            record: {
                username: $username
                password: $password
                name: $name
                userType: CUSTOMER
                role: Customer
            }
        ) {
            record {
                _id
            }
        }
    }
`

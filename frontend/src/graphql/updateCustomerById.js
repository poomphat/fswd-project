import { gql } from "@apollo/client"

export const UPDATE_CUSTOMER_BY_ID = gql`
    mutation updateCustomerById(
        $userId: MongoID!
        $record: UpdateByIdCustomerInput!
    ) {
        updateCustomerById(_id: $userId, record: $record) {
            recordId
        }
    }
`

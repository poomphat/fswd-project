import { gql } from "@apollo/client"

export const UPDATE_PRODUCT = gql`
    mutation updateProductById(
        $productId: MongoID!
        $record: UpdateByIdProductInput!
    ) {
        updateProductById(_id: $productId, record: $record) {
            record {
                _id
            }
        }
    }
`

import { gql } from "@apollo/client"

export const DELETE_PRODUCT_BY_ID = gql`
    mutation deleteProduct($productId: MongoID!) {
        deleteProductById(_id: $productId) {
            recordId
        }
    }
`

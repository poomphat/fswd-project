import { gql } from "@apollo/client"

export const UPDATE_PRODUCT_CART_MUTATION = gql`
    mutation updateProductCart(
        $cartId: MongoID!
        $record: UpdateByIdCartInput!
    ) {
        updateCart(_id: $cartId, record: $record) {
            recordId
        }
    }
`

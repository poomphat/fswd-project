import { gql } from "@apollo/client"

export const DELETE_CART_PRODUCT_ONE = gql`
    mutation($productId: MongoID!, $cartId: MongoID!) {
        deleteCartProductOne(
            filter: { productId: $productId, cartId: $cartId }
        ) {
            recordId
        }
    }
`

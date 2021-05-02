import { gql } from "@apollo/client"

export const CREATE_PRODUCT_CART_MUTATION = gql`
    mutation createCartProduct(
        $productId: MongoID!
        $cartId: MongoID!
        $quantity: Float!
    ) {
        createCartProduct(
            record: {
                productId: $productId
                quantity: $quantity
                cartId: $cartId
            }
        ) {
            recordId
        }
    }
`

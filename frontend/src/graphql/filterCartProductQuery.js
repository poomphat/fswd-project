import { gql } from "@apollo/client"

export const FILTER_CART_PRODUCT_QUERY = gql`
    query filterCartProduct($productId: String!, $cartId: String!) {
        CartProducts(filter: { productId: $productId, cartId: $cartId }) {
            _id
        }
    }
`

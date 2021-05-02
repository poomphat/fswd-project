import { gql } from "@apollo/client"

export const updateProductCart = gql`
    mutation updateProductCart(
        $cartId: MongoID!
        $promotionId: MongoID!
        $quantity: Float!
    ) {
        updateCart(
            _id: $cartId
            record: {
                promotions: [{ promotionId: $promotionId, quantity: $quantity }]
            }
        ) {
            recordId
        }
    }
`

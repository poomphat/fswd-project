import { gql } from "@apollo/client"

export const CREATE_PROMOTION_CART_MUTATION = gql`
    mutation createCartPromotions(
        $promotionId: MongoID!
        $cartId: MongoID!
        $quantity: Float!
    ) {
        createCartPromotions(
            record: {
                promotionsId: $promotionId
                quantity: $quantity
                cartId: $cartId
            }
        ) {
            recordId
        }
    }
`

import { gql } from "@apollo/client"

export const DELETE_CART_PROMOTION_ONE = gql`
    mutation($promotionsId: MongoID!, $cartId: MongoID!) {
        deleteCartPromotionOne(
            filter: { promotionsId: $promotionsId, cartId: $cartId }
        ) {
            recordId
        }
    }
`

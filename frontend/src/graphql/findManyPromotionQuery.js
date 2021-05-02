import { gql } from "@apollo/client"

export const FIND_ALL_CARTPROMOTION = gql`
    query {
        CartPromotions {
            promotionsId
            cartId
        }
    }
`

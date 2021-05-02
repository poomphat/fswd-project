import { gql } from "@apollo/client"

export const CREATE_PROMOTION = gql`
    mutation createPromotion($record: CreateOnePromotionInput!) {
        createPromotion(record: $record) {
            recordId
        }
    }
`

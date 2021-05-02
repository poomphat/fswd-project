import { gql } from "@apollo/client"

export const EDIT_PROMOTION_BY_ID = gql`
    mutation updatePromoitionById(
        $promotionId: MongoID!
        $record: UpdateByIdPromotionInput!
    ) {
        updatePromotionById(_id: $promotionId, record: $record) {
            recordId
        }
    }
`

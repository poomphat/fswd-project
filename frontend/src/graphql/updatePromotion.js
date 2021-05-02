import { gql } from "@apollo/client"

export const UPDATE_PROMOTION = gql`
    mutation updatePromoitionById(
        $promotionId: MongoID!
        $record: UpdateByIdPromotionInput!
    ) {
        updatePromotionById(_id: $promotionId, record: $record) {
            record {
                _id
            }
        }
    }
`

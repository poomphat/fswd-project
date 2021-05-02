import { gql } from "@apollo/client";

export const DELETE_PROMOTION_BY_ID = gql`
mutation deletePromotions($promotionId:MongoID!){
    deletePromotionById(
        _id:$promotionId
    ){
      recordId
      }
  }
`;

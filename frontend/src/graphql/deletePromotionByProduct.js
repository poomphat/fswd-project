import { gql } from "@apollo/client";

export const DELETE_PROMOTION_BY_PRODUCT = gql`
mutation deletePromotion($productId:MongoID!){
    deletePromotionOne(
        filter:{
          productId:$productId
        }
    ){
      recordId
      }
  }
`;

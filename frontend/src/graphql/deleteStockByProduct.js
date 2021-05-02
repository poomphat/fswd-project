import { gql } from "@apollo/client";

export const DELETE_STOCK_BY_PRODUCT = gql`
mutation deleteStockByProduct($productId:String!){
    deleteStockOne(
        filter:{
          productId:$productId
        }
    ){
      recordId
      }
  }
`;

import { gql } from '@apollo/client'

export const FILTER_GENDER_PRODUCT = gql`
mutation findManyProduct($genderType:String!){
    findManyProduct(
      filter:{
      	genderType:$genderType
    }){
      productName
      productDesc
      price
      imgUrl
    }
  }
`

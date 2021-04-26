import { gql } from '@apollo/client'

export const CREATE_PRODUCT_IMG= gql`
mutation createProductImg ($imgUrl: [Upload]){
    createProductImg(
      productName: "poom"
      productDesc: "poom"
      price: 99
      catagory: "shoe"
      genderType: "male"
      imgUrl: $imgUrl
    ) {
      productName
      productDesc
      price
      catagory
      genderType
      imgUrl
    }
  }
  
`

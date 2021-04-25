import { gql } from '@apollo/client'

export const FIND_MANY_MUTATION = gql`
mutation{
    findManyProduct{
      productName
      productDesc
      price
      imgUrl
      _id
    }
  }
`

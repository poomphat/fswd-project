import { gql } from "@apollo/client"

export const FILTER_GENDER_PRODUCT = gql`
    mutation findManyProduct($genderType: String!, $skip: Int!, $limit: Int!) {
        findManyProduct(
            filter: { genderType: $genderType }
            limit: $limit
            sort: _ID_ASC
            skip: $skip
        ) {
            productName
            productDesc
            price
            imgUrl
        }
    }
`

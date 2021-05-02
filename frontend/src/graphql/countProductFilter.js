import { gql } from "@apollo/client"

export const COUNT_PRODUCT_FILTER_MUTAION = gql`
    mutation($genderType: String!) {
        countProduct(filter: { genderType: $genderType })
    }
`

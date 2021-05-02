import { gql } from "@apollo/client"

export const CREATE_PRODUCT = gql`
    mutation createProduct($record: CreateOneProductInput!) {
        createProduct(record: $record) {
            record {
                _id
                productName
                productDesc
                price
                catagory
                genderType
                imgUrl
            }
        }
    }
`

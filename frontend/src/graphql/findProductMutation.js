import { gql } from "@apollo/client"

export const FIND_MANY_MUTATION = gql`
    mutation($skip: Int!, $limit: Int!) {
        findManyProduct(filter: {}, limit: $limit, sort: _ID_ASC, skip: $skip) {
            productName
            productDesc
            price
            imgUrl
            _id
            hasStock {
                quantity
            }
        }
    }
`

import { gql } from "@apollo/client"

export const FIND_MANY_MUTATION_HOMEPAGE = gql`
    mutation($skip: Int!, $limit: Int!) {
        findManyProduct(
            filter: {}
            limit: $limit
            sort: _ID_DESC
            skip: $skip
        ) {
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

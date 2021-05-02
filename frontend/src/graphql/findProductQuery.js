import { gql } from "@apollo/client"

export const FIND_PRODUCT_QUERY = gql`
    query($id: MongoID!) {
        product(filter: { _id: $id }) {
            _id
            productName
            productDesc
            price
            catagory
            genderType
            imgUrl
            hasStock {
                quantity
            }
        }
    }
`

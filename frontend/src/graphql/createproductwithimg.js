import { gql } from "@apollo/client"

export const CREATE_PRODUCT_IMG = gql`
    mutation($imgUrl: Upload!) {
        upload(imgUrl: $imgUrl)
    }
`

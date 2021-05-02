import { gql } from "@apollo/client"

export const EDIT_PRODUCT_BY_ID = gql`
    mutation {
        updateProductById(
            _id: "607fe1fbe12de62524b49965"
            record: { genderType: "woman" }
        ) {
            recordId
        }
    }
`

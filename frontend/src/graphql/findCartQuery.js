import { gql } from "@apollo/client"

export const FIND_CART_QUERY = gql`
    query($Id: String!) {
        cart(filter: { userId: $Id }) {
            _id
            userId
            products {
                forProduct {
                    _id
                    productName
                    productDesc
                    price
                    imgUrl
                    catagory
                    genderType
                    hasStock {
                        quantity
                    }
                }
                quantity
            }
            promotions {
                forPromotion {
                    _id
                    promotionName
                    promotionDesc
                    discountInPercent
                    disProduct {
                        _id
                        productName
                        productDesc
                        price
                    }
                }
                quantity
            }
        }
    }
`

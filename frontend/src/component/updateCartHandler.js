import { CREATE_PROMOTION_CART_MUTATION } from "../graphql/createPromotionCartMutation"
import { CREATE_PRODUCT_CART_MUTATION } from "../graphql/createProductCartMutation"
import { useSession } from "../context/Sessioncontext"
import { useCallback, useEffect } from "react"
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { notification, Button, Space } from "antd"
const dupeNotification = {
    message: "You already have this",
    description: "just pick another one",
    duration: 2,
}
const sucessNotification = {
    message: "Add to cart",
    description: "Sucess adding to cart",
    duration: 2,
}
export const updateProductCartHandler = async (productCartData) => {
    const productCart = productCartData?.products
    const createProductCart = productCartData?.createProductCart

    try {
        const find = productCart?.find(
            (o) => o.forProduct?._id === productCartData?.productId
        )
        if (find) {
            notification.error(dupeNotification)
        } else {
            await createProductCart({
                variables: {
                    productId: productCartData?.productId,
                    cartId: productCartData?.cartId,
                    quantity: productCartData?.quantity,
                },
            }).then()
            notification.success(sucessNotification)
        }
    } catch (error) {
        console.log(error)
    }
}

export const updatePromotionCartHandler = async (promotionCartData) => {
    const promotionCart = promotionCartData?.promotions
    const createPromotionCart = promotionCartData?.createPromotionCart
    try {
        const find = promotionCart?.find(
            (o) => o.forPromotion?._id === promotionCartData?.promotionId
        )
        if (find) {
            notification.error(dupeNotification)
        } else {
            await createPromotionCart({
                variables: {
                    promotionId: promotionCartData?.promotionId,
                    cartId: promotionCartData?.cartId,
                    quantity: 1,
                },
            }).then()
            notification.success(sucessNotification)
        }
    } catch (error) {
        console.log(error)
    }
}

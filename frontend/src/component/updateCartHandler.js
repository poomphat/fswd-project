

import { CREATE_PROMOTION_CART_MUTATION } from '../graphql/createPromotionCartMutation'
import { CREATE_PRODUCT_CART_MUTATION } from '../graphql/createProductCartMutation'
import { useSession } from '../context/Sessioncontext'
import { useCallback, useEffect } from 'react'
import { gql, useMutation, useQuery, useLazyQuery  } from '@apollo/client'

export const updateProductCartHandler = async (productCartData) => {
    const productCart = productCartData?.products
    const createProductCart = productCartData?.createProductCart
    try {
        const find = productCart?.find(o => (o.forProduct?._id === productCartData?.productId))
        if (find) {
            console.log('dupeeeee')
        } else {
            await createProductCart({
                variables: {
                    productId: productCartData?.productId,
                    cartId: productCartData?.cartId,
                    quantity: 1
                }
            }).then()
        };

    } catch (error) {
        console.log(error)
    }

}

export const updatePromotionCartHandler = async (promotionCartData) =>{
    const promotionCart = promotionCartData?.promotions
    const createPromotionCart = promotionCartData?.createPromotionCart
    try{
        const find = promotionCart?.find(o => (o.forPromotion?._id === promotionCartData?.promotionId))
        if(find){
            console.log('dupeeeee')
        }else{
            await createPromotionCart({
                variables:{
                    promotionId:promotionCartData?.promotionId, 
                    cartId:promotionCartData?.cartId,
                    quantity:1
                }}).then()
        };
        
    }
    catch(error){
        console.log(error)
    }
}


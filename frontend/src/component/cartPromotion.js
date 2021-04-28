





import { CREATE_PROMOTION_CART_MUTATION } from '../graphql/createPromotionCartMutation'
import { CREATE_PRODUCT_CART_MUTATION } from '../graphql/createProductCartMutation'
import { useSession } from '../context/Sessioncontext'
import { useCallback, useEffect } from 'react'
import { gql, useMutation, useQuery, useLazyQuery  } from '@apollo/client'
import { notification, Button, Space } from 'antd';

const CartPromotion = (props) => {

    const item = props.item
    const getCart = props.getCart
    const user = props.user
    /* 
    const deleteProductHandler = (cartId, productId) =>{
        deleteProduct({variables:{cartId:cartId, productId:productId}}).then(
            props.getCart({variables: { Id: user?._id }})
        )
    */
    return(
        <div className="col-lg-12 row mainnaja pr-0 pl-0 ml-0 mb-4">
            <div className="headborder bg-dark text-light col-4">
                <p className="mb-1 textsmall">promotion</p>
                <h6 className="boldhead">Discount {item?.forPromotion?.promotionName}</h6>
            </div>
            <div class="bg-light col-8 bodyborder">  
                <h6 className="boldhead mb-1">{item?.forPromotion?.disProduct?.productName}</h6>
                <hr/>

                <div className="flexbe row pr-3 pl-3"> 
                    <h5 className="boldhead mb-0 totaltext mt-2">Quantity : {item.quantity}</h5>
                    <h5 className="boldhead mb-0 totaltext mt-2">Total : {Math.floor(item?.forPromotion?.disProduct?.price/((100+item?.forPromotion?.discountInPercent)/100))} USD</h5>
                </div>

            </div>
        </div>
    );
}
export default CartPromotion


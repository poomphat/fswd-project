





import { CREATE_PROMOTION_CART_MUTATION } from '../graphql/createPromotionCartMutation'
import { CREATE_PRODUCT_CART_MUTATION } from '../graphql/createProductCartMutation'
import { useCallback, useEffect } from 'react'
import { gql, useMutation, useQuery, useLazyQuery  } from '@apollo/client'
import { notification, Button, Space } from 'antd';
import { DELETE_CART_PRODUCT_ONE } from '../graphql/deleteCartProductOne'
import notfound from '../asset/notfound.jpg'

const deleteNotification = {
    message: "yeet the item successfully",
    description: "think carefully when choosing. kid",
    duration: 2
} 
const CartProduct = (props) => {
    const item  = props.items
    const dataCart = props.dataCart
    const [deleteProduct] = useMutation(DELETE_CART_PRODUCT_ONE)
    const deleteProductHandler = (cartId, productId) =>{
    deleteProduct({variables:{cartId:cartId, productId:productId}}).then(
        props.getCart({variables: { Id: props.user?._id }})
    )
    notification.error(deleteNotification);
}
    return(
        <>
            <div class="col-lg-12 col-sm-12 mt-2 row cartlist bg-light ml-0">
                <img src={(item?.forProduct?.imgUrl==null)?notfound:item?.forProduct?.imgUrl} className="picshoescart col-lg-2 col-sm-4 pl-0 imgcart pr-0"></img>
            <div className="col-lg-10 col-sm-8">
            <div className="row mt-2">
                <div className="col-lg-9 col-md-7 col-xs-12">
                    <h5 class="card-title">{item?.forProduct?.productName}</h5>
                 </div>
                 <div className="col-lg-3 col-md-4 col-xs-12">
                     <button className="flexend btn bg-danger col" onClick={() => deleteProductHandler(dataCart?.cart?._id,item?.forProduct?._id)}>Delete</button>
                 </div> 
            </div>
             
            <hr></hr>
                Quantity: {item?.quantity}
            </div>
             
            </div>
        </>
    )
}

export default CartProduct;
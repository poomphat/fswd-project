import { CREATE_PROMOTION_CART_MUTATION } from '../graphql/createPromotionCartMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import { useSession } from '../context/Sessioncontext'
import { useMutation, useLazyQuery  } from '@apollo/client'
import {useCallback, useEffect,useState,useMemo} from 'react'
import { updatePromotionCartHandler } from './updateCartHandler'
const PromotionCard = (props) =>{
    
    const item = props?.data
    const [userid, setuserid] = useState('')
    const { user , loading:userLoading } = useSession()
    const [createPromotionCart] = useMutation(CREATE_PROMOTION_CART_MUTATION)
    const [getCart, {loading,data:datacart}] = useLazyQuery(FIND_CART_QUERY, { fetchPolicy: 'network-only' },)

    useMemo( () =>{
        setuserid(user?._id)
        getCart( {
            variables: { Id: user?._id }
        })
    },[user,userLoading])

    const Addbutton = () => {
        const promotionCartData ={
            promotionId:item?._id,
            cartId:datacart?.cart?._id,
            promotions:datacart?.cart?.promotions,
            createPromotionCart:createPromotionCart
        }
        if(loading){
            return  <button class="btn btn-dark ml-2" disabled >Add</button>
        }else{
            return  <button class="btn btn-dark ml-2" onClick={() => {
                getCart( {
                    variables: { Id: user?._id }
                })
                updatePromotionCartHandler(promotionCartData)
            }}>Add</button>
        }
    }
        return (
            <div className="col-lg-6 col-sm-12 ml-3 mr-3 row mainnaja">
                <div className="headborder bg-dark text-light col-4">
                    <p className="mb-1 textsmall">promotion</p>
                    <h6 className="boldhead text-light">Discount {item?.promotionName}</h6>
                </div>
                <div class="bg-light col-8 bodyborder">  
                <h6 className="boldhead mb-1">{item?.disProduct?.productName}</h6>
                <hr/>
                <h8 className="mb-1">normal price : {item?.disProduct?.price} USD</h8>
               
                    <div className="flexbe row pr-3 pl-3"> 
                        <h5 className="boldhead mb-0 totaltext mt-2">Total : {Math.floor(item?.disProduct?.price/((100+item?.discountInPercent)/100))} USD</h5>
                        <Addbutton/>
                    </div>
                </div>
            </div>
        );
}

export default PromotionCard 
import { CREATE_PROMOTION_CART_MUTATION } from '../graphql/createPromotionCartMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import { FIND_ALL_CARTPROMOTION } from '../graphql/findManyPromotionQuery'
import { useSession } from '../context/Sessioncontext'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCallback, useEffect } from 'react'

const PromotionCard = (props) =>{
    /*
    const item = props?.data
    const { loading, user } = useSession()
    const [createPromotionCart] = useMutation(CREATE_PROMOTION_CART_MUTATION)
    const {data:cartData, refetch} = useQuery(FIND_CART_QUERY, {variables: { Id:user?._id}})

    const refatchHandler = useCallback( async() =>{
        await refetch()
    })
    useEffect(()=>{
        refatchHandler()
    },[cartData])

    const updatePromotionCartHandler = useCallback( async (promotionId) =>{
        const promotionCartData = cartData?.cart?.promotions
        console.log(cartData)
        try{
            const find = promotionCartData?.find(o => (o.forPromotion?._id === promotionId))
            if(find){
                console.log('dupeeeee')
            }else{
                console.log(promotionId, cartData?.cart?._id)
                await createPromotionCart({
                    variables:{
                        promotionId:promotionId, 
                        cartId:cartData?.cart?._id,
                        quantity:1
                    }}).then(
                )
            };
            
        }
        catch(error){
            console.log(error)
        }
        await refatchHandler()

    })*/
        return (
            <></>/*
            <div className="col-lg-6 col-sm-12 ml-3 mr-3 row mainnaja" data-aos="fade-up" data-aos-delay={200*(props.index+1)}>
                <div className="headborder bg-dark text-light col-4">
                    <p className="mb-1 textsmall">promotion</p>
                    <h6 className="boldhead">Discount {item?.promotionName}</h6>
                </div>
                <div class="bg-light col-8 bodyborder">  
                <h6 className="boldhead mb-1">{item?.disProduct?.productName}</h6>
                <hr/>
                <h8 className="mb-1">normal price : {item?.disProduct?.price} USD</h8>
               
                    <div className="flexbe row pr-3 pl-3"> 
                        <h5 className="boldhead mb-0 totaltext mt-2">Total : {Math.floor(item?.disProduct?.price/((100+item?.discountInPercent)/100))} USD</h5>
                        <button class="btn btn-dark ml-2" onClick={() => updatePromotionCartHandler(item?._id)}>Buy</button>
                    </div>
                </div>
            </div>*/
        );
}

export default PromotionCard 
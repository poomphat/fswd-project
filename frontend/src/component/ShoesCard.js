import notfound from '../asset/notfound.jpg'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { CREATE_PRODUCT_CART_MUTATION } from '../graphql/createProductCartMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import { useSession } from '../context/Sessioncontext'
import { useMutation, useLazyQuery  } from '@apollo/client'
import {useCallback, useEffect,useState,useMemo} from 'react'
import { updateProductCartHandler } from './updateCartHandler'

const ShoesCard = (props) =>{
    const item = props.item;
    const [userid, setuserid] = useState('')
    const { user , loading:userLoading } = useSession()
    const [createProductCart] = useMutation(CREATE_PRODUCT_CART_MUTATION)
    const [getCart, {loading,data:datacart}] = useLazyQuery(FIND_CART_QUERY, { fetchPolicy: 'network-only' },)
    //console.log(user?._id)
    useMemo( () =>{
        setuserid(user?._id)
        getCart( {
            variables: { Id: user?._id }
        })
    },[user,userLoading])

    const Addbutton = () => {
        const productCartData ={
            productId:item?._id,
            cartId:datacart?.cart?._id,
            products:datacart?.cart?.products,
            createProductCart:createProductCart
        }
        if(loading){
            return  <button class="btn btn-dark col" disabled >Add</button>
        }else{
            return  <button class="btn btn-dark col" onClick={() => {
                getCart( {
                    variables: { Id: user?._id }
                })
                updateProductCartHandler(productCartData)
            }}>Add</button>
        }
    }
    const ShoesDetail = () => {
        if(userLoading){
            return  <p></p>
        }else{
            return(  <div class="col-lg-4 col-sm-12 mb-3 pr-0">
                        <div class="card bg-light text-dark shadow shoecard">
                            <img class="card-img-top imgs" src={(item?.imgUrl==null || !item?.imgUrl )?notfound:item?.imgUrl} alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">{item?.productName}</h5>
                                <p class="card-text">{item?.productDesc}</p>   
                            </div>
                            <div class="card-footer text-dark flexbe ">
                    
                                <h6 className="boldhead mb-0 totaltext mt-2 ml-1">{item?.price} USD</h6>
                                <div className="row mt-2">
                        
                                    <div className="col-6">
                                        <Link to={"/productdetail/"+ item?.productName}>
                                            <a href="#" class="btn btn-light col">more</a>
                                        </Link>
                                    </div>
                                    <div className="col-6">
                                        <Addbutton/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
        }
    }
    return(<ShoesDetail/>)
}

export default ShoesCard
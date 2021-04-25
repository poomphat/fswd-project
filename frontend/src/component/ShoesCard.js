import notfound from '../asset/notfound.jpg'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { CREATE_PRODUCT_CART_MUTATION } from '../graphql/createProductCartMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import { FIND_ALL_CARTPRODUCT } from '../graphql/fineManyCartProduct'
import { useSession } from '../context/Sessioncontext'
import { gql, useMutation, useQuery, useLazyQuery  } from '@apollo/client'
import {useCallback, useEffect,useState,useMemo} from 'react'
const ShoesCard = (props) =>{
    const item = props.item;
    const [userid, setuserid] = useState('')
    const { user , loading:userLoading} = useSession()
    const [createProductCart] = useMutation(CREATE_PRODUCT_CART_MUTATION)
    const [getCart, {loading,data:datacart}] = useLazyQuery(FIND_CART_QUERY, { fetchPolicy: 'network-only' },)
    //console.log(user?._id)
    useMemo( () =>{
        setuserid(user?._id)
        getCart( {
            variables: { Id: user?._id }
        })
    },[user,userLoading])

    const updateProductCartHandler = useCallback( async (productId, idcart ,arrayproduct) =>{
        const productCartData = arrayproduct
        //await refatchHandler()
        try{
            const find = productCartData?.find(o => (o.forProduct?._id === productId))
            if(find){
                console.log('dupeeeee')
            }else{
                await createProductCart({
                    variables:{
                        productId:productId, 
                        cartId: idcart,
                        quantity:1
                    }}).then(
                )
            };
            
        }
        catch(error){
            console.log(error)
        }

    },[])
      
    const Addbutton = () => {
        if(loading){
            return  <button class="btn btn-dark col" disabled >Add</button>
        }else{
            return  <button class="btn btn-dark col" onClick={() => {
                getCart( {
                    variables: { Id: user?._id }
                })
                updateProductCartHandler(item?._id, datacart?.cart?._id, datacart?.cart?.products)
            }}>Add</button>
        }
    }
    const Asdasdasdaweweasdasd = () => {
        if(userLoading){
            return  <p>Loading...</p>
        }else{
            return(  <div class="col-lg-4 col-sm-12 mb-3 pr-0">
                        <div class="card bg-light text-dark shadow shoecard" data-aos="zoom-out" data-aos-mirror="false">
                            <img class="card-img-top imgs" src={(item?.imgUrl==null)?notfound:item?.imgUrl} alt="Card image cap"/>
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
    return(<Asdasdasdaweweasdasd/>)
}

export default ShoesCard;
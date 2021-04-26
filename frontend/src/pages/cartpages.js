import './cartpages.css';
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import {useState, useEffect, useCallback, useMemo} from 'react'
import PromotionCard from '../component/promotionCard'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import { FIND_MANY_MUTATION } from '../graphql/findProductMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import notfound from '../asset/notfound.jpg'
import { useSession } from '../context/Sessioncontext'

function Cartpages() {
    const { user , loading:userLoading } = useSession()
    const [userid, setuserid] = useState('')
    const { data:promotions } = useQuery(FIND_ALL_PROMOTIONS)
    //const [findManyProduct, {loadings}] = useMutation(FIND_MANY_MUTATION)
    const [getCart, {loading, data:dataCart}] = useLazyQuery(FIND_CART_QUERY, { fetchPolicy: 'network-only' },)
    //const [product, setProduct] = useState()

    
    useMemo( () =>{
        setuserid(user?._id)
        getCart( {
            variables: { Id: user?._id }
        })
        console.log(dataCart)
    },[user,userLoading])
    /*
    const setProductHandler = useCallback( async (data) =>{
        setProduct(data);
      });

    useEffect(()=>{
        findManyProduct().then(result =>{
            setProductHandler(result.data)
        })
        
    }, [])
    */
    const sumOfPromotionPrice = (array) =>{
        try{
            const sum = array.map(
                o => Math.floor(o.forPromotion?.disProduct?.price/((100+o.forPromotion?.discountInPercent)/100))
                ).reduce((a, c) => { return a + c });
            return sum
        }
        catch(error){
            return 0
        }
    }
    const sumOfProductPrice = (array) =>{

        try{
            const sum = array.map(
                o => o.forProduct?.price
                ).reduce((a, c) => { return a + c });
            return sum
        }
        catch(error){
            return 0
        }
    }
    const sumOfPrice = (products, promotions) =>{
        return sumOfProductPrice(products)+sumOfPromotionPrice(promotions)
    }

    const checkOut = () =>{
        const tempProducts = dataCart?.cart?.products 
        const products = []
        try{    
            tempProducts.map((item, i) => {
                products.push({
                    quantity:item?.quantity,
                    productId:item?.forProduct?._id,
                    stock:item?.forProduct?.hasStock?.quantity
                })

            })
            dataCart?.cart?.promotions?.map((item, i) => {
                const proProduct = products?.find(o => (o.productId === item?.forPromotion?.disProduct?._id))
                if(proProduct){
                    const productQuantity = products[products.indexOf(proProduct)].quantity
                    const promotionQuantity = item?.quantity
                    products[products.indexOf(proProduct)].quantity = productQuantity+promotionQuantity

                    if(products[products.indexOf(proProduct)].quantity > products[products.indexOf(proProduct)].stock){
                        throw 'no'
                    }

                }
            })
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">Cart</h2>
                <hr></hr>
                <div className="row">
                <div className="col-lg-8 col-sm-12">
                <div className="row flexbetween ml-2 mr-2">
                    <h3 className="textbold">Product</h3> <h3 className="textbold">Amount : {dataCart?.cart?.products?.length}</h3>
                </div>
                {dataCart?.cart?.products?.map((item, i) => {
                    return (
                    <div class="col-lg-12 col-sm-12 mt-2 row cartlist bg-light ml-0">
                    <img src={(item?.forProduct?.imgUrl==null)?notfound:item?.forProduct?.imgUrl} className="picshoescart col-lg-2 col-sm-4 pl-0 imgcart pr-0"></img>
                    <div className="col-lg-10 col-sm-8">
                    <h5 class="card-title">{item?.forProduct?.productName}</h5>
                    <hr></hr>
                        Quantity: {item.quantity}
                       
                    </div>
                        
                    </div>
                    );
                    })}
                    <div className="row flexbetween ml-2 mr-2">
                        <h3 className="textbold mt-4 mb-4">Promotion</h3> <h3 className="textbold mt-4 mb-4">Amount : {dataCart?.cart?.promotions?.length}</h3>
                    </div>
                    {dataCart?.cart?.promotions?.map((item, i) => {
                        return (
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
                    })}
                </div>
                    <div className="col-lg-4 col-sm-12 mt-4">
                        <div className="bg-light Totallist">
                            <h4 className="textbold">Total : {sumOfPrice(dataCart?.cart?.products, dataCart?.cart?.promotions)} USD</h4>
                            <hr/>
                            <button class="btn btn-warning col control" onClick={() => {checkOut()}}>Check out</button>
                            <button class="btn btn-secondary col control mt-2" >cancel</button>
                        </div>
                    </div>
                </div>
            </div>  
    </div>
    
  );  
}

export default Cartpages;
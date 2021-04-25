import './cartpages.css';
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import {useState, useEffect, useCallback} from 'react'
import PromotionCard from '../component/promotionCard'
import { gql, useMutation,useQuery } from '@apollo/client'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import { FIND_MANY_MUTATION } from '../graphql/findProductMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import notfound from '../asset/notfound.jpg'
import { useSession } from '../context/Sessioncontext'

function Homepages() {
    const {user} = useSession()
    const { loading, data } = useQuery(FIND_ALL_PROMOTIONS)
    const [findManyProduct, {loadings}] = useMutation(FIND_MANY_MUTATION)
    const {data:dataCart, loading:loadingCart} = useQuery(FIND_CART_QUERY, {variables: { Id: user?._id }})
    const [product, setProduct] = useState()

    const setProductHandler = useCallback( async (data) =>{
        await setProduct(data);
      });

    useEffect(()=>{
        findManyProduct().then(result =>{
            setProductHandler(result.data)
        })
        
    }, [])
    console.log('dataCart')
    console.log(dataCart?.cart)
  return (
   
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle">Cart</h2>
                <hr></hr>
                <div className="row">
                <div className="col-lg-8 col-sm-12">
                <div className="row flexbetween ml-2 mr-2">
                    <h3 className="textbold">Product</h3> <h3 className="textbold">Amount : {dataCart?.cart?.products?.length}</h3>
                </div>
                {dataCart?.cart?.products?.map((item, i) => {
                    return (
                    <div class="col-lg-12 col-sm-12 mt-2 row cartlist bg-light ml-0" data-aos="fade-up" data-aos-delay={200}>
                    <img src={(item?.imgUrl==null)?notfound:item?.imgUrl} className="picshoescart col-lg-2 col-sm-4 pl-0 imgcart pr-0"></img>
                    <div className="col-lg-10 col-sm-8">
                    <h5 class="card-title">{item?.productName}</h5>
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
                            <div className="col-lg-12 row mainnaja pr-0 pl-0 ml-0 mb-4" data-aos="zoom-out">
                                <div className="headborder bg-dark text-light col-4">
                                    <p className="mb-1 textsmall">promotion</p>
                                    <h6 className="boldhead">Discount {item?.promotionName}</h6>
                                </div>
                                <div class="bg-light col-8 bodyborder">  
                                <h6 className="boldhead mb-1">{item?.disProduct?.productName}</h6>
                                <hr/>
                                    <div className="flexbe row pr-3 pl-3"> 
                                    <h5 className="boldhead mb-0 totaltext mt-2">Quantity : {item.quantity}</h5>
                                        <h5 className="boldhead mb-0 totaltext mt-2">Total : {Math.floor(item?.disProduct?.price/((100+item?.discountInPercent)/100))} USD</h5>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                    <div className="col-lg-4 col-sm-12 mt-4">
                        <div className="bg-light Totallist" data-aos="fade-up" data-aos-delay={150}>
                            <h4 className="textbold">Total : 400 USD</h4>
                            <hr/>
                            <a href="#" class="btn btn-warning col control"><h5 className="control">Check out</h5></a>
                            <a href="#" class="btn btn-secondary col control mt-2"><h5 className="control">cancel</h5></a>
                        </div>
                    </div>
                </div>
            </div>  
    </div>
    
  );  
}

export default Homepages;
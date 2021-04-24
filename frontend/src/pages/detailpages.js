import './detailpages.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import notfound from '../asset/notfound.jpg'
import { gql, useMutation,useQuery } from '@apollo/client'
import { FIND_MANY_MUTATION } from '../graphql/findProductMutation'

import PromotionCard from '../component/promotionCard'

function Detailsproduct() {
    const [findManyProduct, {loading}] = useMutation(FIND_MANY_MUTATION)
    const [product, setProduct] = useState()

    const setProductHandler = useCallback( async (data) =>{
        await setProduct(data);
      });

    useEffect(()=>{
        findManyProduct().then(result =>{
            setProductHandler(result.data)
        })
    }, [])
    console.log(product?.findManyProduct[2])
  return (
   
    <div className="bg">
        <Navbar/>
        <div className="container mt-5">       

            <h2 className="textbold">{product?.findManyProduct[2]?.productName}</h2>
            <div className="row">
                <div className="col-lg-4 col-sm-12">
                    <img src={(product?.findManyProduct[2]?.imgUrl==null)?notfound:product?.findManyProduct[2]?.imgUrl} className="imgdetail"></img>
                </div>
                <div className="col-lg-4 col-sm-12">
                    <div>Description : {product?.findManyProduct[2]?.productDesc}</div>
                    <div>Price : {product?.findManyProduct[2]?.price} USD</div>
                    <button class="btn btn-dark" type="button" id="button-addon2">Buy</button>
                </div>
            </div>
        </div>

    </div>
    
  );  
}

export default Detailsproduct;
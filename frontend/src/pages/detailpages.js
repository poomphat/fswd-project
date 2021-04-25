import './detailpages.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import notfound from '../asset/notfound.jpg'
import { gql, useMutation,useQuery } from '@apollo/client'
import { FIND_PRODUCT_QUERY } from '../graphql/findProductQuery'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
import PromotionCard from '../component/promotionCard'

function Detailsproduct(props) {
    const name  = useParams()
    const {data:dataProduct, loading:loadingProduct} = useQuery(FIND_PRODUCT_QUERY, {variables: { name: name.string }})
    console.log(dataProduct)
  return (
   
    <div className="bg">
        <Navbar/>
        <div className="container mt-5">       
            <h2 className="textbold" data-aos="fade-up" data-aos-delay="100">{dataProduct?.product?.productName}</h2>
            <div className="row">
                <div className="col-lg-4 col-sm-12" data-aos="fade-up" data-aos-delay="200">
                    <img src={(dataProduct?.product?.imgUrl==null)?notfound:dataProduct?.product?.imgUrl} className="imgdetail"></img>
                </div>
                <div className="col-lg-4 col-sm-12 flexend" data-aos="fade-up" data-aos-delay="300">
                    <div>Description : {dataProduct?.product?.productDesc}</div>
                    <h2 className="textbold">Price : {dataProduct?.product?.price} USD</h2>
                    <button class="btn btn-dark" type="button" id="button-addon2">Buy</button>
                </div>
            </div>
        </div>

    </div>
    
  );  
}

export default Detailsproduct;
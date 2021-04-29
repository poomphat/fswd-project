import './detailpages.css';
import {useState, useEffect, useCallback, useMemo} from 'react'
import Navbar from '../component/Navbar'
import notfound from '../asset/notfound.jpg'
import { gql, useMutation,useQuery, useLazyQuery } from '@apollo/client'
import { FIND_PRODUCT_QUERY } from '../graphql/findProductQuery'
import OrderCard from '../component/OrderCard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";

import { FIND_ORDER_BY_ID } from '../graphql/findOrderById'
import { updateProductCartHandler } from '../component/updateCartHandler'
import { Spin, Alert } from 'antd';
import { useSession } from '../context/Sessioncontext'


function Detailsproduct() {
    const name  = useParams()
    const {data:items, loading:loading} = useQuery(FIND_ORDER_BY_ID, {variables: { _id: name.string }})
    const item = items?.orders[0]
    console.log(item)
  return (
   
    <div className="bg">
        <Navbar/>
        <div className="container">
          <h2 className="Texttitle mt-5" data-aos="fade-right">Order : {item?._id} </h2>
          <hr/>
          <OrderCard item={item}/>
          </div>

    </div>
    
  );  
}

export default Detailsproduct;
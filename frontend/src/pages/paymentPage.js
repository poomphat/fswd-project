import './cartpages.css';
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import {useState, useEffect, useCallback, useMemo} from 'react'
import PromotionCard from '../component/promotionCard'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import { FIND_MANY_MUTATION } from '../graphql/findProductMutation'
import { FIND_CART_QUERY } from '../graphql/findCartQuery'
import { CREATE_ORDER_MUTATION } from '../graphql/createOrderMutation'
import { DELETE_CART_PRODUCT_MANY } from '../graphql/deleteCartProductMany'
import { DELETE_CART_PROMOTION_MANY } from '../graphql/deleteCartPromotionMany'
import { UPDATE_STOCK_MUTATION } from '../graphql/updateStockMutation'
import notfound from '../asset/notfound.jpg'
import { useSession } from '../context/Sessioncontext'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";

function PaymentPage() {
    const { user , loading:userLoading } = useSession()
    const [userid, setuserid] = useState('')
    const { data:promotions } = useQuery(FIND_ALL_PROMOTIONS)
    const [createOrder] = useMutation(CREATE_ORDER_MUTATION)
    const [wipeProductCart] = useMutation(DELETE_CART_PRODUCT_MANY)
    const [wipePromotionCart] = useMutation(DELETE_CART_PROMOTION_MANY)
    const [updateStock] = useMutation(UPDATE_STOCK_MUTATION) 
    const location = useLocation()
    const history = useHistory()
    const goToCheckOut = useCallback(
        (order) => {
          history.push({
              pathname: '/checkout',
              order : order
          })
        },
        [history],
      )
    
    console.log(location.order)
    
    useMemo( () =>{
        setuserid(user?._id)
    },[user,userLoading])

  return (
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">Payment Pay me u fucker</h2>
                <hr></hr>
                <div className="row">
                    <div className="col-lg-8 col-sm-12">
                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">Card Number</label>
                                <input type="text" class="form-control bg-light" placeholder="Card Number" id="customFile" required/> 
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">Cardholder Name</label>
                                <input type="text" class="form-control bg-light" placeholder="Cardholder Name" id="customFile" required/> 
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-sm-12">
                                    <div class="form-group mt-2">
                                        <label class="form-label" for="customFile">CVV</label>
                                        <input type="text" class="form-control bg-light" placeholder="CVV" id="customFile" required/> 
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                    <div class="form-group mt-2">
                                        <label class="form-label" for="customFile">Expire Date</label>
                                        <input type="date" class="form-control bg-light" placeholder="Expire Date" id="customFile" required/> 
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>  
    </div>
    
  );  
}

export default PaymentPage;
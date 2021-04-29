





import { CREATE_PROMOTION_CART_MUTATION } from '../graphql/createPromotionCartMutation'
import { CREATE_PRODUCT_CART_MUTATION } from '../graphql/createProductCartMutation'
import { useCallback, useEffect } from 'react'
import { gql, useMutation, useQuery, useLazyQuery  } from '@apollo/client'
import { notification, Space } from 'antd';
import { DELETE_CART_PRODUCT_ONE } from '../graphql/deleteCartProductOne'
import notfound from '../asset/notfound.jpg'
import { Accordion, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const OrderCard = (props) => {
    const item  = props.item
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
      const goTodetail = useCallback(
        (order) => {
          history.push({
              pathname: '/customer/order/'+item?._id,
              order : order
          })
        },
        [history],
      )
    console.log(props.disablePay)
    return(
        <>
        <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-light ml-0 pl-3 mb-4"> 
            <div className={"boxstatus"+((item?.status === "WAITING")? " bg-warning" : " bg-success" )} ></div>
            <div className="col-12 pr-0"> 
            <Accordion defaultActiveKey="0">
            <div className="flexbetween row ml-1 mr-1">
            <h4 class="card-title textbold mt-2">Order : {item?._id}</h4> 
                <div>
                    {(item?.status === "WAITING" && !props.disablePay)? <button className="btn btn-light" onClick={() => goToCheckOut(item)}>Pay</button> : <></> }
                </div>
            </div>
            <p>Status : {item?.status}</p>
            <hr/>            
            <h5>Total: {item?.totalPrice} USD</h5>
            <Accordion.Toggle as={Button} variant="btn btn-dark mt-1" eventKey="0798978">Product List</Accordion.Toggle>
                <Accordion.Collapse eventKey="0798978">
                <div class="mt-2 row">
                {item?.products?.map((item, i) => {
                            return (
                                <div className="col-6 mt-2">
                                    <div className="bg-dark boxproduct text-lightml-3" style={{backgroundImage: "url(" + item?.forProduct?.imgUrl + ")"}}>
                                        <div className="filterbg">
                                        <p className="text-light">{item?.forProduct?.productName}</p>
                                        <p className="text-light">Price: {item?.forProduct?.price} USD</p>
                                        </div>
                                    </div>
                                </div>
                                    );
                                })}  
                {item?.promotions?.map((item, i) => {
                            return (
                                <div className="col-6 mt-2">
                                    <div className="bg-dark boxpromotion text-lightml-3">
                                    <p className="text-light">{item.promotionId}</p> 
                                    <p className="text-light">Price: {item?.forPromotion?.price} US</p>
                                    </div>
                                </div>
                                    );
                                })}  
                </div>
                </Accordion.Collapse>
                  </Accordion>
            <hr/>
            <h5>Shipping</h5>
            </div>
            
           
        </div>
            
        </>
    )
}

export default OrderCard;
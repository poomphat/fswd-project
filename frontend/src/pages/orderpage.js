import './orderpage.css';
import {useState, useEffect, useCallback,useMemo} from 'react'
import Navbar from '../component/Navbar'
import { useLazyQuery } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'
import { FIND_ORDER_BY_USER } from '../graphql/findorderByUser'
import OrderCard from '../component/OrderCard'
import { Spin, Alert } from 'antd';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Accordion, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
function Order() {
  
    const {user, loading: loadingUser } = useSession()  
    const [id, setid] = useState(null)
    const [color,setcolor] = useState([1,0,0])
    const [getorder ,{ data:order ,loading }] = useLazyQuery(FIND_ORDER_BY_USER)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    console.log(order)
    useMemo( () =>{
      getorder({variables:{ userId: user?._id }})
      setid(user?._id)
      console.log(user?._id)
    },[user,loadingUser])

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
              pathname: '/customer/order/'+order._id,
              order : order
          })
        },
        [history],
      )
    return (
  
    <div className="bg">
        <Navbar/>
          <div className="container">
          <h2 className="Texttitle mt-5" data-aos="fade-right">Order</h2>
          <hr data-aos="fade-right"></hr>
                <div className="row">
                <div className="row col-lg-12 col-xs-12 mb-5">
                    <div className="col-lg-12 row">
                    {!loading?   
                    <> 
                    {order?.orders?.map((item, i) => {
                            return (
                              <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-light ml-0 pl-3 mb-4"> 
                              <div className={"boxstatus"+((item?.status === "WAITING")? " bg-warning" : " bg-success" )} ></div>
                              <div className="col-12 pr-0"> 
                              
                              <div className="flexbetween row ml-1 mr-1">
                              <h4 class="card-title textbold mt-2">Order : {item?._id}</h4> 
                                  <div>
                                      <button className="btn btn-light mr-1" onClick={() => goTodetail(item)}>Detail</button>
                                      {(item?.status === "WAITING")? <button className="btn btn-light" onClick={() => goToCheckOut(item)}>Pay</button> : <></> }
                                  </div>
                              </div>
                              <p>Status : {item?.status}</p>
                              <hr/>            
                              <h5>Total: {item?.totalPrice} USD</h5>
                              </div>
                          </div>
                            );})}
                    </>
                      
                                : <>
                                <Spin indicator={antIcon} tip="Loading..." spinning={true}>
                                <OrderCard item={null}/>
                                </Spin>
                                </>}  
                    
                        </div>
                    
        </div>
    </div>
    </div>
    </div>
  );  
}

export default Order;
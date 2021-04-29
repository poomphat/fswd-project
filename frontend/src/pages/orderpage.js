import './orderpage.css';
import {useState, useEffect, useCallback,useMemo} from 'react'
import Navbar from '../component/Navbar'
import { useLazyQuery } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'
import { FIND_ORDER_BY_USER } from '../graphql/findorderByUser'
import OrderCard from '../component/OrderCard'
import { Spin, Alert } from 'antd';
import { Modal, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
    return (
  
    <div className="bg">
        <Navbar/>
          <div className="container">
          <h2 className="Texttitle mt-5" data-aos="fade-right">Order</h2>
          <hr data-aos="fade-right"></hr>
                <div className="row">
                <div className="col-lg-3 col-sm-12">
               
                    <p  className={color[0] == 1 ? 'text-light filter' : 'text-dark filter'}
                        onClick={()=>{setcolor([1,0,0])//;setCheckfilter('');setPage(1);
                      }}
                        style={{backgroundColor:  color[0] == 1 ? '#292b2c' : 'rgba(0,0,0,0)'}}>All</p>

                    <p  className={color[1] == 1 ? 'text-light filter' : 'text-dark filter'}
                        onClick={()=>{setcolor([0,1,0]);//setCheckfilter('man');setPage(1);
                      }} 
                        style={{backgroundColor:  color[1] == 1 ? '#292b2c' : 'rgba(0,0,0,0)'}}>Waiting</p>

                    <p  className={color[2] == 1 ? 'text-light filter' : 'text-dark filter'} 
                        onClick={()=>{setcolor([0,0,1]);//setCheckfilter('woman');setPage(1);
                      }} 
                        style={{backgroundColor:  color[2] == 1 ? '#292b2c' : 'rgba(0,0,0,0)'}}>Paid</p>
                </div>
                <div className="row col-lg-9 col-xs-12 mb-5">
                    <div className="col-lg-12 row">
                    {!loading?   
                    <> 
                    {order?.orders?.map((item, i) => {
                            return (
                              <OrderCard item={item}/>
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
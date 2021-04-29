import './dashboard.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Adminnav from "../component/sidebar"
import OrderCard from '../component/OrderCard'
import { Statistic, Row, Col, Button } from 'antd';
function Dashboard() {
    const item = ''

    
  return (
   
    <div className="bg">
        <Adminnav/>
        <div className="container">
            <h2 className="Texttitle mt-5 mb-4" data-aos="fade-right">Dashboard</h2>
            <div className="row col-12">
                <div className="col-6 ">
            <div className="row bg-light col-12 boxorderdashboard">
                    <div className="col-12">
                        <h5 className="ml-1">Latest Order</h5>
                        <hr/>
                    </div>
            </div></div>
            <div className="col-6 ">
                    <div className="row bg-light  boxorderdashboard">
                        <div className="col-12">
                            <h5 className="ml-1">Latest Order</h5>
                            <hr/>
                        </div>
                        
                        <div className="row col-lg-12 ml-1">        
                            <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-dark ml-0 mr-0 pl-3 mb-4"> 
                            <div className={"boxstatus"+((item?.status === "WAITING")? " bg-warning" : " bg-success" )} ></div>
                            <div className="col-12 pr-0"> 
                            <div className="flexbetween row ml-1 mr-1">
                            <h4 class="card-title textbold text-light mt-2">Order : {item?._id}</h4>
                            </div>
                            <hr className="bg-light"/>            
                            <h5 className="text-light">Total: {item?.totalPrice} USD</h5>
                        </div>
                        
               
                        </div>
                     
                    </div>  
                </div>
                </div>
        </div>
        </div>
    </div>
    
  );  
}

export default Dashboard;
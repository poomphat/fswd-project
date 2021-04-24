
import '../content.css'

import { useEffect, useState } from "react";
import React from 'react';
import elon from '../asset/image/Elon.png'
import logo from '../asset/image/logo.png'
import {Link} from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Icon,
} from '@material-ui/core/';

export default function Mainpage() {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fechData = async () =>{
        const response1 = await fetch("https://api.spacexdata.com/v3/rockets");
        const data1 = await response1.json();
        const response2 = await fetch("https://api.spacexdata.com/v3/missions");
        const data2 = await response2.json();
        const response3 = await fetch("https://api.spacexdata.com/v3/info");
        const data3 = await response3.json();
        setData([data1,data2,data3]);
      };
      fechData();
      
    }, []);
    return (
      <div className="centerS">
         {console.log(data)}
         <div className="row">
         <div className="firstpic">
         <div className="mainContent ml-3 mr-3">
           <div className="ml-4">
           <img src={logo} style={{width:'100%'}}></img>
           </div>
           <div style={{flexdirection: 'row',marginTop: 20}} className="ml-4">
           <Button  variant="outlined" style={{ fontSize:'0.8rem',border: '2px solid rgb(174,174,178)',color:'rgb(174,174,178)', backgroundColor : 'rgba(255,255,255,0.02)'}}>
                Total Mission : {data[1]?.length}
            </Button>
              <Link to="/rocket" style={{ textDecoration: 'none' }}>
              <Button  variant="outlined" style={{fontSize:'0.8rem',border: '2px solid rgb(48,209,88)' ,color:'rgb(48,209,88)'}} className="ml-2" >
                Total Rocket : {data[0]?.length}
              </Button>
              </Link>
           </div>
         </div> 
         </div>
         </div>
         <div className="content2 centerS">
                <div style={{display: 'flex',alignSelf: 'center',marginTop: '100px',fontSize: 48, color: 'white'}} data-aos="zoom-in-up">
                <p>Co-Founder</p>
                </div>
                <div className="mainDesElon row">
            
                  <div className="textElon col-xs-12 col-lg-6" data-aos="zoom-in-up">
                    <h2>{data[2]?.founder}</h2>
                    <hr color="white"></hr>
                  <h5>นักธุรกิจทรงอิทธิพลชาวอเมริกันแคนาคาแอฟริกาใต้คนหนึ่งซึ่งกำลังมีชื่อเสียงมากในขณะนี้ เหตุผลสำคัญที่สิ่งที่เขาคิดและทำนั้นเรียกได้ว่าเป็นนวัตกรรมแบบ “เปลี่ยนโลก” 
                    ผลงานหลักที่ไม่พูดถึงไม่ได้ของเขาได้แก่ TESLA ผู้ผลิตรถยนต์ไฟฟ้าที่ปลุกกระแสรถยนต์พลังงานสะอาดจนโด่งดังในปัจจุบัน PAYPAL ผู้ให้บริการช่องทางการชำระเงินออนไลน์จนกลายเป็นธุรกิจสำคัญในโลกยุคดิจิตัล 
                    และ SPACEX ผู้ให้บริการประสบการณ์การเดินทางในอวกาศ 
                    ด้วยปรัชญาที่จะสร้างการเดินทางสู่ดาวดวงอื่นด้วยราคาประหยัด</h5></div>
                  <img src={elon} className="elonpic col-xs-11 col-lg-5" data-aos="zoom-in-up"></img>
                </div>
                <div style={{display: 'flex',alignSelf: 'center', color: 'white',flexDirection: 'column',marginBottom: '50px'}} className=" col-10 ml-4 mr-4" data-aos="zoom-in-up">
                <h1>About SpaceX</h1>
                <div style={{width: '100%'}}>
                <hr color="white"/>
                </div>
                <p>{data[2]?.summary} </p>
                <div style={{}} className="row">
                    <div  className="about col-xs-10 col-lg-3 mt-4">founded : {data[2]?.founded}</div>
                    <div  className="about col-xs-10 col-lg-3 mt-4">employees : {data[2]?.employees}</div> 
                    <div  className="about col-xs-10 col-lg-3 mt-4">valuation : {data[2]?.valuation/1000000000} Billion USD</div>
                    {console.log(data[2]?.headquarters)}
                    <div  className="about col-xs-10 col-lg-3 mt-4">Address : {data[2]?.headquarters?.address}</div> 
                    <div  className="about col-xs-10 col-lg-3 mt-4">city : {data[2]?.headquarters?.city}</div> 
                    <div  className="about col-xs-10 col-lg-3 mt-4">state : {data[2]?.headquarters?.state}</div> </div>
              
                </div>
         </div>
      </div>
    );
  }
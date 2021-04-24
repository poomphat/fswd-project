
import '../content.css'
import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import rocket from '../asset/image/rocket.jpg'
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Icon,
  } from '@material-ui/core/';
  import {
    useParams
  } from "react-router-dom";


const useStyles = makeStyles({
    cardroot: {
        marginTop:100,
        minWidth: 100,
      },
      cardbullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      cardtitle: {
        fontSize: 14,
      },
      cardpos: {
        marginBottom: 12,
      },
      cardAction:{
        position: 'absolute',
        bottom: 0,
      },
      rocket:{
        height:"100vh",
      }
      
  });

export default function Rocketpage() {
    const [rocket, setRocket] = useState([]);
    const { rocket_id } = useParams();
    useEffect(() => {
      const fechRocket = async () =>{
        const response = await fetch("https://api.spacexdata.com/v3/rockets/"+rocket_id);
        const data = await response.json();
        setRocket(data);
      };
      fechRocket();
    }, []);
    
    const classes = useStyles();
    
    const openInfoNewTab = (url) =>{
        const win = window.open(url, "_blank");
        console.log(win)
    }
  
    return ( 

      <div className='container'>
       
      <div className="row ">
      <div className="col-lg-12 row" style={{marginTop: 50}}>
      <div className="col-lg-10 col-xs-12" style={{fontSize: '4rem',color: 'white',marginBottom:0}}><p>{rocket.rocket_name}</p></div>
      <div className="col-lg-2 col-xs-12 mt-4 mb-2">
        <Button  variant="outlined" style={{color: 'white', position: 'absolute',bottom: '10px',borderColor: 'white'}} onClick={() => openInfoNewTab(rocket.wikipedia)}>
                        View Detail</Button>
      </div>
        
      <div className="ml-2 col-12" style={{width: '100%'}}>
      <hr color="white"/>
      </div>
      </div>
      
      <div className="TitleRocket col-lg-6 col-xs-12 mr-4 ml-2" style={{marginTop: '2vh',fontSize: '18px'}}>
            <p style={{color:'white'}}>Status : {(rocket?.active)? 'Activate' : 'Not Activate'}</p>
            <p>First Flight : {rocket?.first_flight} </p>
            <p>Cost per launch : {rocket?.cost_per_launch/1000000} Millions USD</p>
            <p>Height : {rocket?.height?.meters} meters</p>
            <p>diameter : {rocket?.diameter?.meters} meters</p>
            <br/>
            <br/>

       </div>
        <div className="descript col-lg-5 col-xs-12 ">
          <img src={rocket?.flickr_images} style={{width: '100%',borderRadius: '5px'}}/>
          </div>
      </div>
     <div className="row">
      <div className="descript col-lg-6 col-xs-11 "> <h3>First stage</h3> 
        <hr color="white"/>
       
            <div>Reusable : {(rocket?.first_stage?.reusable)? 'Yes' : 'No'}</div>
            <div>engines : {rocket?.first_stage?.engines} </div>
            <div>Fuel amount tons : {rocket?.first_stage?.fuel_amount_tons} Tons</div>
            <div>burn time per sec : {rocket?.first_stage?.burn_time_sec} seconds</div>
            </div>
        
        <div className="descript col-lg-6 col-xs-11">
      <h3>Second stage</h3> 
          <hr color="white"/>
       
            <div>Reusable : {(rocket?.second_stage?.reusable)? 'Yes' : 'No'}</div>
            <div>engines : {rocket?.second_stage?.engines} </div>
            <div>Fuel amount tons : {rocket?.second_stage?.fuel_amount_tons} Tons</div>
            <div>burn time per sec : {rocket?.second_stage?.burn_time_sec} seconds</div>
            </div>
        </div>
        </div>

    );
  }
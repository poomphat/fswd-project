
import '../content.css'
import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import rocket from '../asset/image/rocket.jpg'
import {Link} from "react-router-dom";
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

export default function LaunchDetail() {
    const [mission, setmission] = useState([]);
    const { flight_number } = useParams();
    useEffect(() => {
      const fechmission = async () =>{
        const response = await fetch("https://api.spacexdata.com/v3/launches/"+flight_number);
        const data = await response.json();
        setmission(data);
      };
      fechmission();
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
      <div className="col-lg-10 col-xs-12" style={{fontSize: '4rem',color: 'white',marginBottom:0}}><p>{mission?.mission_name}</p></div>
      <div className="col-lg-2 col-xs-12 mt-4 mb-2">
        <Button  variant="outlined" style={{color: 'white', position: 'absolute',bottom: '10px',borderColor: 'white'}} onClick={() => openInfoNewTab(mission?.links?.article_link)}>
                        Learn more</Button>
      </div>
        
      <div className="ml-2 col-12" style={{width: '100%'}}>
      <hr color="white"/>
      </div>
      </div>
      
      <div className="TitleRocket col-lg-6 col-xs-12 mr-4 ml-2" style={{marginTop: '2vh',fontSize: '18px'}}>
            <p style={{color:'white'}}>Status : {(mission?.launch_success)? <span className='text-success'>'Success'</span> : <span className='text-danger'>'Failed'</span>}</p>
            <p>Launch Date : {new Date(mission?.launch_date_utc).toLocaleDateString()} </p>
            <p>Detail : {mission?.details}</p>
            <p>Rocket : <Link to={'/rocket/'+mission?.rocket?.rocket_id}><span>{mission?.rocket?.rocket_name}</span></Link></p>
            {/**<p>diameter : {rocket?.diameter?.meters} meters</p>*/}
            <br/>
            <br/>

       </div>
        <div className="descript col-lg-3 col-xs-12 ">
          <img src={mission?.links?.mission_patch_small} style={{width: '100%',borderRadius: '5px'}}/>
          </div>
      </div>
      </div>

    );
  }
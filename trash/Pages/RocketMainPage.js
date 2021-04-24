
import '../content.css'
import React from 'react';
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import rocket from '../asset/image/rocket.jpg'
import {
    Button,
    Paper,
  } from '@material-ui/core/';
import Carousel from 'react-material-ui-carousel'
import {Link} from "react-router-dom";
const RocketImage = [{
    id:1,
    url:"https://www.nasaspaceflight.com/wp-content/uploads/2017/12/BCK_4062-1.jpg",
    name : 'Falcon 1'
},
{
    id:2,
    url:"https://www.drkrok.com/wp-content/uploads/2019/05/SpaceX-Falcon-9-rocket.jpg",
    name : 'Falcon 9'
},
{
    id:3,
    url:"https://thestandard.co/wp-content/uploads/2018/02/NEWS-spaceX_cover_.jpg",
    name : 'Falcon Heavy' 
},
{
    id:4,
    url:"https://techcrunch.com/wp-content/uploads/2019/09/Starship-Mk1-Day.jpg?w=600",
    name : 'Starship'
}
]


const RenderImage = (props) =>{
    return (
        <Paper className='rocketImage' style={{backgroundImage: "url("+props.image+")"}}>
            <div className='paperText'>
                <h2>{RocketImage[props.index].name}</h2>
                <Link to={"/rocket/"+props.rocket.rocket_id} style={{ textDecoration: 'none'}}>
                <Button  variant="outlined" style={{color: 'white',borderColor: 'white',backgroundColor : 'rgba(255,255,255,0.2)'}}>
                        View Detail
                    </Button>
                </Link>
            </div>
        </Paper>
    )
}

export default function RocketMainpage() {
    const [rockets, setRockets] = useState([]);
    useEffect(() => {
      const fechRocket = async () =>{
        const response = await fetch("https://api.spacexdata.com/v3/rockets");
        const data = await response.json();
        setRockets(data);
      };
      fechRocket();
    }, []);

    return ( 
      <div>
        {rockets.map((rocket, index) => {
            return <RenderImage rocket={rocket} key={rocket.id} image={RocketImage.find(i => i.id == rocket.id).url} index={index}/>      
        })}
   </div>

    );
  }
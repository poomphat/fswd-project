import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button
} from '@material-ui/core/';
import {Link} from "react-router-dom";
import logo from '../asset/image/logo.png'
const path = window.location.pathname;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  buttonNav: {
    color: 'white',
    fontSize: '14px',
    textTransform: 'inherit',
    boxShadow: 'none',
    borderRadius: '10px',
  },
}));


export default function Header() {
  const classes = useStyles();
  const path = window.location.pathname;
  console.log(path)
  return (
    <div className={classes.root}>
        <nav class="navbar navbar-expand-lg">
              <div className='row'>     
            <Link to="/" style={{ textDecoration: 'none' }} className="">
              <Button className={classes.buttonNav} style={{border:"none",outline:"none"}}>
              <img src={logo} style={{width:'150px', marginLeft: '10px'}}></img>
              </Button>
            </Link>
            <div className=" col-6 row">
           
            <Link to="/rocket" style={{ textDecoration: 'none' }}>
              <Button variant={(path.includes('/rocket'))?'contained':""} className={classes.buttonNav} style={(path.includes('/rocket')) ? {border:"none",outline:"none",color: 'black'} : {border:"none",outline:"none"}}>
                Rocket
              </Button>
            </Link>
         
            <Link to="/launch" style={{ textDecoration: 'none' }} className="col-3">
              <Button variant={(path.includes('/launch'))?'contained':""} className={classes.buttonNav} style={(path.includes('/launch')) ? {border:"none",outline:"none",color: 'black'} : {border:"none",outline:"none"}}>
                Launch
              </Button>
            </Link></div></div>
        </nav>
    </div>
  );
}

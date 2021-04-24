import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Header from '../Pages/Header';
import Mainpage from '../Pages/MainPage'
import Launchpage from '../Pages/LaunchPage'
import Rocketpage from '../Pages/RocketPage'
import RocketMainpage from '../Pages/RocketMainPage'
import LaunchDetail from '../Pages/LaunchDetail'

export default function Yeeter (){
    return(
    <Router>     
        <Switch>
            <Route exact path='/'>
                <>
                <Header/>
                <Mainpage/>
                </>
            </Route>
            <Route exact path='/launch'>
                <>
                <Header/>
                <Launchpage/>
                </>
            </Route>
            <Route exact path='/rocket'>
                <>
                <Header/>
                <RocketMainpage/>
                </>
            </Route>
            <Route path='/rocket/:rocket_id'>
                <>
                <Header/>
                <Rocketpage/>
                </>
            </Route>
            <Route path='/launch/:flight_number'>
                <>
                <Header/>
                <LaunchDetail/>
                </>
            </Route>
        </Switch>
    </Router>
    )
}

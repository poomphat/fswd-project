
import '../content.css'
import React from 'react';
import { useEffect, useState, useCallback } from "react";
import { makeStyles } from '@material-ui/core/styles';
import rocket from '../asset/image/rocket.jpg'
import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
  } from '@material-ui/core/';
import {Link} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 100    ,
      backgroundColor: "#ffffff",
    },
    media: {
      height: 140,
    },
    selectBox:{
      marginTop:10,
      marginRight:20,
      width:120
    },
    formInline:{
      flexDirection:'row'
    }
    
  });

export default function Launchpage() {
  const [data, setData] = useState([[], []]);
  const [limit, ] = useState(6);
  const [offSet, setOffSet] = useState(0);
  const [year, ] = useState([2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]);
  const [hasMore, setHasMore] = useState(true);
  // update offset for fetch
  const incOffSet = useCallback(() =>{
    setOffSet(offSet + 6);
    return offSet+6;
  });
  //reset offSet 
  const resetOffset = useCallback( () =>{
    setOffSet(0);
  });
  //merge launch data
  const mergeLaunch = useCallback( (launchs, prev) =>{
    const merged = [...prev, ...launchs];
    return merged
  });
  //swap hasMore
  const swapHasMore = useCallback( () =>{
    setHasMore(!hasMore);
  });
  //for filter
  
  const [launchYearFilter, setlaunchYearFilter] = useState('');
  const [rocketFilter, setRocketFilter] = useState('');
  const [isSuccessFilter, setIsSuccessFilter] = useState(3); 
  const changeYear = useCallback((year) =>{
    setlaunchYearFilter(year)
  });
  const changeRocket =  useCallback((rocket)=>{
    setRocketFilter(rocket)
  });
  const changeSuccess =  useCallback((success)=>{
    setIsSuccessFilter(success)
  });

  // fetch data
  const fechData = useCallback(async (flag, offSetfilter) =>{
    const rocketName = rocketFilter.replace(" ", "+")
    const launchUrl = "https://api.spacexdata.com/v3/launches?limit="+limit+"&offset="+offSetfilter+((rocketName!='')?'&rocket_name='+rocketName:'')+((launchYearFilter!='')?'&launch_year='+launchYearFilter:'')+((isSuccessFilter!=3)?'&launch_success='+isSuccessFilter:'');
    if(flag == 'filter'){
      setOffSet(0);
      const launchUrl = "https://api.spacexdata.com/v3/launches?limit="+limit+"&offset="+offSetfilter+((rocketName!='')?'&rocket_name='+rocketName:'')+((launchYearFilter!='')?'&launch_year='+launchYearFilter:'')+((isSuccessFilter!=3)?'&launch_success='+isSuccessFilter:'');
      const response1 = await fetch("https://api.spacexdata.com/v3/rockets");
      const rockets = await response1.json();
      const response = await fetch(launchUrl);
      const launches = await response.json();
      const response2 = await fetch("https://api.spacexdata.com/v3/launches/latest");
      const latest = await response2.json();
    }
    const response1 = await fetch("https://api.spacexdata.com/v3/rockets");
    const rockets = await response1.json();
    const response = await fetch(launchUrl);
    const launches = await response.json();
    const response2 = await fetch("https://api.spacexdata.com/v3/launches/latest");
    const latest = await response2.json();
    
    if (launches.length == 0){
      swapHasMore();
    }
    let mLaunches = []
    if(flag == ''){
      mLaunches = await mergeLaunch(launches, data[1]);
    }
    else{
      mLaunches = await mergeLaunch(launches, []);
    }
    setData([rockets, mLaunches, latest]);
    
  });
  //fetch data at start 

  useEffect(() => {
    fechData('',offSet);
  }, []);

  //fetch data when change filter
  
  useEffect(() => {
    setHasMore(true);
    resetOffset();
    console.log('reseted')
    fechData('filter',0);

  }, [launchYearFilter, rocketFilter, isSuccessFilter]);
  /*
  useEffect(() => {
    resetOffset();
    fechData();
  });
  */
  
  
  //fetchMoreData for loading
  const fetchMoreData = useCallback(() =>{
    
    fechData('',incOffSet());
  });
  /*
  useEffect(() => {
    console.log('befsorecheck')
    console.log(offSet)
    if(offSet == 0){
      fechData('filter');
      console.log('filter')
    }else{
      fechData('');
      console.log('base')
    }
  }, [offSet])
  */

  const classes = useStyles();

  
  return ( 
    <div style={{width: '100vw'}} className=''>
      <div className="container" style={{justifyContent: 'center'}}>
        <div className="row">
        <div className="row col-12">
        <div className="TitleRocket col-lg-6 col-xs-10 ml-4 mr-4" style={{marginTop: '2vh',alignSelf: 'flex-end',fontSize: '4rem'}}> Launches</div>
        <div className="col-lg-5 col-xs-9 mb-3" style={{alignSelf: 'flex-end',}}>
        <div className="formEz ml-2 row">
          <FormControl className='col-lg-4 col-xs-11'>
          <TextField  id='launch-year' label="Launch year" onInput={(event) => {setlaunchYearFilter(event.target.value)}}/>
          </FormControl>
          <FormControl className='col-lg-4 col-xs-11'>
          <InputLabel labelId="rocket-label" className="ml-3">Rocket</InputLabel>
          <Select labelId="rocket-label" onChange={(event) => {setRocketFilter(event.target.value)}}>
            <MenuItem value={''}>None</MenuItem>
            {data[0]?.map((rocket, index) => {
              return <MenuItem value={rocket?.rocket_name}>{rocket?.rocket_name}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl className='col-lg-4 col-xs-11'>
          <InputLabel labelId="success-label" className="ml-3">Result</InputLabel>
          <Select labelId="success-label" onChange={(event) => {setIsSuccessFilter(event.target.value)}}>
            <MenuItem value={3}>None</MenuItem>
            <MenuItem value={true} >Success</MenuItem>
            <MenuItem value={false} >Failed</MenuItem>
          </Select>
        </FormControl>
      </div></div>
      <div className="col-12">
      <hr color="white"/></div>
  </div>
      {/* launch list */}
      <div className="col-12" style={{justifyContent: 'center', alignItems:'center'}}>
      
        <InfiniteScroll
          className=''
          style={{overflow:'hidden',}}
          dataLength={data[1].length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p style={{ textAlign: 'center' , color:'white', height: '10vh'}}>...Loading...</p>}
          endMessage={
            <p style={{ textAlign: 'center', color:'white', height: '10vh'}}>
              <b>U catched 'em all</b>
            </p>
          }
        > 
        <div className='row' style={{justifyContent: 'center', alignItems:'center'}}>
          {data[1]?.map((launch, index) => {
              return  <Link to={"/launch/"+launch?.flight_number}
                        className="col-sm-12 col-lg-5 mt-3 mb-2 p-4 mr-4 about launchCard"
                        style={(launch?.launch_success)?{borderLeft: '0.5rem solid rgba(48,290,88)',textDecoration: 'none'}:{borderLeft: '0.5rem solid rgba(255,69,58)',textDecoration: 'none'}}  
                        data-aos="zoom-in"
                        key={launch?.flight_number}>
                      <div>
                          <h2>{launch?.mission_name} - {launch?.launch_year}</h2>
                          <hr color="white"/>
                          <h5>Rocket : {launch?.rocket?.rocket_name}</h5>
                          {(launch?.launch_success)?(<h5>Result : <span className='text-success'>Success</span></h5>):(<h5> Result : <span className='text-danger'>Failed</span></h5>)}
                          <h5>Date : {new Date(launch?.launch_date_utc).toLocaleDateString()}</h5>
                      </div>
                      </Link>
            })}
            </div>
      </InfiniteScroll>
      </div>

      </div>
      </div>
    </div>
  );
}
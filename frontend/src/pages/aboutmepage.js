import './aboutmepage.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import { gql, useMutation,useQuery } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'

function AboutMe() {
   
    const { loading, user, logout: handleLogout } = useSession()
    console.log(user)
  return (
   
    <div className="bg">
        <Navbar/>
          <div className="container">
          <h2 className="Texttitle mt-5" data-aos="fade-right">About me</h2>
          <hr/>
          <div className="row">
                <div className="col-lg-6 col-xs-12 mt-2">
                    <div className="col-12 bg-light text-dark box" data-aos="fade-up" data-aos-delay="50">
                        <h3 className="Texttitle mt-2">User info</h3>
                        <hr className="bg-secondary"></hr>
                        <h5 className="mt-2">Username : {user?.username}</h5>
                        <h5 className="mt-2">Name : {user?.name}</h5>
                    </div>
                </div>
                <div className="col-lg-6 col-xs-12 mt-2">
                    <div className="col-12 bg-light text-dark box" data-aos="fade-up" data-aos-delay="100">
                        <h3 className="Texttitle mt-2">Address</h3>
                        <hr className="bg-secondary"></hr>
                        <h5 className="mt-5">address : </h5>
                        <h5 className="mt-2">subDistrict :</h5>
                        <h5 className="mt-5">district :</h5>
                        <h5 className="mt-2">country :</h5>
                        <h5 className="mt-5">zipcode :</h5>
                        <h5 className="mt-2">tel :</h5>
                    </div>
                </div>
          </div>
          </div>
            
    </div>
    
  );  
}

export default AboutMe;
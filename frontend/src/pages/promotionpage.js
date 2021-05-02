import './promotionpage.css';
import {useState} from 'react'
import Navbar from '../component/Navbar'
import {useQuery } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PromotionCard from '../component/promotionCard'

function PromotionPage() {
    const { user , loading:userLoading } = useSession()
    const { data } = useQuery(FIND_ALL_PROMOTIONS, { fetchPolicy: 'network-only' },)
  return (
   
    <div className="bg">
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">Promotion</h2>
                {user?.role === "Admin"? 
               <>
               <Link to="/admin/promotion/create">
              <button class="btn btn-light">Add Promotion</button>
            </Link>
               </>
               :<></>}
            
                <hr data-aos="fade-right"></hr>
                <div className="row">
                {data?.promotions?.map((item, i) => {
                    return (
                      <div className="col-lg-6 col-xs-12 mt-4">
                          <PromotionCard data={item} index={i}/>
                      </div>);
                    })}
                </div>
            </div>  
    </div>
    
  );  
}

export default PromotionPage;
import './promotionpage.css';
import {useState} from 'react'
import Navbar from '../component/Navbar'
import {useQuery } from '@apollo/client'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import PromotionCard from '../component/promotionCard'

function PromotionPage() {
    const { data } = useQuery(FIND_ALL_PROMOTIONS, { fetchPolicy: 'network-only' },)
  return (
   
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">Promotion</h2>
                <hr data-aos="fade-right"></hr>
                <div className="row">
                {data?.promotions?.map((item, i) => {
                    return (
                      <div className="col-6 mt-4">
                          <PromotionCard data={item} index={i}/>
                      </div>);
                    })}
                </div>
            </div>  
    </div>
    
  );  
}

export default PromotionPage;
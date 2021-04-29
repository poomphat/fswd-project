import './promotionpage.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import walking from '../asset/walking.png'
import running from '../asset/running.png'
import training from '../asset/training.png'
import { gql, useQuery } from '@apollo/client'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import PromotionCard from '../component/promotionCard'

function PromotionPage() {
    const { loading, data } = useQuery(FIND_ALL_PROMOTIONS)
    const [promotions, setPromotions] = useState()
  return (
   
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">Promotion</h2>
                <hr data-aos="fade-right"></hr>
                <div className="row">
                {data?.promotions?.map((item, i) => {
                    return (<PromotionCard data={item} index={i}/>);
                    })}
                </div>
            </div>  
    </div>
    
  );  
}

export default PromotionPage;
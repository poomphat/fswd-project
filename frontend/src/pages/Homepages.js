import './Homepages.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import walking from '../asset/walking.png'
import running from '../asset/running.png'
import training from '../asset/training.png'
import notfound from '../asset/notfound.jpg'
import { gql, useMutation,useQuery } from '@apollo/client'
import { FIND_MANY_MUTATION } from '../graphql/findProductMutation'
import { FIND_ALL_PROMOTIONS } from '../graphql/findPromotionQuery'
import PromotionCard from '../component/promotionCard'

function Homepages() {
    const [findManyProduct, {loading}] = useMutation(FIND_MANY_MUTATION)
    const [product, setProduct] = useState()
    const { load, data } = useQuery(FIND_ALL_PROMOTIONS)
    const [promotions, setPromotions] = useState()

    const setProductHandler = useCallback( async (data) =>{
        await setProduct(data);
      });

    useEffect(()=>{
        findManyProduct().then(result =>{
            setProductHandler(result.data)
        })
    }, [])


    
  return (
   
    <div className="bg">
        <Navbar/>
          <div className="content container">
            <div className="row contentfirst">
                <div className="col-lg-6 col-xs-12 contenttext">
                    <div className="sidecontent" data-aos="fade-right">
                        <h2 className="Topic">New release</h2>
                        <hr color="bg-secondary"/>
                        <p className="text-secondary textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                          <button class="btn btn-secondary" type="button" id="button-addon2">Learn more</button>
                    </div>
                </div>
                <div className="col-lg-6 col-xs-12" data-aos="fade-left">
                    <img src={shoe} className="picshoe"></img>
                </div>
              </div>
        </div>
        <div className="container-fluid contentsecond">
          <div className="container">
              <h2 className="">Top product</h2>
              <hr/>
              
              <div className="productlist pb-4">

              {product?.findManyProduct?.map((item, i) => {
                    return (
                        <div class="card text-dark carditem bg-light ml-3" data-aos="zoom-in">
                            <img class="card-img-top imgs" src={(item?.imgUrl==null)?notfound:item?.imgUrl} alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title TopicSecond">{item?.productName}</h5>
                                <p class="card-text">{item?.productDesc}</p>   
                                    
                            </div>
                            <div class="card-footer text-dark flexbe ">
                                
                                <h6 className="boldhead mb-0 totaltext mt-2 ">{item?.price} USD</h6>
                                <button class="btn btn-dark col mt-2">Buy</button>
                                    
                                </div>
                        </div>
                    );
                    })}

          </div>
          </div>
          <div className="container mt-4">
              <h2 className="">Top promotion</h2>
              <hr/>
              
              <div className="productlist row pb-4">

              {data?.promotions?.map((item, i) => {
                    return (<PromotionCard data={item} index={i}/>);
                    })}

          </div>
          </div>
          <div className="row center">
        
                  <div className="boxitem col-lg-2 col-xs-11 bg-dark text-light" data-aos="zoom-out-up">
                      <h4 className="TopicSecond">Walking</h4>
                      <hr/>
                      <img src={walking} className="picshoe"></img>
                      <p className="text-light textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                  </div>
                  <div className="boxitem col-lg-2 col-xs-11 bg-dark text-light" data-aos="zoom-out-up">
                      <h4 className="TopicSecond">Running</h4>
                      <hr/>
                      <img src={running} className="picshoe"></img>
                      <p className="text-light textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                  </div>
                  <div className="boxitem col-lg-2 col-xs-11 bg-dark text-light" data-aos="zoom-out-up">
                      <h4 className="TopicSecond">Training</h4>
                      <hr/>
                      <img src={training} className="picshoe"></img>
                      <p className="text-light textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                  </div>
              </div>
        
        </div>
        <div className="footer container-fluid bg-dark">
          <div className="container">
              <h4 className="configstyle">Contact us</h4>
              <h5 className="configstyle">Email: xxxxxx@gmail.com</h5>
              <h5 className="configstyle">Tel: 080-000-0000</h5>
              <h5 className="configstyle">Address: 111/898 chicago 99888</h5>
          </div>
        </div>
    </div>
    
  );  
}

export default Homepages;
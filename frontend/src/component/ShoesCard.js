import notfound from '../asset/notfound.jpg'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const ShoesCard = (props) =>{
    const item = props.item;
    return(
    <div class="col-lg-4 col-sm-12 mb-4">
                        <div class="card bg-light text-dark shadow shoecard" data-aos="zoom-out" data-aos-mirror="false">
                            <img class="card-img-top imgs" src={(item?.imgUrl==null)?notfound:item?.imgUrl} alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">{item?.productName}</h5>
                                <p class="card-text">{item?.productDesc}</p>   
                            </div>
                            <div class="card-footer text-dark flexbe ">
                                
                                        <h6 className="boldhead mb-0 totaltext mt-2 ml-1">{item?.price} USD</h6>
                                    <div className="row mt-2">
                                    
                                    <div className="col-6">
                                    <Link to="/productdetail/1">
                                        <a href="#" class="btn btn-light col">more</a>
                                    </Link>
                                    </div>
                                    <div className="col-6">
                                        <a href="#" class="btn btn-dark col ">Add</a>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
    )
}

export default ShoesCard;
import './cartpages.css';
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import walking from '../asset/walking.png'
import running from '../asset/running.png'
import training from '../asset/training.png'
const data = [
    {
        name : 'Nike',
        description : 'Sprot Shoe',
        amount : 2
    },
    {
        name : 'Nike2',
        description : 'Sprot Shoe',
        amount : 2
    },
    {
        name : 'Nike3',
        description : 'Sprot Shoe',
        amount : 9
    },
    {
        name : 'Nike4',
        description : 'Sprot Shoe',
        amount : 9
    },
]
function Homepages() {
  return (
   
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-up">Cart</h2>
                <hr data-aos="fade-up"></hr>
                <div className="row">
                <div className="col-8">
                {data.map((item, i) => {
                    return (
                    <div class="col-12 mt-4 row cartlist bg-light" data-aos="fade-up" data-aos-delay={200*(i+1)}>
                    <img src={shoe} className="picshoes col-2"></img>
                    <div className="col-6">
                    <h4 class="card-title control">{item.name}
                    <hr></hr></h4>
                        amount: {item.amount}
                    </div>
                        <div className="col-2">
                                <a href="#" class="btn btn-primary col control"><h4 className="control">+</h4></a>
                        </div>
                        <div className="col-2">
                                <a href="#" class="btn btn-danger col control"><h4 className="control">-</h4></a>
                            </div>
                        </div>
                    );
                    })}
                </div>
                    <div className="col-3  mt-4 ">
                        <div className="bg-light Totallist" data-aos="fade-up" data-aos-delay={150}>
                            <h4>Total : 400 USD</h4>
                            <hr/>
                            <a href="#" class="btn btn-warning col control"><h5 className="control">Check out</h5></a>
                            <a href="#" class="btn btn-secondary col control mt-2"><h5 className="control">cancel</h5></a>
                        </div>
                    </div>
                </div>
            </div>  
    </div>
    
  );  
}

export default Homepages;
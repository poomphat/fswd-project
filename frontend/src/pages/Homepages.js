import './Homepages.css';
import Navbar from '../component/Navbar'
import shoe from '../asset/shoe/shoe.png'
import walking from '../asset/walking.png'
import running from '../asset/running.png'
import training from '../asset/training.png'
function Homepages() {
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
              <h2 className="TopicSecond">Our product</h2>
      
          </div>
          <div className="row center">
        
                  <div className="boxitem col-lg-2 col-xs-11" data-aos="zoom-out-up">
                      <h4 className="TopicSecond">Walking</h4>
                      <hr/>
                      <img src={walking} className="picshoe"></img>
                      <p className="text-secondary textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                  </div>
                  <div className="boxitem col-lg-2 col-xs-11" data-aos="zoom-out-up">
                      <h4 className="TopicSecond">Running</h4>
                      <hr/>
                      <img src={running} className="picshoe"></img>
                      <p className="text-secondary textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                  </div>
                  <div className="boxitem col-lg-2 col-xs-11" data-aos="zoom-out-up">
                      <h4 className="TopicSecond">Training</h4>
                      <hr/>
                      <img src={training} className="picshoe"></img>
                      <p className="text-secondary textdescript">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                  </div>
              </div>
        
        </div>
        <div className="footer container-fluid">
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
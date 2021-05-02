import './aboutmepage.css';
import {useState, useMemo, useEffect} from 'react'
import Navbar from '../component/Navbar'
import { useLazyQuery } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'
import { FILTER_CUSTOMER } from '../graphql/findCustomerQuery'


function AboutMe() {
   
    const { loading, user, logout: handleLogout } = useSession()
    const [name ,setName] = useState(null)
    const [address, setAddress] = useState(null)
    const [district, setDistrict] = useState(null)
    const [subDistrict, setSubDistrict] = useState(null)
    const [country, setCountry] = useState(null)
    const [zipCode, setZipCode] = useState(null)
    const [province, setProvince] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [customerAddress, setCustomerAddress] = useState(null)
    const [filterCustomer, {data:customerData, loading:customerLoading}] = useLazyQuery(FILTER_CUSTOMER , { fetchPolicy: 'network-only' })

    useMemo( () => {
      if(!loading && user){
        filterCustomer({variables:{userId:user?._id}})
      }
    },[user, loading])

    useMemo(() => {
      if(!customerLoading && customerData){
        console.log(customerData)
        const customer = customerData?.customer?.address
        setName(user?.name)
        setAddress(customer?.address)
        setDistrict(customer?.district)
        setSubDistrict(customer?.subDistrict)
        setCountry(customer?.country)
        setZipCode(customer?.zipcode)
        setProvince(customer?.province)
        setPhoneNumber(customer?.tel)
        setCustomerAddress(customer)
      }
    }, [customerLoading])

    const AboutMe = () =>{
      return(
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
                    <p>{customerAddress?.address+" "+customerAddress?.subDistrict
                    +" "+customerAddress?.district+" "+customerAddress?.province
                    +", "+customerAddress?.country+" "+customerAddress?.zipcode}
                    </p>
                    <h5 className="mt-2">{customerAddress?.tel}</h5>
                </div>
            </div>
      </div>
      </div>
      )
    }
    const AboutMeEdit = () =>{
      return(
        <div className="container">
        <h2 className="Texttitle mt-5" data-aos="fade-right">About me</h2>
        <hr/>
        <div className="row">
              <div className="col-lg-6 col-xs-12 mt-2">
                  <div className="col-12 bg-light text-dark box" data-aos="fade-up" data-aos-delay="50">
                      <h3 className="Texttitle mt-2">User info</h3>
                      <hr className="bg-secondary"></hr>
                      <h5 className="mt-2">Username : {name}</h5>
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">Name</label>
                        <input type="text" class="form-control bg-light" placeholder="Name" id="address" required/> 
                      </div>
                  </div>
              </div>
              <div className="col-lg-6 col-xs-12 mt-2">
                  <div className="col-12 bg-light text-dark box" data-aos="fade-up" data-aos-delay="100">
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">Address</label>
                        <input type="text" class="form-control bg-light" placeholder="Discount" id="address" required/> 
                      </div>
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">Sub district</label>
                        <input type="text" class="form-control bg-light" placeholder="Sub district" id="address" required/> 
                      </div>
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">District</label>
                        <input type="text" class="form-control bg-light" placeholder="District" id="address" required/> 
                      </div>
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">Country</label>
                        <input type="text" class="form-control bg-light" placeholder="Country" id="address" required/> 
                      </div>
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">Zipcode</label>
                        <input type="text" class="form-control bg-light" placeholder="Zipcode" id="address" required/> 
                      </div>
                      <div class="form-group mt-2">
                        <label class="form-label" for="address">Phone Number</label>
                        <input type="text" class="form-control bg-light" placeholder="Phone Number" id="address" required/> 
                      </div>
                  </div>
              </div>
        </div>
        </div>
      )
    }
  return (
   
    <div className="bg">
        <Navbar/>
        <AboutMeEdit/>
        <AboutMe/>
    </div>
    
  );  
}

export default AboutMe;
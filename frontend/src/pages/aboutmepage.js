import './aboutmepage.css';
import {useState, useMemo, useCallback,useEffect} from 'react'
import Navbar from '../component/Navbar'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'
import { FILTER_CUSTOMER } from '../graphql/findCustomerQuery'
import { UPDATE_CUSTOMER_BY_ID } from '../graphql/updateCustomerById'
import { useHistory } from 'react-router-dom'


function AboutMe() {
   
    const { loading, user, logout: handleLogout } = useSession()
    const [customerAddress, setCustomerAddress] = useState(null)
    const [updateCustomer, {loading:updateLoading}] = useMutation(UPDATE_CUSTOMER_BY_ID)
    const [filterCustomer, {data:customerData, loading:customerLoading}] = useLazyQuery(FILTER_CUSTOMER , { fetchPolicy: 'network-only' })
    const history = useHistory()
    const goToEdit = useCallback(
        () => {
          history.push('/aboutme/edit')
        },
        [history],
      )
    
    useEffect( () => {
      if(!loading && user){
        filterCustomer({variables:{userId:user?._id}})
      }
    },[user, loading])

    useMemo(() => {
      if(!customerLoading && customerData){
        setCustomerAddress(customerData?.customer?.address)
      }
    }, [customerLoading])
    

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
                <br/>
                <button className="btn btn-warning mr-1" data-aos="fade-up" onClick={() => goToEdit()}>Edit</button>
            </div>
            <div className="col-lg-6 col-xs-12 mt-2">
                <div className="col-12 bg-light text-dark box" data-aos="fade-up" data-aos-delay="100">
                    <h3 className="Texttitle mt-2">Address</h3>
                    <hr/>
                    <p>{customerAddress?.address+" "+customerAddress?.subDistrict
                    +" "+customerAddress?.district+" "+customerAddress?.province
                    +", "+customerAddress?.country+" "+customerAddress?.zipcode}
                    </p>
                    <p className="mt-2">{customerAddress?.tel}</p>
                    <hr/>
                </div>
                <br/>
            </div>
      </div>
      </div>
    </div> 
  );  
}

export default AboutMe;
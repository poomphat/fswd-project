import './aboutmepage.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import { gql, useMutation,useQuery } from '@apollo/client'
import { useSession } from '../context/Sessioncontext'
import { CREATE_PRODUCT_IMG } from '../graphql/createproductwithimg'
function Order() {
    const [Create, {loading}] = useMutation(CREATE_PRODUCT_IMG)
    const {user, logout: handleLogout } = useSession()  
    const [img, setImg] = useState(null)

    const onUploadImg = () => {
       console.log(img)
       Create({ variables : { imgUrl : img}})
    }
    return (
  
    <div className="bg">
        <Navbar/>
          <div className="container">
          <h2 className="Texttitle mt-5" data-aos="fade-right">Order</h2>
          <hr/>
          
          <form enctype="multipart/form-data">
            <div class="form-group">
                <label for="exampleFormControlFile1">Example file input</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1" 
                  onChange={(event) => {setImg(event.target.files[0])}}/>
            </div>
            <button class="btn btn-light" type="button" onClick={onUploadImg}>Submit</button>
        </form>
        </div>
    </div>
    
  );  
}

export default Order;
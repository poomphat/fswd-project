import './product.css';
import {useState, useEffect, useCallback} from 'react'
import Navbar from '../component/Navbar'
import { gql, useMutation } from '@apollo/client'
import { FIND_MANY_MUTATION } from '../graphql/findProductMutation'
import { FILTER_GENDER_PRODUCT } from '../graphql/filterGenderProductsMutation'
import { COUNT_PRODUCT_MUTAION } from '../graphql/countProduct'
import ShoesCard from '../component/ShoesCard'
import Pagination from '@material-ui/lab/Pagination';

function Product() {
    const [page, setPage] = useState(1);
    const [findManyProduct, {loading}] = useMutation(FIND_MANY_MUTATION,{variables :{ limit: 6,skip: (page*6)-6 }})
    const [dataCount] = useMutation(COUNT_PRODUCT_MUTAION)
    const [color,setcolor] = useState([1,0,0])
    const [filterGenderProduct] = useMutation(FILTER_GENDER_PRODUCT)
    const [product, setProduct] = useState()
    const [countPages, setcountPages] = useState(0)
    const handleChange = async (event, value) => {
        setPage(value);
        console.log(countPages.countProduct)
      };
    useEffect(()=>{
        allProduct()
    },[page])

    const setProductHandler = useCallback( async (data) =>{
        setProduct(data.findManyProduct);
      });
    const filterProduct = useCallback( async (gender) =>{
        await filterGenderProduct({ variables: { genderType: gender }} ).then(result =>{
            setProductHandler(result.data)
            setcountPages(result.data.findManyProduct.length)
        })
      });
    const allProduct = useCallback( async () =>{
        await findManyProduct().then(result =>{
            setProductHandler(result.data)
            Countdata()
        })
        
      });
      const Countdata = useCallback( async () =>{
        await dataCount().then(result =>{
            setcountPages(result.data)
        })
        
      });
    useEffect(()=>{
        Countdata()
        allProduct()
    }, [])
    const searchandle = ((e) =>{
        if(e.target.value === ''){
            allProduct()
        }
        const list = []
        console.log(product)
        product.map((item,i) => {
            if(item.productName.includes(e.target.value) ){
            list.push(item)
        }
        setProduct(list)
        })
        
        
    })
    const Rendershoe = (()=>{
        if(product === []){
            return <h5>We dont have it</h5>
        }else{
            return (
            <>
             {product?.map((item, i) => {
            return (<ShoesCard item={item}/>);  
            })}
            </>
            )
           
        }
      
    })
  return (
   
    <div className="bg">
        <Navbar/>
            <div className="container mt-5">
                <h2 className="Texttitle" data-aos="fade-right">Sport Shoes</h2>
                <h5 className="alignend mr-5">Page: {page}</h5>
                <div className="flexright">
                    <Pagination count={Math.round((countPages.countProduct/6))} page={page} onChange={handleChange}/>
                </div>
                <hr data-aos="fade-right"></hr>
                <div className="row">
                <div className="col-lg-3 col-sm-12">
                <form class="form-inline mb-3">
                    <div class="input-group col-12 pr-0 pl-0">
                        <input type="text" class="form-control bg-light" placeholder="Search" onChange={searchandle}/>
                            <div class="input-group-append">
                                <button class="btn btn-dark" type="button" id="button-addon2">Search</button>
                            </div>
                    </div>
                </form>
                    <p  className={color[0] == 1 ? 'text-light filter' : 'text-dark filter'}
                        onClick={()=>{allProduct();setcolor([1,0,0])}}
                        style={{backgroundColor:  color[0] == 1 ? '#292b2c' : 'rgba(0,0,0,0)'}}>All</p>

                    <p  className={color[1] == 1 ? 'text-light filter' : 'text-dark filter'}
                        onClick={()=>{filterProduct('man');setcolor([0,1,0])}} 
                        style={{backgroundColor:  color[1] == 1 ? '#292b2c' : 'rgba(0,0,0,0)'}}>Men</p>

                    <p  className={color[2] == 1 ? 'text-light filter' : 'text-dark filter'} 
                        onClick={()=>{filterProduct('woman');setcolor([0,0,1])}} 
                        style={{backgroundColor:  color[2] == 1 ? '#292b2c' : 'rgba(0,0,0,0)'}}>Women</p>
                </div>
                <div className="row col-lg-9 col-xs-12 mb-5">
                    <div className="col-lg-12 row">
                    <Rendershoe/>
                        </div>
                    
                    <div className="col-lg-12 flexright">
                        <Pagination count={Math.round((countPages.countProduct/6))} page={page} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>  
    </div>
    
  );  
}

export default Product;
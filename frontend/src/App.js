import './App.css';
import Homepages from '../src/pages/Homepages'
import Login from '../src/pages/Loginpages'
import Product from '../src/pages/product'
import Cart from '../src/pages/cartpages'
import Productdetail from '../src/pages/detailpages'
import Promotion from '../src/pages/promotionpage'
import Register from '../src/pages/registerPage'
import AboutMe from '../src/pages/aboutmepage'
import Order from '../src/pages/orderpage'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './component/Navbar'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from '../src/route/PrivateRoute'
AOS.init();
function App() {
  return (

    <>
    
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Prompt&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>   
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link>
        <Switch>
            <Route exact path='/'>
                <>
                <Homepages/>
                </>
            </Route>
            <Route exact path='/login'>
                <>
                <Login/>
                </>
            </Route>
            <Route exact path='/Register'>
                <>
                <Register/>
                </>
            </Route>
            <Route exact path='/product'>
                <>
                <Product/>
                </>
            </Route>
            <PrivateRoute exact path='/aboutme'><AboutMe/></PrivateRoute>
            <PrivateRoute exact path='/cart'><Cart/></PrivateRoute>
            <PrivateRoute exact path='/customer/order'><Order/></PrivateRoute>
            <Route exact path='/promotion'>
                <>
                <Promotion/>
                </>
            </Route>
            <Route exact path='/productdetail/:string'>
                <>
                <Productdetail/>
                </>
            </Route>
        </Switch>  

    </>
    
  );
}

export default App;

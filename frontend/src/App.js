import "./App.css"
import Homepages from "../src/pages/Homepages"
import Login from "../src/pages/Loginpages"
import Product from "../src/pages/product"
import Cart from "../src/pages/cartpages"
import Productdetail from "../src/pages/detailpages"
import Promotion from "../src/pages/promotionpage"
import Register from "../src/pages/registerPage"
import AboutMe from "../src/pages/aboutmepage"
import OrderPage from "../src/pages/orderpage"
import AddProduct from "../src/pages/Addproduct"
import PaymentPage from "../src/pages/paymentPage"
import Dashboard from "../src/pages/dashboardpage"
import CheckOutPage from "../src/pages/checkOutPage"
import OrderDetails from "../src/pages/orderdetail"
import AddPromotion from "../src/pages/addpromotion"
import EditPromotion from "../src/pages/editPromotion"
import EditProduct from "../src/pages/editproduct"
import AllOrder from "../src/pages/allorderpage"
import NotFound from "../src/pages/notfound"
import AboutMeEdit from "../src/pages/aboutMeEdit"
import OrderDetailAdmin from "../src/pages/adminOrderDetail"
import AOS from "aos"
import "aos/dist/aos.css"
import "antd/dist/antd.css"
import Navbar from "./component/Navbar"
import Admin from "./component/sidebar"
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom"
import React, { Suspense } from "react"
import PrivateRoute from "../src/route/PrivateRoute"
import AdminRoute from "../src/route/AdminRoute"
import { useSession } from "./context/Sessioncontext"
AOS.init()
function App() {
    const { user, loading: userLoading } = useSession()
    const adminCheck = (role) => {
        return role === "Admin" ? true : <Redirect to={{ pathname: "/" }} />
    }
    return (
        <>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Prompt&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            ></link>
            <script
                src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossOrigin="anonymous"
            ></script>
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossOrigin="anonymous"
            ></script>
            <script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossOrigin="anonymous"
            ></script>
            <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
            ></link>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/">
                        <>
                            <Homepages />
                        </>
                    </Route>
                    <Route exact path="/login">
                        <>
                            <Login />
                        </>
                    </Route>
                    <Route exact path="/Register">
                        <>
                            <Register />
                        </>
                    </Route>
                    <Route exact path="/product">
                        <>
                            <Navbar />
                            <Product />
                        </>
                    </Route>
                    <Route exact path="/promotion">
                        <>
                            <Navbar />
                            <Promotion />
                        </>
                    </Route>
                    <Route exact path="/product/:string">
                        <>
                            <Productdetail />
                        </>
                    </Route>
                    <PrivateRoute exact path="/aboutme">
                        <AboutMe />
                    </PrivateRoute>
                    <PrivateRoute exact path="/aboutme/edit">
                        <Navbar />
                        <AboutMeEdit />
                    </PrivateRoute>
                    <PrivateRoute exact path="/cart">
                        <Cart />
                    </PrivateRoute>
                    <PrivateRoute exact path="/customer/order">
                        <OrderPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/payment">
                        <PaymentPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/checkout">
                        <CheckOutPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/customer/order/:string">
                        <Navbar />
                        <OrderDetails />
                    </PrivateRoute>
                    <AdminRoute exact path="/admin/dashboard">
                        {adminCheck(user?.role)}
                        <Dashboard />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/product">
                        {adminCheck(user?.role)}
                        <Admin />
                        <Product />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/promotion">
                        {adminCheck(user?.role)}
                        <Admin />
                        <Promotion />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/product/create">
                        {adminCheck(user?.role)}
                        <AddProduct />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/promotion/create">
                        {adminCheck(user?.role)}
                        <AddPromotion />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/product/:string">
                        {adminCheck(user?.role)}
                        <EditProduct />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/promotion/:string">
                        {adminCheck(user?.role)}
                        <EditPromotion />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/order">
                        {adminCheck(user?.role)}
                        <Admin />
                        <AllOrder />
                    </AdminRoute>
                    <AdminRoute exact path="/admin/order/:string">
                        {adminCheck(user?.role)}
                        <Admin />
                        <OrderDetailAdmin />
                    </AdminRoute>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </>
    )
}

export default App

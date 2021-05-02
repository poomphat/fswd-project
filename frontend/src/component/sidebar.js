import "./sidebar.css"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import { ME_QUERY } from "../graphql/meQuery"
import { useSession } from "../context/Sessioncontext"
function Adminnav() {
    return (
        <>
            <Navbar bg="" expand="lg" className="container">
                <Link to="/admin/dashboard">
                    <a class="navbar-brand Navmain text-dark">Dashboard</a>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link to="/admin/promotion">
                                <a class="nav-link Navchild">Promotion</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/admin/product">
                                <a class="nav-link Navchild">Product</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/admin/order">
                                <a class="nav-link Navchild">Order</a>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/">
                        <button class="text-dark btn btn-light ">
                            Go to Customer site
                        </button>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Adminnav

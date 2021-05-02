import "./detailpages.css"
import Navbar from "../component/Navbar"
import { useQuery } from "@apollo/client"
import OrderCard from "../component/OrderCard"
import { BrowserRouter as Router, useParams } from "react-router-dom"

import { FIND_ORDER_BY_ID } from "../graphql/findOrderById"

function Detailsproduct() {
    const name = useParams()
    const { data: items } = useQuery(FIND_ORDER_BY_ID, {
        variables: { _id: name.string },
    })
    const item = items?.orders[0]
    console.log(item)
    return (
        <div className="bg">
            <div className="container">
                <h2 className="Texttitle mt-5" data-aos="fade-right">
                    Order : {item?._id}{" "}
                </h2>
                <hr />
                <OrderCard item={item} />
            </div>
        </div>
    )
}

export default Detailsproduct

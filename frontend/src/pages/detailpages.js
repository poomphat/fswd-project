import "./detailpages.css"
import { useState, useEffect, useCallback, useMemo } from "react"
import Navbar from "../component/Navbar"
import notfound from "../asset/notfound.jpg"
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { FIND_PRODUCT_QUERY } from "../graphql/findProductQuery"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom"
import PromotionCard from "../component/promotionCard"
import { LoadingOutlined } from "@ant-design/icons"
import { CREATE_PRODUCT_CART_MUTATION } from "../graphql/createProductCartMutation"
import { FIND_CART_QUERY } from "../graphql/findCartQuery"
import { updateProductCartHandler } from "../component/updateCartHandler"
import { Spin, Alert } from "antd"
import { useSession } from "../context/Sessioncontext"

function Detailsproduct() {
    const name = useParams()
    const [userid, setuserid] = useState("")
    const [quantity, setQuantity] = useState(1)
    const { user, loading: userLoading } = useSession()
    const {
        data: dataProduct,
        loading: loadingProduct,
    } = useQuery(FIND_PRODUCT_QUERY, { variables: { id: name.string } })
    const [createProductCart] = useMutation(CREATE_PRODUCT_CART_MUTATION)
    const [getCart, { loading, data: datacart }] = useLazyQuery(
        FIND_CART_QUERY,
        {
            fetchPolicy: "network-only",
        }
    )
    //console.log(user?._id)
    useMemo(() => {
        setuserid(user?._id)
        getCart({
            variables: { Id: user?._id },
        })
    }, [user, userLoading])
    const Addbutton = () => {
        const productCartData = {
            productId: dataProduct?.product?._id,
            cartId: datacart?.cart?._id,
            products: datacart?.cart?.products,
            quantity: parseFloat(quantity),
            createProductCart: createProductCart,
        }
        return (
            <button
                class="btn btn-dark mt-2"
                onClick={() => {
                    console.log(dataProduct.product._id)
                    getCart({
                        variables: { Id: user?._id },
                    })
                    updateProductCartHandler(productCartData)
                }}
            >
                Buy
            </button>
        )
    }
    return (
        <div className="bghaft">
            <Navbar />
            <div className="container mt-5">
                <h2
                    className="textbold"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {dataProduct?.product?.productName}
                </h2>
                <div className="row">
                    <div
                        className="col-lg-4 col-sm-12"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <img
                            src={
                                dataProduct?.product?.imgUrl == null
                                    ? notfound
                                    : dataProduct?.product?.imgUrl
                            }
                            className="imgdetail"
                        ></img>
                    </div>
                    <div
                        className="col-lg-8 col-sm-12 flexend"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="row flexbetween">
                            <div className="mt-2 ml-3">
                                Description :{" "}
                                {dataProduct?.product?.productDesc}
                            </div>{" "}
                            <button class="btn btn-danger mt-2 mr-3">
                                Delete
                            </button>
                        </div>
                        <h2 className="textbold">
                            Price : {dataProduct?.product?.price} USD
                        </h2>
                        <h4 className="textbold">
                            Stock : {dataProduct?.product?.hasStock?.quantity}
                        </h4>
                        <input
                            type="number"
                            class="form-control bg-light col-6"
                            min="0"
                            max="9999"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity of product"
                            required
                        />
                        <Addbutton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detailsproduct

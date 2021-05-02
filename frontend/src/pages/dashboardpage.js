import "./dashboard.css"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import notfound from "../asset/notfound.jpg"
import Adminnav from "../component/sidebar"
import { FIND_MANY_MUTATION } from "../graphql/findProductMutation"
import { useMutation, useQuery } from "@apollo/client"
import ShoesCard from "../component/ShoesCard"

import Pagination from "@material-ui/lab/Pagination"
import OrderCard from "../component/OrderCard"
import { COUNT_PRODUCT_MUTAION } from "../graphql/countProduct"
import { COUNT_PROMOTION } from "../graphql/countPromotion"
import { FIND_LATEST_ORDER } from "../graphql/findLatestOrder"
import { Statistic, Row, Col, Button } from "antd"
import { FIND_MANY_MUTATION_HOMEPAGE } from "../graphql/findproductHomepage"
function Dashboard() {
    const [countProduct, setCountProduct] = useState(0)
    const [countPages, setcountPages] = useState(0)
    const [page, setPage] = useState(1)
    const [countPromotion, setCountPromotion] = useState(0)
    const [findManyProduct, { loading }] = useMutation(FIND_MANY_MUTATION, {
        variables: { limit: 6, skip: page * 6 - 6 },
    })
    const [product, setProduct] = useState()
    const handleChange = async (event, value) => {
        setPage(value)
        console.log(countPages.countProduct)
    }
    const item = ""
    const [dataCount] = useMutation(COUNT_PRODUCT_MUTAION)
    const [dataCountPromotion] = useMutation(COUNT_PROMOTION)
    const { data: order, loadingorder } = useQuery(FIND_LATEST_ORDER, {
        fetchPolicy: "network-only",
    })

    useEffect(() => {
        allProduct()
    }, [page])

    const setProductHandler = useCallback(async (data) => {
        setProduct(data.findManyProduct)
    })
    const allProduct = useCallback(async () => {
        await findManyProduct().then((result) => {
            setProductHandler(result.data)
            Countdata()
        })
    })
    const Countdata = useCallback(async () => {
        await dataCount().then((result) => {
            setcountPages(result.data)
        })
    })
    useEffect(async () => {
        await dataCount().then((result) => {
            setCountProduct(result.data)
        })
        await dataCountPromotion().then((result) => {
            setCountPromotion(result.data)
        })
        Countdata()
        allProduct()
    }, [])
    const Rendershoe = () => {
        console.log(product)
        if (product === []) {
            return <h5>We dont have it</h5>
        } else {
            return (
                <>
                    {product?.map((item, i) => {
                        return (
                            <div class="col-lg-4 col-xs-4 mb-3 ">
                                <div class="card bg-light text-dark shadow shoecard">
                                    <img
                                        class="card-img-top imgs"
                                        src={
                                            item?.imgUrl == null ||
                                            !item?.imgUrl
                                                ? notfound
                                                : item?.imgUrl
                                        }
                                        alt="Card image cap"
                                        crossOrigin="anonymous"
                                    />
                                    <div class="card-body">
                                        <h3 class="card-title">
                                            {item?.productName}
                                        </h3>
                                    </div>
                                    <div class="card-footer text-dark flexbe ">
                                        <h4 className="boldhead mb-0 totaltext mt-2 ml-1">
                                            Quantity :{" "}
                                            {item?.hasStock?.quantity}{" "}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
            )
        }
    }
    return (
        <div className="bg">
            <Adminnav />
            <div className="container">
                <h2 className="Texttitle mt-5 mb-4" data-aos="fade-right">
                    Dashboard
                </h2>
                <div className="col-12">
                    <div className="row">
                        <div className="col-lg-6 col-xs-12">
                            <div className="bg-light col-12 boxorderdashboard mt-2 ">
                                <div className="col-12">
                                    <h5 className="ml-1">Total Product</h5>
                                    <h1>{countProduct?.countProduct}</h1>
                                    <hr />
                                </div>
                            </div>
                            <div className="bg-light col-12 boxorderdashboard mt-2 ">
                                <div className="col-12">
                                    <h5 className="ml-1">Total Promotion</h5>
                                    <h1>{countPromotion?.countPromotion}</h1>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="bg-light boxorderdashboard mt-2">
                                <div className="col-12">
                                    <h5 className="ml-1">Latest Order</h5>
                                    <hr />
                                </div>

                                <div className="row col-lg-12 ml-1">
                                    <div class="col-lg-12 col-sm-12 row cartlist boxorder bg-dark ml-0 mr-0 pl-3 mb-4">
                                        <div
                                            className={
                                                "boxstatus" +
                                                (item?.status === "WAITING"
                                                    ? " bg-warning"
                                                    : " bg-success")
                                            }
                                        ></div>
                                        <div className="col-12 pr-0">
                                            <div className="flexbetween row ml-1 mr-1">
                                                <h5 class="card-title textbold text-light mt-2">
                                                    Order :{" "}
                                                    {order?.orders[0]?._id}
                                                </h5>
                                            </div>
                                            <hr className="bg-light" />
                                            <h5 className="text-light">
                                                Total:{" "}
                                                {order?.orders[0]?.totalPrice}{" "}
                                                USD
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xs-12">
                            <div className=" col-12  mt-2 pb-4 pt-4 mb-5">
                                <div className="col-12">
                                    <h3 className="ml-1 textbold">
                                        Quantity of Product
                                    </h3>

                                    <div className="col-lg-12 flexright ml-0 mr-0 pr-0">
                                        <Pagination
                                            count={Math.ceil(
                                                countPages.countProduct / 6
                                            )}
                                            page={page}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <hr />
                                </div>
                                <div className="row col-lg-12 col-xs-12mr-0 pr-0">
                                    <div className="row ml-0 mr-0 pr-0 pl-0 col-12">
                                        <Rendershoe />
                                    </div>

                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

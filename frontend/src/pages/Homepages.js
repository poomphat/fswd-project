import "./Homepages.css"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import Navbar from "../component/Navbar"
import shoe from "../asset/shoe/shoe.png"
import walking from "../asset/walking.png"
import running from "../asset/running.png"
import training from "../asset/training.png"
import notfound from "../asset/notfound.jpg"
import { gql, useMutation, useQuery } from "@apollo/client"
import { FIND_MANY_MUTATION_HOMEPAGE } from "../graphql/findproductHomepage"
import { FIND_ALL_PROMOTIONS_HOMEPAGE } from "../graphql/findPromotionHomepage"
import PromotionCard from "../component/promotionCard"

function Homepages() {
    const [findManyProduct, { loading }] = useMutation(
        FIND_MANY_MUTATION_HOMEPAGE,
        {
            variables: { limit: 6, skip: 0 },
        }
    )
    const [product, setProduct] = useState()
    const { load, data } = useQuery(FIND_ALL_PROMOTIONS_HOMEPAGE)
    const [promotions, setPromotions] = useState()

    const setProductHandler = useCallback(async (data) => {
        await setProduct(data)
    })

    useEffect(() => {
        findManyProduct().then((result) => {
            setProductHandler(result.data)
        })
    }, [])

    return (
        <div className="bg">
            <Navbar />
            <div className="content container">
                <div className="row contentfirst">
                    <div className="col-lg-6 col-xs-12 contenttext">
                        <div className="sidecontent" data-aos="fade-right">
                            <h1 className="Topic">Introducing stepie shop</h1>
                            <hr color="bg-secondary" />
                            <p className="text-secondary textdescript">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12" data-aos="fade-left">
                        <img src={shoe} className="picshoe"></img>
                    </div>
                </div>
            </div>
            <div className="container-fluid contentsecond">
                <div className="container">
                    <h2 className="textbold">Latest product</h2>
                    <hr />
                    <div>
                        <div className="productlist pb-4 container">
                            <div className="row pb-4">
                                {product?.findManyProduct?.map((item, i) => {
                                    return (
                                        <div
                                            class="text-dark carditem bg-light ml-3 "
                                            data-aos="zoom-in"
                                        >
                                            <img
                                                class="card-img-top imgs"
                                                src={
                                                    item?.imgUrl == null
                                                        ? notfound
                                                        : item?.imgUrl
                                                }
                                                alt="Card image cap"
                                            />
                                            <div class="card-body">
                                                <h5 class="card-title TopicSecond">
                                                    {item?.productName}
                                                </h5>
                                                <p class="card-text">
                                                    {item?.productDesc}
                                                </p>
                                            </div>
                                            <div class="card-footer text-dark flexbe ">
                                                <h6 className="boldhead mb-0 totaltext mt-2 ">
                                                    {item?.price} USD
                                                </h6>
                                                <Link
                                                    to={"/product/" + item?._id}
                                                >
                                                    <button class="btn btn-light col mt-2">
                                                        More
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <h2 className="textbold">Latest promotion</h2>
                    <hr />

                    <div className="productlist pb-4">
                        <div className="row col-12 pb-4">
                            {data?.promotions?.map((item, i) => {
                                return (
                                    <div
                                        className="float"
                                        style={{ width: "550px" }}
                                    >
                                        <div className="mr-0 row mainnaja prohomepage">
                                            <div
                                                className="headborder bg-dark text-light col-4 pl-0 pr-0 pt-0 pb-0"
                                                style={{
                                                    backgroundImage:
                                                        "url(" +
                                                        item?.disProduct
                                                            ?.imgUrl +
                                                        ")",
                                                }}
                                            >
                                                <div className="filterbgpromo">
                                                    <p className="mb-1 textsmall">
                                                        promotion
                                                    </p>

                                                    <h6 className="boldhead text-light  ">
                                                        {item?.promotionName}
                                                    </h6>
                                                    <h6 className="boldhead mb-1 text-success">
                                                        OFF{" "}
                                                        {
                                                            item?.discountInPercent
                                                        }
                                                        %
                                                    </h6>
                                                </div>
                                            </div>
                                            <div class="bg-light col-8 bodyborder">
                                                <div className="row flexbetween ml-2 mr-2">
                                                    <h6 className="boldhead mb-1">
                                                        {
                                                            item?.disProduct
                                                                ?.productName
                                                        }
                                                    </h6>
                                                </div>

                                                <hr />
                                                <h8 className="mb-1">
                                                    normal price :{" "}
                                                    {item?.disProduct?.price}{" "}
                                                    USD
                                                </h8>

                                                <div className="flexbe row pr-3 pl-3">
                                                    <h5 className="boldhead mb-0 totaltext mt-2">
                                                        Total :{" "}
                                                        {Math.floor(
                                                            item?.disProduct
                                                                ?.price *
                                                                ((100 -
                                                                    item?.discountInPercent) /
                                                                    100)
                                                        )}{" "}
                                                        USD
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="row center">
                    <div
                        className="boxitem col-lg-2 col-xs-11 bg-dark text-light"
                        data-aos="zoom-out-up"
                    >
                        <h4 className="TopicSecond text-light">Walking</h4>
                        <hr />
                        <img src={walking} className="picshoe"></img>
                        <p className="text-light textdescript">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book
                        </p>
                    </div>
                    <div
                        className="boxitem col-lg-2 col-xs-11 bg-dark text-light"
                        data-aos="zoom-out-up"
                    >
                        <h4 className="TopicSecond text-light">Running</h4>
                        <hr />
                        <img src={running} className="picshoe"></img>
                        <p className="text-light textdescript">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book
                        </p>
                    </div>
                    <div
                        className="boxitem col-lg-2 col-xs-11 bg-dark text-light"
                        data-aos="zoom-out-up"
                    >
                        <h4 className="TopicSecond text-light">Training</h4>
                        <hr />
                        <img src={training} className="picshoe"></img>
                        <p className="text-light textdescript">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer container-fluid bg-dark">
                <div className="container">
                    <h4 className="configstyle">Contact us</h4>
                    <h5 className="configstyle">Email: xxxxxx@gmail.com</h5>
                    <h5 className="configstyle">Tel: 080-000-0000</h5>
                    <h5 className="configstyle">
                        Address: 111/898 chicago 99888
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Homepages

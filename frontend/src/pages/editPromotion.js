import "./product.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom"
import { useState, useEffect, useCallback, useMemo } from "react"
import Admin from "../component/sidebar"
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { FIND_MANY_MUTATION } from "../graphql/findProductMutation"
import { CREATE_PROMOTION } from "../graphql/createPromotion"
import { COUNT_PRODUCT_MUTAION } from "../graphql/countProduct"
import ShoesCard from "../component/ShoesCard"
import Pagination from "@material-ui/lab/Pagination"
import { FIND_PRODUCT_QUERY } from "../graphql/findProductQuery"
import { notification } from "antd"
import { FIND_PROMOTION_ONE } from "../graphql/findPromotionOne"
import { UPDATE_PROMOTION } from "../graphql/updatePromotion"
const sucessNotification = {
    message: "Edit success",
    description: "Success edit promotion ",
    duration: 2,
}
const failedNotification = {
    message: "Edit failed",
    description: "please fill data every field",
    duration: 2,
}
function EditPromotion() {
    const [page, setPage] = useState(1)
    const name = useParams()
    const [promotionName, setPromotionName] = useState("")
    const [promotionDescription, setPromotionDescription] = useState("")
    const [Discount, setDiscount] = useState(0)
    const [selected, setSelected] = useState(null)
    const [findManyProduct, { loading }] = useMutation(FIND_MANY_MUTATION, {
        variables: { limit: 6, skip: page * 6 - 6 },
    })
    const [dataCount] = useMutation(COUNT_PRODUCT_MUTAION)
    const [updatePromotion] = useMutation(UPDATE_PROMOTION)
    const [product, setProduct] = useState(null)
    const [productSelect, setProductSelect] = useState(null)
    const {
        data: dataPromotion,
        loading: loadingPromotion,
    } = useQuery(FIND_PROMOTION_ONE, {
        variables: { promotionId: name.string },
    })
    const [
        QueryProduct,
        { data: dataProduct, loading: loadingProduct },
    ] = useLazyQuery(FIND_PRODUCT_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            console.log("data ", data)
        },
    })
    const [countPages, setcountPages] = useState(0)
    const handleChange = async (event, value) => {
        setPage(value)
        console.log(countPages.countProduct)
    }
    useEffect(() => {
        allProduct()
    }, [page])
    const onSubmitForm = () => {
        if (promotionName != "" && Discount != 0 && selected != null) {
            const record = {
                promotionName: promotionName,
                promotionDesc: promotionDescription,
                discountInPercent: parseFloat(Discount),
                productId: selected,
            }
            console.log(record)
            updatePromotion({
                variables: { promotionId: name.string, record: record },
            })
            notification.success(sucessNotification)
        } else {
            notification.error(failedNotification)
        }
    }
    const setProductHandler = useCallback(async (data) => {
        await setProduct(data.findManyProduct)
        setProductSelect(dataProduct)
    })
    const handleChoseProduct = useCallback(async (item) => {
        await QueryProduct({ variables: { id: item._id } })
        setSelected(item._id)
    }, [])
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
        Countdata()
        await allProduct()
    }, [])
    useEffect(async () => {
        setSelected(dataPromotion?.promotion?.disProduct?._id)
        console.log("dataPromotion?.promotion?.disProduct")
        setPromotionName(dataPromotion?.promotion?.promotionName)
        setPromotionDescription(dataPromotion?.promotion?.promotionDesc)
        setDiscount(dataPromotion?.promotion?.discountInPercent)
        QueryProduct({
            variables: { id: dataPromotion?.promotion?.disProduct?._id },
        })
    }, [loadingPromotion])
    useEffect(async () => {
        setProductSelect(dataProduct)
    }, [loadingProduct, dataProduct, productSelect, handleChoseProduct])
    const Rendershoe = () => {
        if (product === []) {
            return <h5>We dont have it</h5>
        } else {
            return (
                <>
                    {product?.map((item, i) => {
                        return (
                            <div className="col-6 mt-4">
                                <div
                                    className="bg-dark boxproduct text-light ml-3"
                                    onClick={() => handleChoseProduct(item)}
                                    style={{
                                        backgroundImage:
                                            "url(" + item?.imgUrl + ")",
                                    }}
                                >
                                    <div
                                        className="filterbg"
                                        style={{
                                            boxShadow:
                                                item._id === selected
                                                    ? "0px 0px 0px 10px #5cb85cE0"
                                                    : "",
                                            transition: "0.25s",
                                        }}
                                    >
                                        <p className="text-light">
                                            {item?.productName}
                                        </p>
                                        <p className="text-light">
                                            Price: {item?.price} USD
                                        </p>
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
            <Admin />
            <div className="container mt-5">
                <div className="col-12">
                    <h3 className="Texttitle" data-aos="fade-right">
                        Edit Promotion : {promotionName}
                    </h3>
                </div>
                <div className="flexright"></div>
                <div className="row">
                    <div className="row col-12">
                        <div className="col-lg-12 mt-2">
                            <h4 className="mr-5 textbold">Promotion detail</h4>
                            <h5 className="mr-5">
                                Promotion detail percentage and name pf
                                promotion
                            </h5>
                            <hr />
                        </div>
                        <div class="form-group mt-2 col-lg-6 col-xs-12">
                            <label class="form-label" for="customFile">
                                Promotion name
                            </label>
                            <input
                                type="text"
                                class="form-control bg-light"
                                onChange={(e) => {
                                    setPromotionName(e.target.value)
                                }}
                                placeholder="Name of promotion"
                                value={promotionName}
                            />
                        </div>
                        <div class="form-group mt-2 col-lg-6 col-xs-12">
                            <label class="form-label" for="customFile">
                                Promotion description
                            </label>
                            <input
                                type="text"
                                class="form-control bg-light"
                                onChange={(e) => {
                                    setPromotionDescription(e.target.value)
                                }}
                                placeholder="description of promotion"
                                value={promotionDescription}
                            />
                        </div>
                        <div class="form-group mt-2 col-lg-4 col-xs-12">
                            <label class="form-label" for="customFile">
                                Discount in Percentage
                            </label>
                            <input
                                type="number"
                                class="form-control bg-light"
                                min="0"
                                max="100"
                                onChange={(e) => {
                                    setDiscount(e.target.value)
                                }}
                                placeholder="Discount"
                                value={Discount}
                            />
                        </div>
                        <div className="col-lg-12 mt-2">
                            <h4 className="mr-5 textbold">
                                Select Product to discount
                            </h4>
                            <h5 className="mr-5">
                                {selected
                                    ? "Now selected : " + selected
                                    : "Plase select product to discount"}
                            </h5>
                            <div className="col-6 mt-4">
                                <div
                                    className="bg-dark boxproduct text-light"
                                    style={{
                                        backgroundImage:
                                            "url(" +
                                            productSelect?.product?.imgUrl +
                                            ")",
                                    }}
                                >
                                    <div
                                        className="filterbg"
                                        style={{
                                            boxShadow:
                                                dataProduct?.product?._id ===
                                                selected
                                                    ? "0px 0px 0px 10px #5cb85cE0"
                                                    : "",
                                            transition: "0.25s",
                                        }}
                                    >
                                        <p className="text-light">
                                            {dataProduct?.product
                                                ?.productName ? (
                                                <>
                                                    {
                                                        dataProduct?.product
                                                            ?.productName
                                                    }
                                                </>
                                            ) : (
                                                <>loading...</>
                                            )}
                                            {console.log(productSelect)}
                                        </p>
                                        <p className="text-light">
                                            Price: {dataProduct?.product?.price}{" "}
                                            USD
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="col-lg-12 flexright">
                            <Pagination
                                count={Math.ceil(countPages.countProduct / 6)}
                                page={page}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-lg-12 row">
                            <Rendershoe />
                        </div>

                        <div className="col-lg-12 flexright mt-2">
                            <Pagination
                                count={Math.ceil(countPages.countProduct / 6)}
                                page={page}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-lg-12">
                            <hr />
                            <button
                                class="btn btn-light mt-2 mb-4 col-lg-4 col-xs-12"
                                type="button"
                                onClick={onSubmitForm}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPromotion

import "./product.css"
import { useState, useEffect, useCallback, useMemo } from "react"
import Navbar from "../component/Navbar"
import { gql, useMutation, useLazyQuery } from "@apollo/client"
import { FIND_MANY_MUTATION } from "../graphql/findProductMutation"
import { CREATE_PROMOTION } from "../graphql/createPromotion"
import { COUNT_PRODUCT_MUTAION } from "../graphql/countProduct"
import ShoesCard from "../component/ShoesCard"
import Admin from "../component/sidebar"
import { FIND_PRODUCT_QUERY } from "../graphql/findProductQuery"
import Pagination from "@material-ui/lab/Pagination"
import { COUNT_PRODUCT_FILTER_MUTAION } from "../graphql/countProductFilter"
import { notification } from "antd"
const sucessNotification = {
    message: "Create success",
    description: "Success Create promotion ",
    duration: 2,
}
const failedNotification = {
    message: "Create success",
    description: "please fill data every field",
    duration: 2,
}
function Product() {
    const [page, setPage] = useState(1)
    const [promotionName, setPromotionName] = useState("")
    const [promotionDescription, setPromotionDescription] = useState("")
    const [Discount, setDiscount] = useState(0)
    const [selected, setSelected] = useState(null)
    const [productSelect, setProductSelect] = useState(null)
    const [findManyProduct, { loading }] = useMutation(FIND_MANY_MUTATION, {
        variables: { limit: 6, skip: page * 6 - 6 },
    })
    const [dataCount] = useMutation(COUNT_PRODUCT_MUTAION)
    const [createPromotion] = useMutation(CREATE_PROMOTION)
    const [
        QueryProduct,
        { data: dataProduct, loading: loadingProduct },
    ] = useLazyQuery(FIND_PRODUCT_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            console.log("data ", data)
        },
    })
    const [product, setProduct] = useState()
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
                productId: selected._id,
            }
            console.log(record)
            createPromotion({ variables: { record: record } })
            notification.success(sucessNotification)
        } else {
            notification.error(failedNotification)
        }
    }
    const setProductHandler = useCallback(async (data) => {
        await setProduct(data.findManyProduct)
    })
    const handleChoseProduct = useCallback((item) => {
        setSelected(item)
        setProductSelect(item)
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
        Countdata()
        await allProduct()
    }, [])
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
                                                item === selected
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
                <h2 className="Texttitle" data-aos="fade-right">
                    Add Promotion
                </h2>

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
                                id="customFile"
                                required
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
                                id="customFile"
                                required
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
                                id="customFile"
                                required
                            />
                        </div>
                        <div className="col-lg-12 mt-2">
                            <h4 className="mr-5 textbold">
                                Select Product to discount
                            </h4>
                            <h5 className="mr-5">
                                {selected
                                    ? "Now selected : " + selected?._id
                                    : "Plase select product to discount"}
                            </h5>
                            <div className="col-6 mt-4">
                                <div
                                    className="bg-dark boxproduct text-light"
                                    style={{
                                        backgroundImage:
                                            "url(" +
                                            productSelect?.imgUrl +
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
                                            {productSelect?.productName ? (
                                                <>
                                                    {productSelect?.productName}
                                                </>
                                            ) : (
                                                <>Plase select product</>
                                            )}
                                            {console.log(productSelect)}
                                        </p>
                                        <p className="text-light">
                                            Price: {productSelect?.price} USD
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

export default Product

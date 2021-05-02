import "./addproduct.css"
import { useState, useEffect, useCallback } from "react"
import Admin from "../component/sidebar"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useSession } from "../context/Sessioncontext"
import { CREATE_PRODUCT_IMG } from "../graphql/createproductwithimg"
import { CREATE_PRODUCT } from "../graphql/createProduct"
import { CREATE_STOCK } from "../graphql/createStockMutation"
import notfound from "../asset/notfound.jpg"
import { notification, Button, Space } from "antd"
import { FIND_PRODUCT_QUERY } from "../graphql/findProductQuery"
import { UPDATE_STOCK_MUTATION } from "../graphql/updateStockMutation"
import { UPDATE_PRODUCT } from "../graphql/updateProduct"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom"

function EditOrder() {
    const [Create, { loading }] = useMutation(CREATE_PRODUCT_IMG)
    const sucessNotification = {
        message: "Add to cart",
        description: "Sucess adding to cart",
        duration: 1.5,
    }
    const name = useParams()
    const {
        data: dataProduct,
        loading: loadingProduct,
    } = useQuery(FIND_PRODUCT_QUERY, { variables: { id: name.string } })
    const [UpdateProduct, { loadingproduct }] = useMutation(UPDATE_PRODUCT)
    const [updateStock] = useMutation(UPDATE_STOCK_MUTATION)
    const [createStock] = useMutation(CREATE_STOCK)
    const { user, logout: handleLogout } = useSession()
    const [img, setImg] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [productName, setProductName] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [isImgchange, setIsImgchange] = useState(false)
    const [price, setPrice] = useState(0)
    const [gender, setGender] = useState("man")
    const [quantity, setQuantity] = useState(0)
    const onUploadImg = async () => {
        console.log(img)
        if (isImgchange) {
            const {
                data: { upload: filename },
            } = await Create({ variables: { imgUrl: img } })
            const record = {
                productName: productName,
                productDesc: productDesc,
                price: parseFloat(price),
                catagory: "shoe",
                genderType: gender,
                imgUrl: filename,
            }
            Update(record)
        } else {
            const record = {
                productName: productName,
                productDesc: productDesc,
                price: parseFloat(price),
                catagory: "shoe",
                genderType: gender,
            }
            Update(record)
        }
        notification.success(sucessNotification)
    }
    const Update = async (record) => {
        await UpdateProduct({
            variables: { record: record, productId: dataProduct?.product?._id },
        }).then((result) => {
            console.log(result)
            const productId = result.data.updateProductById.record._id
            const productQuantity = parseFloat(quantity)
            updateStock({
                variables: { productId: productId, quantity: productQuantity },
            })
        })
    }
    const UPLOAD_FILE = gql`
        mutation uploadFile($file: Upload!) {
            uploadFile(file: $file) {
                url
            }
        }
    `
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => console.log(data),
    })
    const handleFileChange = useCallback(async (e) => {
        e.preventDefault()
        const {
            files: [inputFile],
        } = e.target
        setImg(inputFile)
        setIsImgchange(true)
        console.log(e.target.files[0])
        setImgUrl(URL.createObjectURL(e.target.files[0]))
    }, [])
    useEffect(() => {
        setProductName(dataProduct?.product?.productName)
        setProductDesc(dataProduct?.product?.productDesc)
        setPrice(dataProduct?.product?.price)
        setGender(dataProduct?.product?.genderType)
        setImgUrl(dataProduct?.product?.imgUrl)
        setQuantity(dataProduct?.product?.hasStock?.quantity)
        console.log(dataProduct?.product)
    }, [loadingProduct, dataProduct])
    return (
        <div className="bg">
            <Admin />
            <div className="container">
                <h2 className="Texttitle mt-5" data-aos="fade-right">
                    Edit Product {dataProduct?.product._id}
                </h2>
                <hr />
                <div className="row">
                    <div className="col-lg-7 col-xs-12">
                        <form enctype="multipart/form-data row">
                            <label class="form-label" for="customFile">
                                Image of product
                            </label>
                            <input
                                type="file"
                                class="form-control bg-light"
                                onChange={handleFileChange}
                                id="customFile"
                                required
                            />

                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">
                                    Product name
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    placeholder="Name of product"
                                    value={productName}
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">
                                    Product description
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    onChange={(e) =>
                                        setProductDesc(e.target.value)
                                    }
                                    placeholder="description of product"
                                    value={productDesc}
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    class="form-control bg-light"
                                    min="0"
                                    max="9999"
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price of product"
                                    value={price}
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">
                                    Gender
                                </label>
                                <select
                                    class="form-control bg-light"
                                    id="exampleFormControlSelect1"
                                    value={gender}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setGender(e.target.value)
                                    }}
                                >
                                    <option value="man">man</option>
                                    <option value="woman">woman</option>
                                </select>
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="customFile">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    class="form-control bg-light"
                                    min="0"
                                    max="9999"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                    placeholder="Quantity of product"
                                    value={quantity}
                                />
                            </div>
                            <button
                                class="btn btn-light mt-2"
                                type="button"
                                onClick={onUploadImg}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-5 col-xs-12">
                        <div className="col-8">
                            <h2 className="texttitle">Preview</h2>
                            <div class="card bg-light text-dark shadow shoecard">
                                <img
                                    class="card-img-top imgs"
                                    src={imgUrl == null ? notfound : imgUrl}
                                    alt="Card image cap"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">
                                        {productName == ""
                                            ? "Input name"
                                            : productName}
                                    </h5>
                                    <p class="card-text">
                                        {productDesc == ""
                                            ? "Input Description"
                                            : productDesc}
                                    </p>
                                </div>
                                <div class="card-footer text-dark flexbe ">
                                    <h6 className="boldhead mb-0 totaltext mt-2 ml-1">
                                        {price} USD
                                    </h6>
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            <button
                                                href="#"
                                                class="btn btn-light col"
                                                disabled
                                            >
                                                more
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                class="btn btn-dark col"
                                                disabled
                                            >
                                                Add
                                            </button>
                                        </div>
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

export default EditOrder

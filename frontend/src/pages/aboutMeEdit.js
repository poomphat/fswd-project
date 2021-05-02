import "./aboutmepage.css"
import { useState, useMemo, useCallback, useEffect } from "react"
import Navbar from "../component/Navbar"
import { useLazyQuery, useMutation } from "@apollo/client"
import { useSession } from "../context/Sessioncontext"
import { FILTER_CUSTOMER } from "../graphql/findCustomerQuery"
import { UPDATE_CUSTOMER_BY_ID } from "../graphql/updateCustomerById"
import { useHistory } from "react-router-dom"
import { notification, Button, Space } from "antd"

function AboutMeEdit() {
    const { loading, user, logout: handleLogout } = useSession()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [district, setDistrict] = useState("")
    const [subDistrict, setSubDistrict] = useState("")
    const [country, setCountry] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [province, setProvince] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [customerAddress, setCustomerAddress] = useState(null)
    const [updateCustomer, { loading: updateLoading }] = useMutation(
        UPDATE_CUSTOMER_BY_ID,
        {
            onCompleted: () => {
                notification.success(sucessNotification)
            },
            onerror: () => {
                notification.error(failedNotification)
            },
        }
    )

    const sucessNotification = {
        message: "Edit user Info",
        description: "Edit successfully",
        duration: 1.5,
    }
    const failedNotification = {
        message: "Edit user Info",
        description: "Edit failed",
        duration: 1.5,
    }
    const [
        filterCustomer,
        { data: customerData, loading: customerLoading },
    ] = useLazyQuery(FILTER_CUSTOMER, {
        fetchPolicy: "network-only",
    })
    const history = useHistory()
    const goToAbout = useCallback(() => {
        history.push("/aboutme")
    }, [history])
    const defaultField = useCallback((e) => {
        const customer = customerData?.customer?.address
        setName(user?.name)
        setAddress(customer?.address)
        setDistrict(customer?.district)
        setSubDistrict(customer?.subDistrict)
        setCountry(customer?.country)
        setZipCode(customer?.zipcode)
        setProvince(customer?.province)
        setPhoneNumber(customer?.tel)
        setCustomerAddress(customer)
    })

    useEffect(() => {
        if (!loading && user) {
            filterCustomer({ variables: { userId: user?._id } })
        }
    }, [user, loading])

    useMemo(() => {
        if (!customerLoading && customerData) {
            console.log(user?._id, customerData)
            defaultField()
        }
    }, [customerLoading])

    const handleUpdate = () => {
        const record = {
            address: {
                address: address,
                district: district,
                subDistrict: subDistrict,
                country: country,
                zipcode: zipCode,
                province: province,
                tel: phoneNumber,
            },
        }
        updateCustomer({
            variables: { userId: user?._id, record: record },
        }).then(() => {
            filterCustomer({ variables: { userId: user?._id } })
            goToAbout()
        })
    }

    const nameChangehandler = useCallback((e) => {
        setName(e.target.value)
    }, [])
    const addressChangehandler = useCallback((e) => {
        setAddress(e.target.value)
    }, [])
    const districtChangehandler = useCallback((e) => {
        setDistrict(e.target.value)
    }, [])
    const subDistrictChangehandler = useCallback((e) => {
        setSubDistrict(e.target.value)
    }, [])
    const countryChangehandler = useCallback((e) => {
        setCountry(e.target.value)
    }, [])
    const zipCodeChangehandler = useCallback((e) => {
        setZipCode(e.target.value)
    }, [])
    const provinceChangehandler = useCallback((e) => {
        setProvince(e.target.value)
    }, [])
    const phoneNumberChangehandler = useCallback((e) => {
        setPhoneNumber(e.target.value)
    }, [])

    return (
        <div className="bg">
            <div className="container">
                <h2 className="Texttitle mt-5" data-aos="fade-right">
                    About me
                </h2>
                <hr />
                <div className="row">
                    <div className="col-lg-6 col-xs-12 mt-2">
                        <div className="col-12 bg-light text-dark box">
                            <h3 className="Texttitle mt-2">User info</h3>
                            <hr className="bg-secondary"></hr>
                            <h5 className="mt-2">Username : {name}</h5>
                            <div class="form-group mt-2">
                                <label class="form-label" for="address">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="Name"
                                    id="address"
                                    value={name}
                                    onChange={nameChangehandler}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <button
                            className="btn btn-success mr-1"
                            onClick={() => handleUpdate()}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-danger mr-1"
                            onClick={() => goToAbout()}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="col-lg-6 col-xs-12 mt-2">
                        <div className="col-12 bg-light text-dark box">
                            <div class="form-group mt-2">
                                <label class="form-label" for="address">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="Discount"
                                    id="address"
                                    value={address}
                                    onChange={addressChangehandler}
                                    required
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="subDistrict">
                                    Sub district
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="Sub district"
                                    id="subDistrict"
                                    value={subDistrict}
                                    onChange={subDistrictChangehandler}
                                    required
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="district">
                                    District
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="District"
                                    id="district"
                                    value={district}
                                    onChange={districtChangehandler}
                                    required
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="country">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="Country"
                                    id="country"
                                    value={country}
                                    onChange={countryChangehandler}
                                    required
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="zipcode">
                                    Zipcode
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="Zipcode"
                                    id="zipcode"
                                    value={zipCode}
                                    onChange={zipCodeChangehandler}
                                    required
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="province">
                                    province
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="provincer"
                                    id="province"
                                    value={province}
                                    onChange={provinceChangehandler}
                                    required
                                />
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label" for="phone">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    class="form-control bg-light"
                                    placeholder="Phone Number"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={provinceChangehandler}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMeEdit

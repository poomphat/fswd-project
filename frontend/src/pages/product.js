import "./product.css";
import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { FIND_MANY_MUTATION } from "../graphql/findProductMutation";
import { FILTER_GENDER_PRODUCT } from "../graphql/filterGenderProductsMutation";
import { COUNT_PRODUCT_MUTAION } from "../graphql/countProduct";
import { useSession } from "../context/Sessioncontext";
import ShoesCard from "../component/ShoesCard";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { COUNT_PRODUCT_FILTER_MUTAION } from "../graphql/countProductFilter";

function Product() {
  const { user, loading: userLoading } = useSession();
  const [page, setPage] = useState(1);
  const [checkfilter, setCheckfilter] = useState("");
  const [findManyProduct, { loading }] = useMutation(FIND_MANY_MUTATION, {
    variables: { limit: 6, skip: page * 6 - 6 },
  });
  const [dataCount] = useMutation(COUNT_PRODUCT_MUTAION);
  const [datafilterCount] = useMutation(COUNT_PRODUCT_FILTER_MUTAION);
  const [color, setcolor] = useState([1, 0, 0]);
  const [filterGenderProduct] = useMutation(FILTER_GENDER_PRODUCT, {
    variables: { limit: 6, skip: page * 6 - 6 },
  });
  const [product, setProduct] = useState();
  const [countPages, setcountPages] = useState(0);
  const handleChange = async (event, value) => {
    setPage(value);
    console.log(countPages.countProduct);
  };
  useEffect(() => {
    if (checkfilter == "") {
      allProduct();
    } else {
      filterProduct(checkfilter);
    }
  }, [page]);

  const setProductHandler = useCallback(async (data) => {
    setProduct(data.findManyProduct);
  });
  const filterProduct = useCallback(async (gender) => {
    const { data: datafilter } = await datafilterCount({
      variables: { genderType: gender },
    });
    await filterGenderProduct({ variables: { genderType: gender } }).then(
      (result) => {
        setProductHandler(result.data);
        setcountPages(datafilter);
      }
    );
  });
  const allProduct = useCallback(async () => {
    await findManyProduct().then((result) => {
      setProductHandler(result.data);
      Countdata();
    });
  });
  const Countdata = useCallback(async () => {
    await dataCount().then((result) => {
      setcountPages(result.data);
    });
  });
  useEffect(() => {
    Countdata();
    allProduct();
  }, []);
  const Rendershoe = () => {
    if (product === []) {
      return <h5>We dont have it</h5>;
    } else {
      return (
        <>
          {product?.map((item, i) => {
            return <ShoesCard item={item} fatchAll={allProduct}/>;
          })}
        </>
      );
    }
  };
  return (
    <div className="bg">
      <div className="container mt-5">
        <h2 className="Texttitle" data-aos="fade-right">
          Sport Shoes
        </h2>
        {user?.role === "Admin" ? (
          <>
            <Link to="/admin/product/create">
              <button class="btn btn-light">Add product</button>
            </Link>
          </>
        ) : (
          <></>
        )}

        <h5 className="alignend mr-5">Page: {page}</h5>
        <div className="flexright">
          <Pagination
            count={Math.ceil(countPages.countProduct / 6)}
            page={page}
            onChange={handleChange}
          />
        </div>
        <hr data-aos="fade-right"></hr>
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <p
              className={
                color[0] == 1 ? "text-light filter" : "text-dark filter"
              }
              onClick={() => {
                allProduct();
                setcolor([1, 0, 0]);
                setCheckfilter("");
                setPage(1);
              }}
              style={{
                backgroundColor: color[0] == 1 ? "#292b2c" : "rgba(0,0,0,0)",
              }}
            >
              All
            </p>

            <p
              className={
                color[1] == 1 ? "text-light filter" : "text-dark filter"
              }
              onClick={() => {
                filterProduct("man");
                setcolor([0, 1, 0]);
                setCheckfilter("man");
                setPage(1);
              }}
              style={{
                backgroundColor: color[1] == 1 ? "#292b2c" : "rgba(0,0,0,0)",
              }}
            >
              Men
            </p>

            <p
              className={
                color[2] == 1 ? "text-light filter" : "text-dark filter"
              }
              onClick={() => {
                filterProduct("woman");
                setcolor([0, 0, 1]);
                setCheckfilter("woman");
                setPage(1);
              }}
              style={{
                backgroundColor: color[2] == 1 ? "#292b2c" : "rgba(0,0,0,0)",
              }}
            >
              Women
            </p>
          </div>
          <div className="row col-lg-9 col-xs-12 mb-5">
            <div className="col-lg-12 row">
              <Rendershoe />
            </div>

            <div className="col-lg-12 flexright">
              <Pagination
                count={Math.ceil(countPages.countProduct / 6)}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

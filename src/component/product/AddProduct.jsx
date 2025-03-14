import React, { useState } from "react";
import Service from "../service/Service";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    type: "",
    pName: "",
    pPrice: "",
    pDPrice: "",
    pImage: "",
    rating: "",
  });
  
  let { type, pName, pPrice, pDPrice, pImage, rating } = state;
  function handleChange(e) {
    let { name, value } = e.target;
    setState((preVal) => ({ ...preVal, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let payload = { type, pName, pPrice, pDPrice, pImage, rating };
    (async () => {
      Service.addProduct(payload);
    })();
    navigate("/product");
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productType">Type: </label>
          <input
            type="text"
            name="type"
            id="productType"
            placeholder="enter product Type"
            onChange={handleChange}
            value={type}
          />
        </div>
        <br />
        <div>
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            name="pName"
            id="productName"
            placeholder="enter Product Name"
            onChange={handleChange}
            value={pName}
          />
        </div>
        <br />
        <div>
          <label htmlFor="productPrice">Product Price: </label>
          <input
            type="text"
            name="pPrice"
            id="productPrice"
            placeholder="enter Product Price"
            onChange={handleChange}
            value={pPrice}
          />
        </div>
        <br />
        <div>
          <label htmlFor="productDisPrice">Product Discount Price: </label>
          <input
            type="text"
            name="pDPrice"
            id="productDisPrice"
            placeholder="enter Product Discount Price"
            onChange={handleChange}
            value={pDPrice}
          />
        </div>
        <br />
        <div>
          <label htmlFor="productImage">Image Url: </label>
          <input
            type="text"
            name="pImage"
            id="productImage"
            placeholder="enter imge url"
            onChange={handleChange}
            value={pImage}
          />
        </div>
        <br />
        <div>
          <label htmlFor="rating">Ratings: </label>
          <input
            type="text"
            name="rating"
            id="rating"
            placeholder="enter the ratings"
            value={rating}
            onChange={handleChange}
          />
        </div>
        <br />
        <button>Add product</button>
      </form>
    </>
  );
};

export default AddProduct;

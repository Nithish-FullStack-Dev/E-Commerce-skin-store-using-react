import { useContext, useEffect, useState } from "react";
import Service from "../service/Service";
import { createApi } from "../context/Context";
import Styles from "./Cart.module.css";
import { CardMedia, Typography } from "@mui/material";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";

const Cart = () => {
  let navigator = useNavigate();
  let { gobalState, setGobalState } = useContext(createApi);
  let [productData, setProductData] = useState([]);
  let [productItems, setProductItems] = useState([]);
  let [cartNum, setCartNum] = useState({
    productId: "",
    count: 0,
  });

  useEffect(() => {
    (async () => {
      let data = await Service.showCart(gobalState.id);
      setProductData(data.userItems);
    })();
  }, [gobalState.id]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get("http://localhost:3000/products"); //
      if (data && productData.length > 0) {
        let filteredItems = data.filter((val) => productData.includes(val.id));
        setProductItems(filteredItems);
      }
    })();
  }, [productData.length]);

  let handleDelete = async (id) => {
    setProductData((preVal) => preVal.filter((val) => val !== id));
    setProductItems((preVal) => preVal.filter((val) => val.id !== id));
    let updatedData = await Service.updateCart(
      gobalState.id,
      productData.filter((val) => val !== id)
    );
    setGobalState(updatedData);
  };
  let totalPrice = productItems
    .reduce((acc, val) => {
      let price = val.pPrice.replace(/[^0-9.]/g, "");
      let final = parseFloat(price);
      return acc + final;
    }, 0)
    .toFixed(2);

  let handleCartCount = async (productId) => {
    // let payload = { productId, count };
    try {
      let data = await Service.getItemsInCart(productId);
      if (data) {
        console.log("no data");
      } else {
        let newCount = cartNum.count ? cartNum.count + 1 : 1;
        setCartNum({ productId, count: newCount });
        let addingData = await Service.addItemsInCart({
          productId,
          count: newCount,
        });
        console.log(addingData);
      }
    } catch (error) {
      console.log(data);
    }
  };

  return (
    <>
      <section id={Styles.section}>
        <main id={Styles.main1}>
          <Link to="/product">
            <FaArrowLeft className={Styles.back_arrow} />
          </Link>
          <h1 id={Styles.heading}>Shopping Cart</h1>
          <hr id={Styles.hr} />
          {productData.length > 0 ? (
            productItems.map((val) => {
              const fullStarValue = Math.floor(val.rating);
              const halfStarValue = val.rating % 1 !== 0;
              return (
                <>
                  <div className={Styles.contant}>
                    <article className={Styles.contant1}>
                      <CardMedia
                        component="img"
                        image={val.pImage}
                        alt="green iguana"
                        id={Styles.image}
                      />
                    </article>
                    <article className={Styles.contant2}>
                      <Typography gutterBottom variant="h5" component="div">
                        <h1 className={Styles.type}>{val.type}</h1>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <h5 className={Styles.pName}>{val.pName}</h5>
                      </Typography>
                      <h5 className={Styles.pPrice}>{val.pPrice}</h5>
                      <div className={Styles.ratings}>
                        {Array.from({ length: fullStarValue }, (_, index) => (
                          <FaStar key={index} color="gold" />
                        ))}
                        {halfStarValue && <FaStarHalf color="gold" />}
                        {"  "}
                        <span>{val.rating} reviews</span>
                      </div>
                      <div className={Styles.delete}>
                        <FaPlus onClick={() => handleCartCount(val.id)} />
                        <MdDelete
                          className={Styles.delete_btn}
                          onClick={() => handleDelete(val.id)}
                        />
                      </div>
                    </article>
                  </div>
                </>
              );
            })
          ) : (
            <div className={Styles.section1}>
              <h1 id={Styles.h1}>Cart is Empty </h1>
              <button
                onClick={() => navigator("/product")}
                id={Styles.home_btn}
              >
                Go to Home
              </button>
            </div>
          )}
        </main>
        {productData.length > 0 ? (
          <main id={Styles.main2}>
            <div id={Styles.div1}>
              <h1 id={Styles.div1_h1}>Price Details</h1>
              <hr />
            </div>
            <div className={Styles.div2}>
              <h1 className={Styles.div2_h1}>
                Subtotal ({productData.length} items)
              </h1>
              <h1 className={Styles.div2_h1}>${totalPrice}</h1>
            </div>
            <div className={Styles.div2}>
              <h1 className={Styles.div2_h1}>Delivery Charges</h1>
              <h1 className={Styles.div2_h1}>
                <strike>$10</strike>
                <span id={Styles.span}>Free</span>
              </h1>
            </div>
          </main>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default Cart;

// let arr = [];
// if (data) {
//   data.filter((val) => {
//     productData.filter((a) => {
//       // console.log(val);
//       if (val.id == a) {
//         arr.push(val);
//       }
//     });
//   });
//   console.log(arr);
//   setProductItems(arr);
// }

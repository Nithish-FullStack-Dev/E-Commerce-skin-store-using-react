import { useContext, useEffect, useState } from "react";
import { createApi } from "../context/Context";
import Service from "../service/Service";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import Styles from "./ShowProducts.module.css";
import Nav from "./Nav";

//! COMPONENT

const ShowProduct = () => {
  let navigate = useNavigate();
  let { gobalState, setGobalState } = useContext(createApi);
  let [productData, setProductData] = useState([]);
  let [cart, setCart] = useState(gobalState.userItems);

  useEffect(() => {
    (async () => {
      let data = await Service.product();
      setProductData(data);
    })();
  }, [gobalState]);

  let handleClick = async (id) => {
    let payload = [...cart, id];
    setCart(payload);
    let data = await Service.updateCart(gobalState.id, payload);
    setGobalState(data);
  };

  return (
    <>
      <Nav arr={cart} />
      <div className={Styles.container}>
        {productData.length > 0 ? (
          productData.map((val) => {
            const fullStarValue = Math.floor(val.rating);
            const halfStarValue = val.rating % 1 !== 0;
            return (
              <Card sx={{ maxWidth: 345 }} key={val.id}>
                <CardActionArea>
                  <div className={Styles.items}>
                    <CardMedia
                      component="img"
                      image={val.pImage}
                      alt="green iguana"
                      id={Styles.image}
                    />
                    <section className={Styles.two}>
                      <Typography gutterBottom variant="h5" component="div">
                        {val.type}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {val.pName}
                      </Typography>
                      <h5>{val.pPrice}</h5>
                      <div>
                        {Array.from({ length: fullStarValue }, (_, index) => (
                          <FaStar key={index} color="gold" />
                        ))}
                        {halfStarValue && <FaStarHalf color="gold" />}
                        {"  "}
                        <span>{val.rating} reviews</span>
                      </div>
                      {!cart.includes(val.id) && (
                        <Button
                          size="small"
                          id={Styles.cart_btn}
                          onClick={() => handleClick(val.id)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </section>
                  </div>
                </CardActionArea>
              </Card>
            );
          })
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
      {gobalState.role == "admin" && (
        <Button variant="contained" onClick={() => navigate("/addProduct")}>
          Add Product
        </Button>
      )}
    </>
  );
};

export default ShowProduct;

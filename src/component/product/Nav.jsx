import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";

const Nav = ({ arr }) => {
  let navigate = useNavigate();
  let [cartItems, setCartItems] = useState(arr);
  useEffect(() => {
    setCartItems(arr);
  }, [arr]);

  let handleClick = () => {
    navigate("/cart")
  };

  return (
    <>
      <nav className={Styles.nav}>
        <main className={Styles.main}>
          <div className={Styles.div}>
            <section className={Styles.sec_one}>
              <h1>products</h1>
            </section>
            <section className={Styles.sec_two}>
              <input type="text" />
              <span id={Styles.span} onClick={handleClick}>
                <FaCartShopping id={Styles.cart_icon} />
                <sup style={{ color: "white", paddingLeft: "3px" }}>
                  {cartItems.length}
                </sup>
              </span>
            </section>
          </div>
        </main>
      </nav>
    </>
  );
};

export default Nav;

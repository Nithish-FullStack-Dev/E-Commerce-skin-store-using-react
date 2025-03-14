import { createBrowserRouter } from "react-router-dom";
import Register from "../user/Register";
import Login from "../user/Login";
import ShowProduct from "../product/ShowProduct";
import AddProduct from "../product/AddProduct";
import Cart from "../cart/Cart";

export let routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <ShowProduct />,
  },
  {
    path: "/addProduct",
    element: <AddProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

import { useContext, useState } from "react";
import Service from "../service/Service";
import { createApi } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Styles from "./Login.module.css";

const Login = () => {
  let navigate = useNavigate();
  let { gobalState, setGobalState } = useContext(createApi);
  let [showPass, setShowPass] = useState(false);
  let [showCpass, setShowCpass] = useState(false);
  let [state, setState] = useState({
    email: "",
    password: "",
  });

  let { email, password } = state;

  function handleChange(e) {
    let { name, value } = e.target;
    setState((preVal) => ({ ...preVal, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let payload = { email, password };
    let data = await Service.login(payload);
    setGobalState(data);
    if (data) {
      console.log("Login successful:", data);
      navigate("/product");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <>
      <section id={Styles.section}>
        <Card sx={{ minWidth: 275 }} id={Styles.card}>
          <main className={Styles.main}>
            <h1 id={Styles.heading}>Login</h1>
            <form action="" onSubmit={handleSubmit}>
              <div className={Styles.fields}>
                <label htmlFor="email" className={Styles.label}>
                  email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id={Styles.email}
                  value={email}
                  placeholder="Enter the Email"
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className={Styles.fields}>
                <label htmlFor="password" className={Styles.label}>
                  password:{" "}
                </label>
                <div className={Styles.pass_input}>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id={Styles.password}
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter the password"
                    style={{ border: "none", outline: "none" }}
                  />
                  <span
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className={Styles.btn}
                  >
                    {showPass ? <IoMdEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
              <br />
              <div id={Styles.sub_btn_con}>
                <button type="submit" id={Styles.sub_btn}>
                  Submit
                </button>
              </div>
            </form>
            <div id={Styles.reg_con}>
              <h5 id={Styles.h5}>
                if you don't have an account
              </h5>
                <button onClick={() => navigate("/register")} id={Styles.reg_btn}>Register</button>
            </div>
          </main>
        </Card>
      </section>
    </>
  );
};

export default Login;

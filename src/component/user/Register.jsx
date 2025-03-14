import { useState } from "react";
import Service from "../service/Service";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const Register = () => {
  let navigate = useNavigate();
  let [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });

  let [address, setAddress] = useState({
    plot: "",
    city: "",
    state: "",
  });
  let { userName, email, password, gender, role } = userDetails;
  let { plot, city, state } = address;

  function handleChange(e) {
    let { name, value } = e.target;
    if (userDetails.hasOwnProperty(name))
      setUserDetails((preVal) => ({ ...preVal, [name]: value }));
    if (address.hasOwnProperty(name)) {
      setAddress((preVal) => ({ ...preVal, [name]: value }));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let payload = {
      userName,
      email,
      password,
      gender,
      address: { plot, city, state },
      role,
    };
    (async () => {
      await Service.register(payload);
    })();
    console.log(userDetails);
    console.log(address);
    navigate("/login");
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <br />
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <div name="gender" value={gender} onChange={handleChange}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              name="gender"
            />
            <FormControlLabel
              value="male"
              name="gender"
              control={<Radio />}
              label="Male"
            />
          </RadioGroup>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="plot"
            variant="outlined"
            type="text"
            name="plot"
            value={plot}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="city"
            variant="outlined"
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="state"
            variant="outlined"
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Role: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              name="role"
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </>
  );
};

export default Register;

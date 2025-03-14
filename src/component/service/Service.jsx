import Axios from "axios";

const Service = {
  register: async (payload) => {
    await Axios.post("http://localhost:3000/user", payload);
  },
  login: async (payload) => {
    let { data } = await Axios.get(
      `http://localhost:3000/user?email=${payload.email}&password=${payload.password}`
    );
    if (data.length > 0) {
      console.log("valid");
      return data[0];
    } else {
      console.log("invalid");
      return null;
    }
  },
  product: async () => {
    let { data } = await Axios.get("http://localhost:3000/products");
    return data;
  },
  addProduct: async (payload) => {
    await Axios.post("http://localhost:3000/products", payload);
  },
  updateCart: async (id, payload) => {
    let { data } = await Axios.patch(`http://localhost:3000/user/${id}`, {
      userItems: payload,
    });
    return data;
  },
  showCart: async (id) => {
    let { data } = await Axios.get(`http://localhost:3000/user/${id}`);
    return data;
  },
  productFromCart: async (id) => {
    let { data } = await Axios.get(`http://localhost:3000/products/${id}`);
    return data;
  },
  addItemsInCart: async (payload) => {
    await Axios.post("http://localhost:3000/itemsInCart", payload);
  },
  getItemsInCart: async (id) => {
    try {
      let { data } = await Axios.get(`http://localhost:3000/itemsInCart/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) return null;
    }
  },
};

export default Service;

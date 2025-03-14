import { createContext, useState } from "react";

export let createApi = createContext();
let { Provider } = createApi;

const Context = ({ children }) => {
  let [gobalState, setGobalState] = useState("");
  return <Provider value={{ gobalState, setGobalState }}>{children}</Provider>;
};

export default Context;

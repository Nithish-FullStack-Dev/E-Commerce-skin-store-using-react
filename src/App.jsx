import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./component/router/Router";

const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;

//! sample todo
/* import React, { useState } from "react";

const App = () => {
  let [state, setState] = useState([]);
  let [task, setTask] = useState("");
  function handleClick(e) {
    e.preventDefault();
    setState((preVal) => [...preVal, task]);
    setTask("");
  }
  function handleDelete(idx) {
    setState((val) => val.filter((_, i) => i !== idx));
  }

  console.log(state.length);
  return (
    <>
      <form action="" onSubmit={handleClick}>
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button>add</button>
      </form>
      {state.length > 0 && (
        <ul>
          {state.map((val, idx) => {
            return (
              <>
                <li key={idx}>
                  <h1>{val}</h1>
                  <button onClick={() => handleDelete(idx)}>delete</button>
                </li>
              </>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default App; */

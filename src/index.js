import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { initialState, reducer } from "./reducers/reducer";

export const ThisContext = createContext();
const Index = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ThisContext.Provider value={{ state, dispatch }}>
      <App />
    </ThisContext.Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

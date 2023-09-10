import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store/store";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

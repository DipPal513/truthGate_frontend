import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./main.css";
// for i18next
// import { I18nextProvider } from "react-i18next";
import "@/lib/i18n.js";
import { routes } from "./routes/routes.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   
    <ThemeProvider>
      <RouterProvider router={routes}>
        {" "}
        <App />
      </RouterProvider>
    </ThemeProvider>
    
  </Provider>
);

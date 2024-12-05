import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import store from "./data/store";
import router from "./router/router.jsx";
import "./styles/style.css";
import { Toaster } from "react-hot-toast";
import "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <Flowbite>
        <Toaster />
        <RouterProvider router={router} />
      </Flowbite>
    </Provider>
  </StrictMode>
);

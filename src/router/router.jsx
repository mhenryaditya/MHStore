import { createBrowserRouter } from "react-router-dom";
import ListProduct from "../pages/App";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import DetailProduct from "../pages/DetailProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ListProduct />,
        
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/detail/:id",
        element: <DetailProduct />,
    },
])

export default router
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Notfound from "./Components/Notfound/Notfound";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import GoToHome from "./Components/GoToHome/GoToHome";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import HandelRouterNotLogin from "./Components/HandelRouterNotLogin/HandelRouterNotLogin";
import HandelRouterLogin from "./Components/HandelRouterLogin/HandelRouterLogin";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <HandelRouterNotLogin>
              <GoToHome />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/home",
          element: (
            <HandelRouterNotLogin>
              <Home />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/cart",
          element: (
            <HandelRouterNotLogin>
              <Cart />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/wishList",
          element: (
            <HandelRouterNotLogin>
              <WishList />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/products",
          element: (
            <HandelRouterNotLogin>
              <Products />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/catrgories",
          element: (
            <HandelRouterNotLogin>
              <Categories />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/brands",
          element: (
            <HandelRouterNotLogin>
              <Brands />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/checkOut",
          element: (
            <HandelRouterNotLogin>
              <CheckOut />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/productDetails/:id",
          element: (
            <HandelRouterNotLogin>
              <ProductDetails />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/all-orders",
          element: (
            <HandelRouterNotLogin>
              <AllOrders />
            </HandelRouterNotLogin>
          ),
        },
        {
          path: "/register",
          element: (
            <HandelRouterLogin>
              <Register />
            </HandelRouterLogin>
          ),
        },
        {
          path: "/login",
          element: (
            <HandelRouterLogin>
              <Login />
            </HandelRouterLogin>
          ),
        },
        {
          path: "/forget-password",
          element: (
            <HandelRouterLogin>
              <ForgetPassword />
            </HandelRouterLogin>
          ),
        },
        {
          path: "/verify-code",
          element: (
            <HandelRouterLogin>
              <VerifyCode />
            </HandelRouterLogin>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <HandelRouterLogin>
              <ResetPassword />
            </HandelRouterLogin>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

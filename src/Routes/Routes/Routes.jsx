import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../../Components/Navbar/Main/Main";
import Home from "../../Components/Home/Home";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: 
      [
        {
            path: '/',
            element: <Home></Home>,
            loader: ()=>fetch('http://localhost:5000/products')
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }
      ]
    },
  ]);
export default router;
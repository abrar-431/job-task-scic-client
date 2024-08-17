import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../../Components/Navbar/Main/Main";
import Home from "../../Components/Home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: 
      [
        {
            path: '/',
            element: <Home></Home>,
        }
      ]
    },
  ]);
export default router;
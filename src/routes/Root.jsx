import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/pages/Home/Home";
import Test from "../layout/Test";
import About from "../components/pages/About/About";
import Hotels from "../components/pages/Hotels/Hotels";
import Blogs from "../components/pages/Blogs/Blogs";
import Student from "../components/pages/Student/Student";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/',
                element: <About></About>,
            },
            {
                path: '/hotels-list',
                element: <Hotels></Hotels>,
            },
            {
                path: '/student-service',
                element: <Student></Student>,
            },
            {
                path: '/blog&news',
                element: <Blogs></Blogs>,
            },
        ]
    },
    {
        path: '/test',
        element: <Test></Test>,
    }

]);
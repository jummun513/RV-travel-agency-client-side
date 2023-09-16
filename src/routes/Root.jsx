import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/pages/Home/Home";
import Test from "../layout/Test";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
        ]
    },
    {
        path: '/test',
        element: <Test></Test>,
    }

]);
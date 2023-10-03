import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../components/pages/PublicPage/Home/Home";
// import Test from "../layout/Test/Test";
// import About from "../components/pages/PublicPage/About/About";
// import Hotels from "../components/pages/PublicPage/Hotels/Hotels";
// import Blogs from "../components/pages/PublicPage/Blogs/Blogs";
// import Student from "../components/pages/PublicPage/Student/Student";
// import HotelDetail from "../components/pages/PublicPage/HotelDetail/HotelDetail";
import LoginRegiContainer from "../components/pages/PublicPage/LoginRegiContainer/LoginRegiContainer";
import PrivilegeLogin from "../components/pages/PublicPage/PrivilegeLogin/PrivilegeLogin";
import Admin from "../layout/Admin/Admin";
import ManagePG from "../components/pages/AdminPanelPage/ManagePG/ManagePG";
import AddPG from "../components/pages/AdminPanelPage/AddPG/AddPG";
import AdminPanelPage from "../components/pages/AdminPanelPage/AdminPanelPage";
import NotFound from "../components/shared/NotFound/NotFound";


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
                path: '/home',
                element: <Home></Home>,
            },
            // {
            //     path: '/',
            //     element: <About></About>,
            // },
            // {
            //     path: '/hotels-list',
            //     element: <Hotels></Hotels>,
            // },
            // {
            //     path: '/hotel-detail/:hotelId',
            //     element: <HotelDetail></HotelDetail>,
            // },
            // {
            //     path: '/student-service',
            //     element: <Student></Student>,
            // },
            // {
            //     path: '/blog&news',
            //     element: <Blogs></Blogs>,
            // },
            {
                path: '/login',
                element: <LoginRegiContainer></LoginRegiContainer>,
            },
            {
                path: '/registration',
                element: <LoginRegiContainer></LoginRegiContainer>,
            },
            {
                path: '/privileged-guest/login',
                element: <PrivilegeLogin></PrivilegeLogin>,
            },
        ]
    },
    {
        path: '/admin-panel',
        element: <Admin></Admin>,
        children: [
            {
                path: 'admin-panel',
                element: <AdminPanelPage></AdminPanelPage>,
            },
            {
                path: 'manage-privileged-guest',
                element: <ManagePG></ManagePG>,
            },
            {
                path: 'add-new-privileged-guest',
                element: <AddPG></AddPG>,
            },
        ]
    },
    // {
    //     path: '/test',
    //     element: <Test></Test>,
    // },
    {
        path: '*',
        element: <NotFound></NotFound>,
    }
]);
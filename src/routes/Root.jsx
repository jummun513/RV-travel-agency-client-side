import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../components/pages/PublicPage/Home/Home";
// import Test from "../layout/Test/Test";
import LoginRegiContainer from "../components/pages/PublicPage/LoginRegiContainer/LoginRegiContainer";
import PrivilegeLogin from "../components/pages/PublicPage/PrivilegeLogin/PrivilegeLogin";
import Admin from "../layout/Admin/Admin";
import AddPG from "../components/pages/AdminPanelPage/AddPG/AddPG";
import AdminPanelPage from "../components/pages/AdminPanelPage/AdminPanelPage";
import NotFound from "../components/shared/NotFound/NotFound";
import GeneralUsers from "../components/pages/AdminPanelPage/GeneralUsers/GeneralUsers";
import AdminManage from "../components/pages/AdminPanelPage/AdminManage/AdminManage";
import Developing from "../components/shared/Developing/Developing";
// import ChairmanMessage from "../components/pages/PublicPage/About/ChairmanMessage/ChairmanMessage";
import Profile from "../components/pages/ProtectedPage/UserDashboard/Profile/Profile";
import EditProfile from "../components/pages/ProtectedPage/UserDashboard/EditProfile/EditProfile"
import ManagePG from "../components/pages/AdminPanelPage/ManagePG/ManagePG";
import IndividualPGUser from "../components/pages/AdminPanelPage/ManagePG/IndividualPGUser/IndividualPGUser"
import EditIndividualPGUser from "../components/pages/AdminPanelPage/ManagePG/EditIndividualPGUser/EditIndividualPGUser";
import PrivateGuserPguserRoutes from "./PrivateGuserPguserRoutes";
import UserDashboard from "../components/pages/ProtectedPage/UserDashboard/UserDashboard";
import TermsAndCondition from "../components/pages/PublicPage/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../components/pages/PublicPage/PrivacyPolicy/PrivacyPolicy";


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
            {
                path: '/',
                element: <Developing></Developing>,
            },
            {
                path: '/hotels-list',
                element: <Developing></Developing>,
            },
            {
                path: '/student-service',
                element: <Developing></Developing>,
            },
            {
                path: '/blog&news',
                element: <Developing></Developing>,
            },
            {
                path: '/my-profile',
                element: <Developing></Developing>,
            },
            {
                path: '/dashboard',
                element: <PrivateGuserPguserRoutes><UserDashboard></UserDashboard></PrivateGuserPguserRoutes>,
                children: [
                    {
                        path: 'profile',
                        element: <Profile></Profile>,
                    },
                    {
                        path: 'edit-profile',
                        element: <EditProfile></EditProfile>,
                    }
                ]
            },
            {
                path: '/contact-us',
                element: <Developing></Developing>,
            },
            {
                path: '/privileged-guest/pg-photo-gallery',
                element: <Developing></Developing>,
            },
            {
                path: '/privileged-guest/pg-reviews',
                element: <Developing></Developing>,
            },
            {
                path: '/immigration-service',
                element: <Developing></Developing>,
            },
            {
                path: '/about-us/chairman-message',
                element: <Developing></Developing>,
                // element: <ChairmanMessage></ChairmanMessage>,
            },
            {
                path: '/about-us/director-message',
                element: <Developing></Developing>,
            },
            {
                path: '/about-us/ceo-message',
                element: <Developing></Developing>,
            },
            {
                path: '/about-us/who-we-are',
                element: <Developing></Developing>,
            },
            {
                path: '/about-us/company-profile',
                element: <Developing></Developing>,
            },
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
            {
                path: '/terms&condition',
                element: <TermsAndCondition></TermsAndCondition>,
            },
            {
                path: '/privacy&policy',
                element: <PrivacyPolicy></PrivacyPolicy>,
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
                path: 'manage-privileged-guest/individual-user-profile/:pgId',
                element: <IndividualPGUser></IndividualPGUser>,
            },
            {
                path: 'manage-privileged-guest/individual-user-profile/:pgId/edit',
                element: <EditIndividualPGUser></EditIndividualPGUser>,
            },
            {
                path: 'add-new-privileged-guest',
                element: <AddPG></AddPG>,
            },
            {
                path: 'general-users',
                element: <GeneralUsers></GeneralUsers>,
            },
            {
                path: 'manage-admin',
                element: <AdminManage></AdminManage>,
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
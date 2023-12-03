import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../components/pages/PublicPage/Home/Home";
import Hotels from "../components/pages/PublicPage/Hotels/Hotels";
import Developing from "../components/shared/Developing/Developing";
import HotelDetail from "../components/pages/PublicPage/HotelDetail/HotelDetail";
import ContactUs from "../components/pages/PublicPage/ContactUs/ContactUs";
import ChairmanMessage from "../components/pages/PublicPage/About/ChairmanMessage/ChairmanMessage";
import DirectorMessage from "../components/pages/PublicPage/About/DirectorMessage/DirectorMessage";
import CeoMessage from "../components/pages/PublicPage/About/CeoMessage/CeoMessage";
import WhoWeAre from "../components/pages/PublicPage/About/WhoWeAre/WhoWeAre";
import LoginRegiContainer from "../components/pages/PublicPage/LoginRegiContainer/LoginRegiContainer";
import PrivilegeLogin from "../components/pages/PublicPage/PrivilegeLogin/PrivilegeLogin";
import TermsAndCondition from "../components/pages/PublicPage/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../components/pages/PublicPage/PrivacyPolicy/PrivacyPolicy";
import PrivatePgRoutes from "./PrivatePgRoutes";
import HotelBooking from "../components/pages/ProtectedPage/HotelBooking/HotelBooking";
import NotFound from "../components/shared/NotFound/NotFound";
import AdminPanelPage from "../components/pages/AdminPanelPage/AdminPanelPage";
import AddPG from "../components/pages/AdminPanelPage/PgUsers/AddPG/AddPG";
import ManagePG from "../components/pages/AdminPanelPage/PgUsers/ManagePG/ManagePG";
import IndividualPGUser from "../components/pages/AdminPanelPage/PgUsers/ManagePG/IndividualPGUser/IndividualPGUser";
import EditIndividualPGUser from "../components/pages/AdminPanelPage/PgUsers/ManagePG/EditIndividualPGUser/EditIndividualPGUser";
import GeneralUsers from "../components/pages/AdminPanelPage/GeneralUsers/GeneralUsers";
import AdminManage from "../components/pages/AdminPanelPage/AdminManage/AdminManage";
import AddHotel from "../components/pages/AdminPanelPage/Hotels/AddHotel/AddHotel";
import ManageHotel from "../components/pages/AdminPanelPage/Hotels/ManageHotels/ManageHotel";
import PrivateGuserPguserRoutes from "./PrivateGuserPguserRoutes";
import UserDashboard from "../components/pages/ProtectedPage/UserDashboard/UserDashboard";
import Profile from "../components/pages/ProtectedPage/UserDashboard/Profile/Profile";
import EditProfile from "../components/pages/ProtectedPage/UserDashboard/EditProfile/EditProfile";


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
                path: '/hotels-list',
                element: <Hotels></Hotels>,
            },
            {
                path: '/hotel-detail/:hotelId',
                element: <HotelDetail></HotelDetail>,
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
                path: '/contact-us',
                element: <ContactUs></ContactUs>,
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
                element: <ChairmanMessage></ChairmanMessage>,
            },
            {
                path: '/about-us/director-message',
                element: <DirectorMessage></DirectorMessage>,
            },
            {
                path: '/about-us/ceo-message',
                element: <CeoMessage></CeoMessage>,
            },
            {
                path: '/about-us/who-we-are',
                element: <WhoWeAre></WhoWeAre>,
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
                path: '/booked-hotels/:hotelId',
                element: <PrivatePgRoutes><HotelBooking></HotelBooking></PrivatePgRoutes>,
            },
            {
                path: '/admin-panel',
                element: <AdminPanelPage></AdminPanelPage>,
                children: [
                    {
                        path: 'add-new-privileged-guest',
                        element: <AddPG></AddPG>,
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
                        path: 'general-users',
                        element: <GeneralUsers></GeneralUsers>,
                    },
                    {
                        path: 'manage-admin',
                        element: <AdminManage></AdminManage>,
                    },
                    {
                        path: 'add-new-hotel',
                        element: <AddHotel></AddHotel>,
                    },
                    {
                        path: 'manage-hotels',
                        element: <ManageHotel></ManageHotel>,
                    },
                ]
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
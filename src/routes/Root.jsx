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
import BookingReview from "../components/pages/ProtectedPage/HotelBooking/BookingReview/BookingReview";
import HotelBooked from "../components/pages/ProtectedPage/UserDashboard/History/HotelBooked/HotelBooked";
import PackagePurchased from "../components/pages/ProtectedPage/UserDashboard/History/PackagePurchased/PackagePurchased";
import BookedHotel from "../components/pages/AdminPanelPage/Booked/BookedHotel/BookedHotel";
import BookedPackage from "../components/pages/AdminPanelPage/Booked/BookedPackage/BookedPackage";
import Cancellation from "../components/pages/PublicPage/Cancellation/Cancellation";
import VerificationConfirmed from "../components/shared/VerificationConfirmed/VerificationConfirmed";
// import Test from "../layout/Test/Test";
import AddPackage from "../components/pages/AdminPanelPage/Package/AddPackage/AddPackage";
import ManagePackage from "../components/pages/AdminPanelPage/Package/ManagePackage/ManagePackage";
import PackageDetails from "../components/pages/PublicPage/PackageDetails/PackageDetails";
import EditHotel from "../components/pages/AdminPanelPage/Hotels/ManageHotels/EditHotel/EditHotel";
import PrivateAdminRoutes from "./PrivateAdminRoutes";
import PaymentFail from "../components/shared/PaymentFail/PaymentFail";
import PaymentSuccess from "../components/shared/PaymentSuccess/PaymentSuccess";
import EditPackage from "../components/pages/AdminPanelPage/Package/EditPackage/EditPackage";
import AddToAlbum from "../components/pages/AdminPanelPage/PhotoAlbum/AddToAlbum/AddToAlbum";
import ManageAlbum from "../components/pages/AdminPanelPage/PhotoAlbum/ManageAlbum/ManageAlbum";
import PgPhotoGallery from "../components/pages/PublicPage/PgPhotoGallery/PgPhotoGallery";
import WriteReview from "../components/pages/ProtectedPage/UserDashboard/WriteReview/WriteReview";
import AdminReviews from "../components/pages/AdminPanelPage/Reviews/AdminReviews/AdminReviews";
import UserReviews from "../components/pages/AdminPanelPage/Reviews/UserReviews/UserReviews";
import PgReviews from "../components/pages/AdminPanelPage/Reviews/PgReviews/PgReviews";
import AddToHotOffer from "../components/pages/AdminPanelPage/HotOffers/AddToHotOffer/AddToHotOffer";
import ManageHotOffer from "../components/pages/AdminPanelPage/HotOffers/ManageHotOffer/ManageHotOffer";
import AddToPartners from "../components/pages/AdminPanelPage/Partners/AddToPartners/AddToPartners";
import ManagePartners from "../components/pages/AdminPanelPage/Partners/ManagePartners/ManagePartners";
import TopOfferDetails from "../components/pages/PublicPage/Home/TopOffer/TopOfferDetails/TopOfferDetails";
import Packages from "../components/pages/PublicPage/Packages/Packages";
import PgReviewsClient from "../components/pages/PublicPage/PgReviewsClient/PgReviewsClient";
import AddBlogs from "../components/pages/AdminPanelPage/Blogs/AddBlogs/AddBlogs";
import ManageBlogs from "../components/pages/AdminPanelPage/Blogs/ManageBlogs/ManageBlogs";
import ClientSideBlogs from "../components/pages/PublicPage/ClientSideBlogs/ClientSideBlogs";
import BlogDetails from "../components/pages/PublicPage/ClientSideBlogs/BlogDetails/BlogDetails";
// import UploadImage from "../layout/Test/UploadImage";


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
                path: '/privileged-guest/login',
                element: <PrivilegeLogin></PrivilegeLogin>,
            },
            {
                path: '/hotels-list',
                element: <Hotels></Hotels>,
            },
            {
                path: '/hotel-details/:hotelId',
                element: <HotelDetail></HotelDetail>,
            },
            {
                path: '/privileged-guest/pg-photo-gallery',
                element: <PgPhotoGallery></PgPhotoGallery>,
            },
            {
                path: '/privileged-guest/pg-reviews',
                element: <PgReviewsClient></PgReviewsClient>,
            },
            {
                path: '/student-service',
                element: <Developing></Developing>,
            },
            {
                path: '/immigration-service',
                element: <Developing></Developing>,
            },
            {
                path: '/blog&news',
                element: <ClientSideBlogs></ClientSideBlogs>,
            },
            {
                path: '/blog&news/details/:blogId',
                element: <BlogDetails></BlogDetails>,
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
                path: '/contact-us',
                element: <ContactUs></ContactUs>,
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
                path: '/dashboard',
                element: <PrivateGuserPguserRoutes><UserDashboard></UserDashboard></PrivateGuserPguserRoutes>,
                children: [
                    {
                        path: 'profile',
                        element: <Profile></Profile>,
                    },
                    {
                        path: 'edit-profile',
                        element: <PrivatePgRoutes><EditProfile></EditProfile></PrivatePgRoutes>,
                    },
                    {
                        path: 'my-order-history/hotel-booked',
                        element: <HotelBooked></HotelBooked>,
                    },
                    {
                        path: 'my-order-history/package-purchased',
                        element: <PackagePurchased></PackagePurchased>,
                    },
                    {
                        path: 'write-review',
                        element: <WriteReview></WriteReview>,
                    }
                ]
            },
            {
                path: '/booked-hotels/:hotelId',
                element: <PrivateGuserPguserRoutes><HotelBooking></HotelBooking></PrivateGuserPguserRoutes>,
            },
            {
                path: '/my-booked-hotels/booking-review/:orderId',
                element: <PrivateGuserPguserRoutes><BookingReview></BookingReview></PrivateGuserPguserRoutes>,
            },
            {
                path: '/admin-panel',
                element: <PrivateAdminRoutes><AdminPanelPage></AdminPanelPage></PrivateAdminRoutes>,
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
                        path: 'manage-privileged-guest/individual-user-profile/:pgId/profile-edit',
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
                    {
                        path: 'manage-hotel/edit-hotel/:editHotelId',
                        element: <EditHotel></EditHotel>,
                    },
                    {
                        path: 'add-new-package',
                        element: <AddPackage></AddPackage>,
                    },
                    {
                        path: 'manage-packages',
                        element: <ManagePackage></ManagePackage>,
                    },
                    {
                        path: 'manage-packages/edit-package/:packageId',
                        element: <EditPackage></EditPackage>,
                    },
                    {
                        path: 'booking-manage/booked-hotel',
                        element: <BookedHotel></BookedHotel>,
                    },
                    {
                        path: 'booking-manage/booked-package',
                        element: <BookedPackage></BookedPackage>,
                    },
                    {
                        path: 'add-to-photo-album',
                        element: <AddToAlbum></AddToAlbum>,
                    },
                    {
                        path: 'manage-photo-album',
                        element: <ManageAlbum></ManageAlbum>,
                    },
                    {
                        path: 'manage-pg-reviews',
                        element: <PgReviews></PgReviews>,
                    },
                    {
                        path: 'manage-user-reviews',
                        element: <UserReviews></UserReviews>,
                    },
                    {
                        path: 'manage-admin-written-reviews',
                        element: <AdminReviews></AdminReviews>,
                    },
                    {
                        path: 'add-to-hot-offers',
                        element: <AddToHotOffer></AddToHotOffer>,
                    },
                    {
                        path: 'manage-hot-offers',
                        element: <ManageHotOffer></ManageHotOffer>,
                    },
                    {
                        path: 'add-to-partner',
                        element: <AddToPartners></AddToPartners>,
                    },
                    {
                        path: 'manage-partners',
                        element: <ManagePartners></ManagePartners>,
                    },
                    {
                        path: 'add-to-blog',
                        element: <AddBlogs></AddBlogs>,
                    },
                    {
                        path: 'manage-blogs',
                        element: <ManageBlogs></ManageBlogs>,
                    },
                ]
            },
            {
                path: '/hot-offer/details/:offerId',
                element: <TopOfferDetails></TopOfferDetails>,
            },
            {
                path: '/package-tours',
                element: <Packages></Packages>,
            },
            {
                path: '/package-tour/details/:packageId',
                element: <PackageDetails></PackageDetails>,
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
                path: '/refund&cancellation',
                element: <Cancellation></Cancellation>,
            },
            {
                path: '/email-confirmation',
                element: <VerificationConfirmed></VerificationConfirmed>,
            },
        ]
    },
    // {
    //     path: '/test',
    //     element: <Test></Test>,
    // },
    // {
    //     path: '/upload-image',
    //     element: <UploadImage></UploadImage>,
    // },
    {
        path: '/payment-success/:id',
        element: <PaymentSuccess></PaymentSuccess>,
    },
    {
        path: '/payment-fail/:id',
        element: <PaymentFail></PaymentFail>,
    },
    {
        path: '*',
        element: <NotFound></NotFound>,
    }
]);
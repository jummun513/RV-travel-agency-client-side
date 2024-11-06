import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import { useQuery } from "react-query";
import './BookingReview.css';
import { useContext, useState } from "react";
import { AuthContextPG } from "../../../../../providers/AuthProviderPG";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../../providers/AuthProvider";

const BookingReview = () => {
    const pgToken = localStorage.getItem('pg_access_token');
    const token = localStorage.getItem('access_token');
    const orderId = useParams();
    const { PGuser } = useContext(AuthContextPG);
    const { Guser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const successNotify = () => toast.success("Successfully! submitted.", { theme: "light" });

    // pg_user single order
    const { data: orderPg = [], isPgDataLoading } = useQuery(['order'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders/pg-user/${orderId.orderId}`,
            {
                headers: {
                    authorization: `Bearer ${pgToken}`,
                }
            });
        return res.json();
    }, { enabled: (PGuser ? true : false) });

    // guser single order
    const { data: orderUser = [], isUserDataLoading } = useQuery(['order'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders/user/${orderId.orderId}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
        return res.json();
    }, { enabled: (Guser ? true : false) });

    if (isPgDataLoading || isUserDataLoading) {
        return <Loading></Loading>
    }

    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    const handlePGSubmit = async (e) => {
        e.preventDefault();

        if (orderPg?.data?.isOrder === true) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/orders/pg-user/request-for-booked/${orderId?.orderId}`, { data: null }, {
                headers: {
                    authorization: `Bearer ${pgToken}`,
                }
            });
            if (response?.data?.data?.modifiedCount === 1) {
                successNotify();
                navigate('/dashboard/my-order-history/hotel-booked');
            }
            setLoading(false);

        } catch (error) {
            errorNotify();
            setLoading(false);
        }
    }

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        if (orderUser?.data?.isPaid === true) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/orders/user/payment/${orderId?.orderId}`, { data: null }, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            if (response?.data?.success == true) {
                setLoading(false);
                window.location.replace(response?.data?.data?.url);
            }
            setLoading(false);
        } catch (error) {
            errorNotify();
            setLoading(false);
        }
    }

    // currency add commas
    const addCommas = (number) => {
        const numberString = number.toString();
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    let sum = 0;

    return (
        <div id="customScrollBar" className="bg-[#fbfbfb] py-[45px] xxs:py-[64px] lg:py-[74px] xl:py-[100px] 3xl:py-[106px]">
            <Helmet>
                <title>Booking Review | Royal Venture Limited</title>
            </Helmet>
            {
                PGuser &&
                <div className="bg-white my-10 sm:my-14 md:my-16 lg:my-20 shadow-md sm:shadow-lg py-5 xxs:py-8 sm:py-10 md:py-14 xs:px-4 sm:px-10 md:px-14 2xl:shadow-2xl relative mx-3 sm:mx-8 md:mx-auto md:max-w-screen-sm xl:max-w-screen-lg 3xl:max-w-screen-2xl">
                    <h3 className="mt-5 mb-5 text-center text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-gray-900">Review Once Again</h3>
                    <div className=" mt-4 xxs:mt-7 sm:mt-10 3xl:mt-16 mb-3 xxs:mb-5 sm:mb-7 3xl:mb-10 px-2 xs:px-5">
                        <h4 className="text-primary font-semibold text-sm xs:text-base sm:text-lg xl:text-2xl"><span className="text-gray-700 text-sm xxs:text-base sm:text-lg xl:text-2xl">Hotel Name: </span>{orderPg?.data?.hotelId?.hotelName}</h4>
                        <p className="text-gray-700 font-semibold mt-3 sm:mt-5">Booking No: <span className="font-normal">{orderPg?.data?.bookingNo}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Booked Name: <span className="font-normal">{orderPg?.data?.userId?.fullName}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Contact No: <span className="font-normal">{orderPg?.data?.emergencyContact || orderPg.data?.userId?.mobileNo}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Check In: <span className="font-normal text-red-500">{convertDate(orderPg?.data?.checkIn)}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Check Out: <span className="font-normal text-red-500">{convertDate(orderPg?.data?.checkOut)}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Guest: <span className="font-normal">Children: {orderPg?.data?.childrenGuest}, Adult: {orderPg?.data?.adultGuest}, Total: {orderPg?.data?.totalGuest}</span></p>
                    </div>
                    {
                        orderPg?.data === null ?
                            <div className="text-gray-600 font-semibold flex item-center justify-center mt-12 md:mt-24">Nothing Found!</div>
                            :
                            <div className="relative overflow-x-auto sm:overflow-x-hidden">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <tbody>
                                        <tr className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                            <th scope="col" className="px-3 sm:px-6 py-3 xxs:py-4 font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Room
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 py-3 xxs:py-4 text-center font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 py-3 xxs:py-4 text-center font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Unit Price (&#2547;) <small>per night</small>
                                            </th>
                                            <th scope="col" className="text-right px-3 sm:px-6 py-3 xxs:py-4 font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Price (&#2547;)
                                            </th>
                                        </tr>
                                        {
                                            orderPg?.data?.hotelId?.rooms?.map((d, i) => {
                                                if (orderPg?.data?.selectedRooms?.[i]?.isSelected === true) {
                                                    sum = sum + parseFloat(d?.discountPrice) * orderPg?.data?.selectedRooms?.[i].quantity;
                                                    return (
                                                        <tr key={i} className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800">
                                                                {d?.name}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                                {orderPg?.data?.selectedRooms?.[i].quantity}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                                {addCommas(d?.discountPrice)}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-right">
                                                                {addCommas(parseFloat(d?.discountPrice) * orderPg?.data?.selectedRooms?.[i].quantity)}/-
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                        <tr className="bg-white border-b w-[200px] whitespace-nowrap xxs:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                            <td colSpan={4} className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-950 font-bold text-right">
                                                <span className="mr-5">Total =</span> {addCommas(sum)}/-
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                    }
                    {
                        !orderPg?.data?.isOrder &&
                        <form onSubmit={(e) => handlePGSubmit(e)}>
                            {/* Refund policy agreement */}
                            <div className="mt-8 sm:mt-12 min-h-[1.5rem] pl-[1.5rem] flex justify-between items-center px-2">
                                <div className='flex items-center ml-2'>
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[3px] xs:mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                                        type="checkbox"
                                        value=""
                                        id="loginCheckboxDefault" required />
                                    <label
                                        className="inline-block pl-[0.15rem] text-gray-600 hover:cursor-pointer"
                                        htmlFor="loginCheckboxDefault">
                                        Agree with Refund & Cancellation Policy?
                                    </label>
                                </div>
                                <div>
                                    <p className='cursor-pointer hover:underline text-blue-600'><Link to='/refund&cancellation'>Read Here...</Link></p>
                                </div>
                            </div>

                            {/* submit and loading button */}
                            <div className='mt-8 xxs:mt-10 sm:mt-16 text-end mr-3 xs:mr-0'>
                                {
                                    loading ?
                                        <button disabled type="button" className="rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 inline-flex items-center">
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Processing...
                                        </button>
                                        :
                                        <button type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                            Request for reservation
                                        </button>
                                }
                            </div>
                        </form>
                    }
                </div>
            }
            {
                Guser &&
                <div className="bg-white my-10 sm:my-14 md:my-16 lg:my-20 shadow-md sm:shadow-lg py-5 xxs:py-8 sm:py-10 md:py-14 xs:px-4 sm:px-10 md:px-14 2xl:shadow-2xl relative mx-3 sm:mx-8 md:mx-auto md:max-w-screen-sm xl:max-w-screen-lg 3xl:max-w-screen-2xl">
                    <h3 className="mt-5 mb-5 text-center text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-gray-900">Review Once Again</h3>
                    <div className=" mt-4 xxs:mt-7 sm:mt-10 3xl:mt-16 mb-3 xxs:mb-5 sm:mb-7 3xl:mb-10 px-2 xs:px-5">
                        <h4 className="text-primary font-semibold text-sm xs:text-base sm:text-lg xl:text-2xl mb-3 sm:mb-5"><span className="text-gray-700 text-sm xxs:text-base sm:text-lg xl:text-2xl">Hotel Name: </span>{orderUser?.data?.hotelId?.hotelName}</h4>
                        {
                            orderUser?.data?.isPaid &&
                            <p className="text-gray-700 font-semibold">Transaction Id: <span className="font-medium text-red-500">{orderUser?.data?.transactionId}</span> <span className="font-medium text-green-500">(Paid)</span></p>
                        }
                        <p className="text-gray-700 font-semibold">Booking No: <span className="font-normal">{orderUser?.data?.bookingNo}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Booked Name: <span className="font-normal">{orderUser?.data?.userId?.name}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Contact No: <span className="font-normal">{orderUser?.data?.emergencyContact}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Check In: <span className="font-normal text-red-500">{convertDate(orderUser?.data?.checkIn)}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Check Out: <span className="font-normal text-red-500">{convertDate(orderUser?.data?.checkOut)}</span></p>
                        <p className="text-gray-700 font-semibold mt-1">Guest: <span className="font-normal">Children: {orderUser?.data?.childrenGuest}, Adult: {orderUser?.data?.adultGuest}, Total: {orderUser?.data?.totalGuest}</span></p>
                    </div>
                    {
                        orderUser?.data === null ?
                            <div className="text-gray-600 font-semibold flex item-center justify-center mt-12 md:mt-24">Nothing match!</div>
                            :
                            <div className="relative overflow-x-auto sm:overflow-x-hidden">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <tbody>
                                        <tr className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                            <th scope="col" className="px-3 sm:px-6 py-3 xxs:py-4 font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Room
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 py-3 xxs:py-4 text-center font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 py-3 xxs:py-4 text-center font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Unit Price (&#2547;) <small>per night</small>
                                            </th>
                                            <th scope="col" className="text-right px-3 sm:px-6 py-3 xxs:py-4 font-semibold text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Price (&#2547;)
                                            </th>
                                        </tr>
                                        {
                                            orderUser?.data?.hotelId?.rooms?.map((d, i) => {
                                                if (orderUser?.data?.selectedRooms?.[i]?.isSelected === true) {
                                                    sum = sum + parseFloat(d?.discountPrice) * orderUser?.data?.selectedRooms?.[i].quantity;
                                                    return (
                                                        <tr key={i} className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800">
                                                                {d?.name}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                                {orderUser?.data?.selectedRooms?.[i].quantity}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                                {addCommas(d?.discountPrice)}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-right">
                                                                {addCommas(parseFloat(d?.discountPrice) * orderUser?.data?.selectedRooms?.[i].quantity)}/-
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                        <tr className="bg-white border-b w-[200px] whitespace-nowrap xxs:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                            <td colSpan={4} className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-950 font-bold text-right">
                                                {orderUser?.data?.isPaid && <span>(<span className="font-medium text-green-500">Paid</span>)</span>}<span className="ms-2 mr-5">Total =</span> {addCommas(sum)}/-
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                    }

                    {
                        !orderUser?.data?.isPaid &&
                        <form onSubmit={(e) => handleUserSubmit(e)}>
                            {/* Refund policy agreement */}
                            <div className="mt-8 sm:mt-12 min-h-[1.5rem] pl-[1.5rem] flex justify-between items-center px-2">
                                <div className='flex items-center ml-2'>
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[3px] xs:mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                                        type="checkbox"
                                        value=""
                                        id="loginCheckboxDefault" required />
                                    <label
                                        className="inline-block pl-[0.15rem] text-gray-600 hover:cursor-pointer"
                                        htmlFor="loginCheckboxDefault">
                                        Agree with Refund & Cancellation Policy?
                                    </label>
                                </div>
                                <div>
                                    <p className='cursor-pointer hover:underline text-blue-600'><Link to='/refund&cancellation'>Read Here...</Link></p>
                                </div>
                            </div>

                            {/* submit and loading button */}
                            <div className='mt-8 xxs:mt-10 sm:mt-16 text-end mr-3 xs:mr-0'>
                                {
                                    loading ?
                                        <button disabled type="button" className="rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 inline-flex items-center">
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Processing...
                                        </button>
                                        :
                                        <button type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                            Proceed To Pay
                                        </button>
                                }
                            </div>
                        </form>
                    }
                </div>
            }
        </div>
    );
};

export default BookingReview;
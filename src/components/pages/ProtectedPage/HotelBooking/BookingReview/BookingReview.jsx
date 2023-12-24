import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import { useQuery } from "react-query";
import './BookingReview.css';
import { useContext } from "react";
import { AuthContextPG } from "../../../../../providers/AuthProviderPG";

const BookingReview = () => {
    const pgToken = localStorage.getItem('pg_access_token');
    const orderId = useParams();
    const { PGuser } = useContext(AuthContextPG);
    let loading;

    // get single order by id
    const { data: order = [], isLoading } = useQuery(['order'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders/${orderId.orderId}`,
            {
                headers: {
                    authorization: `Bearer ${pgToken}`,
                }
            });
        return res.json();
    })
    const { data: hotels = [], isLoadingHotel } = useQuery(['hotels'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels`);
        return res.json();
    })

    if (isLoading || isLoadingHotel) {
        return <Loading></Loading>
    }

    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    const selectedHotel = (hotels?.find(item => (item._id === order.data?.hotelId)));

    let sum = 0;

    return (
        <div id="customScrollBar" className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>Booking Review | Royal Venture Limited</title>
            </Helmet>
            <div className="bg-white mt-14 mb-10 sm:my-20 md:mt-24 md:mb-24 shadow-md sm:shadow-lg py-5 xxs:py-8 sm:py-10 md:py-14 xs:px-4 sm:px-10 md:px-14 2xl:shadow-2xl relative mx-3 sm:mx-8 md:mx-auto md:max-w-screen-sm xl:max-w-screen-lg 3xl:max-w-screen-2xl">
                <h3 className="mt-5 mb-5 text-center text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-gray-900">Review Once Again</h3>
                <div className=" mt-4 xxs:mt-7 sm:mt-10 3xl:mt-16 mb-3 xxs:mb-5 sm:mb-7 3xl:mb-10 px-2 xs:px-5">
                    <h4 className="text-primary font-semibold text-sm xs:text-base sm:text-lg xl:text-2xl"><span className="text-gray-700 text-sm xxs:text-base sm:text-lg xl:text-2xl">Hotel Name: </span>{selectedHotel?.hotelName}</h4>
                    <p className="text-gray-700 font-semibold mt-3 sm:mt-5">Booking No: <span className="font-normal">{order.data?.bookingNo}</span></p>
                    <p className="text-gray-700 font-semibold mt-1">Booked Name: <span className="font-normal">{PGuser.name}</span></p>
                    <p className="text-gray-700 font-semibold mt-1">Contact No: <span className="font-normal">{PGuser.mobile}</span></p>
                    <p className="text-gray-700 font-semibold mt-1">Check In: <span className="font-normal text-red-500">{convertDate(order.data.checkIn)}</span></p>
                    <p className="text-gray-700 font-semibold mt-1">Check Out: <span className="font-normal text-red-500">{convertDate(order.data.checkOut)}</span></p>
                    <p className="text-gray-700 font-semibold mt-1">Guest: <span className="font-normal">Children: {order.data.childrenGuest}, Adult: {order.data.adultGuest}, Total: {order.data.totalGuest}</span></p>

                </div>
                {
                    order.data === null ?
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
                                        selectedHotel?.rooms?.map((d, i) => {
                                            if (order.data.selectedRooms[i]?.isSelected === true) {
                                                sum = sum + parseFloat(d.price) * order.data.selectedRooms[i].quantity;
                                                return (
                                                    <tr key={i} className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800">
                                                            {d.name}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                            {order.data.selectedRooms[i].quantity}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                            {d.price}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-right">
                                                            {parseFloat(d.price) * order.data.selectedRooms[i].quantity}/-
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                    <tr className="bg-white border-b w-[200px] whitespace-nowrap xxs:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                        <td colSpan={4} className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-950 font-bold text-right">
                                            <span className="mr-5">Total =</span> {sum}/-
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                }
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
                            (
                                (order?.data?.isPaid === true) ?
                                    <button onClick={() => alert('Our providers will contact with you.')} type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                        Booked Again
                                    </button>
                                    :
                                    <button onClick={() => alert('Our providers will contact with you.')} type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                        Proceed To Pay
                                    </button>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default BookingReview;
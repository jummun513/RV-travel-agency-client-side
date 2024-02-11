import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loading from '../../../../shared/Loading/Loading';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotFound from '../../../../shared/NotFound/NotFound';
import userImg from '../../../../../assets/images/user.svg';
import Swal from 'sweetalert2';

const BookedHotel = () => {
    const token = localStorage.getItem('access_token');
    const [loading, setLoading] = useState(false);
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const successNotify = () => toast.success("Successfully updated!", { theme: "light" });
    const acceptNotify = () => toast.warn("Fist Accept the order!", { theme: "light" });

    const { data: pgAllOrders = [], isPgLoading, isPgError, refetch: pgDataRefetch } = useQuery(['pgAllOrders'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders/pg-orders`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    });

    const { data: userAllOrders = [], isUserLoading, isUserError } = useQuery(['userAllOrders'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders/user-orders`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    });

    const isAcceptedData = pgAllOrders?.data?.filter(d => (d?.isAccept === true && d?.isCancel === false && d?.isConfirmed === false));
    const isConfirmedData = pgAllOrders?.data?.filter(d => (d?.isConfirmed === true && d?.isCancel === false));
    const isCanceledData = pgAllOrders?.data?.filter(d => (d?.isCancel === true && d?.isConfirmed === false));

    const isAcceptedUserData = userAllOrders?.data?.filter(d => d.isAccept === true);
    const isConfirmedUserData = userAllOrders?.data?.filter(d => d.isConfirmed === true);
    const isCanceledUserData = userAllOrders?.data?.filter(d => d.isCancel === true);

    useEffect(() => { }, [isAcceptedData, isCanceledData, isConfirmedData])

    if (isPgLoading || isUserLoading || loading) {
        return <Loading></Loading>
    }

    if (isPgError || isUserError) {
        return <NotFound></NotFound>
    }

    const acceptOrder = async (id) => {
        try {
            setLoading(true);
            const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/orders/accept/${id}`, {}, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })

            if (response?.data?.data?.modifiedCount === 1) {
                setLoading(false);
                successNotify();
                pgDataRefetch();
            }
        } catch (error) {
            errorNotify();
            setLoading(false);
        }
    }

    const confirmOrder = async (id) => {
        try {
            setLoading(true);
            const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/orders/confirm/${id}`, {}, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })

            if (response?.data?.data?.modifiedCount === 1) {
                setLoading(false);
                successNotify();
                pgDataRefetch();
            }

            if (response?.data?.message === 'first-accept') {
                setLoading(false);
                acceptNotify();
            }
        } catch (error) {
            errorNotify();
            setLoading(false);
        }
    }

    const cancelOrder = async (id) => {
        try {
            const { value: text } = await Swal.fire({
                title: "Cancel Remarks",
                input: "text",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "Remarks must be included.";
                    }
                }
            });
            if (text) {
                setLoading(true);
                const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/orders/cancel/${id}`, { remark: text }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })

                if (response?.data?.data?.modifiedCount === 1) {
                    setLoading(false);
                    successNotify();
                    pgDataRefetch();
                }

                if (response?.data?.message === 'first-accept') {
                    setLoading(false);
                    acceptNotify();
                }
            }
        } catch (error) {
            errorNotify();
            setLoading(false);
        }
    }

    const acceptUserOrder = (id) => {
        alert(`This is not ready yet ${id}`);
    }

    const confirmUserOrder = (id) => {
        alert(`This is not ready yet ${id}`);
    }

    const cancelUserOrder = (id) => {
        alert(`This is not ready yet ${id}`);
    }


    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">All Booked Hotel</h2>

            <Tabs className='mt-5'>
                <TabList className='flex items-end justify-center'>
                    <Tab className='px-5 py-2 outline-none rounded focus:ring-4 focus:ring-[#ffb700ac] bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer'>PG Orders</Tab>
                    <Tab className='px-5 py-2 outline-none rounded focus:ring-4 focus:ring-[#ffb700ac] bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer ml-3'>User Orders</Tab>
                </TabList>
                <TabPanel>
                    <Tabs className='mt-10'>
                        <TabList className='flex items-center'>
                            <span className='text-gray-800 font-bold me-4'>FILTER BY : </span>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Ordered</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Accepted</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Confirmed</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer'>Canceled</Tab>
                        </TabList>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder} mapData={pgAllOrders?.data}></DynamicTab>
                        </TabPanel>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder} mapData={isAcceptedData}></DynamicTab>
                        </TabPanel>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder} mapData={isConfirmedData}></DynamicTab>
                        </TabPanel>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmOrder} acceptOrder={acceptOrder} cancelOrder={cancelOrder} mapData={isCanceledData}></DynamicTab>
                        </TabPanel>
                    </Tabs>
                </TabPanel>

                <TabPanel>
                    <Tabs className='mt-10'>
                        <TabList className='flex items-center'>
                            <span className='text-gray-800 font-bold me-4'>FILTER BY : </span>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Ordered</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Accepted</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Confirmed</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer'>Canceled</Tab>
                        </TabList>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmUserOrder} acceptOrder={acceptUserOrder} cancelOrder={cancelUserOrder} mapData={userAllOrders?.data}></DynamicTab>
                        </TabPanel>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmUserOrder} acceptOrder={acceptUserOrder} cancelOrder={cancelUserOrder} mapData={isAcceptedUserData}></DynamicTab>
                        </TabPanel>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmUserOrder} acceptOrder={acceptUserOrder} cancelOrder={cancelUserOrder} mapData={isConfirmedUserData}></DynamicTab>
                        </TabPanel>
                        <TabPanel>
                            <DynamicTab confirmOrder={confirmUserOrder} acceptOrder={acceptUserOrder} cancelOrder={cancelUserOrder} mapData={isCanceledUserData}></DynamicTab>
                        </TabPanel>
                    </Tabs>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default BookedHotel;

const DynamicTab = ({ mapData, confirmOrder, acceptOrder, cancelOrder }) => {
    const [currentData, setCurrentData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Calculate the sum when selectedRooms or hotel.rooms change
        const sum = currentData?.order?.hotelId?.rooms?.reduce((total, room, i) => {
            if (currentData?.order?.selectedRooms?.[i]?.isSelected === true) {
                const roomPrice = parseFloat(room?.discountPrice) * currentData?.order?.selectedRooms?.[i]?.quantity;
                return total + roomPrice;
            }
            return total;
        }, 0);
        // Update the currentData state with the new sum
        setCurrentData(prevData => ({ ...prevData, sum }));
    }, [currentData?.sum, currentData?.order]);

    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    function formatTimeWithSeconds(inputDate) {
        // Create a Date object from the input string
        const date = new Date(inputDate);

        // Format the time with seconds in 12-hour format
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        return formattedTime;
    }

    const openModal = (d) => {
        setCurrentData({ order: d, sum: 0 });
        document.getElementById('my_modal_6').showModal();
    }

    // currency add commas
    const addCommas = (number) => {
        if (number) {
            const numberString = number.toString();
            return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    return (
        <div>
            <div className="flex flex-col xxs:flex-row justify-between items-center mt-12">
                <div className="w-2/5 me-5">
                    <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {mapData?.data?.length}</p>
                </div>
                <div className="w-3/5">
                    <form>
                        <div className="flex">
                            <div className="relative w-full">
                                <input type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by user email or hotel name" required />
                                <button disabled type="submit" className="absolute top-0 right-0 h-full p-1.5 xxs:p-2.5 text-sm font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary">
                                    <svg className="w-4 h-4 text-gray-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-10">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-3 md:px-6 py-4">
                                    Hotel
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4">
                                    Order By
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4">
                                    Issue Date
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4">
                                    Status
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4 text-end">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mapData && mapData?.map((d, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-t border-t-gray-600 hover:bg-gray-50">
                                            <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                <p onClick={() => navigate(`/hotel-details/${d?.hotelId?._id}`)} className="md:text-base font-semibold cursor-pointer text-blue-500 hover:underline">{d?.hotelId?.hotelName}</p>
                                                <p className="font-normal text-gray-600">{d?.hotelId?.location?.city}</p>
                                            </td>
                                            {
                                                d?.userId?.fullName ?
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                        <p onClick={() => navigate(`/admin-panel/manage-privileged-guest/individual-user-profile/${d?.userId?._id}`)} className="md:text-base font-semibold cursor-pointer text-blue-500 hover:underline">{d?.userId?.fullName}</p>
                                                        <p className="font-normal text-gray-600">{d?.userId?.mobileNo}</p>
                                                    </td>
                                                    :
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                        <p className="md:text-base font-semibold text-gray-800">{d?.userId?.name}</p>
                                                        <p className="font-normal text-gray-600">{d?.emergencyContact}</p>
                                                    </td>
                                            }

                                            <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                <p>{convertDate(d?.createdAt)}</p>
                                                <p>{formatTimeWithSeconds(d?.createdAt)}</p>
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 whitespace-nowrap">
                                                {
                                                    d.isConfirmed ? <p className="font-medium text-green-500 text-center">Confirmed</p> : (d.isCancel ? <p className="font-medium text-red-500 text-center">Canceled</p> : (d.isAccept ? <p className="font-medium text-green-500 text-center">Accepted</p> : <p className="font-medium text-center text-gray-700">Pending</p>))
                                                }
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end whitespace-nowrap">
                                                <button className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-50 bg-green-600 border-none hover:bg-green-500 xs:me-2 me-1" onClick={() => openModal(d)}>Details</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal content */}
            <dialog id="my_modal_6" className="modal">
                <div className="modal-box bg-[#fbfbfb] max-w-screen-lg">
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm md:btn-md btn-circle bg-primary border-none text-gray-950 hover:bg-secondary absolute right-4 top-4">✕</button>
                        </form>
                    </div>
                    <h3 className="font-bold text-xl 2xl:text-xl 3xl:text-2xl text-gray-900 text-center">Booking Details</h3>
                    <p className='text-center font-semibold text-gray-800 mt-5'>Booking Status: <span className={`font-bold ${currentData?.order?.isConfirmed ? 'text-green-600' : (currentData?.order?.isCancel ? 'text-red-500' : (currentData?.order?.isAccept ? 'text-green-600' : 'text-red-500'))}`}>{currentData?.order?.isConfirmed ? 'Confirmed' : (currentData?.order?.isCancel ? 'Canceled' : (currentData?.order?.isAccept ? 'Accepted' : 'Pending'))}</span></p>
                    <p className='text-center font-semibold text-gray-800 mt-1'>Booking No: <span className='font-normal'>{currentData?.order?.bookingNo}</span></p>
                    <p className='text-center font-semibold text-gray-800 mt-1'>Booking Time: <span className='font-normal'>{convertDate(currentData?.order?.createdAt)} (At: {formatTimeWithSeconds(currentData?.order?.createdAt)})</span></p>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h4 className='text-center text-semibold text-xl font-bold text-gray-950 mt-10'>Ordered Hotel</h4>
                            <div className='flex justify-between items-center border-2 py-2 px-3 mt-2'>
                                <div className='mr-3'>
                                    <h5 className='text-gray-800 font-semibold text-lg'>{currentData?.order?.hotelId?.hotelName}</h5>
                                    <p className='text-gray-600'>{currentData?.order?.hotelId?.location?.city}</p>
                                    <p className='text-gray-600'>{currentData?.order?.hotelId?.location?.country}</p>
                                    <button onClick={() => navigate(`/hotel-details/${currentData?.order?.hotelId?._id}`)} className='btn btn-sm border none bg-primary hover:bg-secondary text-gray-950 border-none mt-2'>Details</button>
                                </div>
                                <div>
                                    <img className='h-40' src={currentData?.order?.hotelId?.thumbnail && currentData?.order?.hotelId?.thumbnail?.[0]?.thumbnailUrl} alt={`${currentData?.order?.hotelId?.hotelName} image`} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className='text-center text-semibold text-xl font-bold text-gray-950 mt-10'>Ordered By</h4>
                            <div className='flex justify-between items-center border-2 py-2 px-3 mt-2'>
                                <div className='mr-3'>
                                    <h5 className='text-gray-800 font-semibold text-lg'>{currentData?.order?.userId?.fullName ? currentData?.order?.userId?.fullName : currentData?.order?.userId?.name}</h5>
                                    <p className='text-gray-600'>{currentData?.order?.userId?.email}</p>
                                    <p className='text-gray-600'>{currentData?.order?.userId?.mobileNo ? currentData?.order?.userId?.mobileNo : currentData?.order?.emergencyContact}</p>
                                    {
                                        currentData?.order?.userId?.fullName && <button onClick={() => navigate(`/admin-panel/manage-privileged-guest/individual-user-profile/${currentData?.order?.userId?._id}`)} className='btn btn-sm border none bg-primary hover:bg-secondary text-gray-950 border-none mt-2'>Details</button>
                                    }
                                </div>
                                <div>
                                    <img className='h-40' src={currentData?.order?.userId?.avatar?.[0]?.thumbnailUrl ? currentData?.order?.userId?.avatar?.[0]?.thumbnailUrl : userImg} alt={`${currentData?.order?.userId?.fullName ? currentData?.order?.userId?.fullName : 'user'} image`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-16 text-gray-700'>
                        <h4 className='text-gray-800 font-semibold text-xl mb-3'>More Details</h4>
                        <p className='mb-1 font-bold'>Check In: <span className='font-semibold text-red-600'>{convertDate(currentData?.order?.checkIn)}</span></p>
                        <p className='mb-1 font-bold'>Check Out: <span className='font-semibold text-red-600'>{convertDate(currentData?.order?.checkOut)}</span></p>
                        <p className='mb-1 font-bold'>Guest Number</p>
                        <div className='mb-2 border px-3 py-2 w-40'>
                            <p>Children: <span className='font-semibold'>{currentData?.order?.childrenGuest}</span></p>
                            <p>Adult: <span className='font-semibold'>{currentData?.order?.adultGuest}</span></p>
                            <p className='font-bold'>Total: <span className='font-semibold text-red-600'>{currentData?.order?.totalGuest}</span></p>
                        </div>
                        <p className='font-bold'>Emergency Contact: <span className='font-semibold'>{(currentData?.order?.emergencyContact || currentData?.order?.emergencyContact === '') ? currentData?.order?.emergencyContact : currentData?.order?.userId?.mobileNo}</span></p>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 mt-16">
                        <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
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
                        </thead>
                        <tbody>
                            {
                                currentData?.order?.hotelId?.rooms?.map((a, i) => {
                                    if (currentData?.order?.selectedRooms?.[i]?.isSelected === true) {
                                        return (
                                            <tr key={i} className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                                <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800">
                                                    {a?.name}
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                    {currentData?.order?.selectedRooms?.[i]?.quantity}
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                    {addCommas(parseFloat(a?.discountPrice))}
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-right">
                                                    {addCommas(parseFloat(a?.discountPrice) * currentData?.order?.selectedRooms?.[i]?.quantity)}/-
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            <tr className="bg-white border-b w-[200px] whitespace-nowrap xxs:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                <td colSpan={4} className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-950 font-bold text-right">
                                    <span className="mr-5">Total =</span> {addCommas(currentData?.sum)}/-
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='mt-8 text-end'>
                        <button disabled={currentData?.order?.isAccept || currentData?.order?.isConfirmed || currentData?.order?.isCancel} onClick={() => { document.getElementById('my_modal_6').close(); acceptOrder(currentData?.order?._id) }} className='btn btn-sm lg:btn-md border-none text-gray-950 bg-primary hover:bg-secondary me-2'>Accept</button>
                        <button disabled={currentData?.order?.isConfirmed || currentData?.order?.isCancel} onClick={() => { document.getElementById('my_modal_6').close(); confirmOrder(currentData?.order?._id) }} className='btn btn-sm lg:btn-md border-none text-gray-50 bg-green-600 hover:bg-green-500 me-2'>Confirm</button>
                        <button disabled={currentData?.order?.isConfirmed || currentData?.order?.isCancel} onClick={() => { document.getElementById('my_modal_6').close(); cancelOrder(currentData?.order?._id) }} className='btn btn-sm lg:btn-md border-none text-gray-50 bg-red-600 hover:bg-red-500'>Cancel</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loading from '../../../../shared/Loading/Loading';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const BookedHotel = () => {
    const token = localStorage.getItem('access_token');
    const [currentData, setCurrentData] = useState({ hotel: {}, order: {}, index: 0, user: {}, sum: 0 });
    const navigate = useNavigate();
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const { data: allOrders = [], isLoading, refetch } = useQuery(['allOrders'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    })
    const { data: hotels = [], isLoadingHotel } = useQuery(['hotels'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels`);
        return res.json();
    })

    const { data: pg_users = [], isPgLoading } = useQuery(['pg_users'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    })

    useEffect(() => {
        // Calculate the sum when selectedRooms or hotel.rooms change
        const sum = currentData?.hotel?.rooms?.reduce((total, room, i) => {
            if (currentData?.order?.selectedRooms[i]?.isSelected === true) {
                const roomPrice = parseFloat(room.price) * currentData.order.selectedRooms[i]?.quantity;
                return total + roomPrice;
            }
            return total;
        }, 0);

        // Update the currentData state with the new sum
        setCurrentData(prevData => ({ ...prevData, sum }));
    }, [currentData.order.selectedRooms, currentData.hotel.rooms]);


    if (isLoading || isLoadingHotel || isPgLoading) {
        return <Loading></Loading>
    }

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

    const handleDeleteOrder = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This order will be permanently deleted from database and can not be recovered.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_clientSideLink}/api/orders/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }).then(response => {
                    if (response?.data?.data.deletedCount === 1) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                    else {
                        errorNotify();
                    }
                })
            }
        })
    }

    const confirmOrder = (id) => {
        console.log(id);
        axios.patch(`${import.meta.env.VITE_clientSideLink}/api/orders/delivered/${id}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                if (response?.data?.data.modifiedCount === 1) {
                    refetch();
                }
                else {
                    errorNotify();
                }
            })
    }

    const paidOrders = allOrders.data.filter(i => i.isPaid === true);
    const unpaidOrders = allOrders.data.filter(i => i.isPaid === false);

    const openModal = (selectedHotel, d, i, user) => {
        setCurrentData({ hotel: selectedHotel, order: d, index: i, user: user, sum: 0 });
        document.getElementById('my_modal_1').showModal();
    }

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">All Booked Hotel</h2>

            <Tabs className='mt-5'>
                <TabList className='flex items-end justify-center'>
                    <Tab className='px-5 py-2 outline-none rounded focus:ring-4 focus:ring-[#ffb700ac] bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer'>Paid</Tab>
                    <Tab className='px-5 py-2 outline-none rounded focus:ring-4 focus:ring-[#ffb700ac] bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer ml-3'>Unpaid</Tab>
                </TabList>
                <TabPanel>
                    <div className="flex flex-col xxs:flex-row justify-between items-center mt-16">
                        <div className="w-2/5 me-5">
                            <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {paidOrders?.length}</p>
                        </div>
                        <div className="w-3/5">
                            <form>
                                <div className="flex">
                                    <div className="relative w-full">
                                        <input type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by email or name" required />
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
                                        <th scope="col" className="px-3 md:px-6 py-4 text-end">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paidOrders?.map((d, i) => {
                                            const selectedHotel = (hotels?.find(item => (item._id === d?.hotelId)));
                                            const user = (pg_users?.find(item => (item._id === d?.userId)));

                                            return (
                                                <tr key={i} className="bg-white border-t border-t-gray-600 hover:bg-gray-50">
                                                    <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                        <p className="md:text-base font-semibold">{selectedHotel?.hotelName}</p>
                                                        <p className="font-normal text-gray-500">{selectedHotel?.location?.city}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                        <p className="md:text-base font-semibold">{user?.name}</p>
                                                        <p className="font-normal text-gray-500">{user?.mobile}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                        <p>{convertDate(d.createdAt)}</p>
                                                        <p>{formatTimeWithSeconds(d.createdAt)}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end whitespace-nowrap">
                                                        <button disabled={!selectedHotel} className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-50 bg-green-600 border-none hover:bg-green-500 xs:me-2 me-1" onClick={() => openModal(selectedHotel, d, i, user)}>Details</button>
                                                        <button onClick={() => confirmOrder(d._id)} disabled={!selectedHotel || d.isDelivered} className={`btn btn-xs xs:btn-sm 2xl:btn-md text-gray-950 ${d.isDelivered ? '' : 'bg-primary border-none hover:bg-secondary'}`}>{d.isDelivered ? 'Confirmed' : 'Confirm'}</button>
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
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box bg-[#fbfbfb] max-w-screen-lg">
                            <h3 className="font-bold text-xl 2xl:text-xl 3xl:text-2xl text-gray-900 text-center">Booking Details</h3>
                            <p className='text-center font-semibold text-gray-800 mt-5'>Booking Status: <span className={`font-bold ${currentData?.order?.isPaid === true ? 'text-green-600' : 'text-red-500'}`}>{currentData?.order?.isPaid === true ? 'Paid' : 'Not Paid'}</span></p>
                            <p className='text-center font-semibold text-gray-800 mt-1'>Booking No: <span className='font-normal'>{currentData?.order?.bookingNo}</span></p>
                            <p className='text-center font-semibold text-gray-800 mt-1'>Booking Time: <span className='font-normal'>{convertDate(currentData?.order?.createdAt)} (At: {formatTimeWithSeconds(currentData?.order?.createdAt)})</span></p>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h4 className='text-center text-semibold text-xl font-bold text-gray-950 mt-10'>Ordered Hotel</h4>
                                    <div className='flex justify-between items-center border-2 py-2 px-3 mt-2'>
                                        <div className='mr-3'>
                                            <h5 className='text-gray-800 font-semibold text-lg'>{currentData?.hotel?.hotelName}</h5>
                                            <p className='text-gray-600'>{currentData?.hotel?.location?.city}</p>
                                            <p className='text-gray-600'>{currentData?.hotel?.location?.country}</p>
                                            <button onClick={() => navigate(`/hotel-detail/${currentData?.hotel?._id}`)} className='btn btn-sm border none bg-primary hover:bg-secondary text-gray-950 border-none mt-1'>Details</button>
                                        </div>
                                        <div>
                                            <img className='h-40' src={currentData?.hotel?.thumbnail && currentData?.hotel?.thumbnail[0]?.thumbnailUrl} alt={`${currentData?.hotel?.hotelName} image`} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className='text-center text-semibold text-xl font-bold text-gray-950 mt-10'>Ordered By</h4>
                                    <div className='flex justify-between items-center border-2 py-2 px-3 mt-2'>
                                        <div className='mr-3'>
                                            <h5 className='text-gray-800 font-semibold text-lg'>{currentData?.user?.name}</h5>
                                            <p className='text-gray-600'>{currentData?.user?.register_email}</p>
                                            <p className='text-gray-600'>{currentData?.user?.mobile}</p>
                                            <button onClick={() => navigate(`/admin-panel/manage-privileged-guest/individual-user-profile/${currentData.user._id}`)} className='btn btn-sm border none bg-primary hover:bg-secondary text-gray-950 border-none mt-1'>Details</button>
                                        </div>
                                        <div>
                                            <img className='h-40' src={currentData?.user?.thumb} alt={`${currentData?.hotel?.hotelName} image`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-16 text-gray-700'>
                                <h4 className='text-gray-800 font-semibold text-xl mb-3'>More Details</h4>
                                <p className='mb-1 font-bold'>Check In: <span className='font-semibold text-red-600'>{convertDate(currentData.order.checkIn)}</span></p>
                                <p className='mb-1 font-bold'>Check Out: <span className='font-semibold text-red-600'>{convertDate(currentData.order.checkOut)}</span></p>
                                <p className='mb-1 font-bold'>Guest Number</p>
                                <div className='mb-2 border px-3 py-2 w-40'>
                                    <p>Children: <span className='font-semibold'>{currentData.order.childrenGuest}</span></p>
                                    <p>Adult: <span className='font-semibold'>{currentData.order.adultGuest}</span></p>
                                    <p className='font-bold'>Total: <span className='font-semibold text-red-600'>{currentData.order.totalGuest}</span></p>
                                </div>
                                <p className='font-bold'>Emergency Contact: <span className='font-semibold'>{currentData.order.emergencyContact === '' ? '...' : currentData.order.emergencyContact}</span></p>
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
                                        currentData?.hotel?.rooms?.map((a, i) => {
                                            if (currentData?.order?.selectedRooms[i]?.isSelected === true) {
                                                return (
                                                    <tr key={i} className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800">
                                                            {a.name}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                            {currentData?.order?.selectedRooms[i]?.quantity}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                            {a.price}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-right">
                                                            {parseFloat(a.price) * currentData?.order?.selectedRooms[i]?.quantity}/-
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                    <tr className="bg-white border-b w-[200px] whitespace-nowrap xxs:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                        <td colSpan={4} className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-950 font-bold text-right">
                                            <span className="mr-5">Total =</span> {currentData.sum}/-
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn bg-red-600 hover:bg-red-700 text-slate-50 border-none">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </TabPanel>
                <TabPanel>
                    <div className="flex flex-col xxs:flex-row justify-between items-center mt-16">
                        <div className="w-2/5 me-5">
                            <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {unpaidOrders?.length}</p>
                        </div>
                        <div className="w-3/5">
                            <form>
                                <div className="flex">
                                    <div className="relative w-full">
                                        <input type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by email or name" required />
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
                                        <th scope="col" className="px-3 md:px-6 py-4 text-end">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        unpaidOrders?.map((d, i) => {
                                            const selectedHotel = (hotels?.find(item => (item._id === d?.hotelId)));
                                            const user = (pg_users?.find(item => (item._id === d?.userId)));

                                            return (
                                                <tr key={i} className="bg-white border-t border-t-gray-600 hover:bg-gray-50">
                                                    <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                        <p className="md:text-base font-semibold">{selectedHotel?.hotelName}</p>
                                                        <p className="font-normal text-gray-500">{selectedHotel?.location?.city}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                        <p className="md:text-base font-semibold">{user?.name}</p>
                                                        <p className="font-normal text-gray-500">{user?.mobile}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap">
                                                        <p>{convertDate(d.createdAt)}</p>
                                                        <p>{formatTimeWithSeconds(d.createdAt)}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end whitespace-nowrap">
                                                        <button disabled={!selectedHotel} className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-950 bg-primary border-none hover:bg-secondary xs:me-2 me-1" onClick={() => openModal(selectedHotel, d, i, user)}>Details</button>
                                                        <button onClick={() => handleDeleteOrder(d._id)} disabled={!selectedHotel} className="btn btn-xs xs:btn-sm 2xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
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
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box bg-[#fbfbfb] max-w-screen-lg">
                            <h3 className="font-bold text-xl 2xl:text-xl 3xl:text-2xl text-gray-900 text-center">Booking Details</h3>
                            <p className='text-center font-semibold text-gray-800 mt-5'>Booking Status: <span className={`font-bold ${currentData?.order?.isPaid === true ? 'text-green-600' : 'text-red-500'}`}>{currentData?.order?.isPaid === true ? 'Paid' : 'Not Paid'}</span></p>
                            <p className='text-center font-semibold text-gray-800 mt-1'>Booking No: <span className='font-normal'>{currentData?.order?.bookingNo}</span></p>
                            <p className='text-center font-semibold text-gray-800 mt-1'>Booking Time: <span className='font-normal'>{convertDate(currentData?.order?.createdAt)} (At: {formatTimeWithSeconds(currentData?.order?.createdAt)})</span></p>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h4 className='text-center text-semibold text-xl font-bold text-gray-950 mt-10'>Ordered Hotel</h4>
                                    <div className='flex justify-between items-center border-2 py-2 px-3 mt-2'>
                                        <div className='mr-3'>
                                            <h5 className='text-gray-800 font-semibold text-lg'>{currentData?.hotel?.hotelName}</h5>
                                            <p className='text-gray-600'>{currentData?.hotel?.location?.city}</p>
                                            <p className='text-gray-600'>{currentData?.hotel?.location?.country}</p>
                                            <button onClick={() => navigate(`/hotel-detail/${currentData?.hotel?._id}`)} className='btn btn-sm border none bg-primary hover:bg-secondary text-gray-950 border-none mt-1'>Details</button>
                                        </div>
                                        <div>
                                            <img className='h-40' src={currentData?.hotel?.thumbnail && currentData?.hotel?.thumbnail[0]?.thumbnailUrl} alt={`${currentData?.hotel?.hotelName} image`} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className='text-center text-semibold text-xl font-bold text-gray-950 mt-10'>Ordered By</h4>
                                    <div className='flex justify-between items-center border-2 py-2 px-3 mt-2'>
                                        <div className='mr-3'>
                                            <h5 className='text-gray-800 font-semibold text-lg'>{currentData?.user?.name}</h5>
                                            <p className='text-gray-600'>{currentData?.user?.register_email}</p>
                                            <p className='text-gray-600'>{currentData?.user?.mobile}</p>
                                            <button onClick={() => navigate(`/admin-panel/manage-privileged-guest/individual-user-profile/${currentData.user._id}`)} className='btn btn-sm border none bg-primary hover:bg-secondary text-gray-950 border-none mt-1'>Details</button>
                                        </div>
                                        <div>
                                            <img className='h-40' src={currentData?.user?.thumb} alt={`${currentData?.hotel?.hotelName} image`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-16 text-gray-700'>
                                <h4 className='text-gray-800 font-semibold text-xl mb-3'>More Details</h4>
                                <p className='mb-1 font-bold'>Check In: <span className='font-semibold text-red-600'>{convertDate(currentData.order.checkIn)}</span></p>
                                <p className='mb-1 font-bold'>Check Out: <span className='font-semibold text-red-600'>{convertDate(currentData.order.checkOut)}</span></p>
                                <p className='mb-1 font-bold'>Guest Number</p>
                                <div className='mb-2 border px-3 py-2 w-40'>
                                    <p>Children: <span className='font-semibold'>{currentData.order.childrenGuest}</span></p>
                                    <p>Adult: <span className='font-semibold'>{currentData.order.adultGuest}</span></p>
                                    <p className='font-bold'>Total: <span className='font-semibold text-red-600'>{currentData.order.totalGuest}</span></p>
                                </div>
                                <p className='font-bold'>Emergency Contact: <span className='font-semibold'>{currentData.order.emergencyContact === '' ? '...' : currentData.order.emergencyContact}</span></p>
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
                                        currentData?.hotel?.rooms?.map((a, i) => {
                                            if (currentData?.order?.selectedRooms[i]?.isSelected === true) {
                                                return (
                                                    <tr key={i} className="border-b w-[200px] whitespace-nowrap sm:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800">
                                                            {a.name}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                            {currentData?.order?.selectedRooms[i]?.quantity}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-center">
                                                            {a.price}
                                                        </td>
                                                        <td className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-800 text-right">
                                                            {parseFloat(a.price) * currentData?.order?.selectedRooms[i]?.quantity}/-
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                    <tr className="bg-white border-b w-[200px] whitespace-nowrap xxs:whitespace-normal text-xs xs:text-sm sm:text-md xl:text-base">
                                        <td colSpan={4} className="px-3 sm:px-6 py-3 xxs:py-4 text-gray-950 font-bold text-right">
                                            <span className="mr-5">Total =</span> {currentData.sum}/-
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn bg-red-600 hover:bg-red-700 text-slate-50 border-none">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default BookedHotel;
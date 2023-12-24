import { useContext } from "react";
import { AuthContextPG } from "../../../../../../providers/AuthProviderPG";
import { useQuery } from "react-query";
import Loading from "../../../../../shared/Loading/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HotelBooked = () => {
    const pgToken = localStorage.getItem('pg_access_token');
    const { PGuser } = useContext(AuthContextPG);
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const navigate = useNavigate();
    // get orders by user
    const { data: ordersByUser = [], isLoading, refetch } = useQuery(['ordersByUser'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/orders/my-orders/${PGuser._id}`, {
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

    const removeOrder = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This order will be permanently deleted and can not be recovered.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_clientSideLink}/api/orders/${id}`,
                    {
                        headers: {
                            authorization: `Bearer ${pgToken}`,
                        }
                    })
                    .then(response => {
                        if (response?.data?.data.modifiedCount === 1) {
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

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14 2xl:pb-24">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Hotel Booking History</h2>
            {
                (ordersByUser.data === null || ordersByUser?.data?.length < 1) ?
                    <div className="text-center text-gray-600 font-semibold mt-40">No Previous Booking</div>
                    :
                    <div>
                        <p className="text-center my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {ordersByUser?.data?.length}</p>
                        <div className="mt-10">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-3 md:px-6 py-4">
                                                Hotel
                                            </th>
                                            <th scope="col" className="px-3 md:px-6 py-4 text-center">
                                                Issue Date
                                            </th>
                                            <th scope="col" className="px-3 md:px-6 py-4 text-center">
                                                Summary
                                            </th>
                                            <th scope="col" className="px-3 md:px-6 py-4 text-end">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ordersByUser?.data?.map((d, i) => {
                                                const selectedHotel = (hotels?.find(item => (item._id === d?.hotelId)));

                                                let sum = 0;

                                                return (
                                                    <tr key={i} className="bg-white border-t border-t-gray-600 hover:bg-gray-50">
                                                        <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                            <div className="lg:flex items-center">
                                                                <img loading='lazy' className="w-14 md:w-24 rounded-sm" src={selectedHotel?.thumbnail[0].thumbnailUrl} alt={`${selectedHotel?.hotelName || 'hotel'} image`} />
                                                                <div className="lg:pl-3">
                                                                    <p className="md:text-base font-semibold mt-1">{selectedHotel?.hotelName}</p>
                                                                    <p className="font-normal text-gray-500">{selectedHotel?.location.country}</p>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                                <h5 className="md:text-base font-semibold mt-1">Booked Room</h5>
                                                                <div className="font-normal text-gray-500">{selectedHotel?.rooms?.map((x, p) => { if (d?.selectedRooms[p]?.isSelected === true) { return (<p key={p}>{x.name}</p>) } })}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap text-center">
                                                            <p>{convertDate(d.createdAt)}</p>
                                                            <p>{formatTimeWithSeconds(d.createdAt)}</p>
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap text-center">
                                                            <div>
                                                                <h5 className="md:text-base font-semibold mt-1">{d.isPaid ? 'Paid Off(৳)' : 'Payable Price(৳)'}</h5>
                                                                <div className="font-normal text-gray-500">
                                                                    {selectedHotel?.rooms?.map((x, p) => {
                                                                        if (d?.selectedRooms[p]?.isSelected === true) {
                                                                            sum += parseFloat(x.price) * d?.selectedRooms[p].quantity;
                                                                        }
                                                                    })}
                                                                    <p className={`font-semibold mt-1 ${d.isPaid ? 'text-green-600' : 'text-red-500'}`}>{sum}/- {d.isPaid ? '(Paid)' : '(Not paid)'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                                <h5 className="md:text-base font-semibold mt-1">Booking No.</h5>
                                                                <div className="font-normal text-gray-500">{d.bookingNo}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end whitespace-nowrap">
                                                            {
                                                                (d.isPaid === true) ?
                                                                    <button onClick={() => navigate(`/my-booked-hotels/booking-review/${d._id}`)} className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-50 bg-green-600 border-none hover:bg-green-500 xs:me-2 me-1">Details</button>
                                                                    :
                                                                    <button onClick={() => navigate(`/my-booked-hotels/booking-review/${d._id}`)} className="btn btn-xs xs:btn-sm 2xl:btn-md text-gray-950 bg-primary border-none hover:bg-secondary xs:me-2 me-1">Pay Now</button>
                                                            }
                                                            <button onClick={() => removeOrder(d._id)} className="btn btn-xs xs:btn-sm 2xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default HotelBooked;
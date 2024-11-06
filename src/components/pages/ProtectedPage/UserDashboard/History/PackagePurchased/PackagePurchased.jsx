import { useContext, useState } from "react";
import { AuthContextPG } from "../../../../../../providers/AuthProviderPG";
import { useQuery } from "react-query";
import Loading from "../../../../../shared/Loading/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../../providers/AuthProvider";

const PackagePurchased = () => {
    const pgToken = localStorage.getItem('pg_access_token');
    const token = localStorage.getItem('access_token');
    const { PGuser } = useContext(AuthContextPG);
    const { Guser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const successNotify = () => toast.success("Successfully! deleted.", { theme: "light" });
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const navigate = useNavigate();

    // get orders by pg_user
    const { data: packageOrders = [], isDataLoading, refetch: refetchOrders } = useQuery(['packageOrders'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/package-orders/my-orders/${token ? Guser?._id : PGuser?._id}/${token ? 'user' : 'privilege_user'}`, {
            headers: {
                authorization: `Bearer ${token ? token : pgToken}`,
            }
        });
        return res.json();
    });


    if (isDataLoading) {
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

    const deleteOrder = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This order information will be permanently deleted from our database.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/package-orders/delete/${id}`, {}, {
                        headers: {
                            authorization: `Bearer ${token ? token : pgToken}`,
                        }
                    });
                    if (res?.data?.data?.modifiedCount === 1 || res?.data?.data?.deletedCount === 1) {
                        setLoading(false);
                        successNotify();
                        refetchOrders();
                    }
                    else {
                        errorNotify();
                        setLoading(false);
                    }
                } catch (error) {
                    setLoading(false);
                }
            }
        });
    }

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14 2xl:pb-24">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Package Booking History</h2>
            {
                (packageOrders?.data?.length < 1 || packageOrders?.data === null) ?
                    <div className="text-center text-gray-600 font-semibold mt-40">No Previous Booking</div>
                    :
                    <div>
                        <p className="text-center my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {packageOrders?.data?.length}</p>
                        <div className="mt-10">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4">
                                                Package
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Issue Date
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Status
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            packageOrders?.data?.map((d, i) => {
                                                return (
                                                    <tr key={i} className="bg-white border-t border-t-gray-600 hover:bg-gray-50">
                                                        <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                            <div className="lg:flex items-center">
                                                                <img loading='lazy' className="w-14 md:w-24 rounded-sm" src={d?.packageId?.thumbnail?.[0].thumbnailUrl} alt={`${packageOrders?.data?.packageId?.packageName || 'package'} image`} />
                                                                <div className="lg:pl-3">
                                                                    <p className="md:text-base font-semibold text-blue-500 hover:underline mt-1"><Link to={`/package-tour/details/${d?.packageId?._id}`}>{d?.packageId?.packageName}</Link></p>
                                                                    <p className="font-normal text-gray-500">{d?.packageId?.packageZone.city}, {d?.packageId?.packageZone.country}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap text-center">
                                                            <p>{convertDate(d.createdAt)}</p>
                                                            <p>{formatTimeWithSeconds(d.createdAt)}</p>
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800 whitespace-nowrap text-center">
                                                            {
                                                                d.isPaid ? (d.isConfirmed ? <p className="font-medium text-green-500">Confirmed</p> : (d.isCancel ? <p className="font-medium text-red-500">Canceled</p> : (d.isAccept ? <p className="font-medium text-green-500">Accepted</p> : <p className="font-medium">Pending</p>))) : <p className="font-medium text-red-500">Not Paid</p>
                                                            }
                                                            {
                                                                (d.remark && d.remark !== '') && <p className="md:text-sm 4xl:text-base"><span className="font-medium">{(d.remark && d.remark !== '') && 'Remark: '}</span>{d.remark}</p>
                                                            }
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end whitespace-nowrap">
                                                            <button onClick={() => navigate(`/my-booked-packages/package-booking-review/${d._id}`)} className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-900 bg-primary border-none hover:bg-secondary xs:me-2 me-1">Details</button>
                                                            {
                                                                loading ?
                                                                    <button className="btn btn-xs xs:btn-sm 2xl:btn-md">
                                                                        <span className="loading loading-spinner"></span>
                                                                        loading
                                                                    </button>
                                                                    :
                                                                    <button onClick={() => deleteOrder(d._id)} className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-50 bg-red-600 border-none hover:bg-red-500 xs:me-2 me-1">Delete</button>
                                                            }
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

export default PackagePurchased;
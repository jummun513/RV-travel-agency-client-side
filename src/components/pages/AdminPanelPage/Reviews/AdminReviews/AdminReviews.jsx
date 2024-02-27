import { useQuery } from "react-query";
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { Rating } from "@mui/material";

const AdminReviews = () => {
    const token = localStorage.getItem('access_token');
    const [searchData, setSearchData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentData, setCurrentData] = useState({});
    const warningNotify = () => toast.warn("Not less than 6 reviews on Client Side!", { theme: "light" });
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const { data: adminReviews = [], isLoading, isError, refetch } = useQuery(['adminReviews'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/reviews/admin`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    });

    const handleSearchField = (event) => {
        const keyword = event.target.value.trim().toLowerCase();
        setSearchKeyword(keyword);
        const results = adminReviews?.filter(d => (d.userId.fullName.toLowerCase().includes(keyword)));
        setSearchData(results);
    }

    const removeHotel = (id) => {
        const persistData = () => toast.warn("This data is shown to client side.", { theme: "light" });
        Swal.fire({
            title: 'Are you sure?',
            text: "This user information will be permanently deleted from our database.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_clientSideLink}/api/reviews`, {
                    params: { deletedId: id },
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    if (response?.data?.deletedCount === 1) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                    else if (response?.data?.message === 'notDeletable') {
                        warningNotify();
                    }

                    else if (response?.data?.message === 'persistData') {
                        persistData();
                    }
                    else {
                        errorNotify();
                    }
                })
            }
        })
    };

    const addToHome = async (id, data) => {
        const updateNotify = () => toast.success("Successfully! Updated.", { theme: "light" });
        try {
            const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/reviews/addToHome/${id}`, { data }, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (response?.data?.modifiedCount === 1) {
                refetch();
                updateNotify();
            }
            else if (response?.data?.message === 'mustHome') {
                warningNotify();
            }
        } catch (error) {
            console.log(error);
            errorNotify();
        }
    };

    const openModal = (d) => {
        setCurrentData(d);
        document.getElementById('my_modal_9').showModal();
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Admin Make Review</h2>
            {(adminReviews || adminReviews.length < 1) ?
                <div>
                    <div className="flex flex-col xxs:flex-row justify-between items-center">
                        <div className="w-2/5 me-5">
                            <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {searchKeyword ? searchData?.length : adminReviews?.length}</p>
                        </div>
                        <div className="w-3/5">
                            <form>
                                <div className="flex">
                                    <div className="relative w-full">
                                        <input defaultValue={searchKeyword} onKeyUp={(e) => handleSearchField(e)} type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by Privilege User Name" required />
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
                        <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                            User
                                        </th>
                                        <th scope="col" className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                            Create By
                                        </th>
                                        <th scope="col" className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap text-end">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (searchKeyword ? searchData : adminReviews)?.map((d, i) => {
                                            return (
                                                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap sm:flex items-center">
                                                        <div className="w-16 h-16 rounded-md">
                                                            <img loading='lazy' className="object-cover rounded-full" src={d?.userId?.avatar?.[0]?.thumbnailUrl} alt={`${d?.userId?.fullName} image`} />
                                                        </div>
                                                        <p className="text-gray-700 font-semibold ml-3">{d?.userId?.fullName}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                        Admin
                                                    </td>
                                                    <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap text-end">
                                                        <button onClick={() => openModal(d)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-green-600 border-none hover:bg-green-500">Details</button>
                                                        {
                                                            d.showToHome ?
                                                                <button onClick={() => addToHome(d._id, d.showToHome)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-blue-600 border-none hover:bg-blue-500">Remove Home</button>
                                                                :
                                                                <button onClick={() => addToHome(d._id, d.showToHome)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-blue-600 border-none hover:bg-blue-500">Add Home</button>

                                                        }
                                                        <button onClick={() => removeHotel(d._id)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> : <div className="h-[50vh] mt-[25vh] text-gray-600 font-semibold">Nothing Found</div>
            }

            {/* Modal content */}
            <dialog id="my_modal_9" className="modal">
                <div className="modal-box bg-[#fbfbfb] max-w-screen-md flex flex-col items-center">
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm md:btn-md btn-circle bg-primary border-none text-gray-950 hover:bg-secondary absolute right-4 top-4">✕</button>
                        </form>
                    </div>
                    <h3 className="font-bold text-xl 2xl:text-xl 3xl:text-2xl text-gray-900 text-center">Review Details</h3>

                    <div className="w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-lg mt-10">
                        <div className="flex xs:items-center justify-between">
                            <div className="xs:flex items-center">
                                <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                                    <img loading="lazy" className="aspect-square rounded-full w-full" src={currentData?.userId?.avatar?.[0]?.thumbnailUrl} alt={currentData?.userId?.fullName + ' image'} />
                                </div>
                                <div className="mt-2 xs:mt-0 xs:ms-4">
                                    <h4 className="text-gray-800 font-semibold">{currentData?.userId?.fullName}</h4>
                                    <p className="text-gray-500">{currentData?.userId?.occupation}</p>
                                </div>
                            </div>
                            <div>
                                <Rating name="size-large" precision={0.5} value={currentData?.rating || 0} size="large" readOnly />
                            </div>
                        </div>
                        <div className="mt-3 xs:mt-5">
                            <div className="text-gray-500 text-justify">
                                {currentData?.desc}
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AdminReviews;
import { useQuery } from "react-query";
import Loading from '../../../../shared/Loading/Loading';
import NotFound from '../../../../shared/NotFound/NotFound';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageHotel = () => {
    const [searchData, setSearchData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const token = localStorage.getItem('access_token');
    const { data: hotels = [], isLoading, isError, refetch } = useQuery(['hotels'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels`);
        return res.json();
    })
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const navigate = useNavigate();

    const removeHotel = (id, hotelName) => {
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
                await axios.delete(`${import.meta.env.VITE_clientSideLink}/api/hotels`, {
                    params: { deletedId: id, hotelName },
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    if (response?.data.deletedCount === 1) {
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

    const handleSearchField = (event) => {
        const keyword = event.target.value.trim().toLowerCase();
        setSearchKeyword(keyword);
        const results = hotels.filter(d => (d.hotelName.toLowerCase().includes(keyword) || d.location.city.toLowerCase().includes(keyword)));
        setSearchData(results);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">All Hotels</h2>
            <div className="flex flex-col xxs:flex-row justify-between items-center">
                <div className="w-2/5 me-5">
                    <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {searchKeyword ? searchData.length : hotels.length}</p>
                </div>
                <div className="w-3/5">
                    <form>
                        <div className="flex">
                            <div className="relative w-full">
                                <input defaultValue={searchKeyword} onKeyUp={(e) => handleSearchField(e)} type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by hotel name or city" required />
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
                                <th scope="col" className="px-3 md:px-6 py-4">
                                    Hotel
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4">
                                    City
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (searchKeyword ? searchData : hotels).map((d, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                            <td className="lg:flex items-center px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                <img loading='lazy' className="w-24 rounded-sm" src={d?.thumbnail[0]?.url} alt={`${d?.hotelName} image`} />
                                                <div className="lg:pl-3">
                                                    <div onClick={() => navigate(`/hotel-details/${d._id}`)} className="md:text-base font-semibold mt-1 cursor-pointer text-blue-500 hover:underline">{d?.hotelName}</div>
                                                    <div className="font-normal text-gray-500">{d?.location.country}</div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {d?.location?.city}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-center">
                                                <button onClick={() => removeHotel(d._id, d.hotelName)} className="btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
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
    );
};

export default ManageHotel;
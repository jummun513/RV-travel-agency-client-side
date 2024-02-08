import { useQuery } from "react-query";
import Loading from '../../../../shared/Loading/Loading';
import NotFound from '../../../../shared/NotFound/NotFound';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagePackage = () => {
    const [searchData, setSearchData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const token = localStorage.getItem('access_token');
    const { data: packages = [], isLoading, isError, refetch } = useQuery(['packages'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages`);
        return res.json();
    })
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const navigate = useNavigate();

    const removeHotel = (id, folderName) => {
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
                await axios.delete(`${import.meta.env.VITE_clientSideLink}/api/packages`, {
                    params: { deletedId: id, folderName },
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
        const results = packages.filter(d => (d.packageName.toLowerCase().includes(keyword) || d.packageZone.city.toLowerCase().includes(keyword)));
        setSearchData(results);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    // convert date from iso to dd/mm/yyyy
    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">All Hotels</h2>
            <div className="flex flex-col xxs:flex-row justify-between items-center">
                <div className="w-2/5 me-5">
                    <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {searchKeyword ? searchData.length : packages.length}</p>
                </div>
                <div className="w-3/5">
                    <form>
                        <div className="flex">
                            <div className="relative w-full">
                                <input defaultValue={searchKeyword} onKeyUp={(e) => handleSearchField(e)} type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by package name or city" required />
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
                                    Package Name
                                </th>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Entry Last Date
                                </th>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Package Zone
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (searchKeyword ? searchData : packages).map((d, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                            <td className="lg:flex items-center px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                <img loading='lazy' className="w-24 rounded-sm" src={d?.thumbnail[0]?.url} alt={`${d?.packageName} image`} />
                                                <div className="lg:pl-3">
                                                    <div onClick={() => navigate(`/package-tour/details/${d._id}`)} className="md:text-base font-semibold mt-1 cursor-pointer text-blue-500 hover:underline">{d?.packageName}</div>
                                                    <div className="md:text-base mt-1">RVL-Pack-{d?.packageCode}</div>
                                                    <div className="font-normal text-gray-500">{d?.packageType?.label}</div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {convertDate(d?.lastEntry)}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                <p>{d?.packageZone?.city}</p>
                                                <p>{d?.packageZone?.country}</p>
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-center">
                                                <button onClick={() => alert('This section is under maintaining. Try later!')} className="btn btn-sm xl:btn-md text-gray-950 bg-primary border-none hover:bg-secondary">Edit</button>
                                                {
                                                    d.addToCarousel ?
                                                        <button onClick={() => alert('This section is under maintaining. Try later!')} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-green-600 border-none hover:bg-green-500">Remove to Carousel</button>
                                                        :
                                                        <button onClick={() => alert('This section is under maintaining. Try later!')} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-green-600 border-none hover:bg-green-500">Add to Carousel</button>
                                                }
                                                {
                                                    d.isSuspend ?
                                                        <button onClick={() => alert('This section is under maintaining. Try later!')} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-blue-600 border-none hover:bg-blue-500">Persist</button>
                                                        :
                                                        <button onClick={() => alert('This section is under maintaining. Try later!')} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-blue-600 border-none hover:bg-blue-500">Suspend</button>
                                                }
                                                <button disabled={packages?.length < 7} onClick={() => removeHotel(d?._id, d?.imageFolder)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
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




    // return (
    //     <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
    //         <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">All Hotels</h2>
    //         <div className="flex flex-col xxs:flex-row justify-between items-center">
    //             <div className="w-2/5 me-5">
    //                 <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {searchKeyword ? searchData.length : packages.length}</p>
    //             </div>
    //             <div className="w-3/5">
    //                 <form>
    //                     <div className="flex">
    //                         <div className="relative w-full">
    //                             <input defaultValue={searchKeyword} onKeyUp={(e) => handleSearchField(e)} type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by hotel name or city" required />
    //                             <button disabled type="submit" className="absolute top-0 right-0 h-full p-1.5 xxs:p-2.5 text-sm font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary">
    //                                 <svg className="w-4 h-4 text-gray-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    //                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    //                                 </svg>
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </form>
    //             </div>
    //         </div>

    //         <div className="mt-10">
    //             <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
    //                 <table className="w-full text-sm text-left text-gray-500">
    //                     <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
    //                         <tr>
    //                             <th scope="col" className="px-3 md:px-6 py-4">
    //                                 Hotel
    //                             </th>
    //                             <th scope="col" className="px-3 md:px-6 py-4">
    //                                 City
    //                             </th>
    //                             <th scope="col" className="px-3 md:px-6 py-4 text-center">
    //                                 Action
    //                             </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {
    //                             (searchKeyword ? searchData : packages).map((d, i) => {
    //                                 return (
    //                                     <tr key={i} className="bg-white border-b hover:bg-gray-50">
    //                                         <td className="lg:flex items-center px-3 md:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
    //                                             <img loading='lazy' className="w-24 rounded-sm" src={d?.thumbnail[0]?.url} alt={`${d?.hotelName} image`} />
    //                                             <div className="lg:pl-3">
    //                                                 <div className="md:text-base font-semibold mt-1">{d?.hotelName}</div>
    //                                                 <div className="font-normal text-gray-500">{d?.location.country}</div>
    //                                             </div>
    //                                         </td>
    //                                         <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
    //                                             {d?.location?.city}
    //                                         </td>
    //                                         <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-center">
    //                                             <button onClick={() => removeHotel(d._id, d.hotelName)} className="btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
    //                                         </td>
    //                                     </tr>
    //                                 )
    //                             })
    //                         }
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default ManagePackage;
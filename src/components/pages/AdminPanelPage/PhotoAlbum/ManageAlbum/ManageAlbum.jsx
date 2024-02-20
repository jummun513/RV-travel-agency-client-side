import { useQuery } from "react-query";
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const ManageAlbum = () => {
    const token = localStorage.getItem('access_token');
    const [searchData, setSearchData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const { data: photoAlbum = [], isLoading, isError, refetch } = useQuery(['photoAlbum'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/photo-albums`);
        return res.json();
    });

    const handleSearchField = (event) => {
        const keyword = event.target.value.trim().toLowerCase();
        setSearchKeyword(keyword);
        const results = photoAlbum?.filter(d => (d.holderName.toLowerCase().includes(keyword)));
        setSearchData(results);
    }

    const removeHotel = (id, imageId) => {
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
                await axios.delete(`${import.meta.env.VITE_clientSideLink}/api/photo-albums`, {
                    params: { deletedId: id, imageId },
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    if (response?.data.deletedCount === 1 || response?.data.modifiedCount === 1) {
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
                    <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {searchKeyword ? searchData?.length : photoAlbum?.length}</p>
                </div>
                <div className="w-3/5">
                    <form>
                        <div className="flex">
                            <div className="relative w-full">
                                <input defaultValue={searchKeyword} onKeyUp={(e) => handleSearchField(e)} type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by Image holder Name" required />
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
                                    Photo
                                </th>
                                <th scope="col" className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                    Holder Name
                                </th>
                                <th scope="col" className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap text-end">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (searchKeyword ? searchData : photoAlbum)?.map((d, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-3 sm:px-6 lg:px-3 text-gray-900 whitespace-nowrap">
                                                <div className="w-32 h-32 rounded-md">
                                                    <img loading='lazy' className="object-cover rounded-md" src={d?.photo?.[0]?.thumbnailUrl} alt={`${d?.holderName} image`} />
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap">
                                                {d.holderName}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-900 whitespace-nowrap text-end">
                                                <button onClick={() => removeHotel(d._id, d.photo?.[0].fileId)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
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

export default ManageAlbum;
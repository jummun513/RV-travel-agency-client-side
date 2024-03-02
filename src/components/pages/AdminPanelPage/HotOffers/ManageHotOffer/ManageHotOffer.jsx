import { useQuery } from "react-query";
import Loading from '../../../../shared/Loading/Loading';
import NotFound from '../../../../shared/NotFound/NotFound';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";


const ManageHotOffer = () => {
    const token = localStorage.getItem('access_token');
    const { data: hotOffers = [], isLoading, isError, refetch } = useQuery(['hotOffers'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hot-offers/admin`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    })
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const warningNotify = () => toast.warn("Not less than 4 offers!", { theme: "light" });

    const removePackage = (id, fileId) => {
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
                await axios.delete(`${import.meta.env.VITE_clientSideLink}/api/hot-offers`, {
                    params: { deletedId: id, fileId },
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
    }

    const addToHome = async (id, data) => {
        const updateNotify = () => toast.success("Successfully! Updated.", { theme: "light" });
        try {
            const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/hot-offers/addToHome/${id}`, { data }, {
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

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Manage Hot Offers</h2>
            <div className="flex flex-col xxs:flex-row justify-between items-center">
                <div className="w-2/5 me-5">
                    <p className="text-center xxs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {hotOffers?.length}</p>
                </div>
                <div className="w-3/5">
                    <form>
                        <div className="flex">
                            <div className="relative w-full">
                                <input className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" />
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
                                <th scope="col" className="px-3 md:px-6">
                                    Offer Thumbs
                                </th>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Deadline
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-4 text-end">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hotOffers?.map((d, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                            <td className="lg:flex items-center px-3 md:px-6 lg:px-3 text-gray-900 whitespace-nowrap">
                                                <img loading='lazy' className="w-24 rounded-sm" src={d?.photo?.[0]?.thumbnailUrl} alt='hot offer image' />
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {convertDate(d?.offerEnd)} <br />
                                                {formatTimeWithSeconds(d?.offerEnd)}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-end">
                                                {
                                                    d.addToHome ?
                                                        <button onClick={() => addToHome(d._id, d.addToHome)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-green-600 border-none hover:bg-green-500">Remove To Home</button>
                                                        :
                                                        <button onClick={() => addToHome(d._id, d.addToHome)} className="ml-2 btn btn-sm xl:btn-md text-gray-50 bg-green-600 border-none hover:bg-green-500">Add To Home</button>

                                                }
                                                <button disabled={hotOffers?.length < 5 || d.addToHome} onClick={() => removePackage(d?._id, d?.photo?.[0]?.fileId)} className="ml-2 mt-3 2xl:mt-0 xl:ml-2 btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete</button>
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

export default ManageHotOffer;
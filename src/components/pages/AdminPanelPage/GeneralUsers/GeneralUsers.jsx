import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import NotFound from "../../../shared/NotFound/NotFound";
import user from '../../../../assets/images/user.svg';
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const GeneralUsers = () => {
    const token = localStorage.getItem('access_token');
    const { data: g_users = [], isLoading, isError, refetch } = useQuery(['g_users'], async () => {
        const res = await fetch('http://localhost:5000/general-users', {
            headers: {
                authorization: `bearer ${token}`,
            }
        });
        return res.json();
    });
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });

    const addToAdmin = (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Admin can do any change on your website",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/admin-add/${email}`, {
                    method: 'PATCH',
                    headers: {
                        authorization: `bearer ${token}`,
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            refetch();
                        }
                        else {
                            errorNotify();
                        }
                    })
                Swal.fire(
                    'Added!',
                    'Successfully! added as admin.',
                    'success'
                )
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
        <div>
            <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
                <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xs:mb-10">All general user</h2>
                <div className="flex flex-col xs:flex-row justify-between items-center">
                    <div className="w-full xs:w-2/5 xs:me-5">
                        <p className="text-center xs:text-left my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {g_users.length}</p>
                    </div>
                    <div className="w-full xs:w-3/5">
                        <form>
                            <div className="flex">
                                <div className="relative w-full">
                                    <input type="search" id="search" className="block p-1.5 xxs:p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none" placeholder="Search by email or position" required />
                                    <button type="submit" className="absolute top-0 right-0 h-full p-1.5 xxs:p-2.5 text-sm font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary">
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
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-4">
                                        Position
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 py-4 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    g_users.map((d, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                <td className="lg:flex items-center px-3 md:px-6 lg:px-3 xl:px-6 py-4 text-gray-900 whitespace-nowrap">
                                                    <img className="w-10 h-10 rounded-full" src={user} alt={`${d.name} image`} />
                                                    <div className="lg:pl-3">
                                                        <div className="text-base font-semibold">{d.name}</div>
                                                        <div className="font-normal text-gray-500">{d.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-800">
                                                    {(d.role === 'admin' && 'Admin') || (d.role === 'developer' ? 'Developer' : 'General User')}
                                                </td>
                                                <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                    <button className="btn btn-sm xl:btn-md text-gray-950 bg-primary border-none hover:bg-secondary xs:me-2 mb-2">View Profile</button>
                                                    <button onClick={() => addToAdmin(d.email)} disabled={(d.role === 'admin' || d.role === 'developer') && true} className="btn btn-sm xl:btn-md text-gray-50 bg-green-700 border-none hover:bg-green-600">Make Admin</button>
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
        </div>
    );
};

export default GeneralUsers;
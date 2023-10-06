import { useQuery } from 'react-query';
import user from '../../../../assets/images/user.svg';
import Loading from '../../../shared/Loading/Loading';
import NotFound from '../../../shared/NotFound/NotFound';


const AdminManage = () => {
    const { data: admin = [], isLoading, isError, } = useQuery(['admin'], async () => {
        const res = await fetch('http://localhost:5000/admin');
        return res.json();
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div>
            <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14">
                <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Manage Admin</h2>

                <div className="mt-10 lg:mt-16">
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
                                    admin.map((d, i) => {
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
                                                    {d.role === 'developer' ? 'Developer' : 'Admin'}
                                                </td>
                                                <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                    <button className="btn btn-sm xl:btn-md text-gray-950 bg-primary border-none hover:bg-secondary xs:me-2 mb-2">View Profile</button>
                                                    <button disabled={d.role === 'developer' && true} className="btn btn-sm xl:btn-md text-gray-50 bg-red-600 border-none hover:bg-red-500">Delete Admin</button>
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

export default AdminManage;
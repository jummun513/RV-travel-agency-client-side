import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";
import userImage from "../../../../../assets/images/user.svg";


const IndividualPGUser = () => {
    const navigate = useNavigate();
    const { pgId } = useParams();
    const token = localStorage.getItem('access_token');
    const { data: pg_users = [], isLoading, isError } = useQuery(['pg_users'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    })
    const singlePGUser = pg_users.find(d => (d._id === pgId));

    // these data show for privileged user
    const dataPG = [
        { id: 1, heading: 'Name', value: singlePGUser?.name },
        { id: 2, heading: 'Account Number', value: singlePGUser?.accountNo },
        { id: 3, heading: 'Privileged Account No', value: singlePGUser?.pg_account_no },
        { id: 4, heading: 'Email', value: singlePGUser?.register_email },
        { id: 5, heading: 'Gender', value: singlePGUser?.gender?.label },
        { id: 6, heading: 'Date Of Birth', value: singlePGUser?.dob },
        { id: 7, heading: 'Anniversary Date', value: singlePGUser?.anniversary },
        { id: 8, heading: 'NID No', value: singlePGUser?.nid },
        { id: 9, heading: 'Mobile No', value: singlePGUser?.mobile },
        { id: 10, heading: 'Telephone', value: singlePGUser?.telephone },
        { id: 11, heading: 'Balance (Point)', value: singlePGUser?.point },
        { id: 12, heading: 'Balance Amount', value: singlePGUser?.amount },
        { id: 13, heading: 'Expired Date', value: singlePGUser?.expires },
        { id: 14, heading: 'Blood Group', value: singlePGUser?.blood_group },
        { id: 15, heading: 'Occupation', value: singlePGUser?.occupation },
        { id: 16, heading: 'Work Place', value: singlePGUser?.work_place },
        { id: 17, heading: 'Office Contact', value: singlePGUser?.office_contact },
        { id: 18, heading: 'Sining Date', value: singlePGUser?.singIn_date },
        { id: 19, heading: 'Passport No', value: singlePGUser?.passport },
        { id: 20, heading: 'Passport Validity', value: singlePGUser?.passport_validity },
        { id: 23, heading: 'Present Address', value: singlePGUser?.present_address },
        { id: 24, heading: 'Permanent Address', value: singlePGUser?.permanent_address },
        { id: 21, heading: 'City', value: singlePGUser?.city },
        { id: 22, heading: 'Country', value: singlePGUser?.country },
        { id: 25, heading: 'Remark', value: singlePGUser?.remark },
    ]

    // // data show for general user profile
    // const dataG = [
    //     { id: 1, heading: 'Name', value: Guser?.name },
    //     { id: 2, heading: 'Account Number', value: Guser?.accountNo },
    //     { id: 2, heading: 'email', value: user?.email },
    // ]

    const handleEditUser = () => {
        navigate('edit');
    }

    // convert date from iso to dd/mm/yyyy
    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    // calculate age from the date of birth
    const ageCount = (d) => {
        const today = new Date();
        const birthDay = new Date(d);
        const yearsDiff = (today.getFullYear() - birthDay.getFullYear());

        // Calculate months
        let ageMonths = today.getMonth() - birthDay.getMonth();
        if (today.getDate() < birthDay.getDate()) {
            ageMonths -= 1;
        }
        // Handle negative months (birthday hasn't occurred this year yet)
        if (ageMonths < 0) {
            ageMonths += 12;
        }

        let ageDays = today.getDate() - birthDay.getDate();
        if (ageDays < 0) {
            const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            ageDays = lastDayOfLastMonth - birthDay.getDate() + today.getDate();
        }

        return (`${yearsDiff} years, ${ageMonths} months, ${ageDays} days`);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div>
            {
                (singlePGUser !== null) &&
                <div className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
                    <div className="xl:mt-10">
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Profile Details</h2>

                        <div className="w-28 xs:w-40 rounded-full mx-auto ring-2 ring-offset-2 ring-primary ring-offset-gray-50">
                            <img className='rounded-full aspect-square' src={singlePGUser?.avatar ? singlePGUser?.avatar : userImage} alt='User Image' />
                        </div>


                        <div className="mt-10 lg:mt-16">
                            <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[600px]">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <tbody>
                                        {
                                            dataPG.map((d, i) => {
                                                return (
                                                    <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                        <th scope="row" className={`px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12 ${d.heading.includes('Balance') && 'text-red-500'}`}>
                                                            {d.heading}
                                                        </th>
                                                        <td className="px-6 py-4 text-gray-800 w-1/12">
                                                            :
                                                        </td>
                                                        <td className={`px-6 py-4 text-gray-800 ${d.heading === 'Blood Group' && 'uppercase'}`}>
                                                            {
                                                                (d.heading === 'Sining Date' || d.heading === 'Date Of Birth' || d.heading === 'Expired Date' || d.heading === 'Anniversary Date' || d.heading === 'Passport Validity') ?
                                                                    (d.value ? convertDate(d.value) : '')
                                                                    :
                                                                    d.value
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
                    {
                        (singlePGUser?.moreGuest.length !== 0) &&
                        <div className="mt-16 lg:mt-32">
                            <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Dependent Information</h2>

                            <div className="mt-10 lg:mt-16">
                                <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[600px]">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <tbody>
                                            {
                                                singlePGUser?.moreGuest?.map((d, i) => {
                                                    return (
                                                        <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                                {d.relation.label}
                                                            </th>
                                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                                :
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-800">
                                                                <p><span className="font-semibold mr-2">Name:</span>{d.name}</p>
                                                                <p><span className="font-semibold mr-2">Passport:</span>{d.passport}</p>
                                                                <p><span className="font-semibold mr-2">NID:</span>{d.nid}</p>
                                                                <p><span className="font-semibold mr-2">Date Of Birth:</span>{d.dob && convertDate(d.dob)}</p>
                                                                <p><span className="font-semibold mr-2">Age:</span>{d.dob && ageCount(d.dob)}</p>
                                                                <p><span className="font-semibold mr-2">Mobile:</span>{d.mobile}</p>
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
                    <div className="mt-10 xs:mt-16 text-center">
                        <button onClick={() => handleEditUser()} className='btn xxs:btn-wide btn-xs xxs:btn-sm lg:btn-md bg-primary border-none text-gray-950 hover:bg-secondary'>Edit Guest</button>
                    </div>
                </div>
            }
            {/* {
                (singleGUser !== null) &&
                <div className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
                    <div className="mb-16 xl:mb-16">
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Profile Details</h2>

                        <div className="w-28 xs:w-40 rounded-full mx-auto">
                            <img className='rounded-full' src={PGuser?.avatar ? PGuser?.avatar : useImage} alt='User Image' />
                        </div>
                        <div className="mt-10 lg:mt-16">
                            <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <tbody>
                                        {
                                            dataG.map((d, i) => {
                                                return (
                                                    <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                            {d.heading}
                                                        </th>
                                                        <td className="px-6 py-4 text-gray-800 w-1/12">
                                                            :
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-800">
                                                            {d.value}
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
                    <div className="mb-10 xxs:mb-5 text-center">
                        <button className='btn btn-wide btn-xs xxs:btn-sm 2xl:btn-md bg-primary border-none text-gray-950 hover:bg-secondary'>Apply For Privilege Guest</button>
                    </div>
                </div>
            } */}
        </div>
    );
};

export default IndividualPGUser;
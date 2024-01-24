import { useContext } from 'react';
import userImage from '../../../../../assets/images/user.svg';
import { AuthContextPG } from '../../../../../providers/AuthProviderPG';
import { AuthContext } from '../../../../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const { PGuser } = useContext(AuthContextPG);
    const { Guser, user } = useContext(AuthContext);

    // these data show for privileged user
    const dataPG = [
        { id: 1, heading: 'Name', value: PGuser?.fullName },
        { id: 2, heading: 'Account Number', value: PGuser?.accountNo },
        { id: 3, heading: 'Privileged Account No', value: PGuser?.pgAccountNo },
        { id: 4, heading: 'Email', value: PGuser?.email },
        { id: 5, heading: 'Gender', value: PGuser?.gender?.label },
        { id: 6, heading: 'Date Of Birth', value: PGuser?.dob },
        { id: 7, heading: 'Anniversary Date', value: PGuser?.anniversaryDate },
        { id: 8, heading: 'NID No', value: PGuser?.nidNo },
        { id: 9, heading: 'Mobile No', value: PGuser?.mobileNo },
        { id: 10, heading: 'Telephone', value: PGuser?.telephone },
        { id: 11, heading: 'Balance (Point)', value: PGuser?.balancePoint },
        { id: 12, heading: 'Balance Amount', value: PGuser?.balanceAmount },
        { id: 13, heading: 'Expired Date', value: PGuser?.expireDate },
        { id: 14, heading: 'Blood Group', value: PGuser?.bloodGroup },
        { id: 15, heading: 'Occupation', value: PGuser?.occupation },
        { id: 16, heading: 'Work Place', value: PGuser?.workPlace },
        { id: 17, heading: 'Office Contact', value: PGuser?.officeContact },
        { id: 18, heading: 'Registration Date', value: PGuser?.registrationDate },
        { id: 19, heading: 'Passport No', value: PGuser?.passportNo },
        { id: 20, heading: 'Passport Validity', value: PGuser?.passportValidity },
        { id: 23, heading: 'Present Address', value: PGuser?.presentAdd },
        { id: 24, heading: 'Permanent Address', value: PGuser?.permanentAdd },
        { id: 21, heading: 'City', value: PGuser?.city },
        { id: 22, heading: 'Country', value: PGuser?.country },
        { id: 25, heading: 'Remark', value: PGuser?.remark },
    ]

    // data show for general user profile
    const dataG = [
        { id: 1, heading: 'Name', value: Guser?.name },
        { id: 2, heading: 'Account Number', value: Guser?.accountNo },
        { id: 2, heading: 'email', value: user?.email },
    ]

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
        let yearsDiff;
        if (today.getFullYear() === birthDay.getFullYear()) {
            yearsDiff = (today.getFullYear() - (birthDay.getFullYear()));
        }
        else {
            yearsDiff = (today.getFullYear() - (birthDay.getFullYear() + 1));
        }

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

    // currency add commas
    const addCommas = (number) => {
        const numberString = number.toString();
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div>
            <Helmet>
                <title>My Profile - Royal Venture Limited</title>
            </Helmet>
            {
                (PGuser !== null) &&
                <div className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
                    <div className="mb-24 xl:mb-32">
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Profile Details</h2>

                        <div onClick={() => document.getElementById('my_modal_4').showModal()} className="w-28 xs:w-40 aspect-square rounded-full mx-auto ring-2 ring-offset-2 ring-primary ring-offset-gray-50 hover:cursor-pointer">
                            <img className='rounded-full aspect-square' src={PGuser?.avatar[0]?.url ? PGuser?.avatar[0]?.url : userImage} alt='User Image' />
                        </div>

                        <div className="mt-10 lg:mt-16">
                            <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
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
                                                                (d.heading === 'Registration Date' || d.heading === 'Date Of Birth' || d.heading === 'Expired Date' || d.heading === 'Anniversary Date' || d.heading === 'Passport Validity') ?
                                                                    (d.value ? convertDate(d.value) : '')
                                                                    :
                                                                    ((d.heading === 'Balance Amount' || d.heading === 'Balance (Point)') ?
                                                                        addCommas(d.value) : d.value)
                                                            } &nbsp;
                                                            {
                                                                d.heading === 'Registration Date' && <span>(<b>Left:</b> {ageCount(d.value)})</span>
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
                        (PGuser?.moreGuest.length !== 0) &&
                        <div className="mt-16 lg:mt-32">
                            <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Dependent Information</h2>

                            <div className="mt-10 lg:mt-16">
                                <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <tbody>
                                            {
                                                PGuser?.moreGuest?.map((d, i) => {
                                                    return (
                                                        <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                                {d.relation.label}
                                                            </th>
                                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                                :
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-800">
                                                                <p className='mb-1'><span className="font-semibold mr-2">Name:</span>{d.name}</p>
                                                                <p className='mb-1'><span className="font-semibold mr-2">Passport:</span>{d.passport}</p>
                                                                <p className='mb-1'><span className="font-semibold mr-2">NID:</span>{d.nid}</p>
                                                                <p className='mb-1'><span className="font-semibold mr-2">Date Of Birth:</span>{d.dob && convertDate(d.dob)}</p>
                                                                <p className='mb-1'><span className="font-semibold mr-2">Age:</span>{d.dob && ageCount(d.dob)}</p>
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
                    <div className="mt-20 lg:mt-32">
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Guest Documents</h2>

                        <div className="mt-10 lg:mt-16">
                            <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <tbody>
                                        <tr className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Download
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => { window.print(); }} className="text-blue-600 hover:underline">Download Now</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                (user !== null) &&
                <div className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
                    <div className="mb-16 xl:mb-16">
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Profile Details</h2>

                        <div className="w-28 xs:w-40 rounded-full mx-auto">
                            <img className='rounded-full aspect-square' src={PGuser?.avatar ? PGuser?.avatar : userImage} alt='User Image' />
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
            }

            <dialog id="my_modal_4" className="modal">
                <div className="bg-gray-50 modal-box w-11/12 max-w-5xl">
                    <div className="h-auto sm:h-[70vh] flex justify-center">
                        <img className="rounded-sm md:rounded-xl" src={PGuser?.avatar[0]?.url ? PGuser?.avatar[0]?.url : userImage} alt='User Image' />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn btn-sm md:btn-md bg-red-600 hover:bg-red-500 text-gray-50 border-none">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default Profile;
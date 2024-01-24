import { useNavigate } from "react-router-dom";
import userImage from "../../../../../../../assets/images/user.svg";

const IndividualProfile = ({ singlePGUser }) => {
    const navigate = useNavigate();

    // these data show for privileged user
    const dataPG = [
        { id: 1, heading: 'Name', value: singlePGUser?.fullName },
        { id: 2, heading: 'Account Number', value: singlePGUser?.accountNo },
        { id: 3, heading: 'Privileged Account No', value: singlePGUser?.pgAccountNo },
        { id: 4, heading: 'Email', value: singlePGUser?.email },
        { id: 5, heading: 'Gender', value: singlePGUser?.gender?.label },
        { id: 6, heading: 'Date Of Birth', value: singlePGUser?.dob },
        { id: 6, heading: 'Anniversary Date', value: singlePGUser?.anniversaryDate },
        { id: 8, heading: 'NID No', value: singlePGUser?.nidNo },
        { id: 9, heading: 'Mobile No', value: singlePGUser?.mobileNo },
        { id: 10, heading: 'Telephone', value: singlePGUser?.telephone },
        { id: 12, heading: 'Balance Amount', value: singlePGUser?.balanceAmount },
        { id: 11, heading: 'Balance (Point)', value: singlePGUser?.balancePoint },
        { id: 13, heading: 'Expired Date', value: singlePGUser?.expireDate },
        { id: 14, heading: 'Blood Group', value: singlePGUser?.bloodGroup },
        { id: 15, heading: 'Occupation', value: singlePGUser?.occupation },
        { id: 16, heading: 'Work Place', value: singlePGUser?.workPlace },
        { id: 17, heading: 'Office Contact', value: singlePGUser?.officeContact },
        { id: 18, heading: 'Registration Date', value: singlePGUser?.registrationDate },
        { id: 19, heading: 'Passport No', value: singlePGUser?.passportNo },
        { id: 20, heading: 'Passport Validity', value: singlePGUser?.passportValidity },
        { id: 23, heading: 'Present Address', value: singlePGUser?.presentAdd },
        { id: 24, heading: 'Permanent Address', value: singlePGUser?.permanentAdd },
        { id: 21, heading: 'City', value: singlePGUser?.city },
        { id: 22, heading: 'Country', value: singlePGUser?.country },
        { id: 25, heading: 'Remark', value: singlePGUser?.remark },
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
            <div className="">
                <div className="xl:mt-10">
                    <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Profile Details</h2>

                    <div onClick={() => document.getElementById('my_modal_2').showModal()} className="w-28 xs:w-40 aspect-square rounded-full mx-auto ring-2 ring-offset-2 ring-primary ring-offset-gray-50 hover:cursor-pointer">
                        <img className='rounded-full aspect-square object-cover' src={singlePGUser?.avatar[0]?.url ? singlePGUser?.avatar[0]?.url : userImage} alt='User Image' />
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
                                                            <p className="mb-1"><span className="font-semibold mr-2">Name:</span>{d.name}</p>
                                                            <p className="mb-1"><span className="font-semibold mr-2">Passport:</span>{d.passport}</p>
                                                            <p className="mb-1"><span className="font-semibold mr-2">NID:</span>{d.nid}</p>
                                                            <p className="mb-1"><span className="font-semibold mr-2">Date Of Birth:</span>{d.dob && convertDate(d.dob)}</p>
                                                            <p className="mb-1"><span className="font-semibold mr-2">Age:</span>{d.dob && ageCount(d.dob)}</p>
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
                    <button onClick={() => navigate('profile-edit')} className='btn xxs:btn-wide btn-xs xxs:btn-sm lg:btn-md bg-primary border-none text-gray-950 hover:bg-secondary'>Edit Guest</button>
                </div>
            </div>

            <dialog id="my_modal_2" className="modal">
                <div className="bg-gray-50 modal-box w-11/12 max-w-5xl">
                    <div className="h-[70vh] flex justify-center">
                        <img className="rounded-xl" src={singlePGUser?.avatar[0]?.url ? singlePGUser?.avatar[0]?.url : userImage} alt='User Image' />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn bg-red-600 hover:bg-red-500 text-gray-50 border-none">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default IndividualProfile;
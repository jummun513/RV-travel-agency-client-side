import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../../shared/Loading/Loading";
import NotFound from "../../../../../shared/NotFound/NotFound";
import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import ReactDatePicker from "react-datepicker";
import AddMorePG from "../../AddPG/AddMorePG/AddMorePG";
import axios from "axios";
import { toast } from "react-toastify";
import ProfileImageContainer from "../../AddPG/AddImage/ProfileImageContainer/ProfileImageContainer";
import { uploadImage } from "../../../../../../functions/imageStore";
import userUrl from "../../../../../../assets/images/user.svg";

const EditIndividualPGUser = () => {
    const [moreData, setMoreData] = useState([]);
    const formEraseRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { pgId } = useParams();
    const token = localStorage.getItem('access_token');
    const notify = () => toast.success("Updated successfully.", { theme: "light" });
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
    const { data: pg_users = [], isLoading, isError, refetch } = useQuery(['pg_users'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    })
    const singlePGUser = pg_users.find(d => (d._id === pgId));
    const location = useLocation().state?.from?.pathname || `/admin-panel/manage-privileged-guest/individual-user-profile/${pgId}`;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    // change state value on the basis of moreData and singlePGUser changes
    useEffect(() => {
        setFormData({
            ...formData,
            moreGuest: singlePGUser?.moreGuest?.concat([...moreData]),
        })
    }, [moreData]);

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'gender' || field === 'dob' || field === 'anniversaryDate' || field === 'registrationDate' || field === 'passportValidity') {
            value = e;
        }
        else {
            value = e.target.value;
        }
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // Name field validation checkup and value set
    const handleNameField = (e) => {
        if (/^[a-zA-Z .',-_]{5,32}$/.test(e.target.value)) {
            setError('');
            handleInputChange('fullName', e);
        }
        else { setError('invalid_name'); }
    }

    // phone number field validation checkup and value set
    const handleNumberField = (e) => {
        if (/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(e.target.value)) {
            setError('');
            handleInputChange('mobileNo', e);
        }
        else { setError('invalid_number'); }
    }

    // only number allows
    const numberValidation = (field, e) => {
        if (/^[0-9]+$/.test(e.target.value)) {
            setError('');
            handleInputChange(field, e);
        }
        else {
            setError(`not_number_${field}`)
        }
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

    // form after submit action
    const formSubmit = async (event) => {
        event.preventDefault();

        if (error === '') {
            // filter undefined property of object
            const formattedData = Object.fromEntries(Object.entries(formData).filter(([, value]) => value !== undefined));
            setLoading(true);

            try {
                if (formattedData?.avatar) {
                    const base64 = formData?.avatar[0]?.split(',')[1];
                    await uploadImage([base64], `Royal_Venture/Privilege_Users`).then(async (d) => {
                        const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/${pgId}`, { data: { ...formattedData, avatar: d }, deleteAvatar: singlePGUser?.avatar }, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            }
                        });

                        if (response?.data?.modifiedCount === 1) {
                            setLoading(false);
                            setError('');
                            formEraseRef.current.reset();
                            notify();
                            navigate(location, { replace: true });
                        }
                        else {
                            setLoading(false);
                            notifyError();
                        }
                    });

                }
                else {
                    const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/${pgId}`, { data: formattedData }, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    });

                    if (response?.data?.modifiedCount === 1) {
                        setLoading(false);
                        setError('');
                        formEraseRef.current.reset();
                        notify();
                        navigate(location, { replace: true });
                    }
                    else {
                        setLoading(false);
                        notifyError();
                    }
                }
            }
            catch (error) {
                setLoading(false);
                notifyError();
            }
        }
    }

    // delete more guest if click on the top-right delete button
    const handleDeleteDependent = async (idx) => {
        try {
            await axios.delete(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/${pgId}/delete-more-guest/${idx}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            refetch();
        }
        catch (err) {
            throw new err;
        }
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    // option for gender
    const optionsGender = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ]

    return (
        <div>
            {
                (singlePGUser !== null) &&
                <form ref={formEraseRef} onSubmit={formSubmit} className="px-3 xxs:px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-24">
                    <div>
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Edit Profile Details</h2>

                        {/* top avatar */}
                        <ProfileImageContainer formData={formData} setFormData={setFormData} initialImageUrl={(singlePGUser?.avatar?.length > 0) ? singlePGUser?.avatar?.[0]?.url : userUrl}></ProfileImageContainer>

                        {/* update table data section */}
                        <div className="mt-10 lg:mt-16">
                            <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[640px]">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <tbody>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Name <sup className='text-red-500'>*</sup>
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onKeyUp={handleNameField} type="text" defaultValue={singlePGUser?.fullName} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                                {
                                                    ((error.includes('invalid_name')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Name length should be 5 to 32</p>)
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Account Number
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                {singlePGUser?.accountNo}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Privileged Account No <sup className='text-red-500'>*</sup>
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('pgAccountNo', e)} type="text" defaultValue={singlePGUser?.pgAccountNo} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Email
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                {singlePGUser?.email}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Gender
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <Select onChange={(e) => { handleInputChange('gender', e) }} defaultValue={
                                                    optionsGender.filter(option =>
                                                        option.label === singlePGUser?.gender?.label)
                                                } options={optionsGender} />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Date Of Birth
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <ReactDatePicker
                                                    dateFormat="d MMMM, yyyy"
                                                    placeholderText="Birthday"
                                                    closeOnScroll={true}
                                                    maxDate={Date.now()}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    isClearable
                                                    selected={formData?.dob ? formData?.dob : (singlePGUser?.dob && new Date(singlePGUser?.dob))}
                                                    onChange={(e) => handleInputChange('dob', e)}
                                                    className='input input-info border-2 border-gray-300 text-gray-950 bg-white min-w-[500px] w-full'
                                                />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Anniversary Date
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <ReactDatePicker
                                                    dateFormat="d MMMM, yyyy"
                                                    placeholderText="Anniversary date"
                                                    closeOnScroll={true}
                                                    isClearable
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    selected={formData?.anniversaryDate ? formData?.anniversaryDate : (singlePGUser?.anniversaryDate && new Date(singlePGUser?.anniversaryDate))}
                                                    onChange={(e) => handleInputChange('anniversaryDate', e)}
                                                    className='input input-info border-2 border-gray-300 text-gray-950 bg-white min-w-[500px] w-full'
                                                />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                NID No
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onKeyUp={(e) => numberValidation('nidNo', e)} type="text" defaultValue={singlePGUser?.nidNo} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                                {
                                                    ((error.includes('not_number_nidNo')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number inputs allowed!</p>)
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Mobile No <sup className='text-red-500'>*</sup>
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onKeyUp={handleNumberField} type="text" defaultValue={singlePGUser?.mobileNo} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                                {
                                                    ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Invalid mobile number!</p>)
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Telephone
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onKeyUp={(e) => numberValidation('telephone', e)} type="text" defaultValue={singlePGUser?.telephone} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                                {
                                                    ((error.includes('not_number_telephone')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number inputs allowed!</p>)
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Blood Group
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('bloodGroup', e)} type="text" defaultValue={singlePGUser?.bloodGroup} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary uppercase" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Occupation
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('occupation', e)} type="text" defaultValue={singlePGUser?.occupation} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Work Place
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('workPlace', e)} type="text" defaultValue={singlePGUser?.workPlace} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Office Contact
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onKeyUp={(e) => numberValidation('officeContact', e)} type="text" defaultValue={singlePGUser?.officeContact} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                                {
                                                    ((error.includes('not_number_officeContact')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number inputs allowed!</p>)
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Registration Date
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <ReactDatePicker
                                                    dateFormat="d MMMM, yyyy"
                                                    placeholderText="Registration Date"
                                                    closeOnScroll={true}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    isClearable
                                                    selected={formData?.registrationDate ? formData?.registrationDate : (singlePGUser?.registrationDate && new Date(singlePGUser?.registrationDate))}
                                                    onChange={(e) => handleInputChange('registrationDate', e)}
                                                    className='input input-info border-2 border-gray-300 text-gray-950 bg-white min-w-[500px] w-full'
                                                />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Passport No
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onKeyUp={(e) => numberValidation('passportNo', e)} type="text" defaultValue={singlePGUser?.passportNo} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                                {
                                                    ((error.includes('not_number_passportNo')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number inputs allowed!</p>)
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Passport Validity
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <ReactDatePicker
                                                    dateFormat="d MMMM, yyyy"
                                                    placeholderText="Passport validity"
                                                    closeOnScroll={true}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    isClearable
                                                    selected={formData?.passportValidity ? formData?.passportValidity : (singlePGUser?.passportValidity && new Date(singlePGUser?.passportValidity))}
                                                    onChange={(e) => handleInputChange('passportValidity', e)}
                                                    className='input input-info border-2 border-gray-300 text-gray-950 bg-white min-w-[500px] w-full'
                                                />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Present Address
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('presentAdd', e)} type="text" defaultValue={singlePGUser?.presentAdd} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Permanent Address
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('permanentAdd', e)} type="text" defaultValue={singlePGUser?.permanentAdd} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                City
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('city', e)} type="text" defaultValue={singlePGUser?.city} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Country
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('country', e)} type="text" defaultValue={singlePGUser?.country} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Remark
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('remark', e)} type="text" defaultValue={singlePGUser?.remark} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className=" text-red-500 mt-8 lg:mt-10">(*) These fields are required.</p>
                        </div>
                    </div>

                    <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mt-24 mb-16">Edit Dependent Information</h2>

                    {/* update moreGuest or dependent section */}
                    {
                        (singlePGUser?.moreGuest?.length !== 0) &&
                        <div>
                            <div className="mb-10 mt-16 lg:my-16">
                                <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[600px]">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <tbody>
                                            {
                                                singlePGUser?.moreGuest?.map((d, i) => {
                                                    return (
                                                        <tr key={i} className="bg-white border-b w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                                            <th scope="row" className="px-3 xs:px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                                {d.relation.label}
                                                            </th>
                                                            <td className="px-3 xs:px-6 py-4 text-gray-800 w-1/12">
                                                                :
                                                            </td>
                                                            <td className="px-3 xs:px-6 py-4 text-gray-800">
                                                                <p className="mb-2"><span className="font-semibold mr-2">Name:</span>{d.name}</p>
                                                                <p className="mb-2"><span className="font-semibold mr-2">Passport:</span>{d?.passport}</p>
                                                                <p className="mb-2"><span className="font-semibold mr-2">NID:</span>{d?.nid}</p>
                                                                <p className="mb-2"><span className="font-semibold mr-2">Date Of Birth:</span>{d.dob && convertDate(d?.dob)}</p>
                                                                <p className="mb-2"><span className="font-semibold mr-2">Age:</span>{d?.dob && ageCount(d?.dob)}</p>
                                                                <p><span className="font-semibold mr-2">Mobile:</span>{d?.mobile}</p>
                                                            </td>
                                                            <td className='px-3 xs:px-6 py-4 flex justify-end'>
                                                                <a onClick={() => { handleDeleteDependent(i) }} className="btn btn-xs xs:btn-sm 2xl:btn-md bg-red-500 text-gray-50 hover:bg-red-600 border-none">Delete</a>
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

                    {/* add more dependent or moreGuest */}
                    <AddMorePG moreData={moreData} setMoreData={setMoreData}></AddMorePG>

                    {/* submit and loading button */}
                    <div className="mt-10 xxs:mt-16 md:mt-24 text-center">
                        {/* if loading is true show processing button instead of register button */}
                        {
                            loading ?
                                <button disabled type="button" className="rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 inline-flex items-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Processing...
                                </button>
                                :
                                <button type="submit" className='btn xxs:btn-wide btn-xs xxs:btn-sm lg:btn-md bg-primary border-none text-gray-950 hover:bg-secondary'>Save</button>
                        }
                    </div>
                </form>
            }
        </div>
    );
};

export default EditIndividualPGUser;
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";
import { useQuery } from "react-query";
import userImage from "../../../../../assets/images/user.svg";
import { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import ReactDatePicker from "react-datepicker";
import AddMorePG from "../../AddPG/AddMorePG/AddMorePG";
import axios from "axios";
import { toast } from "react-toastify";

const EditIndividualPGUser = () => {
    const email = useRef(null);
    const number = useRef(null);
    const [moreData, setMoreData] = useState([]);
    const editName = useRef(null);
    const formEraseRef = useRef();
    const [changeImage, setChangeImage] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { pgId } = useParams();
    const token = localStorage.getItem('access_token');
    const notify = () => toast.success("Updated successfully.", { theme: "light" });
    const notifyUpdate = () => toast.info("Everything looks updated.", { theme: "light" });
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
    const { data: pg_users = [], isLoading, isError, refetch } = useQuery(['pg_users'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/pg-users`, {
            headers: {
                authorization: `bearer ${token}`,
            }
        });
        return res.json();
    })
    const singlePGUser = pg_users.find(d => (d._id === pgId));
    const location = useLocation().state?.from?.pathname || '/admin-panel/manage-privileged-guest';
    const navigate = useNavigate();
    const [form_data, setFormData] = useState({
        admin_edit_name: '',
        admin_edit_pg_account_no: '',
        admin_edit_register_email: '',
        admin_edit_gender: '',
        admin_edit_dob: '',
        admin_edit_anniversary: '',
        admin_edit_nid: '',
        admin_edit_mobile: '',
        admin_edit_telephone: '',
        admin_edit_point: '',
        admin_edit_amount: '',
        admin_edit_expires: '',
        admin_edit_blood: '',
        admin_edit_occupation: '',
        admin_edit_work_place: '',
        admin_edit_office_contact: '',
        admin_edit_passport: '',
        admin_edit_passport_validity: '',
        admin_edit_present_address: '',
        admin_edit_permanent_address: '',
        admin_edit_city: '',
        admin_edit_country: '',
        admin_edit_remark: '',
        admin_edit_moreGuest: '',
        admin_edit_avatar: null,
        admin_edit_thumb: '',
        admin_edit_medium: '',
        admin_edit_image_delete: '',
    });

    // change state value on the basis of moreData and singlePGUser changes
    useEffect(() => {
        if (singlePGUser) {
            setFormData({
                // name, pg_account_no, register_email, mobile are required field
                admin_edit_name: singlePGUser.name,
                admin_edit_pg_account_no: singlePGUser.pg_account_no,
                admin_edit_register_email: singlePGUser.register_email,
                admin_edit_gender: (singlePGUser?.gender ? singlePGUser?.gender : form_data.admin_edit_gender),
                admin_edit_dob: (singlePGUser?.dob ? new Date(singlePGUser?.dob) : form_data.admin_edit_dob),
                admin_edit_anniversary: (singlePGUser?.anniversary ? new Date(singlePGUser?.anniversary) : form_data.admin_edit_anniversary),
                admin_edit_nid: (singlePGUser?.nid ? singlePGUser?.nid : form_data.admin_edit_nid),
                admin_edit_mobile: (singlePGUser?.mobile ? singlePGUser?.mobile : form_data.admin_edit_mobile),
                admin_edit_telephone: (singlePGUser?.telephone ? singlePGUser?.telephone : form_data.admin_edit_telephone),
                admin_edit_point: (singlePGUser?.point ? singlePGUser?.point : form_data.admin_edit_point),
                admin_edit_amount: (singlePGUser?.amount ? singlePGUser?.amount : form_data.admin_edit_amount),
                admin_edit_expires: (singlePGUser?.expires ? new Date(singlePGUser?.expires) : form_data.admin_edit_expires),
                admin_edit_blood: (singlePGUser?.blood_group ? singlePGUser?.blood_group : form_data.admin_edit_blood_group),
                admin_edit_occupation: (singlePGUser?.occupation ? singlePGUser?.occupation : form_data.admin_edit_occupation),
                admin_edit_work_place: (singlePGUser?.work_place ? singlePGUser?.work_place : form_data.admin_edit_work_place),
                admin_edit_office_contact: (singlePGUser?.office_contact ? singlePGUser?.office_contact : form_data.admin_edit_office_contact),
                admin_edit_passport: (singlePGUser?.passport ? singlePGUser?.passport : form_data.admin_edit_passport),
                admin_edit_passport_validity: (singlePGUser?.passport_validity ? new Date(singlePGUser?.passport_validity) : form_data.admin_edit_passport_validity),
                admin_edit_present_address: (singlePGUser?.present_address ? singlePGUser?.present_address : form_data.admin_edit_present_address),
                admin_edit_permanent_address: (singlePGUser?.permanent_address ? singlePGUser?.permanent_address : form_data.admin_edit_permanent_address),
                admin_edit_city: (singlePGUser?.city ? singlePGUser?.city : form_data.admin_edit_city),
                admin_edit_country: (singlePGUser?.country ? singlePGUser?.country : form_data.admin_edit_country),
                admin_edit_remark: (singlePGUser?.remark ? singlePGUser?.remark : form_data.admin_edit_remark),
                admin_edit_moreGuest: (singlePGUser?.moreGuest?.concat([...moreData])) ?? singlePGUser?.moreGuest,
                admin_edit_avatar: (singlePGUser?.avatar ? singlePGUser?.avatar : form_data.admin_edit_avatar),
                admin_edit_thumb: (singlePGUser?.thumb ? singlePGUser?.thumb : form_data.admin_edit_thumb),
                admin_edit_medium: (singlePGUser?.medium ? singlePGUser?.medium : form_data.admin_edit_medium),
                admin_edit_image_delete: (singlePGUser?.image_delete ? singlePGUser?.image_delete : form_data.admin_edit_image_delete),
            });
        }
    }, [moreData, singlePGUser]);

    // set input value according their name
    const handleInputChange = (field, e) => {
        const name = e.target?.name;
        let value;
        if (field === 'file') {
            value = e.target.files[0];
        }
        else if (field === 'email') {
            value = e.target.value.trim().toLowerCase();
        }
        else if (field === 'admin_edit_gender' || field === 'admin_edit_dob' || field === 'admin_edit_anniversary' || field === 'admin_edit_expires' || field === 'admin_edit_passport_validity') {
            value = e;
        }
        else {
            value = e.target.value;
        }
        if (name) {
            setFormData({
                ...form_data,
                [name]: value,
            });
        }
        else {
            setFormData({
                ...form_data,
                [field]: value,
            });
        }
    };

    // file size and type check
    const handleFileField = (e) => {
        const allowedType = ['image/jpeg', 'image/jpg', 'image/png'];
        if (e.target?.files[0]?.size > 1024 * 500) {
            setError('large_file');
        }
        else if (!allowedType.includes(e.target?.files[0]?.type)) {
            setError('file_type_invalid');
        }
        else {
            setError('');
        }
    }

    // Name field validation checkup and value set
    const handleNameField = () => {
        if (/^[a-zA-Z .',-_]{5,32}$/.test(editName.current.value)) {
            setError('');
        }
        else { setError('invalid_name'); }
    }

    // phone number field validation checkup and value set
    const handleNumberField = () => {
        if (/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(number.current.value)) {
            setError('');
        }
        else { setError('invalid_number'); }
    }

    // Email field validation checkup and value set
    const handleEmailField = () => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value)) {
            setError('');
        }
        else {
            setError('invalid_email');
        }
    }

    // form after submit action
    const formSubmit = async (event) => {
        event.preventDefault();

        if (error === '') {
            // convert file into form data
            const formData = new FormData();
            formData.append('image', form_data?.admin_edit_avatar);

            setLoading(true);

            try {
                if ((form_data?.admin_edit_avatar !== null) && (form_data?.admin_edit_avatar?.type)) {
                    const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb_KEY}`, formData);
                    const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/pg-users/update/${pgId}`, {
                        ...form_data, admin_edit_avatar: imgbbResponse.data.data.image.url,
                        admin_edit_medium: imgbbResponse.data.data.medium.url,
                        admin_edit_thumb: imgbbResponse.data.data.thumb.url,
                        admin_edit_image_delete: imgbbResponse.data.data.delete_url,
                    }, {
                        headers: {
                            authorization: `bearer ${token}`,
                        }
                    });

                    if (response.data.modifiedCount === 1) {
                        setLoading(false);
                        setError('');
                        formEraseRef.current.reset();
                        notify();
                        navigate(location, { replace: true });
                    }
                    else {
                        setLoading(false);
                        setError('');
                        notifyUpdate();
                    }
                }

                else {
                    const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/pg-users/update/${pgId}`, { ...form_data }, {
                        headers: {
                            authorization: `bearer ${token}`,
                        }
                    });

                    if (response.data.modifiedCount === 1) {
                        setLoading(false);
                        setError('');
                        formEraseRef.current.reset();
                        notify();
                        navigate(location, { replace: true });
                    }
                    else {
                        setLoading(false);
                        setError('');
                        notifyUpdate();
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
            const response = await axios.delete(`${import.meta.env.VITE_clientSideLink}/pg-users/${pgId}/delete-more-guest/${idx}`, {
                headers: {
                    authorization: `bearer ${token}`,
                },
            })
            if (response.data?.modifiedCount === 1) {
                refetch();
            }
        }
        catch (err) {
            err;
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
                    <div className="mb-24 xl:mb-32">
                        <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Profile Details</h2>

                        {/* top avatar */}
                        <div className="w-28 xs:w-40 rounded-full mx-auto ring-2 ring-offset-2 ring-primary ring-offset-gray-50">
                            <img className='rounded-full' src={singlePGUser?.avatar ? singlePGUser?.avatar : userImage} alt='User Image' />
                        </div>

                        {/* update image section */}
                        <div className="flex flex-col items-center mt-6 xs:mt-10">
                            {!changeImage && <button onClick={() => setChangeImage(true)} className="btn btn-xs xs:btn-sm xl:btn-md bg-primary text-gray-950 hover:bg-secondary border-none mb-3 xs:mb-5">Change Image</button>}
                            {
                                changeImage &&
                                <div className="form-control w-full flex flex-col items-center">
                                    <label htmlFor='avatar' className="label mb-1">
                                        <span className="text-xs xs:text-sm text-gray-800">Image upload ( .jpg, .jpeg, .png). File size not more than 500 KB.</span>
                                    </label>
                                    <input type="file" onChange={(e) => { handleInputChange('file', e); handleFileField(e) }} name='admin_edit_avatar' id='admin_edit_avatar' className="file-input-xs file-input-warning bg-white text-gray-950 xxs:file-input-sm xl:file-input-md file-input file-input-bordered w-full max-w-[200px] xxs:max-w-[250px] md:max-w-xs" />
                                    {
                                        (error.includes('large_file') && <label className="label">
                                            <span className="label-text-alt text-red-600">Maximum file size 500 KB.</span>
                                        </label>) ||
                                        (error.includes('file_type_invalid') && <label className="label">
                                            <span className="label-text-alt text-red-600">Only .jpg, .png, .jpeg allowed.</span>
                                        </label>)
                                    }
                                </div>
                            }
                        </div>

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
                                                <input onBlur={(e) => handleInputChange('name', e)} onKeyUp={handleNameField} ref={editName} type="text" name="admin_edit_name" id="admin_edit_name" defaultValue={singlePGUser?.name} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
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
                                                <input onBlur={(e) => handleInputChange('pg_no', e)} type="text" name="admin_edit_pg_account_no" id="admin_edit_pg_account_no" defaultValue={singlePGUser?.pg_account_no} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Email <sup className='text-red-500'>*</sup>
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('email', e)} onKeyUp={handleEmailField} ref={email} type="email" name="admin_edit_register_email" id="admin_edit_register_email" defaultValue={singlePGUser?.register_email} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                                {
                                                    ((error.includes('invalid_email')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Your email is invalid!</p>) ||
                                                    ((error.includes('email_already_register')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>This email is already register!</p>)
                                                }
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
                                                <Select onChange={(e) => { handleInputChange('admin_edit_gender', e) }} defaultValue={
                                                    optionsGender.filter(option =>
                                                        option.label === singlePGUser?.gender?.label)
                                                } className='mt-1' options={optionsGender} />
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
                                                    selected={form_data?.admin_edit_dob}
                                                    onChange={(e) => handleInputChange('admin_edit_dob', e)}
                                                    className='mt-1 input input-bordered input-info input-xs xxs:input-sm text-gray-950 bg-white min-w-[200px] w-full'
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
                                                    selected={form_data.admin_edit_anniversary}
                                                    onChange={(e) => handleInputChange('admin_edit_anniversary', e)}
                                                    className='mt-1 input input-bordered input-info input-xs xxs:input-sm text-gray-950 bg-white min-w-[200px] w-full'
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
                                                <input onBlur={(e) => handleInputChange('nid', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" name="admin_edit_nid" id="admin_edit_nid" defaultValue={singlePGUser?.nid} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('mobile', e)} onKeyUp={handleNumberField} type="text" ref={number} name="admin_edit_mobile" id="admin_edit_mobile" defaultValue={singlePGUser?.mobile} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
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
                                                <input onBlur={(e) => handleInputChange('telephone', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" name="admin_edit_telephone" id="admin_edit_telephone" defaultValue={singlePGUser?.telephone} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Balance (Point)
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('', e)} type="number" inputMode="numeric" name="admin_edit_point" id="admin_edit_point" defaultValue={singlePGUser?.point} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Balance Amount (Tk.)
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <input onBlur={(e) => handleInputChange('', e)} type="number" step="0.01" inputMode="numeric" name="admin_edit_amount" id="admin_edit_amount" defaultValue={singlePGUser?.amount} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Expired Date
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                <ReactDatePicker
                                                    dateFormat="d MMMM, yyyy"
                                                    placeholderText="Expires date"
                                                    closeOnScroll={true}
                                                    isClearable
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    selected={form_data.admin_edit_expires}
                                                    onChange={(e) => handleInputChange('admin_edit_expires', e)}
                                                    className='mt-1 input input-bordered input-info input-xs xxs:input-sm text-gray-950 bg-white min-w-[200px] w-full'
                                                />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_blood" id="admin_edit_blood" defaultValue={singlePGUser?.blood_group} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary uppercase" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_occupation" id="admin_edit_occupation" defaultValue={singlePGUser?.occupation} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_work_place" id="admin_edit_work_place" defaultValue={singlePGUser?.work_place} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" name="admin_edit_office_contact" id="admin_edit_office_contact" defaultValue={singlePGUser?.office_contact} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                                Sining Date
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className="px-6 py-4 text-gray-800">
                                                {convertDate(singlePGUser?.singIn_date)}
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" name="admin_edit_passport" id="admin_edit_passport" defaultValue={singlePGUser?.passport} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                    placeholderText="Passport validity date"
                                                    isClearable
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    selected={form_data.admin_edit_passport_validity}
                                                    onChange={(e) => handleInputChange('admin_edit_passport_validity', e)}
                                                    className='mt-1 input input-bordered input-info input-xs xxs:input-sm text-gray-950 bg-white min-w-[200px] w-full'
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_present_address" id="admin_edit_present_address" defaultValue={singlePGUser?.present_address} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_permanent_address" id="admin_edit_permanent_address" defaultValue={singlePGUser?.permanent_address} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_city" id="admin_edit_city" defaultValue={singlePGUser?.city} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_country" id="admin_edit_country" defaultValue={singlePGUser?.country} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
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
                                                <input onBlur={(e) => handleInputChange('', e)} type="text" name="admin_edit_remark" id="admin_edit_remark" defaultValue={singlePGUser?.remark} autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className=" text-red-500 mt-8 lg:mt-10">(*) These fields are required.</p>
                        </div>
                    </div>

                    {/* update moreGuest or dependent section */}
                    {
                        (singlePGUser?.moreGuest?.length !== 0) &&
                        <div>
                            <h2 className="text-center text-xs xxs:text-base sm:text-xl md:text-3xl font-bold text-gray-800 xxs:mb-10">Dependent Information</h2>

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
                                                                <p><span className="font-semibold mr-2">Name:</span>{d.name}</p>
                                                                <p><span className="font-semibold mr-2">Passport:</span>{d.passport}</p>
                                                                <p><span className="font-semibold mr-2">NID:</span>{d.nid}</p>
                                                                <p><span className="font-semibold mr-2">Date Of Birth:</span>{d.dob && convertDate(d.dob)}</p>
                                                                <p><span className="font-semibold mr-2">Age:</span>{d.dob && ageCount(d.dob)}</p>
                                                                <p><span className="font-semibold mr-2">Mobile:</span>{d.mobile}</p>
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
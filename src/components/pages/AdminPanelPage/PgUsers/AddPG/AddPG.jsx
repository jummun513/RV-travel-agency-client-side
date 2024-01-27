import { BiShow, BiHide } from 'react-icons/bi';
import logo from '../../../../../assets/Logos/short-logo.png';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import AddMorePG from './AddMorePG/AddMorePG';
import './AddPG.css';
import axios from 'axios';
import AddImage from './AddImage/AddImage';
import ReactDatePicker from 'react-datepicker';
import { uploadImage } from '../../../../../functions/imageStore';
import { useNavigate } from 'react-router-dom';

const AddPG = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const mobile = useRef(null);
    const formRef = useRef(); // for resetting form's input field
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [moreData, setMoreData] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            ...formData,
            moreGuest: moreData,
        });
    }, [moreData]);

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === "email") {
            value = e.target.value.trim().toLowerCase();
        }
        else if (field === "registrationDate") {
            value = e;
        }
        else {
            value = e.target.value;
        }
        // const value = e.target.type === 'file' ? e.target.files[0] : (e.target.type === 'email' ? e.target.value.trim().toLowerCase() : e.target.value);
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // Name field validation checkup and value set
    const handleNameField = (e) => {
        if (/^[a-zA-Z .',-_]{5,32}$/.test(fullName.current.value)) {
            setError('');
            handleInputChange('fullName', e);
        }
        else { setError('invalid_name'); }
    }

    // Email field validation checkup and value set
    const handleEmailField = (e) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value)) {
            handleInputChange('email', e);
            setError('');
        }
        else {
            setError('invalid_email');
        }
    }

    // password validation and strength check
    const checkPasswordValidation = () => {
        let pass = password.current.value;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})");
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{1,})");
        if (strongRegex.test(pass)) {
            setPasswordStrength('strong_password');
        }
        else if (mediumRegex.test(pass)) {
            setPasswordStrength('medium_password');
        }
        else {
            setPasswordStrength('weak_password');
        }
    }

    // compare password and confirm password are same or not
    const passwordCompareWithConfirmPassword = () => {
        (confirmPassword.current.value !== password.current.value) ? setError('password_not_match') : setError('');
    }

    // mobile number field validation checkup and value set
    const handleNumberField = (e) => {
        if (/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(mobile.current.value)) {
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

    // after submitted form handle
    const formSubmit = async (event) => {
        event.preventDefault();

        if (passwordStrength !== 'strong_password') {
            setError('invalid_password');
        }

        else if ((error === '') && passwordStrength === 'strong_password') {
            const notify = () => toast.success("Successfully, new privileged guest add.", { theme: "light" });
            const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
            const token = localStorage.getItem('access_token');

            setLoading(true);

            try {
                if (formData?.avatar) {
                    const base64 = formData?.avatar[0]?.split(',')[1];
                    await uploadImage([base64], `Royal_Venture/Privilege_Users`).then(async (d) => {
                        const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/create-one`, { ...formData, avatar: d }, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            }
                        });
                        setLoading(false);

                        if (response?.data.includes('email_already_register')) {
                            setError('email_already_register');
                        }
                        else {
                            setPasswordStrength('');
                            setError('');
                            notify();
                            formRef.current.reset();
                            navigate('/admin-panel/manage-privileged-guest');
                        }
                    });

                }
                else {
                    const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/create-one`, formData, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    });

                    setLoading(false);

                    if (response?.data.includes('email_already_register')) {
                        setError('email_already_register');
                    }
                    else {
                        setPasswordStrength('');
                        setError('');
                        notify();
                        formRef.current.reset();
                        navigate('/admin-panel/manage-privileged-guest');
                    }
                }
            }
            catch (error) {
                setLoading(false);
                notifyError();
            }
        }
    }

    return (
        <div className="bg-[#fbfbfb] w-[90%] mx-auto my-20 rounded-lg md:rounded-xl lg:rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col items-center py-10">
                <div className='h-16 w-16 xs:h-24 xs:w-24 rounded-full bg-[#18181b] p-3'><img className='w-full h-full' src={logo} alt="" /></div>
                <h2 className="xxs:text-base xs:text-xl lg:text-2xl font-bold text-gray-800 mt-3 mb-8 md:mt-5 md:mb-10 2xl:mb-16">Register Privileged Guest</h2>

                {/* form start */}
                <form ref={formRef} className='w-[90%] 2xl:w-[80%]' onSubmit={formSubmit}>

                    {/* Privileged Account No field */}
                    <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                        <input onBlur={(e) => handleInputChange('pgAccountNo', e)} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="pg_account_no" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Privileged Account No. <sup className='text-red-500'>*</sup></label>
                    </div>

                    {/* Name field */}
                    <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                        <input onKeyUp={(e) => handleNameField(e)} ref={fullName} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name <sup className='text-red-500'>*</sup></label>
                        {
                            ((error.includes('invalid_name')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Name length should be 5 to 32</p>)
                        }
                    </div>

                    {/* Email field */}
                    <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                        <input onKeyUp={(e) => handleEmailField(e)} ref={email} type="email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address <sup className='text-red-500'>*</sup></label>
                        <p className='text-xs xs:text-sm mt-1'>We&#39;ll never share your email with anyone else.</p>
                        {
                            ((error.includes('invalid_email')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Your email is invalid!</p>) ||
                            ((error.includes('email_already_register')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>This email is already register!</p>)
                        }
                    </div>

                    {/* password field */}
                    <div className='md:flex justify-between'>
                        {/* password field  */}
                        <div className="relative z-0 w-full mb-6 xs:mb-8 group md:me-10">
                            <input onKeyUp={() => { checkPasswordValidation(); passwordCompareWithConfirmPassword() }} ref={password} type={showPassword ? 'text' : 'password'} title='Password must have contain one lowercase(a-z), one uppercase(A-Z), one number(0-9), one special character (!,@,#,$,%,^,&,*) and length must be 8 to 16' className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password <sup className='text-red-500'>*</sup></label>
                            <div className='flex items-center absolute top-3 right-1'>
                                {
                                    ((passwordStrength.includes('strong_password')) && <p className='text-xs xs:text-sm xs:font-semibold text-green-600'>Strong</p>) ||
                                    ((passwordStrength.includes('medium_password')) && <p className='text-xs xs:text-sm xs:font-semibold text-yellow-400'>Medium</p>) ||
                                    ((passwordStrength.includes('weak_password')) && <p className='text-xs xs:text-sm xs:font-semibold text-red-500'>Weak</p>)
                                }
                                {
                                    (password.current?.value !== null) && (showPassword ? <BiShow onClick={() => { setShowPassword(!showPassword) }} className='cursor-pointer text-gray-700 h-4 w-4 sm:h-6 sm:w-6 ms-2 md:ms-4'></BiShow> : <BiHide onClick={() => { setShowPassword(!showPassword) }} className='cursor-pointer text-gray-700 h-4 w-4 sm:h-6 sm:w-6 ms-2 md:ms-4'></BiHide>)
                                }
                            </div>
                            {
                                error.includes('invalid_password') && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Password must have contain one lowercase&#40;a-z&#41;, one uppercase&#40;A-Z&#41;, one number&#40;0-9&#41;, one special character &#40;!,@,#,$,%,^,&,*&#41; and length must be 8 to 16</p>
                            }
                        </div>

                        {/*confirm password field  */}
                        <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                            {
                                (confirmPassword.current?.value !== null) && (showConfirmPassword ? <BiShow onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className='cursor-pointer absolute text-gray-700 top-3 right-1 h-4 w-4 sm:h-6 sm:w-6'></BiShow> : <BiHide onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className='cursor-pointer absolute text-gray-700 top-3 right-1 h-4 w-4 sm:h-6 sm:w-6'></BiHide>)
                            }
                            <input onBlur={(e) => handleInputChange('password', e)} onKeyUp={passwordCompareWithConfirmPassword} ref={confirmPassword} type={showConfirmPassword ? 'text' : 'password'} className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password <sup className='text-red-500'>*</sup></label>
                            {
                                error.includes('password_not_match') && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Doesn&#39;t match the password!</p>
                            }
                        </div>
                    </div>

                    {/* add an image */}
                    <h4 className='mt-12 xl:text-xl font-bold text-gray-950 text-center'>Add User Picture</h4>
                    <AddImage formData={formData} setFormData={setFormData}></AddImage>

                    {/* additional details */}
                    <div className='mt-16'>
                        <h4 className='mb-12 xl:text-xl font-bold text-gray-950'>Additional Details</h4>

                        <div className='md:flex justify-between'>
                            {/* Mobile Number */}
                            <div className="relative z-0 w-full mb-6 xs:mb-8 group md:me-10">
                                <input onKeyUp={(e) => handleNumberField(e)} ref={mobile} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number <sup className='text-red-500'>*</sup></label>
                                {
                                    ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Invalid mobile number!</p>)
                                }
                            </div>
                            {/* RegistrationDate */}
                            <div className="relative z-10 w-full mb-6 xs:mb-8 group">
                                <ReactDatePicker
                                    dateFormat="d MMMM, yyyy"
                                    placeholderText="Registration Date"
                                    closeOnScroll={true}
                                    name='registrationDate'
                                    maxDate={Date.now()}
                                    isClearable
                                    showYearDropdown
                                    dropdownMode="select"
                                    selected={formData?.registrationDate}
                                    onChange={(e) => handleInputChange('registrationDate', e)}
                                    className='input input-xs xxs:input-sm lg:input-md border-2 focus:input-info hover:border-gray-400 border-gray-300 text-gray-900 bg-transparent w-full min-w-[300px]'
                                />
                            </div>
                        </div>

                        {/* passport and nid number */}
                        <div className='md:flex justify-between'>
                            <div className="relative z-0 w-full mb-6 xs:mb-8 group md:me-10">
                                <input onKeyUp={(e) => numberValidation('nidNo', e)} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NID No.</label>
                                {
                                    ((error.includes('not_number_nidNo')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only numbers input allowed!</p>)
                                }
                            </div>
                            <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                                <input onKeyUp={(e) => numberValidation('passportNo', e)} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passport No.</label>
                                {
                                    ((error.includes('not_number_passportNo')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only numbers input allowed!</p>)
                                }
                            </div>
                        </div>

                        {/* present address */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input onBlur={(e) => handleInputChange('presentAdd', e)} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Present Address</label>
                        </div>

                        {/* city / country */}
                        <div className='md:flex justify-between'>
                            <div className="relative z-0 w-full mb-6 xs:mb-8 group md:me-10">
                                <input onBlur={(e) => handleInputChange('city', e)} type='text' className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current City</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                                <input onBlur={(e) => handleInputChange('country', e)} type='text' className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                            </div>
                        </div>

                        {/* permanent address */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input onBlur={(e) => handleInputChange('permanentAdd', e)} type="text" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Permanent Address</label>
                        </div>
                    </div>

                    {/* add more guest details */}
                    <AddMorePG moreData={moreData} setMoreData={setMoreData}></AddMorePG>

                    {/* submit and loading button */}
                    <div className='mt-5 xl:mt-10 text-end'>
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
                                <button disabled={error !== '' && true} type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                    {error !== '' ? 'Disabled' : 'Register'}
                                </button>
                        }
                    </div>
                    <p className='text-[8px] xxs:text-xs sm:text-sm text-gray-700 mt-6 sm:mt-10'>(<span className='text-red-500 text-[8px] md:text-sm'>*</span>) These fields are required.</p>
                </form>
            </div >
        </div >
    );
};

export default AddPG;
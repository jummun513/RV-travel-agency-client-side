import { BiShow, BiHide } from 'react-icons/bi';
import logo from '../../../../assets/Logos/short-logo.png';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import AddMorePG from './AddMorePG/AddMorePG';
import './AddPG.css';
import axios from 'axios';

const AddPG = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const number = useRef(null);
    const confirmPassword = useRef(null);
    const formRef = useRef(); // for resetting form's input field
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [moreData, setMoreData] = useState([]);
    const [form_data, setFormData] = useState({
        pg_account_no: '',
        name: '',
        register_email: '',
        confirm_password: '',
        mobile: '',
        nid: '',
        passport: '',
        present_address: '',
        city: '',
        country: '',
        permanent_address: '',
        moreGuest: [],
        avatar: null,
        thumb: '',
        medium: '',
        image_delete: '',
    });

    useEffect(() => {
        setFormData({
            ...form_data,
            moreGuest: moreData,
        });
    }, [moreData]);

    // set input value according their name
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'file' ? e.target.files[0] : (e.target.type === 'email' ? e.target.value.trim().toLowerCase() : e.target.value);
        setFormData({
            ...form_data,
            [name]: value,
        });
    };

    // Name field validation checkup and value set
    const handleNameField = () => {
        if (/^[a-zA-Z .',-_]{5,32}$/.test(name.current.value)) {
            setError('');
        }
        else { setError('invalid_name'); }
    }

    // mobile number field validation checkup and value set
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

            // convert file into form data
            const formData = new FormData();
            formData.append('image', form_data?.avatar);

            setLoading(true);

            try {
                if (form_data?.avatar !== null) {
                    const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb_KEY}`, formData);
                    const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/pg-users/register`, {
                        ...form_data, avatar: imgbbResponse.data.data.image.url,
                        medium: imgbbResponse.data.data.medium.url,
                        thumb: imgbbResponse.data.data.thumb.url,
                        image_delete: imgbbResponse.data.data.delete_url,
                    }, {
                        headers: {
                            authorization: `bearer ${token}`,
                        }
                    });

                    setLoading(false);
                    if (response?.data?.includes('email_already_register')) {
                        setError('email_already_register');
                    }
                    else {
                        setPasswordStrength('');
                        setError('');
                        formRef.current.reset();
                        notify();
                    }
                }

                else {
                    const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/pg-users/register`, form_data, {
                        headers: {
                            authorization: `bearer ${token}`,
                        }
                    });

                    setLoading(false);
                    if (response?.data?.includes('email_already_register')) {
                        setError('email_already_register');
                    }
                    else {
                        setPasswordStrength('');
                        setError('');
                        formRef.current.reset();
                        notify();
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
                        <input onBlur={(e) => handleInputChange(e)} type="text" name="pg_account_no" id="pg_account_no" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="pg_account_no" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Privileged Account No. <sup className='text-red-500'>*</sup></label>
                    </div>

                    {/* Name field */}
                    <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                        <input onBlur={(e) => handleInputChange(e)} onKeyUp={handleNameField} ref={name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name <sup className='text-red-500'>*</sup></label>
                        {
                            ((error.includes('invalid_name')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Name length should be 5 to 32</p>)
                        }
                    </div>

                    {/* Email field */}
                    <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                        <input onBlur={(e) => handleInputChange(e)} onKeyUp={handleEmailField} ref={email} type="email" name="register_email" id="register_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="register_email" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address <sup className='text-red-500'>*</sup></label>
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
                            <input onKeyUp={() => { checkPasswordValidation(); passwordCompareWithConfirmPassword() }} ref={password} type={showPassword ? 'text' : 'password'} title='Password must have contain one lowercase(a-z), one uppercase(A-Z), one number(0-9), one special character (!,@,#,$,%,^,&,*) and length must be 8 to 16' name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password <sup className='text-red-500'>*</sup></label>
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
                            <input onBlur={(e) => handleInputChange(e)} onKeyUp={passwordCompareWithConfirmPassword} ref={confirmPassword} type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" id="confirm_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="confirm_password" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password <sup className='text-red-500'>*</sup></label>
                            {
                                error.includes('password_not_match') && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Doesn&#39;t match the password!</p>
                            }
                        </div>
                    </div>

                    {/* add an image */}
                    <div className="form-control w-full mt-4">
                        <label htmlFor='avatar' className="label mb-1">
                            <span className="text-xs xs:text-sm text-gray-800">Image upload ( .jpg, .jpeg, .png). File size not more than 500 KB.</span>
                        </label>
                        <input type="file" onChange={(e) => { handleInputChange(e); handleFileField(e) }} name='avatar' id='avatar' className="file-input-xs file-input-warning bg-white text-gray-950 xxs:file-input-sm xl:file-input-md file-input file-input-bordered w-full max-w-[200px] xxs:max-w-[250px] md:max-w-xs" />
                        {
                            (error.includes('large_file') && <label className="label">
                                <span className="label-text-alt text-red-600">Maximum file size 500 KB.</span>
                            </label>) ||
                            (error.includes('file_type_invalid') && <label className="label">
                                <span className="label-text-alt text-red-600">Only .jpg, .png, .jpeg allowed.</span>
                            </label>)
                        }
                    </div>

                    {/* additional details */}
                    <div className='mt-16'>
                        <h4 className='mb-12 xl:text-xl font-bold text-gray-950'>Additional Details</h4>
                        {/* Mobile Number */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input onBlur={(e) => handleInputChange(e)} onKeyUp={handleNumberField} ref={number} type="text" name="mobile" id="mobile" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="mobile" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number <sup className='text-red-500'>*</sup></label>
                            {
                                ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Invalid mobile number!</p>)
                            }
                        </div>

                        {/* passport and nid number */}
                        <div className='md:flex justify-between'>
                            <div className="relative z-0 w-full mb-6 xs:mb-8 group md:me-10">
                                <input onBlur={(e) => handleInputChange(e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" name="nid" id="nid" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="nid" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NID No.</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                                <input onBlur={(e) => handleInputChange(e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" name="passport" id="passport" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="passport" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passport No.</label>
                            </div>
                        </div>

                        {/* present address */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input onBlur={(e) => handleInputChange(e)} type="text" name="present_address" id="present_address" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="present_address" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Present Address</label>
                        </div>

                        {/* city / country */}
                        <div className='md:flex justify-between'>
                            <div className="relative z-0 w-full mb-6 xs:mb-8 group md:me-10">
                                <input onBlur={(e) => handleInputChange(e)} type='text' name="city" id="city" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="city" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Current City</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                                <input onBlur={(e) => handleInputChange(e)} type='text' name="country" id="flcountryoating_country" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="country" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                            </div>
                        </div>

                        {/* permanent address */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input onBlur={(e) => handleInputChange(e)} type="text" name="permanent_address" id="permanent_address" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="permanent_address" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Permanent Address</label>
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
                    <p className='text-[8px] xxs:text-xs sm:text-sm text-gray-600 mt-6 sm:mt-10'>(<span className='text-red-500 text-[8px] md:text-sm'>*</span>) These fields are required.</p>
                </form>
            </div >
        </div >
    );
};

export default AddPG;
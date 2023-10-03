import { useRef, useState } from 'react';
import logo from '../../../../assets/Logos/short-logo.png';
import img from '../../../../assets/images/privilege-login.gif';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AllContext } from '../../../../layout/Main/Main';
import { AuthContext } from '../../../../providers/AuthProvider';

const PrivilegeLogin = () => {
    const { logOut } = useContext(AuthContext);
    const { setPGuser } = useContext(AllContext);
    const email = useRef(null);
    const password = useRef(null);
    const formRef = useRef();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation().state?.from?.pathname || '/'; // save the user location from where he or she come

    const handleEmailField = () => {
        setError('')
    }
    const handlePassField = () => {
        setError('')
    }

    // after submitted form handle
    const formSubmit = (event) => {
        event.preventDefault();
        const eml = email.current.value;
        const pass = password.current.value;
        const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });

        if (error === '') {
            const postData = async () => {
                setLoading(true);
                try {
                    const response = await axios.post('http://localhost:5000/pg-users/login', { eml, pass });
                    setLoading(false);
                    console.log(response);
                    if (String(response.data).includes('not_register_email')) {
                        setError('not_register_email');
                    }
                    else if (String(response.data).includes('wrong_password')) {
                        setError('wrong_password');
                    }
                    else {
                        // if any user already login as normal user and then try to login as privileged without logout from previous we should auto logout him
                        logOut().then(() => {
                        }).catch((error) => {
                            notifyError(error);
                        });

                        setPGuser(response.data);
                        setError('');
                        formRef.current.reset();
                        navigate(location, { replace: true }); //navigate to previous page
                    }
                }
                catch (error) {
                    setLoading(false);
                    notifyError();
                }
            }
            postData();
        }

    }

    return (
        <div className="bg-[#fbfbfb] relative top-[45px] xxs:top-[64px] lg:top-[74px] xl:top-[100px] 3xl:top-[106px] mb-[45px] xxs:mb-[64px] lg:mb-[74px] xl:mb-[100px] 3xl:mb-[106px]">
            <div className='py-32 mx-2 xxs:mx-5 xs:mx-auto min-w-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl'>
                <div className='flex items-center justify-between rounded-lg sm:rounded-xl lg:rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
                    <div className='hidden md:block md:w-[40%] xl:w-1/2'>
                        <img className='xl:w-[90%]' src={img} alt="Privileged guest login" />
                    </div>
                    <div className='w-full md:w-[60%] xl:w-1/2'>
                        <div className="flex flex-col items-center py-10">
                            <div className='h-16 w-16 xs:h-24 xs:w-24 rounded-full bg-[#18181b] p-3'><img className='w-full h-full' src={logo} alt="" /></div>
                            <h2 className="xxs:text-base xs:text-xl lg:text-2xl font-bold text-gray-800 mt-3 mb-8 md:mt-5 md:mb-10 2xl:mb-16">Sign In with Email and Password</h2>

                            {/* form start */}
                            <form ref={formRef} className='w-[90%] 2xl:w-[80%]' onSubmit={formSubmit}>

                                {/* email field */}
                                <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                                    <input onKeyUp={() => handleEmailField()} ref={email} type="email" name="login_floating_email" id="login_floating_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="login_floating_email" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    <p className='text-xs xs:text-sm mt-1'>We&#39;ll never share your email with anyone else.</p>
                                    {
                                        ((error.includes('not_register_email')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>This email is not registered!</p>)
                                    }
                                </div>

                                {/* password field */}
                                <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                                    <input onKeyUp={() => handlePassField()} ref={password} type={showPassword ? 'text' : 'password'} title='Password must have contain one lowercase(a-z), one uppercase(A-Z), one number(0-9), one special character (!,@,#,$,%,^,&,*) and length must be 8 to 16' name="login_floating_password" id="login_floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="login_floating_password" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                    <div className='flex items-center absolute top-3 right-1'>
                                        {
                                            (password.current?.value !== null) && (showPassword ? <BiShow onClick={() => { setShowPassword(!showPassword) }} className='cursor-pointer text-gray-700 h-4 w-4 sm:h-6 sm:w-6 ms-2 md:ms-4'></BiShow> : <BiHide onClick={() => { setShowPassword(!showPassword) }} className='cursor-pointer text-gray-700 h-4 w-4 sm:h-6 sm:w-6 ms-2 md:ms-4'></BiHide>)
                                        }
                                    </div>
                                    {
                                        error.includes('wrong_password') && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Incorrect password.</p>
                                    }
                                </div>

                                {/* remember me checkbox */}
                                <div className="mb-8 min-h-[1.5rem] pl-[1.5rem] flex justify-between items-center">
                                    <div className='flex items-center'>
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[3px] xs:mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                                            type="checkbox"
                                            value=""
                                            id="loginCheckboxDefault" />
                                        <label
                                            className="inline-block pl-[0.15rem] text-gray-600 hover:cursor-pointer"
                                            htmlFor="loginCheckboxDefault">
                                            Remember me
                                        </label>
                                    </div>
                                    <div>
                                        <p className='cursor-pointer hover:underline text-blue-600'>Forget Password?</p>
                                    </div>
                                </div>

                                {/* submit button */}
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
                                        <button type="submit" className="inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
                                            Sign In
                                        </button>
                                }
                                {/* <p className='text-gray-700 mt-6 sm:mt-10'>Not have an account? <Link to='/registration' className='text-blue-600 cursor-pointer hover:underline'>Register here.</Link></p> */}
                            </form>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivilegeLogin;
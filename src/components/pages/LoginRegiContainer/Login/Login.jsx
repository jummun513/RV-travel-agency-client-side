import { Link } from 'react-router-dom';
import logo from '../../../../assets/Logos/short-logo.png';

const Login = () => {
    return (
        <div className="bg-[#fbfbfb] rounded-lg md:rounded-none md:rounded-e-xl lg:rounded-e-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col items-center py-10">
                <div className='h-16 w-16 xs:h-24 xs:w-24 rounded-full bg-[#18181b] p-3'><img className='w-full h-full' src={logo} alt="" /></div>
                <h2 className="xxs:text-base xs:text-xl lg:text-2xl font-bold text-gray-800 mt-3 mb-8 md:mt-5 md:mb-10 2xl:mb-16">Sign In with Email and Password</h2>
                <form className='w-[90%] 2xl:w-[80%]' action="">
                    <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        <p className='text-xs xs:text-sm mt-1'>We&#39;ll never share your email with anyone else.</p>
                    </div>

                    <div className="relative z-0 w-full mb-6 xs:mb-8 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-gray-700 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <div className="mb-8 min-h-[1.5rem] pl-[1.5rem] flex justify-between items-center">
                        <div className='flex items-center'>
                            <input
                                className="relative float-left -ml-[1.5rem] mr-[3px] xs:mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                                type="checkbox"
                                value=""
                                id="checkboxDefault" />
                            <label
                                className="inline-block pl-[0.15rem] text-gray-600 hover:cursor-pointer"
                                htmlFor="checkboxDefault">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <p className='cursor-pointer hover:underline text-blue-600 font-semibold'>Forget Password?</p>
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        Sign In
                    </button>
                    <p className='text-gray-700 mt-6 sm:mt-10'>Not have an account? <Link to='/registration' className='text-blue-600 cursor-pointer hover:underline'>Register here.</Link></p>
                </form>
            </div >
        </div >
    );
};

export default Login;
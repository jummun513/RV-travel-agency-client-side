import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <div className='grid justify-center grid-cols-1 gap-y-3 3xl:grid-cols-3 gap-x-4 items-center w-full'>
            <button type="button" className="text-black bg-[#fff] hover:bg-slate-50 focus:ring-4 border border-gray-200 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#4285F4]/55">
                <FcGoogle className='h-5 w-5 mr-2'></FcGoogle>
                Sign in with Google
            </button>
            <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none border-[#3b5998] focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#3b5998]/55">
                <BsFacebook className='h-5 w-5 mr-2'></BsFacebook>
                Sign in with Facebook
            </button>
            <button type="button" className="text-white bg-[#000] hover:bg-[#000]/80 border border-[#000] focus:ring-4 focus:outline-none focus:ring-[#000]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#3b5998]/55">
                <BsApple className='h-5 w-5 mr-2'></BsApple>
                Sign in with Facebook
            </button>
        </div>
    );
};

export default SocialLogin;
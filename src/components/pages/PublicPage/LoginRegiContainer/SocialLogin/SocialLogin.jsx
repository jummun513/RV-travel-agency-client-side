// import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../../../providers/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { signInGoogle, loading, setLoading, } = useContext(AuthContext);
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInGoogle().then(async (result) => {
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                avatar: [{ thumbnailUrl: result.user?.photoURL }],
            }
            // after successfully create user data save to database
            try {
                await axios.post(`${import.meta.env.VITE_clientSideLink}/api/users`, userInfo);
                setLoading(false);
                navigate('/');
            }
            catch (error) {
                setLoading(false);
                notifyError();
            }
        }).catch(error => {
            setLoading(false); console.log(error); notifyError();
        })
    }

    return (
        <div className='grid justify-center grid-cols-1 gap-y-3 3xl:grid-cols-3 gap-x-4 items-center w-full'>
            {loading ? <button disabled type="button" className="text-black bg-[#fff] hover:bg-slate-50 focus:ring-4 border border-gray-200 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#4285F4]/55">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                Processing...
            </button>
                :
                <button onClick={() => handleGoogleSignIn()} type="button" className="text-black bg-[#fff] hover:bg-slate-50 focus:ring-4 border border-gray-200 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#4285F4]/55">
                    <FcGoogle className='h-5 w-5 mr-2'></FcGoogle>
                    Sign in with Google
                </button>}
            {/* <button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none border-[#3b5998] focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#3b5998]/55">
                <BsFacebook className='h-5 w-5 mr-2'></BsFacebook>
                Sign in with Facebook
            </button>
            <button type="button" className="text-white bg-[#000] hover:bg-[#000]/80 border border-[#000] focus:ring-4 focus:outline-none focus:ring-[#000]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center dark:focus:ring-[#3b5998]/55">
                <BsApple className='h-5 w-5 mr-2'></BsApple>
                Sign in with Facebook
            </button> */}
        </div>
    );
};

export default SocialLogin;
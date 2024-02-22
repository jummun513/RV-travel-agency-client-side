import { useContext, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContextPG } from "../../../../../providers/AuthProviderPG";
import { AuthContext } from "../../../../../providers/AuthProvider";
import { Rating } from "@mui/material";
import userImg from "../../../../../assets/images/user.svg";
import axios from "axios";
import { toast } from "react-toastify";

const WriteReview = () => {
    const formRef = useRef();
    const token = localStorage.getItem('access_token');
    const pgToken = localStorage.getItem('pg_access_token');
    const errorNotify = () => toast.error("There was a problem. Try later!", { theme: "light" });
    const successNotify = () => toast.success("Successfully! submitted.", { theme: "light" });
    const { PGuser } = useContext(AuthContextPG);
    const { Guser, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        desc: '',
        rating: 0,
    });

    const postReview = async (event) => {
        event.preventDefault();

        if (PGuser !== null && Guser === null) {
            setLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/reviews/pg/add-new`, { ...data, userId: PGuser?._id }, {
                    headers: {
                        authorization: `Bearer ${pgToken}`,
                    }
                });
                setLoading(false);

                if (response.data === 'success') {
                    formRef.current.reset();
                    successNotify();
                }
                else {
                    errorNotify();
                }
            } catch (error) {
                console.log(error);
                errorNotify();
            }
        }

        else if (PGuser === null && Guser !== null) {
            setLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/reviews/user/add-new`, { ...data, userId: Guser?._id }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });
                setLoading(false);

                if (response.data === 'success') {
                    formRef.current.reset();
                    successNotify();
                }
                else {
                    errorNotify();
                }
            } catch (error) {
                console.log(error);
                errorNotify();
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title>Write Review - Royal Venture Limited</title>
            </Helmet>
            {
                (PGuser !== null) &&
                <div className="px-3 xxs:px-5 sm:px-10 pt-20 xxs:pt-16 xs:pt-10 xxs:pb-24">
                    <h2 className="text-center text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Write A Review</h2>
                    <div className="flex justify-center mt-10 lg:mt-16">
                        <div className="py-8 px-5 w-[30rem] rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="mr-2 sm:mr-4 w-8 xxs:w-12 lg:w-14 2xl:w-16 rounded-full ring-2 ring-primary">
                                    <img className="rounded-full" src={PGuser?.avatar.length > 0 ? PGuser?.avatar?.[0]?.thumbnailUrl : userImg} alt={PGuser?.fullName + ' image'} />
                                </div>
                                <div>
                                    <p className="text-gray-800 font-semibold">{PGuser?.fullName}</p>
                                    <p className="text-gray-700">{PGuser?.occupation}</p>
                                </div>
                            </div>
                            <form ref={formRef} onSubmit={postReview}>
                                <div className="text-center my-3 sm:my-5">
                                    <Rating
                                        name="simple-controlled"
                                        value={data.rating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setData({ ...data, rating: newValue });
                                        }}
                                    />
                                </div>
                                <textarea onChange={(event) => {
                                    setData({ ...data, desc: event.target.value });
                                }} style={{ resize: 'none' }} className="w-full h-24 xs:h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 sm:text-sm p-4" placeholder="Share your experience at RVL..." required></textarea>

                                <p className="text-end mt-4 sm:mt-5 lg:mt-8">
                                    {

                                        loading ?
                                            <button disabled type="button" className="rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 inline-flex items-center">
                                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                waiting...
                                            </button>
                                            :
                                            <button type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                                Post
                                            </button>

                                    }
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                (user !== null && Guser !== null) &&
                <div className="px-3 xxs:px-5 sm:px-10 pt-20 xxs:pt-16 xs:pt-10 xxs:pb-24">
                    <h2 className="text-center text-base sm:text-xl md:text-3xl font-bold text-gray-800 mb-7 xxs:mb-10">Write A Review</h2>
                    <div className="flex justify-center mt-10 lg:mt-16">
                        <div className="py-8 px-5 w-[30rem] rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="mr-2 sm:mr-4 w-8 xxs:w-12 lg:w-14 2xl:w-16 rounded-full ring-2 ring-primary">
                                    <img className="" src={Guser?.avatar.length > 0 ? Guser?.avatar?.[0]?.thumbnailUrl : userImg} alt={Guser?.name + ' image'} />
                                </div>
                                <p className="text-gray-800 font-semibold">{Guser?.name}</p>
                            </div>
                            <form ref={formRef} onSubmit={postReview}>
                                <div className="text-center my-3 sm:my-5">
                                    <Rating
                                        name="simple-controlled"
                                        value={data.rating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setData({ ...data, rating: newValue });
                                        }}
                                    />
                                </div>
                                <textarea onChange={(event) => {
                                    setData({ ...data, desc: event.target.value });
                                }} style={{ resize: 'none' }} className="w-full h-24 xs:h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 sm:text-sm p-4" placeholder="Share your experience at RVL..." required></textarea>

                                <p className="text-end mt-4 sm:mt-5 lg:mt-8">
                                    {

                                        loading ?
                                            <button disabled type="button" className="rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 inline-flex items-center">
                                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                waiting...
                                            </button>
                                            :
                                            <button type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                                Post
                                            </button>

                                    }
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
};

export default WriteReview;
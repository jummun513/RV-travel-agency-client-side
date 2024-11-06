import { Helmet } from "react-helmet-async";
import url from "../../../../assets/images/booking_back.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import { useContext, useRef, useState } from "react";
import { AuthContextPG } from "../../../../providers/AuthProviderPG";
import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProvider";

const PackageBooking = () => {
    const pgToken = localStorage.getItem('pg_access_token');
    const token = localStorage.getItem('access_token');
    const { packageId } = useParams();
    const navigate = useNavigate();
    const { Guser } = useContext(AuthContext);
    const { PGuser } = useContext(AuthContextPG);
    const formRef = useRef();
    const [error, setError] = useState('');
    const mobile = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: Guser ? Guser._id : PGuser._id,
        userType: Guser ? 'user' : 'privilege_user',
        packageId: packageId,
        childrenGuest: 1,
        adultGuest: 2,
        totalGuest: 3,
    })

    const { data: singlePackage = [], isLoading } = useQuery(['singlePackage'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages/${packageId}`);
        return res.json();
    });

    // mobile number field validation checkup and value set
    const handleNumberField = (e) => {
        if (/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(mobile.current.value)) {
            setError('');
            setFormData({
                ...formData,
                ['emergencyContact']: e.target.value,
            });
        }
        else { setError('invalid_number'); }
    }

    const handleGuestChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: parseInt(value, 10) || 0
        }));

        setFormData(prevData => ({
            ...prevData,
            totalGuest: prevData.childrenGuest + prevData.adultGuest
        }));
    };

    const handleNextButton = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            if (Guser || PGuser) {
                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/package-orders`, formData,
                    {
                        headers: {
                            authorization: `Bearer ${token ? token : pgToken}`,
                        }
                    });
                setLoading(false);
                navigate(`/my-booked-packages/package-booking-review/${response.data.data.orderId}`);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>Package Booking | Royal Venture Limited</title>
            </Helmet>
            <div style={{ backgroundImage: `url(${url})` }} className="bg-cover bg-no-repeat bg-center h-[300px] lg:h-[500px] 4xl:h-[700px] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            </div>
            <div className=''>
                <div className="xs:shadow-2xl pt-7 sm:pt-10 lg:pt-16 relative -top-20 lg:-top-40 4xl:-top-60 rounded-md bg-gray-50 z-10 pb-10 mx-2 xxs:mx-5 sm:mx-auto px-2 xxs:px-5 xl:px-10 sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                    <div className="text-center">
                        <h3 className="text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-6xl font-bold text-gray-900">Booking For</h3>
                        <h3 className="text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-primary mt-1 xl:mt-2 3xl:mt-4">{singlePackage?.packageName}</h3>
                    </div>

                    <div className="px-3 xxs:px-8 xl:px-16 py-7 xl:py-10 flex justify-center">
                        <img className="aspect-16/9 rounded-lg" src={singlePackage?.thumbnail[0].url} alt={`${singlePackage?.packageName} image`} />
                    </div>

                    <form ref={formRef} onSubmit={handleNextButton} className='mx-auto w-[95%] xs:w-[90%] xl:w-[70%] mt-10'>
                        {/* Name field */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input readOnly type="text" name="name" id="name" defaultValue={Guser ? Guser.name : PGuser.fullName} className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" />
                            <label htmlFor="name" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Order Name</label>
                        </div>

                        {/* email field */}
                        <div className="relative z-0 w-full mb-6 xs:mb-10 group">
                            <input readOnly type="email" name="email" id="email" defaultValue={Guser ? Guser.email : PGuser.email} className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" />
                            <label htmlFor="email" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        {/* phone field */}
                        <div className="flex">
                            <div className="mr-5 relative z-0 w-full mb-6 xs:mb-10 group">
                                <input readOnly type="text" name="mobile" id="mobile" defaultValue={Guser ? 'Only for privilege users' : PGuser.mobileNo} className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" />
                                <label htmlFor="mobile" className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile</label>
                            </div>
                            <div className="ml-5 relative z-0 w-full mb-6 xs:mb-10 group">
                                <input ref={mobile} required={Guser} onChange={(e) => handleNumberField(e)} type="text" name="emergency_contact" id="emergency_contact" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                <label htmlFor="emergency_contact" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Emergency Contact{Guser && <sup className="text-red-500 text-sm">*</sup>}</label>
                                {
                                    ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Invalid mobile number!</p>)
                                }
                            </div>
                        </div>

                        {/* Guest count */}
                        <div className="md:mt-6">
                            <h2 className="font-semibold text-gray-900 mt-3 mb-8">Guest Number</h2>
                            <div className='sm:flex items-center sm:mt-7'>
                                {/* adult guest number */}
                                <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                    <label htmlFor="adultGuest">Adult</label>
                                    <input onChange={(e) => handleGuestChange(e)} defaultValue={formData?.adultGuest} name="adultGuest" type="number" pattern="[0-9]*" inputMode="numeric" className="mt-1 input input-bordered input-warning input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                                </div>
                                {/* children guest number */}
                                <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                    <label htmlFor="childrenGuest">Children</label>
                                    <input onChange={(e) => handleGuestChange(e)} defaultValue={formData?.childrenGuest} name="childrenGuest" type="number" pattern="[0-9]*" inputMode="numeric" className="mt-1 input input-bordered input-warning input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                                </div>
                                {/* total guest number */}
                                <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                    <label htmlFor="totalGuest">Total</label>
                                    <input value={formData?.totalGuest} name="totalGuest" type="number" pattern="[0-9]*" inputMode="numeric" readOnly className="mt-1 input input-warning input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                                </div>
                            </div>
                        </div>

                        {/* submit and loading button */}
                        <div className='mt-10 xxs:mt-16 text-end'>
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
                                    <button type="submit" className='inline-block rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]' data-te-ripple-init data-te-ripple-color="light">
                                        Next
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PackageBooking;
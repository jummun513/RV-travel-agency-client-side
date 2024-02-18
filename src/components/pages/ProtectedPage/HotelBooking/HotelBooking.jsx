import { Helmet } from "react-helmet-async";
import url from "../../../../assets/images/booking_back.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContextPG } from "../../../../providers/AuthProviderPG";
import { MdOutlineBed, MdOutlinePhotoSizeSelectSmall } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import axios from "axios";
import { AuthContext } from "../../../../providers/AuthProvider";

const HotelBooking = () => {
    const pgToken = localStorage.getItem('pg_access_token');
    // const token = localStorage.getItem('access_token');
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const { Guser } = useContext(AuthContext);
    const { PGuser } = useContext(AuthContextPG);
    const formRef = useRef();
    const [error, setError] = useState('');
    const mobile = useRef(null);
    const [loading, setLoading] = useState(false);
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [formData, setFormData] = useState({
        userId: Guser ? Guser._id : PGuser._id,
        hotelId: hotelId,
        checkIn: new Date(),
        checkOut: new Date(),
        selectedRooms: [],
        childrenGuest: 1,
        adultGuest: 2,
        totalGuest: 3,
    })
    // data fetch
    const { data: hotels = [], isLoading } = useQuery(['hotels'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels`);
        return res.json();
    })

    // filter the demand data of hotel via id
    const selectedHotel = (hotels?.find(item => (item._id === hotelId)));

    useEffect(() => {
        if (formData.selectedRooms.length > 1) setError('')
    }, [formData.selectedRooms])

    const handleInputChange = (field, event) => {
        let value;
        if (field === 'checkIn' || field === 'checkOut') {
            value = event;
        }
        else if (event.target.name === 'increaseButton' || event.target.name === 'decreaseButton' || event.target.name === 'selectedRooms') {
            if (event.target.name === 'selectedRooms') {
                const selectedRoomLength = formData.selectedRooms.length;
                const roomLength = selectedHotel?.rooms.length;
                if (selectedRoomLength < roomLength && selectedRoomLength < field.index + 1) {
                    const newRoom = Array.from({ length: ((field.index + 1) - selectedRoomLength) }, () => ({
                        roomId: field.roomId,
                        isSelected: true,
                        quantity: 1,
                    }));
                    const updatedRooms = [...formData.selectedRooms, ...newRoom];
                    setFormData({ ...formData, selectedRooms: updatedRooms });
                }
                else {
                    setFormData((prevFormData) => {
                        const updatedRooms = [...prevFormData.selectedRooms];
                        [updatedRooms[field.index].isSelected = event.target.checked, (event.target.checked === true ? updatedRooms[field.index].quantity = 1 : updatedRooms[field.index].quantity = 0)];
                        return { ...prevFormData, selectedRooms: updatedRooms };
                    });
                }
            }
            else {
                event.target.name === 'increaseButton' ? formData.selectedRooms[field.index].quantity += 1 : ((formData.selectedRooms[field.index].quantity > 1) && (formData.selectedRooms[field.index].quantity -= 1));
                setFormData({ ...formData, selectedRooms: [...formData.selectedRooms] });
            }
        }
        else {
            value = event.target.value;
        }

        if (event?.target?.name !== 'selectedRooms' && event?.target?.name !== 'increaseButton' && event?.target?.name !== 'decreaseButton') {
            setFormData({
                ...formData,
                [field]: value,
            });
        }
    }

    // mobile number field validation checkup and value set
    const handleNumberField = (e) => {
        if (/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(mobile.current.value)) {
            setError('');
            handleInputChange('emergencyContact', e);
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

        if (formData.selectedRooms?.length < 1) {
            return setError('notASingleRoom');
        }

        if (Guser) {
            return alert('This is under maintaining.');
        }

        setLoading(true);

        try {
            if (Guser) {
                // const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/orders/user`, formData,
                //     {
                //         headers: {
                //             authorization: `Bearer ${token}`,
                //         }
                //     });
                // setLoading(false);
                // navigate(`/my-booked-hotels/booking-review/${response.data.data.orderId}`);
            }
            else if (PGuser) {
                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/orders/pg-user`, formData,
                    {
                        headers: {
                            authorization: `Bearer ${pgToken}`,
                        }
                    });
                setLoading(false);
                navigate(`/my-booked-hotels/booking-review/${response.data.data.orderId}`);
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
                <title>Hotel Booking | Royal Venture Limited</title>
            </Helmet>
            <div style={{ backgroundImage: `url(${url})` }} className="bg-cover bg-no-repeat bg-center h-[300px] lg:h-[500px] 4xl:h-[700px] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            </div>
            <div className=''>
                <div className="xs:shadow-2xl pt-7 sm:pt-10 lg:pt-16 relative -top-20 lg:-top-40 4xl:-top-60 rounded-md bg-gray-50 z-10 pb-10 mx-2 xxs:mx-5 sm:mx-auto px-2 xxs:px-5 xl:px-10 sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                    <div className="text-center">
                        <h3 className="text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-6xl font-bold text-gray-900">Booking For</h3>
                        <h3 className="text-base xxs:text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-primary mt-1 xl:mt-2 3xl:mt-4">{selectedHotel?.hotelName}</h3>
                    </div>

                    <div className="px-3 xxs:px-8 xl:px-16 py-7 xl:py-10 flex justify-center">
                        <img className="aspect-16/9 rounded-lg" src={selectedHotel?.thumbnail[0].url} alt={`${selectedHotel?.hotelName} image`} />
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

                        {/* check-in and check-out field */}
                        <div className='relative grid xs:grid-cols-2 border-2 border-gray-300 rounded-md'>
                            {/* check-in field */}
                            <div className='px-4 py-2 xs:border-e-2 border-gray-300'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text 2xl:text-base text-gray-700">Check-In Date</span>
                                    </label>
                                    <DatePicker
                                        dateFormat="dd/MM/yy"
                                        startDate={formData?.checkIn}
                                        selected={formData?.checkIn}
                                        onChange={(e) => handleInputChange('checkIn', e)}
                                        closeOnScroll={true} isClearable
                                        placeholderText="Starts date"
                                        endDate={formData?.checkOut}
                                        minDate={new Date()}
                                        shouldCloseOnSelect={false}
                                        fixedHeight
                                        defaultValue={formData?.checkIn}
                                        required
                                        className='input input-bordered input-info input-sm 2xl:input-md w-full min-w-[30px] text-gray-950 bg-white'
                                    >
                                        <div className='text-red-500 text-xs'>Do not forget to check the weather!</div>
                                    </DatePicker>
                                    <label className="label">
                                        <span className="label-text-alt text-gray-600">Day: {weekday[`${formData?.checkIn !== '' && formData?.checkIn?.getDay()}`]}</span>
                                    </label>
                                </div>
                            </div>
                            {/* check-out field */}
                            <div className='px-4 py-2'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text 2xl:text-base text-gray-700">Check-Out Date</span>
                                    </label>
                                    <DatePicker
                                        dateFormat="dd/MM/yy"
                                        closeOnScroll={true} isClearable
                                        placeholderText="Ends date"
                                        defaultValue={formData?.checkOut}
                                        onChange={(e) => handleInputChange('checkOut', e)}
                                        selected={formData?.checkOut}
                                        startDate={formData?.checkIn}
                                        endDate={formData?.checkOut}
                                        minDate={formData?.checkIn}
                                        shouldCloseOnSelect={false}
                                        fixedHeight
                                        required
                                        className='input input-bordered input-info input-sm 2xl:input-md w-full min-w-[60px] text-gray-950 bg-white'
                                    >
                                        <div className='text-red-500 text-xs'>Do not forget to check the weather!</div>
                                    </DatePicker>
                                    <label className="label">
                                        <span className="label-text-alt text-gray-600">Day: {weekday[`${formData?.checkOut !== '' && formData?.checkOut?.getDay()}`]}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* choose rooms rooms */}
                        <div className="mt-16">
                            <div>
                                <h2 className="font-semibold text-gray-900 mt-3 mb-4">Choose Your Room</h2>
                                {
                                    selectedHotel?.rooms?.map((d, i) => {
                                        return (
                                            <div key={i} className="shadow hover:shadow-lg mb-4 lg:mb-6 py-3 px-4 rounded-md">
                                                <div className="flex justify-between">
                                                    <div className="w-[80%] 3xl:w-[70%] lg:flex items-center justify-between">
                                                        <div>
                                                            <p className="text-gray-700 font-semibold">{d?.name}</p>
                                                            <p className='flex items-center mt-1 xxs:mt-2 text-gray-600'><MdOutlineBed className='h-4 w-4 me-2 xs:me-3'></MdOutlineBed><span className="text-xs sm:text-sm">{d?.bed}</span></p>
                                                            <p className='flex items-center mt-1 xxs:mt-2 text-gray-600'><BsFillPersonFill className='h-4 w-4 me-2 xs:me-3'></BsFillPersonFill><span className="text-xs sm:text-sm">Sleeps {d.sleep}</span></p>
                                                            <p className='flex items-center mt-1 xxs:mt-2 text-gray-600'><MdOutlinePhotoSizeSelectSmall className='h-4 w-4 me-2 xs:me-3'></MdOutlinePhotoSizeSelectSmall><span className="text-xs sm:text-sm">{d.size}</span></p>
                                                            <p className="text-gray-700 font-semibold text-sm mt-3">Price(&#2547;) : <span className="text-red-500 ml-1">{d.discountPrice} tk.</span> <small>(per night)</small> <sup className="text-red-500">*</sup></p>
                                                            <p className="text-gray-600 text-[8px] sm:text-xs 3xl:text-sm sm:mt-1">Included Taxes and Fees</p>
                                                        </div>
                                                        <div className="mt-4 xxs:mt-7 lg:mt-0">
                                                            <p className="font-semibold text-gray-700">Quantity</p>
                                                            <div className={`flex items-center mt-1 ${(formData.selectedRooms[i]?.isSelected || formData.selectedRooms[i]?.isSelected === true) ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                                                                <button onClick={(e) => handleInputChange({ roomId: d?._id, index: i }, e)} disabled={formData?.selectedRooms[i]?.quantity < 2 && true} name="decreaseButton" type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e] text-gray-950'>-</button>
                                                                <p className='w-14 p-2 mx-3 text-gray-950 border border-primary'>{formData?.selectedRooms[i]?.quantity ? formData?.selectedRooms[i]?.quantity : 0}</p>
                                                                <button onClick={(e) => handleInputChange({ roomId: d?._id, index: i }, e)} disabled={formData?.selectedRooms[i]?.quantity < 1 && true} name="increaseButton" type='button' className='p-2 bg-primary font-semibold hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#ffb7005e] text-gray-950'>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-[20%] 3xl:w-[30%] flex justify-end">
                                                        <label className="cursor-pointer">
                                                            <input onChange={(e) => handleInputChange({ roomId: d?._id, index: i }, e)} name="selectedRooms" type="checkbox" className="checkbox checkbox-sm lg:checkbox-md checkbox-warning" checked={formData.selectedRooms[i]?.isSelected === true && true} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p className='text-[8px] xxs:text-xs sm:text-sm text-gray-600 mt-3 sm:mt-5'>(<span className='text-red-500 text-[8px] md:text-sm'>*</span>) Terms conditions are applied. <Link className="text-blue-600" to='/terms&condition'>Read Here</Link></p>
                        </div>

                        {/* Guest count */}
                        <div className="mt-14">
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
                        {
                            error.includes('notASingleRoom') && <p className="text-red-500 text-xs md:text-sm 4xl:text-base mt-2 xxs:mt-3 xl:mt-6">At least a room must be added.</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HotelBooking;
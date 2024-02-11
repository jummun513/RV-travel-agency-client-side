import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../../shared/Loading/Loading";
import NotFound from "../../../../../shared/NotFound/NotFound";
import { useQuery } from "react-query";
import EditMoreRoom from "./EditMoreRoom/EditMoreRoom";
import { toast } from "react-toastify";
import { uploadImage } from "../../../../../../functions/imageStore";
import axios from "axios";

const EditHotel = () => {
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState('');
    const { editHotelId } = useParams();
    const [moreData, setMoreData] = useState([]);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const successNotify = () => toast.success("Successfully, new hotel added.", { theme: "light" });
    const errorNotify = () => toast.error("There was a problem, try later!", { theme: "light" });
    const [data, setData] = useState({
        description: "",
        location: {
            country: "",
            state: "",
            city: "",
            map: "",
            detailsAdd: "",
            around: []
        },
        rooms: [],
        about: "",
        faq: {
            faq_1: '',
            faq_2: '',
            faq_3: '',
            faq_4: '',
            faq_5: '',
            faq_6: '',
            faq_7: '',
            faq_8: '',
            faq_9: ''
        }
    });
    const { data: hotel, isLoading, isError } = useQuery(['hotel'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hotels/${editHotelId}`);
        return res.json();
    });
    const [previousRooms, setPreviousRooms] = useState([]);

    useEffect(() => {
        if (!isLoading && !isError && data.rooms.length < 1) {
            setData(hotel);
            setPreviousRooms(hotel.rooms);
        }
        if (data.rooms?.some(d => d.pictures.length < 1)) {
            setError('upload_invalid');
        } else {
            setError('');
        }
    }, [hotel, isLoading, isError, data]);

    useEffect(() => {
        setData({
            ...data,
            rooms: [...previousRooms, ...moreData],
        });
    }, [moreData]);

    // set input value according their name
    const handleInputChange = (field, event) => {
        let newValue;
        if (field === 'room') {
            newValue = event.e.target.value;
        }
        else {
            newValue = event.target.value;
        }
        if (field == 'country' || field === 'city' || field === 'state' || field === 'map' || field === "detailsAdd") {
            setData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [field]: newValue,
                },
            }));
        }
        else if (field.startsWith('faq')) {
            setData((prevData) => ({
                ...prevData,
                faq: {
                    ...prevData.faq,
                    [field]: newValue,
                }
            }
            ))
        }
        else if (field === 'room') {
            const updatedData = { ...data };
            if (event.fieldName === 'name') {
                updatedData.rooms.find(d => d._id === event.id).name = newValue;
                setData(updatedData);
            }
            else if (event.fieldName === 'price') {
                updatedData.rooms.find(d => d._id === event.id).price = newValue;
                setData(updatedData);
            }
            else if (event.fieldName === 'discountPrice') {
                updatedData.rooms.find(d => d._id === event.id).discountPrice = newValue;
                setData(updatedData);
            }
        }
        else {
            setData(prevData => ({
                ...prevData,
                [field]: newValue
            }));
        }
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        const name = hotel.hotelName;
        const formattedHotelName = name.replace(/\s+/g, '_');
        const uploadedData = { ...data };

        if (data.rooms.length > 0 && error === '') {
            try {
                setLoading(true);

                await Promise.all(data?.rooms?.map(async (item, i) => {
                    if (!item.pictures[0].fileId) {
                        const d = await uploadImage(item.pictures, `Royal_Venture/Hotels/${formattedHotelName}/rooms_${i}`);
                        uploadedData.rooms[i].pictures = d;
                    }
                }));


                const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/hotels/edit/${editHotelId}`, uploadedData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });

                if (response?.data?.data?.modifiedCount === 1) {
                    formRef.current.reset();
                    successNotify();
                    navigate('/admin-panel/manage-hotels');
                }
                else {
                    errorNotify();
                }
                setLoading(false);
            } catch (error) {
                errorNotify();
                navigate(0);
            }
        }
        else {
            setError('upload_invalid');
        }
    };

    return (
        <div className="mx-10 px-5 2xl:px-10 pt-14 pb-10 my-14 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-center text-gray-800 font-bold text-4xl 3xl:text-5xl">Edit Hotel</h2>
            <form ref={formRef} className="mt-8" onSubmit={handleUpload}>
                {/* hotel description */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Description <sup className="text-red-500">*</sup></label>
                    <input onChange={(e) => handleInputChange('description', e)} value={data?.description} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Short description in 10 words." required />
                </div>

                {/* location details */}
                <div className="mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mt-14 mb-5">Location Details</h3>
                    <div className="grid grid-cols-3 gap-x-5 mb-5">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">City <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('city', e)} value={data?.location?.city} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Chittagong" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">State</label>
                            <input onChange={(e) => handleInputChange('state', e)} value={data?.location?.state} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Country <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('country', e)} value={data?.location?.country} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Bangladesh" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 mb-5">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Google Map Link <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('map', e)} value={data?.location?.map} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14760.646552930377!2d91.8229809!3d22.3475248!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a2a645ee07%3A0x2a94a4fa61c7b1a3!2sRadisson%20Blu%20Chattogram%20Bay%20View!5e0!3m2!1sen!2sbd!4v1694954254215!5m2!1sen!2sbd" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Address Details <sup className="text-red-500">*</sup><small>(Road, Area, Police Station, City, Country)</small></label>
                            <input onChange={(e) => handleInputChange('detailsAdd', e)} value={data?.location?.detailsAdd} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Bulbul Center, 486/B O.R. Nizam Road, CDA Avenue, Chittagong, 4100" required />
                        </div>
                    </div>
                </div>

                {
                    previousRooms?.map((d, index) => {
                        return (
                            <div key={index} className='mb-6 md:mb-10 border p-2 bg-gray-50 pb-10'>
                                <div className='px-3'>
                                    {/* room number */}
                                    <h2 className="text-gray-800 font-semibold my-2 md:my-4">Room-{index + 1}</h2>

                                    {/* name field */}
                                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                        <label>Room Type or Name <sup className='text-red-500'>*</sup></label>
                                        <input onChange={(e) => handleInputChange('room', { fieldName: 'name', e: e, id: d._id })} value={d.name} type="text" placeholder="Business Room (Class - Lounge Access)" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                                    </div>

                                    <div className='grid grid-cols-2 gap-x-5 mt-7'>
                                        {/* price */}
                                        <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                            <label htmlFor="price">Price (&#2547;) <small>(Per night)</small></label>
                                            <input onChange={(e) => handleInputChange('room', { fieldName: 'price', e: e, id: d._id })} value={d.price} onWheel={(e) => e.target.blur()} type="number" pattern="[0-9]*" inputMode="numeric" placeholder='2000' className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                                        </div>
                                        {/*discount price */}
                                        <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                            <label htmlFor="price">Discount Price (&#2547;) <sup className='text-red-500'>*</sup> <small>(Per night)</small></label>
                                            <input onChange={(e) => handleInputChange('room', { fieldName: 'discountPrice', e: e, id: d._id })} value={d.discountPrice} onWheel={(e) => e.target.blur()} type="number" pattern="[0-9]*" inputMode="numeric" placeholder='2000' className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <EditMoreRoom rooms={hotel?.rooms} moreData={moreData} setMoreData={setMoreData}></EditMoreRoom>

                {/* about the hotel */}
                <div className="mt-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">About the Hotel</h3>
                    <textarea onChange={(e) => handleInputChange('about', e)} style={{ resize: 'none' }} value={data?.about} className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-4" placeholder="Write Here..." required></textarea>
                </div>

                {/* faq */}
                <div className="mt-8 mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Frequently Asked Question</h3>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Does offer free cancellation for a full refund?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_1', e)} value={data?.faq?.faq_1} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Yes, Radisson Blu Bay View does have fully refundable room rates available to book on our site..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">What are the cleanliness and hygiene measure?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_2', e)} value={data?.faq?.faq_2} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="This property confirms that disinfectant is used to clean the property..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Is there a pull?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_3', e)} value={data?.faq?.faq_3} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Yes, there's an outdoor pool..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Are pet allows?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_4', e)} value={data?.faq?.faq_4} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Sorry, pets and service animals aren't allowed..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Is parking offered onside?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_5', e)} value={data?.faq?.faq_5} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Yes, there's free valet parking..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">What are the check-in and check-out time?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_6', e)} value={data?.faq?.faq_6} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Check-in start time: 2 PM; Check-in end time: midnight. Check-out time is noon. Contactless check-in is available..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">What is there to do view and nearby?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_7', e)} value={data?.faq?.faq_7} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Practice your swing on the tennis courts..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Are there restaurants at or near?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_8', e)} value={data?.faq?.faq_8} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Yes, there are 3 onsite restaurants, featuring Asian cuisine..." required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">What&lsquo;s the area around view like?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_9', e)} value={data?.faq?.faq_9} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Radisson Blu Chattogram Bay View is in the heart of Chittagong, a short 1-minute..." required />
                    </div>
                </div>

                <p className="text-end mt-10">
                    {
                        loading ?
                            <button disabled type="button" className="rounded bg-primary px-3 py-2 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-xs md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-950 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-950 animate-spin" viewBox="0 0 100 101" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Uploading...
                            </button>
                            :
                            <button disabled={error !== ''} type="submit" className="btn bg-primary hover:bg-secondary text-gray-950 border-none btn-wide focus:ring-4 focus:ring-yellow-300">Save</button>
                    }
                </p>

                {
                    error.includes('upload_invalid') && <p className="text-sm text-end text-red-500 mt-5">At least a image have to add for room.</p>
                }
            </form>
        </div>
    );
};

export default EditHotel;
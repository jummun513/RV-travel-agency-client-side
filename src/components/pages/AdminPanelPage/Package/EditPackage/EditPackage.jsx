import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import NotFound from "../../../../shared/NotFound/NotFound";
import Loading from "../../../../shared/Loading/Loading";
import ReactDatePicker from "react-datepicker";

const EditPackage = () => {
    const token = localStorage.getItem('access_token');
    const { packageId } = useParams();
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const successNotify = () => toast.success("Successfully, Updated Package.", { theme: "light" });
    const errorNotify = () => toast.error("There was a problem, try later!", { theme: "light" });
    const [data, setData] = useState({
        packageDiscountPrice: '',
        packageType: {},
        lastEntry: Date.now(),
        startDate: Date.now(),
        packageDuration: { days: '', nights: '' },
        guestNumber: { adult: '2', child: '1', total: '4' },
        packageZone: {
            country: '',
            state: '',
            city: '',
            map: '',
            detailsAdd: '',
        },
        overview: '',
        itineraryData: [],
        faq: {
            faq_1: '',
            faq_2: '',
            faq_3: '',
            faq_4: '',
            faq_5: '',
            faq_6: '',
            faq_7: ''
        }
    });
    const { data: singlePackage, isLoading, isError } = useQuery(['singlePackage'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages/${packageId}`);
        return res.json();
    });
    const [previousItinerary, setPreviousItinerary] = useState([]);

    useEffect(() => {
        if (!isLoading && !isError && data.itineraryData.length < 1) {
            setData(singlePackage);
            setPreviousItinerary(singlePackage.itineraryData);
        }
    }, [singlePackage, isLoading, isError, data]);

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'packageType' || field === 'lastEntry' || field === 'startDate') {
            value = e;
        }
        else if (field === 'itinerary') {
            value = e.event.target.value;
        }
        else {
            value = e.target.value;
        }

        if (field == 'country' || field === 'city' || field === 'state' || field === 'map' || field === "detailsAdd" || field === "days" || field === "nights") {
            setData((prevData) => ({
                ...prevData,
                [e.target.name]: {
                    ...prevData[e.target.name],
                    [field]: value,
                },
            }));
        }
        else if (e?.target?.name === 'guestNumber') {
            setData((prevData) => ({
                ...prevData,
                [e.target.name]: {
                    ...prevData[e.target.name],
                    [field]: value,
                },
            }));
            if (field === 'adult') {
                setData((prevData) => ({
                    ...prevData,
                    guestNumber: {
                        ...prevData.guestNumber,
                        total: parseInt(value) + parseInt(data.guestNumber.child),
                    },
                }));
            }
            else {
                setData((prevData) => ({
                    ...prevData,
                    guestNumber: {
                        ...prevData.guestNumber,
                        total: parseInt(value) + parseInt(data.guestNumber.adult),
                    },
                }));
            }
        }
        else if (field?.startsWith('faq')) {
            setData((prevData) => ({
                ...prevData,
                faq: {
                    ...prevData.faq,
                    [field]: value,
                }
            }
            ))
        }
        else if (field === 'itinerary') {
            const updatedData = { ...data };
            if (e.fieldName === 'title') {
                updatedData.itineraryData.find((d, i) => i === e.index).title = value;
                setData(updatedData);
            }
            else if (e.fieldName === 'details') {
                updatedData.itineraryData.find((d, i) => i === e.index).details = value;
                setData(updatedData);
            }
        }
        else {
            setData(prevData => ({
                ...prevData,
                [field]: value
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

        try {
            setLoading(true);

            const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/packages/${packageId}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });

            if (response?.data?.modifiedCount === 1) {
                formRef.current.reset();
                successNotify();
                navigate('/admin-panel/manage-packages');
            }
            else {
                errorNotify();
            }
            setLoading(false);
        } catch (error) {
            errorNotify();
            navigate(0);
        }
    };

    return (
        <div className="mx-10 px-5 2xl:px-10 pt-14 pb-10 my-14 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-center text-gray-800 font-bold text-4xl 3xl:text-5xl">Package Edit</h2>
            <form ref={formRef} className="mt-8 md:mt-14" onSubmit={handleUpload}>
                {/* Package Price */}
                <div className="grid grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="packagePrice" className="block mb-2 text-sm font-medium text-gray-900">Package Price<small> (Per person)</small></label>
                        <input onChange={(e) => handleInputChange('packagePrice', e)} onWheel={(e) => e.target.blur()} defaultValue={data?.packagePrice} type="number" id="packagePrice" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="10000" />
                    </div>
                    <div className="mb-6 ml-5">
                        <label htmlFor="packageDiscountPrice" className="block mb-2 text-sm font-medium text-gray-900">Package Discount Price <sup className="text-red-500">*</sup><small> (Per person)</small></label>
                        <input onChange={(e) => handleInputChange('packageDiscountPrice', e)} onWheel={(e) => e.target.blur()} value={data?.packageDiscountPrice} type="number" id="packageDiscountPrice" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="10000" required />
                    </div>
                </div>

                {/* start and last entry date */}
                <div className="flex mb-6">
                    {/* last entry date*/}
                    <div className="w-1/2">
                        <label htmlFor="lastEntry" className="block mb-2 text-sm font-medium text-gray-900">Last Date of Entry <sup className="text-red-500">*</sup></label>
                        <ReactDatePicker
                            dateFormat="MMMM d, yyyy h:mm aa"
                            closeOnScroll={true}
                            name=''
                            minDate={Date.now()}
                            isClearable
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={new Date(data?.lastEntry)}
                            timeInputLabel="Time:"
                            showTimeInput
                            onChange={(e) => handleInputChange('lastEntry', e)}
                            className='w-72 2xl:w-96 mt-1 input input-bordered input-info input-xs xxs:input-sm text-gray-950 bg-white'
                        />
                    </div>
                    {/* start date*/}
                    <div className="w-1/2">
                        <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Approximate Start Date <sup className="text-red-500">*</sup></label>
                        <ReactDatePicker
                            dateFormat="MMMM d, yyyy h:mm aa"
                            closeOnScroll={true}
                            name=''
                            minDate={Date.now()}
                            isClearable
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={new Date(data?.startDate)}
                            timeInputLabel="Time:"
                            showTimeInput
                            onChange={(e) => handleInputChange('startDate', e)}
                            className='w-72 2xl:w-96 mt-1 input input-bordered input-info input-xs xxs:input-sm text-gray-950 bg-white'
                        />
                    </div>
                </div>

                {/* Package duration */}
                <div className="mb-6">
                    <label htmlFor="packageDuration" className="block mb-2 text-sm font-medium text-gray-900">Package Duration <sup className="text-red-500">*</sup></label>
                    <div className="flex">
                        <div className="flex items-center"><input name="packageDuration" onChange={(e) => { handleInputChange('days', e) }} onWheel={(e) => e.target.blur()} value={data?.packageDuration?.days} type="number" id="packageDuration" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="2" required /> <small className="text-gray-700 font-semibold ml-1">Days</small></div>
                        <div className="flex items-center ml-5"><input name="packageDuration" onChange={(e) => { handleInputChange('nights', e) }} onWheel={(e) => e.target.blur()} value={data?.packageDuration?.nights} type="number" id="packageDuration1" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="3" required /> <small className="text-gray-700 font-semibold ml-1">Nights</small></div>
                    </div>
                </div>

                {/*Maximum Guest number */}
                <div className="mb-6">
                    <label htmlFor="guestNumber" className="block mb-2 text-sm font-medium text-gray-900">Maximum Guest <sup className="text-red-500">*</sup></label>
                    <div className="flex">
                        <div className="flex items-center"><input name="guestNumber" onChange={(e) => { handleInputChange('adult', e) }} onWheel={(e) => e.target.blur()} type="number" value={data?.guestNumber?.adult} className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="Ex. 2" required /> <small className="text-gray-700 font-semibold ml-1">Adults</small></div>
                        <div className="flex items-center ml-5"><input name="guestNumber" onChange={(e) => { handleInputChange('child', e) }} onWheel={(e) => e.target.blur()} type="number" value={data?.guestNumber?.child} className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="Ex. 1" required /> <small className="text-gray-700 font-semibold ml-1">Children</small></div>
                        <div className="flex items-center ml-5"><input type="number" value={data?.guestNumber?.total} className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" disabled /> <small className="text-gray-700 font-semibold ml-1">Total</small></div>
                    </div>
                </div>


                {/* location details */}
                <div className="mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mt-14 mb-5">Package Zone Details</h3>
                    <div className="grid grid-cols-3 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City <sup className="text-red-500">*</sup></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('city', e)} value={data?.packageZone?.city} type="text" id="city" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Chittagong" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                            <input name="packageZone" onChange={(e) => handleInputChange('state', e)} value={data?.packageZone?.state} type="text" id="state" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country <sup className="text-red-500">*</sup></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('country', e)} value={data?.packageZone?.country} type="text" id="country" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Bangladesh" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="map" className="block mb-2 text-sm font-medium text-gray-900">Google Map Link <sup className="text-red-500">*</sup></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('map', e)} value={data?.packageZone?.map} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14760.646552930377!2d91.8229809!3d22.3475248!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a2a645ee07%3A0x2a94a4fa61c7b1a3!2sRadisson%20Blu%20Chattogram%20Bay%20View!5e0!3m2!1sen!2sbd!4v1694954254215!5m2!1sen!2sbd" required />
                        </div>
                        <div>
                            <label htmlFor="detailsAdd" className="block mb-2 text-sm font-medium text-gray-900">Address Details <small>(Road, Area, Police Station, City, Country)</small></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('detailsAdd', e)} value={data?.packageZone?.detailsAdd} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Avenue Center, 486/B Lalkhan Bazar, CDA Avenue, Chittagong, 4110" />
                        </div>
                    </div>
                </div>

                {/* Package Overview */}
                <div className="mt-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Package Overview<sup className="text-red-500"><small>*</small></sup></h3>
                    <textarea onChange={(e) => handleInputChange('overview', e)} value={data?.overview} style={{ resize: 'none' }} name="overview" id="overview" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-4" placeholder="Write Here..." required></textarea>
                </div>

                {
                    previousItinerary?.map((d, index) => {
                        return (
                            <div key={index} className='mb-6 md:mb-10 border p-2 bg-gray-50 pb-10'>
                                <div className='px-3'>
                                    {/* room number */}
                                    <h2 className="text-gray-800 font-semibold my-2 md:my-4">Day-{index + 1}</h2>

                                    {/* name field */}
                                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                                        <label htmlFor="title">Title <sup className='text-red-500'>*</sup></label>
                                        <input
                                            onChange={(e) => handleInputChange('itinerary', { fieldName: 'title', index: index, event: e })} value={d?.title} type="text" placeholder="Business Room (Class - Lounge Access)" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                                    </div>
                                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0 mt-6">
                                        <label htmlFor="details">Details <sup className='text-red-500'>*</sup></label>
                                        <textarea
                                            onChange={(e) => handleInputChange('itinerary', { fieldName: 'details', index: index, event: e })} value={d?.details} style={{ resize: 'none' }} className="w-full h-32 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-4" placeholder="Write Here..." required></textarea>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {/* faq */}
                <div className="mt-8 mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Frequently Asked Question</h3>
                    <div className="mb-6">
                        <label htmlFor="faq_1" className="block mb-2 text-sm font-medium text-gray-900">Activities highlight by day.<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_1', e)} value={data?.faq?.faq_1} style={{ resize: 'none' }} name="faq_1" id="faq_1" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_2" className="block mb-2 text-sm font-medium text-gray-900">Pickup Note<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_2', e)} value={data?.faq?.faq_2} type="text" id="faq_2" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Yes, Radisson Blu Bay View does have fully refundable room rates available to book on our site..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_3" className="block mb-2 text-sm font-medium text-gray-900">What are the cancellation and refund policy?<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_3', e)} value={data?.faq?.faq_3} style={{ resize: 'none' }} name="faq_3" id="faq_3" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_4" className="block mb-2 text-sm font-medium text-gray-900">Included Services<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_4', e)} value={data?.faq?.faq_4} style={{ resize: 'none' }} name="faq_4" id="faq_4" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_5" className="block mb-2 text-sm font-medium text-gray-900">Excluded Services<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_5', e)} value={data?.faq?.faq_5} style={{ resize: 'none' }} name="faq_5" id="faq_5" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_6" className="block mb-2 text-sm font-medium text-gray-900">What conditions are included with the package?<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_6', e)} value={data?.faq?.faq_6} style={{ resize: 'none' }} name="faq_6" id="faq_6" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_7" className="block mb-2 text-sm font-medium text-gray-900">What is there to do view and nearby?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_7', e)} value={data?.faq?.faq_7} type="text" id="faq_7" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Practice your swing on the tennis courts..." required />
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
                            <button type="submit" className="btn bg-primary hover:bg-secondary text-gray-950 border-none btn-wide focus:ring-4 focus:ring-yellow-300">Save</button>
                    }
                </p>
            </form>
        </div>
    );
};

export default EditPackage;
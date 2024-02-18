import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import ReactDatePicker from "react-datepicker";
import ImageDropZoneForPackage from "./ImageDropZoneForPackage/ImageDropZoneForPackage";
import { uploadImage } from "../../../../../functions/imageStore";
import AddMoreItinerary from "./AddMoreItinerary/AddMoreItinerary";

const AddPackage = () => {
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState('');
    const [itineraryData, setItineraryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState({
        packageCode: '',
        packageName: '',
        packageDiscountPrice: '',
        packageType: {},
        lastEntry: Date.now(),
        startDate: Date.now(),
        packageDuration: { days: '', nights: '' },
        guestNumber: { adult: '2', child: '1', total: '3' },
        thumbnail: [],
        packageZone: {
            country: '',
            state: '',
            city: '',
            map: '',
            detailsAdd: '',
        },
        overview: '',
        itineraryData: [],
        faq: {},
        images: []
    });

    useEffect(() => {
        if (error == 'large_file' || error == 'file_type_invalid' || error == 'invalid_name') {
            return;
        }
        else {
            setError('');
        }
    }, [data]);

    useEffect(() => {
        setData({
            ...data,
            itineraryData: itineraryData,
        });
    }, [itineraryData]);

    const handleAllImages = (image) => {
        setData({ ...data, images: image });
    }

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'thumbnail') {
            value = e.target.files[0];
        }
        else if (field === 'packageType' || field === 'lastEntry' || field === 'startDate') {
            value = e;
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
        else if (field === 'thumbnail') {
            setData((prevData) => ({
                ...prevData,
                [field]: [value],
            }))
        }
        else {
            setData({
                ...data,
                [field]: value,
            });
        }
    };

    // handle thumbnail image
    const handleFileField = (e) => {
        const allowedType = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
        if (e.target?.files[0]?.size > 1024 * 300) {
            setError('large_file');
        }
        else if (!allowedType.includes(e.target?.files[0]?.type)) {
            setError('file_type_invalid');
        }
        else {
            setError('');
        }
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        const notify = () => toast.success("Successfully, new hotel added.", { theme: "light" });
        const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
        const folderName = Math.round(Math.random() * 1000) + (Date.now());
        const uploadedData = { ...data, imageFolder: folderName };

        if (data.images.length > 0 && data.thumbnail.length > 0 && error === '') {
            try {
                setLoading(true);

                uploadImage(uploadedData.thumbnail, `Royal_Venture/Packages/${folderName}/thumbnail`).then(d => uploadedData.thumbnail = d).then(
                    await uploadImage(uploadedData.images, `Royal_Venture/Packages/${folderName}/images`).then(d => uploadedData.images = d)
                )

                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/packages/add-new`, uploadedData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })

                setLoading(false);

                if (response.data === 'success') {
                    formRef.current.reset();
                    notify();
                    navigate('/admin-panel/manage-packages');
                }
                else {
                    notifyError();
                }

            } catch (error) {
                console.log(error);
                navigate(0);
            }
        }
        else {
            setError('upload_invalid');
        }
    };

    // option for relation select dropdown
    const options = [
        { value: 'Honeymoon Tour Package', label: 'Honeymoon Tour' },
        { value: 'Holiday Tour Package', label: 'Holiday Tour' },
        { value: 'Summer Tour Package', label: 'Summer Tour' },
        { value: 'World Tour Package', label: 'World Tour' },
        { value: 'Independent Tour Package', label: 'Independent Tour' },
        { value: 'Business Tour Package', label: 'Business Tour' },
        { value: 'Refreshment Tour Package', label: 'Refreshment Tour' },
        { value: 'Vacation Tour Package', label: 'Vacation Tour' },
        { value: 'Family Tour Package', label: 'Family Tour' },
        { value: 'Corporate Tour Package', label: 'Corporate Tour' },
        { value: 'Holy Hajj Package', label: 'Hajj Package' },
        { value: 'Holy Umrah Package', label: 'Umrah Package' },
        { value: 'Student tour Package', label: 'Student Tour' },
        { value: 'Study Package', label: 'Study Package' },
    ]

    return (
        <div className="mx-10 px-5 2xl:px-10 pt-14 pb-10 my-14 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-center text-gray-800 font-bold text-4xl 3xl:text-5xl">Add New Package</h2>
            <form ref={formRef} className="mt-8" onSubmit={handleUpload}>
                {/* Package Code */}
                <div className="mb-6">
                    <label htmlFor="packageCode" className="block mb-2 text-sm font-medium text-gray-900">Package Code <sup className="text-red-500">*</sup><small> (Only number)</small></label>
                    <input onChange={(e) => handleInputChange('packageCode', e)} type="text" id="packageCode" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="RVL-PAC-101" required />
                </div>

                {/* Package name */}
                <div className="mb-6">
                    <label htmlFor="packageName" className="block mb-2 text-sm font-medium text-gray-900">Package Name <sup className="text-red-500">*</sup></label>
                    <input onChange={(e) => handleInputChange('packageName', e)} type="text" id="packageName" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Escape to Romance - Royal Tulip" required />
                </div>

                {/* Package Price */}
                <div className="grid grid-cols-2">
                    <div className="mb-6">
                        <label htmlFor="packagePrice" className="block mb-2 text-sm font-medium text-gray-900">Package Price<small> (Per person)</small></label>
                        <input onChange={(e) => handleInputChange('packagePrice', e)} onWheel={(e) => e.target.blur()} type="number" id="packagePrice" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="10000" />
                    </div>
                    <div className="mb-6 ml-5">
                        <label htmlFor="packageDiscountPrice" className="block mb-2 text-sm font-medium text-gray-900">Package Discount Price <sup className="text-red-500">*</sup><small> (Per person)</small></label>
                        <input onChange={(e) => handleInputChange('packageDiscountPrice', e)} onWheel={(e) => e.target.blur()} type="number" id="packageDiscountPrice" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="10000" required />
                    </div>
                </div>

                {/* package type */}
                <div className="mb-6">
                    <label htmlFor="packageType" className="block mb-2 text-sm font-medium text-gray-900">Package Type <sup className="text-red-500">*</sup></label>
                    <Select name='packageType' onChange={(e) => handleInputChange('packageType', e)} className='mt-1 text-gray-700' options={options} required />
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
                            selected={data.lastEntry}
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
                            selected={data.startDate}
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
                        <div className="flex items-center"><input name="packageDuration" onChange={(e) => { handleInputChange('days', e) }} onWheel={(e) => e.target.blur()} type="number" id="packageDuration" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="2" required /> <small className="text-gray-700 font-semibold ml-1">Days</small></div>
                        <div className="flex items-center ml-5"><input name="packageDuration" onChange={(e) => { handleInputChange('nights', e) }} onWheel={(e) => e.target.blur()} type="number" id="packageDuration1" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="3" required /> <small className="text-gray-700 font-semibold ml-1">Nights</small></div>
                    </div>
                </div>

                {/*Maximum Guest number */}
                <div className="mb-6">
                    <label htmlFor="guestNumber" className="block mb-2 text-sm font-medium text-gray-900">Maximum Guest <sup className="text-red-500">*</sup></label>
                    <div className="flex">
                        <div className="flex items-center"><input name="guestNumber" onChange={(e) => { handleInputChange('adult', e) }} onWheel={(e) => e.target.blur()} type="number" defaultValue={data.guestNumber.adult} className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="Ex. 2" required /> <small className="text-gray-700 font-semibold ml-1">Adults</small></div>
                        <div className="flex items-center ml-5"><input name="guestNumber" onChange={(e) => { handleInputChange('child', e) }} onWheel={(e) => e.target.blur()} type="number" defaultValue={data.guestNumber.child} className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" placeholder="Ex. 1" required /> <small className="text-gray-700 font-semibold ml-1">Children</small></div>
                        <div className="flex items-center ml-5"><input type="number" value={data?.guestNumber?.total} className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none w-full p-2.5" disabled /> <small className="text-gray-700 font-semibold ml-1">Total</small></div>
                    </div>
                </div>

                {/* add package thumbnail */}
                <div className="form-control w-full mt-4">
                    <label htmlFor='thumbnail' className="label mb-1">
                        <span className="text-xs xs:text-sm text-gray-800">Image upload ( .jpg, .jpeg, .png). File size not more than 300 KB. Aspect Ratio 16:9.</span>
                    </label>
                    <input type="file" onChange={(e) => { handleInputChange('thumbnail', e); handleFileField(e) }} name='thumbnail' className="file-input-xs file-input-warning bg-white text-gray-950 xxs:file-input-sm xl:file-input-md file-input file-input-bordered w-full max-w-[200px] xxs:max-w-[250px] md:max-w-xs" required />
                    {
                        (error.includes('large_file') && <label className="label">
                            <span className="label-text-alt text-red-600">Maximum file size 300 KB allowed.</span>
                        </label>) ||
                        (error.includes('file_type_invalid') && <label className="label">
                            <span className="label-text-alt text-red-600">Only .jpg, .png, .jpeg, .svg, .webP format allowed.</span>
                        </label>)
                    }
                </div>

                {/* location details */}
                <div className="mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mt-14 mb-5">Package Zone Details</h3>
                    <div className="grid grid-cols-3 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City <sup className="text-red-500">*</sup></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('city', e)} type="text" id="city" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Chittagong" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                            <input name="packageZone" onChange={(e) => handleInputChange('state', e)} type="text" id="state" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country <sup className="text-red-500">*</sup></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('country', e)} type="text" id="country" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Bangladesh" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="map" className="block mb-2 text-sm font-medium text-gray-900">Google Map Link <sup className="text-red-500">*</sup></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('map', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14760.646552930377!2d91.8229809!3d22.3475248!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a2a645ee07%3A0x2a94a4fa61c7b1a3!2sRadisson%20Blu%20Chattogram%20Bay%20View!5e0!3m2!1sen!2sbd!4v1694954254215!5m2!1sen!2sbd" required />
                        </div>
                        <div>
                            <label htmlFor="detailsAdd" className="block mb-2 text-sm font-medium text-gray-900">Address Details <small>(Road, Area, Police Station, City, Country)</small></label>
                            <input name="packageZone" onChange={(e) => handleInputChange('detailsAdd', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Avenue Center, 486/B Lalkhan Bazar, CDA Avenue, Chittagong, 4110" />
                        </div>
                    </div>
                </div>

                {/* Package Overview */}
                <div className="mt-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Package Overview<sup className="text-red-500"><small>*</small></sup></h3>
                    <textarea onChange={(e) => handleInputChange('overview', e)} style={{ resize: 'none' }} name="overview" id="overview" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-4" placeholder="Write Here..." required></textarea>
                </div>

                {/* add more itinerary */}
                <AddMoreItinerary itineraryData={itineraryData} setItineraryData={setItineraryData}></AddMoreItinerary>

                {/* faq */}
                <div className="mt-8 mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Frequently Asked Question</h3>
                    <div className="mb-6">
                        <label htmlFor="faq_1" className="block mb-2 text-sm font-medium text-gray-900">Activities highlight by day.<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_1', e)} style={{ resize: 'none' }} name="faq_1" id="faq_1" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_2" className="block mb-2 text-sm font-medium text-gray-900">Pickup Note<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_2', e)} type="text" id="faq_2" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Yes, Radisson Blu Bay View does have fully refundable room rates available to book on our site..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_3" className="block mb-2 text-sm font-medium text-gray-900">What are the cancellation and refund policy?<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_3', e)} style={{ resize: 'none' }} name="faq_3" id="faq_3" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_4" className="block mb-2 text-sm font-medium text-gray-900">Included Services<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_4', e)} style={{ resize: 'none' }} name="faq_4" id="faq_4" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_5" className="block mb-2 text-sm font-medium text-gray-900">Excluded Services<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_5', e)} style={{ resize: 'none' }} name="faq_5" id="faq_5" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_6" className="block mb-2 text-sm font-medium text-gray-900">What conditions are included with the package?<sup className="text-red-500">*</sup></label>
                        <textarea onChange={(e) => handleInputChange('faq_6', e)} style={{ resize: 'none' }} name="faq_6" id="faq_6" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md focus:border-primary text-gray-900 outline-none text-sm p-4" placeholder="Write Here..." required></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_7" className="block mb-2 text-sm font-medium text-gray-900">What is there to do view and nearby?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_7', e)} type="text" id="faq_7" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Practice your swing on the tennis courts..." required />
                    </div>
                </div>

                <h3 className="text-xl text-gray-800 font-semibold mb-5">Package Images</h3>
                <ImageDropZoneForPackage handleAllImages={handleAllImages} images={data.images}></ImageDropZoneForPackage>

                <p className=" text-red-500 mt-8 lg:mt-10">(*) These fields are required.</p>

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
                    error.includes('upload_invalid') &&
                    <p className="text-red-600 text-sm text-end mt-7 font-semibold">At least 4 images required for in Package Images field.</p>
                }
            </form>
        </div>
    );
};

export default AddPackage;
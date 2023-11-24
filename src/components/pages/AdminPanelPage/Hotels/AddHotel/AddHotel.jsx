import { useEffect, useState } from "react";
import ImageDropZone from "./ImageDropZone/ImageDropZone";
import axios from "axios";
import AddMoreRoom from "./AddMoreRoom/AddMoreRoom";
import { uploadImage } from "../../../../../functions/uploadImage";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState('');
    const [moreData, setMoreData] = useState([]);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState({
        hotelName: '',
        description: '',
        thumbnail: [],
        location: {
            country: '',
            state: '',
            city: '',
            map: '',
            detailsAdd: '',
            around: [{ name: '', distance: '' },
            { name: '', distance: '' },
            { name: '', distance: '' },
            { name: '', distance: '' },
            { name: '', distance: '' }],
        },
        rooms: [],
        about: '',
        reviews: [],
        faq: {},
        images: []
    });

    useEffect(() => {
        setData({
            ...data,
            rooms: moreData,
        });
    }, [moreData]);

    useEffect(() => {
        if (error == 'large_file' || error == 'file_type_invalid') {
            return;
        }
        data.rooms.map(d => {
            if (d.pictures.length < 1) {
                return setError('upload_invalid');
            }
            else {
                setError('');
            }
        })
    }, [data]);

    const handleAllImages = (image) => {
        setData({ ...data, images: image });
    }

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'thumbnail') {
            value = e.target.files[0];
        }
        else {
            value = e.target.value;
        }
        if (field == 'country' || field === 'city' || field === 'state' || field === 'map' || field === "detailsAdd") {
            setData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [field]: value,
                },
            }));
        }
        else if (field.startsWith('faq')) {

            setData((prevData) => ({
                ...prevData,
                faq: {
                    ...prevData.faq,
                    [field]: value,
                }
            }
            ))
        }
        else if (field.startsWith('around')) {
            const StringNumber = field.substring(field.length - 1);
            const index = parseInt(StringNumber) - 1;

            setData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    around: prevData.location.around.map((item, i) =>
                        i === parseInt(index)
                            ? {
                                ...item,
                                [field.startsWith('around.name') ? 'name' : 'distance']: value,
                            }
                            : item
                    ),
                },
            }));
        }
        else if (field.startsWith('thumbnail')) {
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
        const name = data.hotelName;
        const formattedHotelName = name.replace(/\s+/g, '_');
        const uploadedData = { ...data };

        if (data.images.length > 0 && data.thumbnail.length > 0 && data.rooms.length > 0 && error === '') {

            try {
                setLoading(true);

                uploadImage(data.thumbnail, `Royal_Venture/Hotels/${formattedHotelName}/thumbnail`).then(d => uploadedData.thumbnail = d).then(
                    await uploadImage(uploadedData.images, `Royal_Venture/Hotels/${formattedHotelName}/images`).then(d => uploadedData.images = d).then(
                        data.rooms?.map(async (item, i) => await uploadImage(item.pictures, `Royal_Venture/Hotels/${formattedHotelName}/rooms_${i}`).then(d => { return uploadedData.rooms[i].pictures = d }))
                    )
                )

                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/hotels/add-new`, uploadedData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })

                setLoading(false);

                if (response.data === 'success') {
                    formRef.current.reset();
                    notify();
                    navigate('/admin-panel/manage-hotels');
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

    return (
        <div className="mx-10 px-5 2xl:px-10 pt-14 pb-10 my-14 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-center text-gray-800 font-bold text-4xl 3xl:text-5xl">Add New Hotel</h2>
            <form ref={formRef} className="mt-8" onSubmit={handleUpload}>
                {/* hotel name */}
                <div className="mb-6">
                    <label htmlFor="hotelName" className="block mb-2 text-sm font-medium text-gray-900">Hotel Name <sup className="text-red-500">*</sup></label>
                    <input onChange={(e) => handleInputChange('hotelName', e)} type="text" id="hotelName" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Radisson Blu Chattogram Bay View" required />
                </div>

                {/* hotel description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description <sup className="text-red-500">*</sup></label>
                    <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Short description in 10 words." required />
                </div>

                {/* add card image */}
                <div className="form-control w-full mt-4">
                    <label htmlFor='avatar' className="label mb-1">
                        <span className="text-xs xs:text-sm text-gray-800">Image upload ( .jpg, .jpeg, .png). File size not more than 300 KB. Aspect Ratio 16:9.</span>
                    </label>
                    <input type="file" onChange={(e) => { handleInputChange('thumbnail', e); handleFileField(e) }} name='thumbnail' id='thumbnail' className="file-input-xs file-input-warning bg-white text-gray-950 xxs:file-input-sm xl:file-input-md file-input file-input-bordered w-full max-w-[200px] xxs:max-w-[250px] md:max-w-xs" required />
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
                    <h3 className="text-xl text-gray-800 font-semibold mt-14 mb-5">Location Details</h3>
                    <div className="grid grid-cols-3 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('city', e)} type="text" id="city" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Chittagong" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                            <input onChange={(e) => handleInputChange('state', e)} type="text" id="state" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('country', e)} type="text" id="country" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Bangladesh" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="map" className="block mb-2 text-sm font-medium text-gray-900">Google Map Link <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('map', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14760.646552930377!2d91.8229809!3d22.3475248!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a2a645ee07%3A0x2a94a4fa61c7b1a3!2sRadisson%20Blu%20Chattogram%20Bay%20View!5e0!3m2!1sen!2sbd!4v1694954254215!5m2!1sen!2sbd" required />
                        </div>
                        <div>
                            <label htmlFor="detailsAdd" className="block mb-2 text-sm font-medium text-gray-900">Address Details <sup className="text-red-500">*</sup><small>(Road, Area, Police Station, City, Country)</small></label>
                            <input onChange={(e) => handleInputChange('detailsAdd', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Bulbul Center, 486/B O.R. Nizam Road, CDA Avenue, Chittagong, 4100" required />
                        </div>
                    </div>
                    {/* waht's around */}
                    <div className="mb-5">
                        <h3 className="text-xl text-gray-800 font-semibold mt-10 mb-5">What&apos;s Around</h3>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Airport Name <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name1', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Chittagong (CGP-Shah Amanat Intl.)" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance1', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. 59 min driveway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Recreational Place <sup className="text-red-500">*</sup> <small>(Ex: Park, Museum etc.)</small></label>
                                <input onChange={(e) => handleInputChange('around.name2', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Shishu park" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance2', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. 2 min walkway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Religious Prayer Place <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name3', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Jamiatul Falah Mosque" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance3', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. 8 min walkway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Restaurants Name <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name4', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Eden Restaurant & Kids Zone" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance4', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. 20 min walkway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Restaurants Name <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name5', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Pizza Hut" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance5', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. 18 min walkway" required />
                            </div>
                        </div>
                    </div>
                </div>

                <AddMoreRoom moreData={moreData} setMoreData={setMoreData}></AddMoreRoom>

                {/* about the hotel */}
                <div className="mt-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">About the Hotel</h3>
                    <textarea onChange={(e) => handleInputChange('about', e)} style={{ resize: 'none' }} name="" id="about" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-4" placeholder="Write Here..." required></textarea>
                </div>

                {/* faq */}
                <div className="mt-8 mb-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Frequently Asked Question</h3>
                    <div className="mb-6">
                        <label htmlFor="faq_1" className="block mb-2 text-sm font-medium text-gray-900">Does offer free cancellation for a full refund?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_1', e)} type="text" id="faq_1" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Yes, Radisson Blu Bay View does have fully refundable room rates available to book on our site..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_2" className="block mb-2 text-sm font-medium text-gray-900">What are the cleanliness and hygiene measure?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_2', e)} type="text" id="faq_2" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. This property confirms that disinfectant is used to clean the property..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_3" className="block mb-2 text-sm font-medium text-gray-900">Is there a pull?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_3', e)} type="text" id="faq_3" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Yes, there's an outdoor pool..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_4" className="block mb-2 text-sm font-medium text-gray-900">Are per allows?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_4', e)} type="text" id="faq_4" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Sorry, pets and service animals aren't allowed..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_5" className="block mb-2 text-sm font-medium text-gray-900">Is parking offered onside?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_5', e)} type="text" id="faq_5" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Yes, there's free valet parking..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_6" className="block mb-2 text-sm font-medium text-gray-900">What are the check-in and check-out time?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_6', e)} type="text" id="faq_6" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Check-in start time: 2 PM; Check-in end time: midnight. Check-out time is noon. Contactless check-in is available..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_7" className="block mb-2 text-sm font-medium text-gray-900">What is there to do view and nearby?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_7', e)} type="text" id="faq_7" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Practice your swing on the tennis courts..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_8" className="block mb-2 text-sm font-medium text-gray-900">Are there restaurants at or near?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_8', e)} type="text" id="faq_8" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Yes, there are 3 onsite restaurants, featuring Asian cuisine..." required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="faq_9" className="block mb-2 text-sm font-medium text-gray-900">What&lsquo;s the area around view like?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('faq_9', e)} type="text" id="faq_9" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Ex. Radisson Blu Chattogram Bay View is in the heart of Chittagong, a short 1-minute..." required />
                    </div>
                </div>

                <h3 className="text-xl text-gray-800 font-semibold mb-5">Hotel Images</h3>
                <ImageDropZone handleAllImages={handleAllImages} images={data.images}></ImageDropZone>

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
                    error.includes('upload_invalid') && <p className="text-sm text-end text-red-500 mt-5">At least a room with 1 image and 6 hotel images must be added.</p>
                }
            </form>
        </div>
    );
};

export default AddHotel;
import { useEffect, useState } from "react";
import ImageDropZone from "./ImageDropZone/ImageDropZone";
import axios from "axios";
import AddMoreRoom from "./AddMoreRoom/AddMoreRoom";

// private_BC4VixtIwlbn5CuOZUqbjRRSulQ=
// const apiKey = 'public_ckIhiN3Di+ZHIFF6aPozfEMYwhQ=';
// const endpoint = 'https://ik.imagekit.io/nz0ptgnila';

const AddHotel = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const token = localStorage.getItem('access_token');
    const [error, setError] = useState('');
    const [moreData, setMoreData] = useState([]);
    const [data, setData] = useState({
        hotelName: '',
        description: '',
        thumbnail: null,
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
        rooms: []
    });

    useEffect(() => {
        setData({
            ...data,
            rooms: moreData,
        });
    }, [moreData]);

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'file') {
            value = e.target.files[0];
        }
        else if (field === 'email') {
            value = e.target.value.trim().toLowerCase();
        }
        else if (field === 'admin_edit_gender' || field === 'admin_edit_dob' || field === 'admin_edit_anniversary' || field === 'admin_edit_expires' || field === 'admin_edit_passport_validity') {
            value = e;
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
        else {
            setData({
                ...data,
                [field]: value,
            });
        }
    };

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

    const handleImageUpload = async () => {
        const formData = new FormData();

        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('images', selectedImages[i]);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/hotels/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error uploading images', error);
        }
    };

    console.log(data);


    return (
        <div className="mx-5 px-5 2xl:px-10 pt-14 pb-10 my-14 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-center text-gray-800 font-bold text-4xl 3xl:text-5xl">Add New Hotel</h2>
            <form className="mt-8">
                {/* hotel name */}
                <div className="mb-6">
                    <label htmlFor="hotelName" className="block mb-2 text-sm font-medium text-gray-900">Hotel Name <sup className="text-red-500">*</sup></label>
                    <input onChange={(e) => handleInputChange('hotelName', e)} type="text" id="hotelName" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Radisson Blu Chattogram Bay View" required />
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
                <div>
                    <h3 className="text-xl text-gray-800 font-semibold mt-14 mb-5">Location Details</h3>
                    <div className="grid grid-cols-3 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('city', e)} type="text" id="city" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Chittagong" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                            <input onChange={(e) => handleInputChange('state', e)} type="text" id="state" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('country', e)} type="text" id="country" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Bangladesh" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 mb-5">
                        <div>
                            <label htmlFor="map" className="block mb-2 text-sm font-medium text-gray-900">Google Map Link <sup className="text-red-500">*</sup></label>
                            <input onChange={(e) => handleInputChange('map', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14760.646552930377!2d91.8229809!3d22.3475248!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a2a645ee07%3A0x2a94a4fa61c7b1a3!2sRadisson%20Blu%20Chattogram%20Bay%20View!5e0!3m2!1sen!2sbd!4v1694954254215!5m2!1sen!2sbd" required />
                        </div>
                        <div>
                            <label htmlFor="detailsAdd" className="block mb-2 text-sm font-medium text-gray-900">Address Details <sup className="text-red-500">*</sup><small>(Road, Area, Police Station, City, Country)</small></label>
                            <input onChange={(e) => handleInputChange('detailsAdd', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Bulbul Center, 486/B O.R. Nizam Road, CDA Avenue, Chittagong, 4100" required />
                        </div>
                    </div>
                    {/* waht's around */}
                    <div className="mb-5">
                        <h3 className="text-xl text-gray-800 font-semibold mt-10 mb-5">What&apos;s Around</h3>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Airport Name <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name1', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Chittagong (CGP-Shah Amanat Intl.)" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance1', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="59 min driveway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Recreational Place <sup className="text-red-500">*</sup> <small>(Ex: Park, Museum etc.)</small></label>
                                <input onChange={(e) => handleInputChange('around.name2', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Shishu park" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance2', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="2 min walkway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Religious Prayer Place <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name3', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Jamiatul Falah Mosque" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance3', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="8 min walkway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Restaurants Name <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name4', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Eden Restaurant & Kids Zone" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance4', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="20 min walkway" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Restaurants Name <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.name5', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Pizza Hut" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Distance <sup className="text-red-500">*</sup></label>
                                <input onChange={(e) => handleInputChange('around.distance5', e)} type="text" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="18 min walkway" required />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <AddMoreRoom moreData={moreData} setMoreData={setMoreData}></AddMoreRoom>
                </div>
                <div className="mt-14">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">About the Hotel</h3>
                    <textarea style={{ resize: 'none' }} name="" id="about" className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-5"></textarea>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl text-gray-800 font-semibold mb-5">Frequently Asked Question</h3>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Does offer free cancellation for a full refund?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">What are the cleanliness and hygiene measure?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Is there a pull?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Are per allows?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Is parking offered onside?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">What are the check-in and check-out time?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">What is there to do view and nearby?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Are there restaurants at or near?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">What&lsquo;s the area around view like?<sup className="text-red-500">*</sup></label>
                        <input onChange={(e) => handleInputChange('description', e)} type="text" id="description" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" required />
                    </div>
                </div>
                <ImageDropZone selectedImages={selectedImages} setSelectedImages={setSelectedImages}></ImageDropZone>
                <p className="text-end"><button type="submit" onClick={() => handleImageUpload()} className="btn bg-primary hover:bg-secondary text-gray-950 border-none btn-wide mt-5 focus:ring-4 focus:ring-yellow-300">Save</button></p>
            </form>
        </div>
    );
};

export default AddHotel;
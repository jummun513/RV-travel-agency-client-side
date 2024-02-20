import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "../../../../../functions/imageStore";
import axios from "axios";

const AddToAlbum = () => {
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const notify = () => toast.success("Successfully, new hotel added.", { theme: "light" });
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
    const token = localStorage.getItem('access_token');
    const formRef = useRef();

    // handle thumbnail image
    const handleFileField = (e) => {
        const allowedType = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
        if (e.target?.files[0]?.size > 1024 * 500) {
            setError('large_file');
        }
        else if (!allowedType.includes(e.target?.files[0]?.type)) {
            setError('file_type_invalid');
        }
        else {
            setError('');
        }
    }

    // set input value according their name
    const handleInputChange = (field, e) => {
        let value;
        if (field === 'photo') {
            value = e.target.files[0];
        }
        else {
            value = e.target.value;
        }
        if (field.startsWith('photo')) {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const uploadedData = { ...data };

        if (error === '' && data.photo) {
            try {
                setLoading(true);

                await uploadImage(data.photo, `Royal_Venture/Photo_Album`).then(d => uploadedData.photo = d);

                const response = await axios.post(`${import.meta.env.VITE_clientSideLink}/api/photo-albums/add-new`, uploadedData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })

                setLoading(false);

                if (response.data === 'success') {
                    formRef.current.reset();
                    notify();
                    navigate('/admin-panel/manage-photo-album');
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
    }

    return (
        <div className="mx-10 px-5 2xl:px-10 pt-14 pb-10 my-14 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h2 className="text-center text-gray-800 font-bold text-4xl 3xl:text-5xl">Add To Album</h2>
            <form ref={formRef} className="mt-14" onSubmit={handleSubmit} >
                {/* add card image */}
                <div className="form-control w-full mt-4">
                    <label htmlFor='photo' className="label mb-1">
                        <span className="text-xs xs:text-sm text-gray-800">Image upload ( .jpg, .jpeg, .png). File size not more than 500 KB. Aspect Ratio 16:9.</span>
                    </label>
                    <input type="file" onChange={(e) => { handleInputChange('photo', e); handleFileField(e) }} name='photo' id='photo' className="file-input-xs file-input-warning bg-white text-gray-950 xxs:file-input-sm xl:file-input-md file-input file-input-bordered w-full max-w-[200px] xxs:max-w-[250px] md:max-w-xs" required />
                    {
                        (error.includes('large_file') && <label className="label">
                            <span className="label-text-alt text-red-600">Maximum file size 500 KB allowed.</span>
                        </label>) ||
                        (error.includes('file_type_invalid') && <label className="label">
                            <span className="label-text-alt text-red-600">Only .jpg, .png, .jpeg, .svg, .webP format allowed.</span>
                        </label>)
                    }
                </div>

                {/* image holder name */}
                <div className="mt-10">
                    <label htmlFor="holderName" className="block mb-2 text-sm font-medium text-gray-900">Image Holder Name <sup className="text-red-500">*</sup></label>
                    <input onChange={(e) => handleInputChange('holderName', e)} type="text" id="holderName" className="shadow-sm bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-primary focus:outline-none block w-full p-2.5" placeholder="Mr. Xyz and his family" required />
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
                            <button disabled={error !== ''} type="submit" className="btn bg-primary hover:bg-secondary text-gray-950 border-none btn-wide focus:ring-4 focus:ring-yellow-300">Submit</button>
                    }
                </p>
            </form>
        </div>
    );
};

export default AddToAlbum;
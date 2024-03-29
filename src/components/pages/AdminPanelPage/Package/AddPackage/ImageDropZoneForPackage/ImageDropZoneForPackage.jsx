import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const ImageDropZoneForPackage = ({ images, handleAllImages }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        handleAllImages(selectedImages);
    }, [selectedImages])

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleImageSelection(event.dataTransfer.files);
    };

    const handleFileInputChange = (event) => {
        handleImageSelection(event.target.files);
    };

    const handleImageSelection = (selectedFiles) => {
        const newImages = Array.from(selectedFiles);

        // Validate file size
        const imageSizeLimit = 500 * 1024; // 500KB in bytes
        const isValidSize = newImages.every((image) => image.size <= imageSizeLimit);
        if (!isValidSize) {
            setError('Each image should be less than 500KB.');
            return;
        }

        // validate file type
        const isValidType = newImages.every((image) => image.type == 'image/jpg' || image.type == 'image/jpeg' || image.type == 'image/png' || image.type == 'image/svg+xml' || image.type == 'image/webp');
        if (!isValidType) {
            setError('Only jpg, svg, png, jpeg files are allowed.');
            return;
        }

        // Validate image count
        if (selectedImages.length + newImages.length > 10) {
            setError('Cannot add more than 10 images.');
            return;
        }

        // Validate image count
        if (selectedImages.length + newImages.length < 4) {
            setError('Cannot add less than 4 images.');
            return;
        }

        setError('');

        // Update the state with the new images
        setSelectedImages([...selectedImages, ...newImages]);
        handleAllImages([...selectedImages, ...newImages]);
    };

    const removeImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);

        if (updatedImages.length < 4) {
            setSelectedImages([]);
            setError('Cannot add less than 4 images.');
        }
    };

    return (
        <div className=''>
            <div className='flex flex-col items-center justify-center w-full'>
                <label className="relative flex flex-col items-center justify-center w-full min-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <div className={`w-full py-10 flex flex-col items-center justify-center ${isDragOver ? 'bg-[#ffb70027]' : 'bg-gray-50'}`} onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}>
                        <svg className="w-8 h-8 mb-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-900"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-700">SVG, PNG, JPG, WEBP or JPEG (MAX. 500KB, RATIO: 16:9)</p>
                        <p className="text-xs text-gray-700">Maximum 10 images and at least 4 images allowed.</p>
                        <input type="file" multiple onChange={(e) => handleFileInputChange(e)} id="dropzone-file" className="hidden" />
                    </div>
                </label>
            </div>

            <div className={`${(error || images?.length > 0) ? 'bg-gray-50 rounded-lg py-5 text-center' : 'hidden'}`}>
                {error && <p className="error text-red-500 font-semibold">{error}</p>}
                {images.length > 0 && (
                    <div className='h-full w-full'>
                        <h2 className='text-gray-700 font-bold mb-3 mt-5 text-2xl'>Selected Images:</h2>
                        <div className="image-list flex flex-wrap justify-center">
                            {images.map((image, index) => (
                                <div key={index} className="image-item mx-2 mt-5 relative">
                                    <img className='w-56 rounded-md' src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                                    <button type='button' className='btn bg-primary btn-xs border-none text-gray-950 -top-3 -right-3 absolute btn-circle hover:bg-secondary' onClick={() => removeImage(index)}><IoMdClose /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageDropZoneForPackage;
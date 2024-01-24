import { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../../../../../../../functions/setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 400;

const ImageCropper = ({ closeModal, updateAvatar }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        const allowedType = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!file) return;
        else if (!allowedType.includes(file?.type)) {
            setImgSrc("");
            return setError('Only .jpg, .png, .jpeg allowed.');
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (error) setError('')
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 400 x 400 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const confirmCrop = () => {
        setCanvasPreview(
            imgRef.current, // HTMLImageElement
            previewCanvasRef.current, // HTMLCanvasElement
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        updateAvatar(dataUrl);
        closeModal();
    }

    return (
        <>
            <div className="form-control w-full mt-4">
                <label htmlFor='avatar' className="label mb-1">
                    <span className="text-sm xs:text-base text-gray-800 font-semibold">Image upload here. <small className="font-normal">only ( .jpg, .jpeg, .png) types allowed.</small></span>
                </label>
                <input type="file" accept="image/*"
                    onChange={onSelectFile} className="file-input-xs hover:file:bg-secondary file-input-warning bg-white text-gray-950 xxs:file-input-sm xl:file-input-md file-input file-input-bordered w-full max-w-[200px] xxs:max-w-[250px] md:max-w-xs" />
                {error && <label className="text-red-500 label-text-alt mx-auto mt-[10%]">{error}</label>}
            </div>
            {imgSrc && (
                <div className="flex flex-col items-center my-8">
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <button
                        className="btn text-gray-900 border-none bg-primary hover:bg-secondary mt-5"
                        onClick={() => confirmCrop()}
                    >
                        Crop Image
                    </button>
                </div>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 400,
                        height: 400,
                    }}
                />
            )}
        </>
    );
};
export default ImageCropper;
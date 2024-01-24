import CloseIcon from "../CloseIcon/CloseIcon";
import ImageCropper from "../ImageCropper/ImageCropper";

const Modal = ({ updateAvatar, closeModal }) => {
    return (
        <div
            className="relative z-50"
            aria-labelledby="crop-image-dialog"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-opacity-50 bg-gray-900 transition-all backdrop-blur-sm"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center px-2 py-12 text-center ">
                    <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-50 text-slate-100 text-left shadow-2xl transition-all">
                        <div className="px-5 py-4">
                            <button
                                type="button"
                                className="rounded-full p-3 inline-flex items-center justify-center bg-primary text-gray-950 hover:bg-secondary focus:outline-none absolute top-4 right-4"
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close menu</span>
                                <CloseIcon />
                            </button>
                            <ImageCropper
                                updateAvatar={updateAvatar}
                                closeModal={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Modal;
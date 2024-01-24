import { useRef, useState } from "react";
import PencilIcon from "../PencilIcon/PencilIcon";
import Modal from "../Modal/Modal";

const ProfileImageContainer = ({ setFormData, formData, initialImageUrl }) => {
    const avatarUrl = useRef(initialImageUrl);
    const [modalOpen, setModalOpen] = useState(false);

    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
        setFormData({
            ...formData,
            avatar: [imgSrc]
        });
    };

    return (
        <div className="flex flex-col items-center pt-5">
            <div className="relative">
                <img
                    src={avatarUrl.current}
                    alt="Avatar"
                    className="w-[150px] h-[150px] rounded-full border-2 border-gray-900"
                />
                <button type="button"
                    className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-primary hover:bg-secondary border border-gray-900"
                    title="Change photo"
                    onClick={() => setModalOpen(true)}
                >
                    <PencilIcon />
                </button>
            </div>
            {modalOpen && (
                <Modal
                    updateAvatar={updateAvatar}
                    closeModal={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProfileImageContainer;
import "react-image-crop/dist/ReactCrop.css";
import ProfileImageContainer from "./ProfileImageContainer/ProfileImageContainer";
import url from "../../../../../../assets/images/user.svg";

const AddImage = ({ formData, setFormData }) => {
    return (
        <div className="text-gray-400 p-4">
            <ProfileImageContainer setFormData={setFormData} formData={formData} initialImageUrl={url}></ProfileImageContainer>
        </div>
    );
};

export default AddImage;
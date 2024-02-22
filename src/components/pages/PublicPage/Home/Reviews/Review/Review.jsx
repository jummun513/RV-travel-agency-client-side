import { Rating } from "@mui/material";
import { useState } from "react";
import './Review.css';
import userImg from "../../../../../../assets/images/user.svg";

const Review = ({ d }) => {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div className="w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-lg">
            <div className="flex xs:items-center justify-between">
                <div className="xs:flex items-center">
                    <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                        <img loading="lazy" className="aspect-square rounded-full w-full" src={d?.userId?.avatar.length > 0 ? d?.userId?.avatar?.[0]?.thumbnailUrl : userImg} alt={d?.userId?.fullName || d?.userId?.name + ' image'} />
                    </div>
                    <div className="mt-2 xs:mt-0 xs:ms-4">
                        <h4 className="text-gray-800 font-semibold">{d?.userId?.fullName || d?.userId?.name}</h4>
                        <p className="text-gray-500">{d?.userId?.occupation || (d?.userType === 'user' ? 'General User' : 'Privilege User')}</p>
                    </div>
                </div>
                <div>
                    <Rating name="size-large" precision={0.5} value={d.rating} size="large" readOnly />
                </div>
            </div>
            <div className="mt-3 xs:mt-5">
                <div className="text-gray-500 text-justify">
                    {isReadMore ? d.desc.slice(0, 100) + ' ...' : d.desc}
                    <br />
                    <a onClick={toggleReadMore} className="btn btn-xs 3xl:btn-sm border-primary bg-gray-50 text-gray-950 hover:bg-transparent mt-2">
                        {isReadMore ? "read more" : "show less"}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Review;
import { Rating } from "@mui/material";
import { useState } from "react";
import './Review.css';

const Review = (data) => {
    const { url, alt, name, occupation, reviews } = data.data;
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <div className="w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-lg">
            <div className="flex xs:items-center justify-between">
                <div className="xs:flex items-center">
                    <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                        <img loading="lazy" className="aspect-square rounded-full w-full" src={url} alt={alt} />
                    </div>
                    <div className="mt-2 xs:mt-0 xs:ms-4">
                        <h4 className="text-gray-800 font-semibold">{name}</h4>
                        <p className="text-gray-500">{occupation}</p>
                    </div>
                </div>
                <div>
                    <Rating name="size-large" precision={0.5} value={3.5} size="large" readOnly />
                </div>
            </div>
            <div className="mt-3 xs:mt-5">
                <div className="text-gray-500 text-justify">
                    {isReadMore ? reviews.slice(0, 100) + ' ...' : reviews}
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
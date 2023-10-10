import { Rating } from "@mui/material";

const Review = (data) => {
    const { url, alt, name, occupation, reviews } = data.data;
    return (
        <div className="w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-lg">
            <div className="flex xs:items-center justify-between">
                <div className="xs:flex items-center">
                    <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                        <img className="aspect-square rounded-full w-full" src={url} alt={alt} />
                    </div>
                    <div className="mt-2 xs:mt-0 xs:ms-4">
                        <h4 className="text-gray-800 font-semibold">{name}</h4>
                        <p className="text-gray-500">{occupation}</p>
                    </div>
                </div>
                <div>
                    <Rating name="size-large" defaultValue={4} size="large" readOnly />
                </div>
            </div>
            <div className="mt-3 xs:mt-5">
                <p className="text-gray-500 text-justify">
                    {reviews}
                </p>
            </div>
        </div>
    );
};

export default Review;
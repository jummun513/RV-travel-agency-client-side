import { Rating } from "@mui/material";

const Review = () => {
    return (
        <div className="w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-lg">
            <div className="flex xs:items-center justify-between">
                <div className="xs:flex items-center">
                    <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                        <img className="aspect-square rounded-full w-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="user" />
                    </div>
                    <div className="mt-2 xs:mt-0 xs:ms-4">
                        <h4 className="text-gray-800 font-semibold">Md. Abdul Hakim</h4>
                        <p className="text-gray-500">Frontend Lead @ Google</p>
                    </div>
                </div>
                <div>
                    <Rating name="size-large" defaultValue={4} size="large" readOnly />
                </div>
            </div>
            <div className="mt-3 xs:mt-5">
                <p className="text-gray-500 text-justify">
                    &#34;I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And its really affordable, very humble guys !!!&#34;
                </p>
            </div>
        </div>
    );
};

export default Review;
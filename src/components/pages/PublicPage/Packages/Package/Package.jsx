import { useNavigate } from "react-router-dom";

const Package = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/package-tour/details/${data?._id}`)} className="flex justify-center items-center max-w-[250px] xxs:max-w-[22rem] xs:max-w-md h-36 xs:h-44 border hover:shadow group hover:cursor-pointer">
            <div className="text-gray-800 w-[100px] xxs:w-[7rem] xs:w-[10rem] h-full bg-primary p-1 xxs:p-2 xs:p-4 flex flex-col justify-center">
                <h5 className="text-gray-900 font-bold">{data.packageName}</h5>
                <p>{data.packageZone.city}, {data.packageZone.state || ''}</p>
                <p>{data.packageZone.country}</p>
            </div>
            <div className="relative w-[150px] xxs:w-[15rem] xs:w-[18rem] h-full">
                <div className="h-full w-full">
                    <img className="object-cover h-full w-full" src={data.thumbnail?.[0]?.url} alt={data?.packageName + ' package'} />
                </div>
                <div className="hidden absolute bg-black z-10 h-full w-full top-0 opacity-[0.55] group-hover:flex justify-center items-center text-gray-50">Details</div>
            </div>
        </div>
    );
};

export default Package;
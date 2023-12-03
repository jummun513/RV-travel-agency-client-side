import "./AllworldCard.css";
import { useNavigate } from "react-router-dom";


const AllworldCard = (data) => {
    const { url, alt, hotel, flight, country, flag } = data.data;
    const navigate = useNavigate();

    return (
        <div className="w-60 xxs:w-72 rounded-lg xs:w-96 xs:rounded-2xl pb-5 border bg-gray-50 duration-100 hover:border-primary">
            <div className="relative">
                <img loading='lazy' className="w-full h-full rounded-t-lg xs:rounded-none xs:rounded-t-2xl" src={url} alt={alt} />
                <div className="absolute -bottom-10 left-2 xs:left-5">
                    <span id="flag-icon" className={`fi fib fis ${flag} rounded-full`}></span>
                </div>
            </div>
            <div className="relative mt-12 xs:mt-14 px-5 text-gray-700">
                <h3 className="font-semibold text-lg xs:text-xl mb-1 xs:mb-2">{country}</h3>
                <p>{flight}</p>
                <p>{hotel}</p>
            </div>
            <div className="px-3 flex justify-between mt-6">
                <button onClick={() => navigate('/hotels-list')} className="btn btn-xs xxs:btn-sm xs:btn-md text-gray-950 bg-primary border-none hover:bg-secondary">Book Now</button>
                <button onClick={() => navigate('/hotels-list')} className="btn btn-link btn-xs xxs:btn-sm xs:btn-md text-gray-950 no-underline">View all tour</button>
            </div>
        </div>
    );
};

export default AllworldCard;
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../../../../shared/Loading/Loading";
import NotFound from "../../../../../shared/NotFound/NotFound";
import { Helmet } from "react-helmet-async";
import Countdown from 'react-countdown';

const TopOfferDetails = () => {
    const { offerId } = useParams();

    const { data: singleOffer = {}, isLoading, isError } = useQuery(['singleOffer'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/hot-offers/${offerId}`);
        return res.json();
    })

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <div className="text-lg sm:text-xl 2xl:text-2xl text-gray-900">Offer Already Ends</div>
        } else {
            return <div className='flex justify-center xxs:justify-start items-center text-gray-900'>
                <div className='h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] md:h-24 md:w-24 2xl:h-28 2xl:w-28 flex flex-col justify-center items-center rounded-full bg-primary text-sm xxs:text-base sm:text-lg 2xl:text-2xl font-bold p-3 2xl:p-5 mr-1 md:mr-2'>{days} <hr className='w-full border-gray-950' /> <span className='text-xs sm:text-sm 2xl:text-xl font-normal'>Days</span></div>
                <div className='h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] md:h-24 md:w-24 2xl:h-28 2xl:w-28 flex flex-col justify-center items-center rounded-full bg-primary text-sm xxs:text-base sm:text-lg 2xl:text-2xl font-bold p-3 2xl:p-5 mr-1 md:mr-2'>{hours} <hr className='w-full border-gray-950' /> <span className='text-xs sm:text-sm 2xl:text-xl font-normal'>Hours</span></div>
                <div className='h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] md:h-24 md:w-24 2xl:h-28 2xl:w-28 flex flex-col justify-center items-center rounded-full bg-primary text-sm xxs:text-base sm:text-lg 2xl:text-2xl font-bold p-3 2xl:p-5 mr-1 md:mr-2'>{minutes} <hr className='w-full border-gray-950' /> <span className='text-xs sm:text-sm 2xl:text-xl font-normal'>Minutes</span></div>
                <div className='h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] md:h-24 md:w-24 2xl:h-28 2xl:w-28 flex flex-col justify-center items-center rounded-full bg-primary text-sm xxs:text-base sm:text-lg 2xl:text-2xl font-bold p-3 2xl:p-5'>{seconds} <hr className='w-full border-gray-950' /> <span className='text-xs sm:text-sm 2xl:text-xl font-normal'>Seconds</span></div>
            </div>;
        }
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className="bg-[#fbfbfb] py-20 xxs:py-32 xs:py-36 md:py-40 xl:py-48 3xl:py-56">
            <Helmet>
                <title> Offer Details - Royal Venture Limited</title>
            </Helmet>
            <div className="rounded-md px-2 xxs:px-3 xs:px-5 md:px-7 lg:px-10 mx-auto max-w-screen-3xl">
                <div className="border-x-4 lg:border-x-8 mx-auto sm:py-1 lg:py-2 w-fit border-primary">
                    <h3 className="mx-2 text-base xxs:text-xl sm:text-3xl xl:text-5xl font-bold text-gray-900">Offer Details</h3>
                </div>
                <div className="mx-auto xl:max-w-screen-xl 3xl:max-w-screen-3xl mt-6 sm:mt-8 lg:mt-10 2xl:mt-12 3xl:mt-14">
                    <div className="flex flex-col items-center mx-auto xl:max-w-screen-lg 3xl:max-w-screen-2xl">
                        <img className="w-full rounded" src={singleOffer?.photo?.[0]?.url} alt='Hot Offer' />
                        <div className="w-full sm:flex items-center mt-5 xxs:mt-8 sm:mt-10 3xl:mt-12">
                            <p className="text-center xxs:text-left mb-3 sm:mb-0 text-sm xxs:text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl 4xl:text-4xl sm:mr-5 font-bold text-red-600">Offer Ends In: </p>
                            <Countdown date={new Date(singleOffer?.offerEnd)} renderer={renderer} autoStart={true} zeroPadTime={2} />
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-8 lg:mt-10 2xl:mt-12 3xl:mt-14">
                        <pre className='whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg 4xl:text-xl text-justify text-gray-800'>{singleOffer?.desc}</pre>
                    </div>
                    <div className="mt-6 sm:mt-8 lg:mt-10 2xl:mt-12 3xl:mt-14 text-center xxs:text-right">
                        <button disabled={(new Date(singleOffer?.offerEnd) - new Date()) < 0} onClick={() => window.location.assign(singleOffer?.target)} className="btn btn-sm md:btn-md bg-primary border-none hover:border-none hover:bg-secondary text-gray-900">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopOfferDetails;
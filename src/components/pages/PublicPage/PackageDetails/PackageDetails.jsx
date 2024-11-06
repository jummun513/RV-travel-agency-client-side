import { Helmet } from "react-helmet-async";
import NotFound from "../../../shared/NotFound/NotFound";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../shared/Loading/Loading";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const PackageDetails = () => {
    const { packageId } = useParams();
    const [gallery, setGallery] = useState([]);
    const navigate = useNavigate();
    const { data: singlePackage = [], isLoading, isError } = useQuery(['singlePackage'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages/${packageId}`);
        return res.json();
    });

    useEffect(() => {
        setGallery(
            singlePackage?.images?.map(d => ({ original: d.url, thumbnail: d.thumbnailUrl }))
        );
    }, [singlePackage]);

    if (isError) {
        return <NotFound></NotFound>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    function formatTimeWithSeconds(inputDate) {
        // Create a Date object from the input string
        const date = new Date(inputDate);

        // Format the time with seconds in 12-hour format
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return formattedTime;
    }

    // currency add commas
    const addCommas = (number) => {
        if (number) {
            const numberString = number.toString();
            return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    const handleBooked = () => {
        navigate(`/booking-package/${packageId}`);
    }

    return (
        <div className="bg-[#fbfbfb] pb-32 pt-[100px] xxs:pt-[150px] sm:pt-[170px] lg:pt-[180px] 3xl:pt-[200px]">
            <Helmet>
                <title>Package Details-{`${singlePackage?.packageName}`} | Royal Venture Limited</title>
            </Helmet>
            <div className="mx-auto max-w-screen-3xl px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                {/* for large device */}
                <div className="hidden lg:flex">
                    <div className="w-1/2 2xl:w-3/5">
                        <img className="w-[95%] rounded-lg" src={singlePackage?.thumbnail[0]?.url} alt={singlePackage?.packageName} />
                        <iframe className='w-[95%] h-[30rem] xl:h-[25rem] 2xl:h-80 3xl:h-72 mt-5 2xl:mt-8 border-none border-2 rounded-lg' src={singlePackage?.packageZone?.map} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="w-1/2 2xl:w-2/5">
                        <h3 className="text-center lg:text-2xl 2xl:text-3xl 3xl:text-4xl mb-5 xl:mb-7 2xl:mb-10 font-bold text-gray-950 border-s-8 w-fit pl-3 border-primary">{singlePackage?.packageName}</h3>
                        <Tabs>
                            <TabList className='flex mb-5 2xl:mb-8'>
                                <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Details</Tab>
                                <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Overview</Tab>
                            </TabList>
                            <TabPanel>
                                <table className="w-full min-w-[250px] rounded-lg">
                                    <tbody>
                                        <tr className="bg-white border hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Code</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageCode}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Name</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageName}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Type</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageType?.value}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Zone</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                <p className="mb-1">{singlePackage?.packageZone?.detailsAdd}</p>
                                                <p className="mb-1">{singlePackage?.packageZone?.city}</p>
                                                {singlePackage?.packageZone?.state !== '' && <p className="mb-1">{singlePackage?.packageZone?.state}</p>}
                                                <p>{singlePackage?.packageZone?.country}</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Maximum Guest Number</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Adult-{singlePackage?.guestNumber?.adult}, Children-{singlePackage?.guestNumber?.child}, <span className="font-semibold">Total</span>-{singlePackage?.guestNumber?.total}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Duration</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageDuration?.days} days, {singlePackage?.packageDuration?.nights} nights</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Last Entry</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                <p>{convertDate(singlePackage?.lastEntry)}</p>
                                                <p>Time - {formatTimeWithSeconds(singlePackage?.lastEntry)}</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Starts At <sub>(approximate)</sub></p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                <p>{convertDate(singlePackage?.startDate)}</p>
                                                <p>Time - {formatTimeWithSeconds(singlePackage?.startDate)}</p>
                                            </td>
                                        </tr>
                                        {
                                            singlePackage?.packagePrice &&
                                            <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                                <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Price</p><p>:</p></th>
                                                <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                    <strike className='text-red-500'>{addCommas(singlePackage?.packagePrice)}/-</strike> <sub>(per person)</sub>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between mt-8">
                                    <p className="flex items-center 2xl:text-xl text-gray-700 font-semibold">{singlePackage?.packagePrice && 'After Discount:'} <span className="text-green-600 text-xl 2xl:text-3xl ml-3">{addCommas(singlePackage?.packageDiscountPrice)} TK.</span><sub className="font-normal ml-2">(per person)</sub></p>
                                    <p><button onClick={() => handleBooked()} type="button" className="btn btn-sm 2xl:btn-md bg-primary hover:bg-secondary border-none text-gray-950">Booked This</button></p>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="mt-10">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-base xxs:text-xl sm:text-2xl 2xl:text-3xl text-gray-950 text-center lg:mb-3 font-bold">Package Overview</h3>
                                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                                    </div>
                                    <div className="mt-8">
                                        <pre className="whitespace-pre-wrap text-justify text-xs xxs:text-sm sm:text-base 2xl:text-lg 3xl:text-xl text-gray-800">{singlePackage?.overview}</pre>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

                {/* for small device */}
                <div className="lg:hidden">
                    <div className="flex flex-col items-center mb-8 xxs:mb-10">
                        <h3 className="text-center text-base xxs:text-xl sm:text-2xl mb-2 xxs:mb-3 font-bold text-gray-950">{singlePackage?.packageName}</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 rounded-lg border-b-4 border-primary"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <img className="w-full xs:w-[85%] md:w-[80%] mb-5 rounded-lg" src={singlePackage?.thumbnail[0]?.url} alt={singlePackage?.packageName} />
                        <iframe className='w-full xs:w-[85%] md:w-[80%] h-48 border-none border-2 rounded-lg' src={singlePackage?.packageZone?.map} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <Tabs>
                        <TabList className='flex justify-center mt-10 xxs:mt-16'>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Details</Tab>
                            <Tab className='px-3 py-1 outline-none rounded focus:ring-2 focus:ring-primary bg-[#fff] border-2 border-primary text-gray-900 font-semibold cursor-pointer me-2'>Overview</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="mt-5 xxs:mt-8">
                                <table className="w-full min-w-[250px] rounded-lg">
                                    <tbody>
                                        <tr className="bg-white border hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Code</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageCode}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Name</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageName}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Type</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageType.value}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Zone</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                <p className="mb-1">{singlePackage?.packageZone?.detailsAdd}</p>
                                                <p className="mb-1">{singlePackage?.packageZone?.city}</p>
                                                {singlePackage?.packageZone?.state !== '' && <p className="mb-1">{singlePackage?.packageZone?.state}</p>}
                                                <p>{singlePackage?.packageZone?.country}</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Maximum Guest Number</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Adult-{singlePackage?.guestNumber?.adult}, Children-{singlePackage?.guestNumber?.child}, <span className="font-semibold">Total</span>-{singlePackage?.guestNumber?.total}</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Duration</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage?.packageDuration?.days} days, {singlePackage?.packageDuration?.nights} nights</td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Last Entry</p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                <p>{convertDate(singlePackage?.lastEntry)}</p>
                                                <p>Time - {formatTimeWithSeconds(singlePackage?.lastEntry)}</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                            <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Start Date <sub>(approximate)</sub></p><p>:</p></th>
                                            <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                                <p>{convertDate(singlePackage?.lastEntry)}</p>
                                                <p>Time - {formatTimeWithSeconds(singlePackage?.lastEntry)}</p>
                                            </td>
                                        </tr>
                                        {
                                            singlePackage?.packagePrice &&
                                            <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                                <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Price</p><p>:</p></th>
                                                <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Taka: <strike className="text-red-500">{singlePackage?.packagePrice}/-</strike> <small>(per person)</small></td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className="flex flex-col xxs:flex-row items-center justify-between mt-5 xxs:mt-8">
                                    <p className="flex items-center 2xl:text-xl text-gray-700 font-semibold">{singlePackage?.packagePrice && 'After Discount:'} <span className="text-green-600 text-base xxs:text-lg sm:text-xl 2xl:text-3xl ml-1 xxs:ml-3">{addCommas(singlePackage?.packageDiscountPrice)} TK.</span><sub className="font-normal ml-1 xxs:ml-2">(per person)</sub></p>
                                    <p><button onClick={() => handleBooked()} type="button" className="btn mt-3 xxs:mt-0 btn-xs xxs:btn-sm 2xl:btn-md bg-primary hover:bg-secondary border-none text-gray-950">Booked This</button></p>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-10">
                                <div className="flex flex-col items-center">
                                    <h3 className="text-base xxs:text-xl sm:text-2xl 2xl:text-3xl text-gray-950 text-center mb-3 font-bold">Package Overview</h3>
                                    <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                                </div>
                                <div className="mt-4 xxs:mt-8">
                                    <pre className="whitespace-pre-wrap text-justify text-xs xxs:text-sm sm:text-base 2xl:text-lg 3xl:text-xl text-gray-800">{singlePackage?.overview}</pre>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

                {/* tour itinerary */}
                <div className="mt-20 lg:mt-32 2xl:mt-36 3xl:mt-44">
                    <div className="flex flex-col items-center">
                        <h3 className="text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-950 text-center  mb-2 xxs:mb-3 lg:mb-5 font-bold">Tour Itinerary</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                    </div>
                    <div className="mt-6 xxs:mt-8 sm:mt-10 md:mt-14 3xl:mt-16">
                        {
                            singlePackage?.itineraryData?.map((d, i) => {
                                return (
                                    <div key={i} className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-plus bg-transparent rounded-none">
                                        <input type="radio" name="my-accordion-3" />
                                        <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                            <span className="text-primary text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-bold mr-1 md:mr-2 xl:mr-3">Day - {i + 1} :</span> {d.title}
                                        </div>
                                        <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                            <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{d.details}</pre>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {/* image gallery */}
                <div className="mt-16 lg:mt-28 2xl:mt-32 3xl:mt-36">
                    <div className="flex flex-col items-center">
                        <h3 className="text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-950 text-center  mb-2 xxs:mb-3 lg:mb-5 font-bold">Photo Gallery</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                    </div>
                    <div className="mt-4 xxs:mt-6 sm:mt-8">
                        {gallery && <ImageGallery lazyLoad={true} infinite={true} showThumbnails={false} items={gallery} />}
                    </div>
                </div>

                {/* frequently asked question */}
                <div className="mt-16 lg:mt-28 2xl:mt-32 3xl:mt-36">
                    <div className="flex flex-col items-center">
                        <h3 className="text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-950 text-center  mb-2 xxs:mb-3 lg:mb-5 font-bold">Frequently Asked Questions</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                    </div>
                    <div className="mt-6 xxs:mt-8 sm:mt-10 md:mt-14 3xl:mt-16">
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                Activities highlight by day.
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_1}</pre>
                            </div>
                        </div>
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                Pickup Note.
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_2}</pre>
                            </div>
                        </div>
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                What are the cancellation and refund policy?
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_3}</pre>
                            </div>
                        </div>
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                What services are included with this package?
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_4}</pre>
                            </div>
                        </div>
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                What services are excluded from this package?
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_5}</pre>
                            </div>
                        </div>
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                What conditions are included with the package?
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_6}</pre>
                            </div>
                        </div>
                        <div className="-mt-4 xxs:-mt-2 xs:mt-0 collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title text-xs xxs:text-sm md:text-base lg:text-lg 2xl:text-xl font-medium">
                                What is there to do view and nearby?
                            </div>
                            <div className="text-gray-800 collapse-content -mt-3 xxs:-mt-1 xs:mt-0">
                                <pre className="whitespace-pre-wrap text-[10px] xxs:text-xs md:text-sm lg:text-base 2xl:text-base">{singlePackage?.faq?.faq_7}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
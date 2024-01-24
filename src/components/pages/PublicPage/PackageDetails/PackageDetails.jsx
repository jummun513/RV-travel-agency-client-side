import { Helmet } from "react-helmet-async";
import NotFound from "../../../shared/NotFound/NotFound";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../../shared/Loading/Loading";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PackageDetails = () => {
    const { packageId } = useParams();
    const { data: packages = [], isLoading, isError } = useQuery(['packages'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages`);
        return res.json();
    })

    if (isError) {
        return <NotFound></NotFound>
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    const singlePackage = packages?.filter(d => d._id === packageId);

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

    let images;

    if (singlePackage) {
        images = singlePackage[0]?.images?.map(d => ({ original: d.url, thumbnail: d.thumbnailUrl }));
    }

    return (
        <div className="bg-[#fbfbfb] pb-32 pt-[100px] xxs:pt-[150px] sm:pt-[170px] lg:pt-[180px] 3xl:pt-[200px]">
            <Helmet>
                <title>Package Details-{`${singlePackage[0]?.packageName}`} | Royal Venture Limited</title>
            </Helmet>
            <div className="mx-auto max-w-screen-3xl px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                {/* for large device */}
                <div className="hidden lg:flex">
                    <div className="w-2/5">
                        <img className="w-[90%] rounded-lg" src={singlePackage[0]?.thumbnail[0]?.url} alt={singlePackage[0]?.packageName} />
                        <iframe className='w-[90%] h-60 xl:h-48 2xl:h-40 3xl:h-32 mt-5 2xl:mt-8 border-none border-2 rounded-lg' src={singlePackage[0]?.packageZone.map} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="w-3/5">
                        <h3 className="text-center lg:text-2xl 2xl:text-3xl 3xl:text-4xl mb-7 2xl:mb-10 font-bold text-gray-950 border-s-8 w-fit pl-3 border-primary">Package Details</h3>
                        <table className="w-full min-w-[250px] rounded-lg">
                            <tbody>
                                <tr className="bg-white border hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Code</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageCode}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Name</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageName}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Type</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageType.value}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Zone</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                        <p className="mb-1">{singlePackage[0]?.packageZone.detailsAdd}</p>
                                        <p className="mb-1">{singlePackage[0]?.packageZone.city}</p>
                                        {singlePackage[0]?.packageZone.state !== '' && <p className="mb-1">{singlePackage[0]?.packageZone.state}</p>}
                                        <p>{singlePackage[0]?.packageZone.country}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Maximum Guest Number</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Adult-{singlePackage[0]?.guestNumber.adult}, Children-{singlePackage[0]?.guestNumber.child}, <span className="font-semibold">Total</span>-{singlePackage[0]?.guestNumber.total}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Duration</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageDuration.days} days, {singlePackage[0]?.packageDuration.nights} nights</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Name</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                        <p>{convertDate(singlePackage[0]?.lastEntry)}</p>
                                        <p>Time - {formatTimeWithSeconds(singlePackage[0]?.lastEntry)}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Price</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Taka: <span className="text-red-500 font-semibold">{singlePackage[0]?.packagePrice}/-</span> <small>(per person)</small></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-end mt-8"><button type="button" className="btn bg-primary hover:bg-secondary border-none text-gray-950">Booked This</button></p>
                    </div>
                </div>

                {/* for small device */}
                <div className="lg:hidden">
                    <div className="flex flex-col items-center mb-8 xxs:mb-10">
                        <h3 className="text-center text-base xxs:text-xl sm:text-2xl mb-2 xxs:mb-3 font-bold text-gray-950">Package Details</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 rounded-lg border-b-4 border-primary"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <img className="w-full xs:w-[85%] sm:w-[75%] md:w-[50%] mb-5 rounded-lg" src={singlePackage[0]?.thumbnail[0]?.url} alt={singlePackage[0]?.packageName} />
                        <iframe className='w-full xs:w-[85%] sm:w-[75%] md:w-[50%] h-48 border-none border-2 rounded-lg' src={singlePackage[0]?.packageZone.map} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="mt-16">
                        <table className="w-full min-w-[250px] rounded-lg">
                            <tbody>
                                <tr className="bg-white border hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Code</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageCode}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Name</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageName}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Type</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageType.value}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Zone</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                        <p className="mb-1">{singlePackage[0]?.packageZone.detailsAdd}</p>
                                        <p className="mb-1">{singlePackage[0]?.packageZone.city}</p>
                                        {singlePackage[0]?.packageZone.state !== '' && <p className="mb-1">{singlePackage[0]?.packageZone.state}</p>}
                                        <p>{singlePackage[0]?.packageZone.country}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Maximum Guest Number</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Adult-{singlePackage[0]?.guestNumber.adult}, Children-{singlePackage[0]?.guestNumber.child}, <span className="font-semibold">Total</span>-{singlePackage[0]?.guestNumber.total}</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Duration</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">{singlePackage[0]?.packageDuration.days} days, {singlePackage[0]?.packageDuration.nights} nights</td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Name</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">
                                        <p>{convertDate(singlePackage[0]?.lastEntry)}</p>
                                        <p>Time - {formatTimeWithSeconds(singlePackage[0]?.lastEntry)}</p>
                                    </td>
                                </tr>
                                <tr className="bg-white border border-t-0 hover:bg-slate-100">
                                    <th scope="row" className="text-gray-900 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start flex justify-between"><p>Package Price</p><p>:</p></th>
                                    <td className="text-gray-700 px-1 xxs:px-2 md:px-4 xl:px-6 py-2 md:py-4 text-start">Taka: <span className="text-red-500 font-semibold">{singlePackage[0]?.packagePrice}/-</span> <small>(per person)</small></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-center sm:text-end mt-8"><button type="button" className="btn btn-xs xxs:btn-sm md:btn-md bg-primary hover:bg-secondary border-none text-gray-950">Booked This</button></p>
                    </div>
                </div>

                <div className="mt-16 lg:mt-28 2xl:mt-32 3xl:mt-36">
                    <div className="flex flex-col items-center">
                        <h3 className="text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-950 text-center  mb-2 xxs:mb-3 lg:mb-5 font-bold">Package Overview</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                    </div>
                    <div className="mt-4 xxs:mt-6 sm:mt-8">
                        <pre className="whitespace-pre-wrap text-justify text-xs xxs:text-sm sm:text-base 2xl:text-lg 3xl:text-xl text-gray-800">{singlePackage[0]?.overview}</pre>
                    </div>
                </div>

                <div className="mt-16 lg:mt-28 2xl:mt-32 3xl:mt-36">
                    <div className="flex flex-col items-center">
                        <h3 className="text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-950 text-center  mb-2 xxs:mb-3 lg:mb-5 font-bold">Photo Gallery</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                    </div>
                    <div className="mt-4 xxs:mt-6 sm:mt-8">
                        <ImageGallery lazyLoad={true} items={images} />
                    </div>
                </div>

                <div className="mt-16 lg:mt-28 2xl:mt-32 3xl:mt-36">
                    <div className="flex flex-col items-center">
                        <h3 className="text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl text-gray-950 text-center  mb-2 xxs:mb-3 lg:mb-5 font-bold">Frequently Asked Questions</h3>
                        <div className="w-24 xxs:w-32 sm:w-36 2xl:w-60 3xl:w-72 rounded-lg border-b-4 lg:border-b-8 border-primary"></div>
                    </div>
                    <div className="mt-6 xxs:mt-8 sm:mt-10 md:mt-14 3xl:mt-16">
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                Activities highlight by day.
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <pre className="whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_1}</pre>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                Pickup Note.
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <p className="text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_2}</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                What are the cancellation and refund policy?
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <pre className="whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_3}</pre>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                What services are included with this package?
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <pre className="whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_4}</pre>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                What services are excluded from this package?
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <pre className="whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_5}</pre>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                What conditions are included with the package?
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <pre className="whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_6}</pre>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-transparent rounded-none">
                            <input type="radio" name="my-accordion-2" />
                            <div className="text-gray-900 collapse-title lg:text-xl font-medium">
                                What is there to do view and nearby?
                            </div>
                            <div className="text-gray-800 collapse-content">
                                <p className="text-xs xxs:text-sm sm:text-base 2xl:text-lg">{singlePackage[0]?.faq.faq_7}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
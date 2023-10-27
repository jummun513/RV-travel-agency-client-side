import HotelCards from "./HotelCards/HotelCards";

const data = [
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/radison-chittagong.jpg?updatedAt=1698387042645", title: "Radisson Blu Chattogram Bay View", loc: "Chittagong, Bangladesh" },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/dubai-emirates-palace-hotel.jpg?updatedAt=1698387043344", title: "Emirates Palace Mandarin Oriental", loc: "Abu Dhabi, UAE." },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/Rancho-Valencia-Resort-Spa-usa.jpg?updatedAt=1698387043053", title: "Rancho Valencia Resort & Spa", loc: "California, USA" },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/The-Westin-Excelsior-rome.jpg?updatedAt=1698387043057", title: "The Westin Excelsior", loc: "Rome, Italia" },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/Burj-Al-Arab-Hotel-dubai-uae.jpg?updatedAt=1698387043038", title: "Burj Al Arab Hotel", loc: "Dubai, UAE." },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/The-Plaza-usa.jpg?updatedAt=1698387043061", title: "The Plaza", loc: "New York City, USA." },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/Atlantis-Paradise-Island-bahamas.jpg?updatedAt=1698387043340", title: "Atlantis Paradise Island", loc: "Nassau, Bahamas" },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/Palms-Las-Vegas.jpg?updatedAt=1698387042961", title: "The Palms Hotel", loc: "Las Vegas, USA" },
    { img: "https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/home%20hotels/Cuisin-Art-Golf-Resort-Spa-uk.jpg?updatedAt=1698387042783", title: "CuisinArt Golf Resort & Spa", loc: "Anguilla, UK" }
]

const HotelSection = () => {
    return (
        <div id="hotelSection" className="bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-24 2xl:pt-32">
            <div className="bg-slate-100 py-12 xxs:py-18 md:py-24 2xl:py-32">
                <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                    <div className="text-center">
                        <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">The most popular hotels</h2>
                        <p className="text-justify xs:text-center text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-8 text-gray-900 md:w-[90%] lg:w-[80%] mx-auto">If Life&#39;s a journey then your vacation are special destinations at <span className="font-bold text-sm xxs:text-base xs:text-lg 2xl:text-xl 3xl:text-2xl">Royal Venture Limited</span> We hope to partner with you through this journey by bringing you many exotic vacations from beach side to hill side retreat&#39;s from jungle vacation to riverside get ways come, catch a glimpse of your future vacations.</p>
                    </div>
                    <div className="hidden 2xl:grid grid-cols-3 gap-x-10 gap-y-10 mt-16">
                        {
                            data.map((d, i) => <HotelCards key={i} data={d}></HotelCards>)
                        }
                    </div>
                    <div className="2xl:hidden grid lg:grid-cols-2 gap-x-10 gap-y-3 xxs:gap-y-5 sm:gap-y-10 mt-8 xxs:mt-12 sm:mt-16">
                        {
                            data.slice(0, 6).map((d, i) => <HotelCards key={i} data={d}></HotelCards>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelSection;
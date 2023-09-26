import AllworldCard from "./AllworldCard/AllworldCard";


const data = [
    { url: "https://i.ibb.co/NntnZ0Z/statue-liberty-usa.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "USA", flag: "fi-us", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/fF9qChC/great-wall-china.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "China", flag: "fi-cn", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/zrBY7Nw/sundarban-bangladesh.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "Bangladesh", flag: "fi-bd", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/G0gbvnt/burj-khalifa-abu-dhabi.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "UAE", flag: "fi-ae", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/Zdd1PsV/niagra-falls-canada.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "Canada", flag: "fi-ca", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/922mx9Y/mount-fuji-japan.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "Japan", flag: "fi-jp", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/mFL7c7r/taj-mahal-india.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "India", flag: "fi-in", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/gwqBT8g/eiffel-tower-france.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "France", flag: "fi-fr", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/x6nKpZP/christ-the-redeemer-brazil.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "Brazil", flag: "fi-br", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
    { url: "https://i.ibb.co/4Vn0Qrn/patong-beach-thailand.jpg", alt: "Most visited country", hotel: "Total 1002 hotels available", flight: "20 flights available", country: "Thailand", flag: "fi-th", place: "All most 100 truist spots. Most common are Sundarban mangrove forest, Cox's bazar sea beach, Miroshorai to tecknaf marine drive road.", },
]

const AllWorld = () => {
    return (
        <div id="explorebd" className="bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-24 2xl:pt-32">
            <div className="bg-slate-100 py-12 xxs:py-18 md:py-24 2xl:py-32">
                <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
                    <div className="text-center">
                        <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Travel the world with us</h2>
                        <p className="text-justify xs:text-center text-xs xxs:text-sm xs:text-base 2xl:text-lg 3xl:text-xl mt-4 xs:mt-8 text-gray-900 md:w-[90%] lg:w-[80%] mx-auto">If Life&#39;s a journey then your vacation are special destinations at <span className="font-bold text-sm xxs:text-base xs:text-lg 2xl:text-xl 3xl:text-2xl">Royal Venture Limited</span> We hope to partner with you through this journey by bringing you many exotic vacations from beach side to hill side retreat&#39;s from jungle vacation to riverside get ways come, catch a glimpse of your future vacations.</p>
                    </div>
                    <div className="hidden 3xl:grid justify-items-center gap-y-16 grid-cols-4 mt-16">
                        {
                            data.slice(0, 8).map((d, i) => <AllworldCard key={i} data={d}></AllworldCard>)
                        }
                    </div>
                    <div className="hidden 3xl:hidden xl:grid place-items-center grid-cols-3 gap-y-14 xl:mt-16">
                        {
                            data.slice(0, 6).map((d, i) => <AllworldCard key={i} data={d}></AllworldCard>)
                        }
                    </div>
                    <div className="xl:hidden grid place-items-center lg:grid-cols-2 gap-y-7 xs:gap-y-10 mt-8 xs:mt-12">
                        {
                            data.slice(0, 4).map((d, i) => <AllworldCard key={i} data={d}></AllworldCard>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllWorld;
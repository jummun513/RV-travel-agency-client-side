
const HotelCards = (data) => {
    const { img, title, loc } = data.data;
    return (
        <div>
            <div className="relative group/container">
                <div className="relative rounded-md xs:rounded-xl aspect-[3/2] flex justify-between overflow-hidden items-center group/container">
                    <div style={{ backgroundImage: `url(${img})` }} className="rounded-md xs:rounded-xl h-full w-full transition-all duration-[700ms] ease-in-out transform bg-center bg-contain bg-no-repeat group-hover/container:scale-105"></div>
                    <div className="h-full w-full absolute top-0 left-0 bg-black opacity-40 rounded-md xs:rounded-xl z-10"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-2 xxs:p-3 xxs:pb-4 xs:pb-5 xs:p-5 z-[11]">
                    <h4 className="font-bold text-base sm:text-lg md:text-2xl lg:text-base 2xl:text-xl 3xl:text-2xl text-slate-50">{title}</h4>
                    <p className="text-slate-100 pt-1 pb-2 xxs:pb-4">{loc}</p>
                    <button className="btn btn-xs xs:btn-sm md:btn-md bg-primary text-slate-950 border-2 border-primary hover:bg-transparent hover:border-primary hover:text-primary ">See Details</button>
                </div>
            </div>
        </div>
    );
};

export default HotelCards;
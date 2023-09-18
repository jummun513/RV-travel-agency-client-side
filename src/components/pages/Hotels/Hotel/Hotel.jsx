
const Hotel = (data) => {
    const { id, heading, rating, desc, reviews, amenities, policies, about, safety, AtGlance, location, rooms, images, thumb
    } = data.data;
    console.log(id, heading, rating, desc, reviews, amenities, policies, about, safety, AtGlance, location, rooms, images, thumb);
    return (
        <div className="rounded-lg bg-[#fbfbfb] border-2 border-gray-300">
            <div className="flex">
                <div className="w-2/5 object-cover"><img src={thumb} className="rounded-lg w-full" /></div>
                <div className="w-3/5">
                    <div className="flex">
                        <div>
                            <h2 className="text-base 2xl:text-xl font-bold">{heading}</h2>
                            <p className="">{location.city}</p>
                            <p className="">{location.country}</p>
                        </div>
                        <button className="btn btn-sm 2xl:btn-md bg-primary text-gray-900 border-none hover:bg-secondary">Details</button>
                    </div>
                    <div className="flex">
                        <div>
                            <div>
                                <p>Fully refundable</p>
                                <p>Collect stamps</p>
                            </div>
                            <div className="flex">
                                <div>{rating}</div>
                                <div>
                                    <p>Good</p>
                                    <p>14 reviews</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>10% off</div>
                            <p><span>USD 26</span> <span>USD 24</span></p>
                            <p><span>*</span>USD 260 total</p>
                            <p>Includes taxes and fees</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;
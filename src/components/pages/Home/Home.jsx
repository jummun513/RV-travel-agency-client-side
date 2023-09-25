import Banner from "./Banner/Banner";
import PopularDestination from "./PopularDestination/PopularDestination";
import TopOffer from "./TopOffer/TopOffer";
// import HotelSection from "./HotelSection/HotelSection";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopOffer></TopOffer>
            <PopularDestination></PopularDestination>
        </div>
    );
};

export default Home;
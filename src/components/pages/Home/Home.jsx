import AllWorld from "./AllWorld/AllWorld";
import Banner from "./Banner/Banner";
import ExploreBD from "./ExploreBD/ExploreBD";
import Reviews from "./Reviews/Reviews";
import TopOffer from "./TopOffer/TopOffer";
// import HotelSection from "./HotelSection/HotelSection";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopOffer></TopOffer>
            <AllWorld></AllWorld>
            <ExploreBD></ExploreBD>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;
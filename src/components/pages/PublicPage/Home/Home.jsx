import AllWorld from "./AllWorld/AllWorld";
import Banner from "./Banner/Banner";
import ExploreBD from "./ExploreBD/ExploreBD";
import HotelSection from "./HotelSection/HotelSection";
import Reviews from "./Reviews/Reviews";
import TopOffer from "./TopOffer/TopOffer";
import LogoSlider from "./LogoSlider/LogoSlider";
import OurPackages from "./OurPackages/OurPackages";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Royal Venture Limited</title>
            </Helmet>
            <Banner></Banner>
            <TopOffer></TopOffer>
            <OurPackages></OurPackages>
            <AllWorld></AllWorld>
            <ExploreBD></ExploreBD>
            <HotelSection></HotelSection>
            <LogoSlider></LogoSlider>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;
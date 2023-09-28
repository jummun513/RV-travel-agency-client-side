import Marquee from 'react-fast-marquee';
import MarqueeElement from './MarqueeElement/MarqueeElement';


const LogoSlider = () => {
  return (
    <div id="hotelSection" className="bg-[#fbfbfb] pt-12 xxs:pt-18 md:pt-24 2xl:pt-32">
      <div className="py-12 xxs:py-24 md:py-24 2xl:py-32">
        <div className="px-2 xxs:px-[16px] sm:px-[32px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-20">
            <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl">Our partners</h2>
          </div>
          <Marquee pauseOnHover={true} speed={50}>
            <MarqueeElement></MarqueeElement>
          </Marquee>
          <Marquee className='mt-3 lg:mt-5' pauseOnHover={true} speed={50} direction='right'>
            <MarqueeElement></MarqueeElement>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
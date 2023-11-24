import { Helmet } from "react-helmet-async";

const CeoMessage = () => {
    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>CEO Message | Royal Venture Limited</title>
            </Helmet>
            <div className="bg-cover bg-no-repeat bg-center mx-auto max-w-screen-4xl pb-20 xs:pb-32 pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
                <div className="xs:shadow-xl pb-5 mx-auto px-2 xxs:px-5 xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                    <div className="md:border-l-8 sm:py-5 border-primary">
                        <h3 className="text-center md:text-left md:ms-2 text-base xxs:text-xl sm:text-3xl xl:text-5xl font-bold text-gray-800">Message from the CEO</h3>
                    </div>
                    <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-8 xl:mt-16 mb-4">Dear Esteemed Clients, Esteemed Partners, and Friends,</h4>
                    <p className="text-justify text-gray-700 mb-2">With an overwhelming sense of purpose and genuine excitement, I extend my warmest greetings on behalf of Royal Venture Limited (RVL). As we embark on this exciting journey, I am honored to illuminate the foundational principles, aspirations, and guiding ethos that define the very core of our collective pursuit.</p>
                    <p className="text-justify text-gray-700 mb-2">We do not simply aim to lead; we are on a mission to redefine the global landscape of tourism, immigration, and education consultancy. We aim to be the trusted compass guiding individuals toward comprehensive solutions for their travel, immigration, and educational needs—an unwavering symbol of reliability and excellence.</p>
                    <p className="text-justify text-gray-700 mb-2">We promise to consistently deliver exceptional services that cater to the diverse needs of our clients, firmly rooted in the tenets of professionalism, integrity, and unwavering satisfaction. From exceeding expectations through tailored services to cultivating a robust global network of partnerships, each objective reflects our resolute dedication to excellence in every facet of our operations.</p>
                    <p className="text-justify text-gray-700 mb-2">We value customer-centric excellence, global outreach, service adaptability, ethical conduct, nurturing our team, empowering our clients through knowledge, and realizing tangible objectives. I extend heartfelt gratitude to our esteemed clients, dedicated team members, and invaluable partners whose steadfast support has propelled us to this pivotal juncture. Together, we will persist in innovating, excelling, and setting unprecedented standards in the realms of tourism, immigration, and education consultancy.</p>
                    <p className="text-justify text-gray-700 mb-2">I welcome you to be an integral part of this dynamic trajectory. Your trust in Royal Venture Limited will be met with an unwavering commitment to excellence and the highest standards of integrity.</p>
                    <p className='text-gray-900 text-sm xxs:text-base sm:text-lg mt-8 xs:mt-10'>Warm regards,</p>
                    <p className='text-gray-900 text-sm xxs:text-base sm:text-lg font-bold'>Md. Reazul Islam</p>
                    <p className='text-gray-900 text-sm xxs:text-base sm:text-lg'>Chief Executive Officer, <span className="font-semibold text-gray-900 text-sm xxs:text-base sm:text-lg">Royal Venture Limited</span></p>
                </div>
            </div>
        </div>
    );
};

export default CeoMessage;
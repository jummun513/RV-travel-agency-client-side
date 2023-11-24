import { Helmet } from "react-helmet-async";

const DirectorMessage = () => {
    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>Managing Direct&apos;s Message | Royal Venture Limited</title>
            </Helmet>
            <div className="bg-directorSmall lg:bg-directorLarge bg-cover bg-no-repeat bg-center mx-auto max-w-screen-4xl pb-20 xs:pb-32 pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
                <div className="xs:shadow-xl pb-5 mx-auto px-2 xxs:px-5 xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                    <div className="md:border-l-8 sm:py-5 border-primary">
                        <h3 className="text-center md:text-left md:ms-2 text-base xxs:text-xl sm:text-3xl xl:text-5xl font-bold text-gray-800">Message from the Managing Director</h3>
                    </div>
                    <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-8 xl:mt-16 mb-4">Dear Esteemed Clients, Partners, and Well-Wishers,</h4>
                    <p className="text-justify text-gray-700 mb-2">I extend my warm greetings on behalf of Royal Venture Limited (RVL). I am thrilled to unveil the bedrock of our organization—the principles, aspirations, and ethos that define our collective endeavor.</p>
                    <p className="text-justify text-gray-700 mb-2">Our vision stands as a testament not only to our ambition but also to our unwavering dedication. We strive to lead and redefine the landscape of tourism, immigration, and education consultancy on a global scale. Our goal is to be the trusted compass guiding individuals toward holistic solutions for their travel, immigration, and educational pursuits—a beacon of reliability and excellence.</p>
                    <p className="text-justify text-gray-700 mb-2">Our mission is a commitment to enriching lives by crafting unforgettable travel experiences, streamlining immigration processes, and nurturing educational opportunities. To actualize this vision, we have charted a course comprising specific objectives. From surpassing expectations through personalized services to fostering a robust global network of partnerships, each goal represents our unwavering dedication to excellence in every endeavor.</p>
                    <p className="text-justify text-gray-700 mb-2">Our values are the compass guiding our actions, reflecting our steadfast commitment to customer-centric excellence, global outreach, service versatility, ethical conduct, nurturing our team, empowering our clients through information, and attaining tangible objectives. These values aren&apos;t merely words etched on a page; they form the essence of our daily operations.</p>
                    <p className="text-justify text-gray-700 mb-2">As we embark on this transformative journey, I extend my heartfelt gratitude to our cherished clients, dedicated team members, and invaluable partners whose unwavering support has been instrumental in reaching this pivotal juncture. Together, we will continue to innovate, excel, and establish new benchmarks in tourism, immigration, and education consultancy.</p>
                    <p className="text-justify text-gray-700 mb-2">I extend an open invitation for you to be part of this dynamic trajectory. Your trust in Royal Venture Limited will be met with an unwavering commitment to excellence and the highest standards of integrity.</p>
                    <p className='text-gray-900 text-sm xxs:text-base sm:text-lg mt-8 xs:mt-10'>With warm regards,</p>
                    <p className='text-gray-900 text-sm xxs:text-base sm:text-lg font-bold'>Ashikul Zaman</p>
                    <p className='text-gray-900 text-sm xxs:text-base sm:text-lg'>Managing Director, <span className="font-semibold text-gray-900 text-sm xxs:text-base sm:text-lg">Royal Venture Limited</span></p>
                </div>
            </div>
        </div>
    );
};

export default DirectorMessage;
import { Helmet } from 'react-helmet-async';
import url from '../../../../../assets/images/about-back.jpg'

const WhoWeAre = () => {
    return (
        <div className="bg-[#fbfbfb]">
            <Helmet>
                <title>About-US | Royal Venture Limited</title>
            </Helmet>
            <div style={{ backgroundImage: `url(${url})` }} className="bg-cover bg-no-repeat bg-center h-[300px] lg:h-[500px] 4xl:h-[700px] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            </div>
            <div className=''>
                <div className="xs:shadow-2xl pt-7 sm:pt-10 relative -top-20 lg:-top-40 4xl:-top-60 rounded-md bg-gray-50 z-10 pb-10 mx-2 xxs:mx-5 xs:mx-auto px-2 xxs:px-5 xl:px-10 xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                    <div className="border-x-4 lg:border-x-8 mx-auto sm:py-2 lg:py-3 xl:py-5 w-fit border-primary">
                        <h3 className="mx-2 text-base xxs:text-xl sm:text-3xl xl:text-5xl font-bold text-gray-900">About Us</h3>
                    </div>
                    <div>
                        <h4 className="text-sm xxs:text-base sm:text-lg text-gray-900 font-semibold mt-8 xl:mt-16 mb-2 xxs:mb-4">Vision of RVL</h4>
                        <p className="text-justify text-gray-700 mb-2">Our vision is to become a globally recognized leader in tourism, immigration, and education consultancy. We aspire to be the preferred choice for individuals seeking comprehensive and reliable solutions for their travel, immigration, and educational aspirations. Through innovation and dedication, we aim to contribute positively to the lives of our clients and the communities we serve.</p>
                    </div>
                    <div>
                        <h4 className="text-sm xxs:text-base sm:text-lg text-gray-900 font-semibold mt-8 xl:mt-8 mb-2 xxs:mb-4">Mission of RVL</h4>
                        <p className="text-justify text-gray-700 mb-2">At Royal Venture Limited, our mission is to enrich lives by creating unforgettable travel experiences, facilitating seamless immigration processes, and fostering educational opportunities. We are committed to delivering exceptional services that cater to the diverse needs of our clients, while upholding the highest standards of professionalism, integrity, and customer satisfaction.</p>
                    </div>
                    <div>
                        <h4 className="text-sm xxs:text-base sm:text-lg text-gray-900 font-semibold mt-8 xl:mt-8 mb-2 xxs:mb-4">Our Goals</h4>
                        <ol className='list-decimal ml-5 sm:ml-8 xl:ml-14'>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Customer Excellence: </span>Strive to exceed customer expectations by providing personalized and tailor-made services that cater to the unique preferences and needs of each client.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Global Network: </span>Expand our reach and partnerships to offer a wide range of travel, immigration, and educational services across various countries and regions.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Service Diversity: </span>Continuously enhance and diversify our service offerings to cover a comprehensive spectrum of travel, immigration, and education solutions.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Ethical Practices: </span>Uphold the highest ethical standards in all our operations, ensuring transparency, honesty, and integrity in every interaction.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Employee Development: </span>Nurture a supportive and growth-oriented work environment that empowers our team members to excel and innovate.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Client Empowerment: </span>Empower clients with accurate information, guidance, and resources to make informed decisions about their travel, immigration, and educational pursuits.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 className="text-sm xxs:text-base sm:text-lg text-gray-900 font-semibold mt-8 xl:mt-8 mb-2 xxs:mb-4">Our Objectives</h4>
                        <ol className='list-decimal ml-5 sm:ml-8 xl:ml-14'>
                            <li className='text-justify text-gray-700 mb-2'>Develop and promote a wide range of enticing domestic and international holiday tour packages.</li>
                            <li className='text-justify text-gray-700 mb-2'>Facilitate smooth immigration processes, particularly for individuals aspiring to move to Canada.</li>
                            <li className='text-justify text-gray-700 mb-2'>Assist students in securing admissions to esteemed universities in North America, Europe, Australia, Malaysia, and India.</li>
                            <li className='text-justify text-gray-700 mb-2'>Provide comprehensive services for Umrah and Hajj packages, ensuring a spiritually fulfilling experience for pilgrims.</li>
                            <li className='text-justify text-gray-700 mb-2'>Streamline hotel booking, visa processing, and air ticketing services to offer a hassle-free travel experience.</li>
                            <li className='text-justify text-gray-700 mb-2'>Establish strategic partnerships with educational institutions and other relevant stakeholders to enhance the quality of our educational services.</li>
                            <li className='text-justify text-gray-700 mb-2'>Stay updated with the latest industry trends and regulations to ensure accurate and up-to-date information is provided to clients.</li>
                            <li className='text-justify text-gray-700 mb-2'>Measure and continuously improve customer satisfaction through feedback and reviews.</li>
                            <li className='text-justify text-gray-700 mb-2'>Contribute to local communities through responsible and sustainable tourism practices.</li>
                            <li className='text-justify text-gray-700 mb-2'>Strive for continuous growth, both in terms of market presence and service excellence, while maintaining financial sustainability.</li>
                        </ol>
                        <p className="text-justify text-gray-700 mb-2">By pursuing these objectives, Royal Venture Limited aims to fulfill its mission, achieve its vision, and establish itself as a reputable and trusted name in the fields of tourism, immigration, and education consultancy.</p>
                    </div>
                    <div>
                        <h4 className="text-sm xxs:text-base sm:text-lg text-gray-900 font-semibold mt-8 xl:mt-8 mb-2 xxs:mb-4">Our Values</h4>
                        <p className="text-justify text-gray-700 mb-2">The values of Royal Venture Limited, as outlined in the provided information, can be summarized as follows:</p>
                        <ol className='list-decimal ml-5 sm:ml-8 xl:ml-14'>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Customer-Centric Excellence: </span>Strive to exceed customer expectations by providing personalized and tailor-made services that cater to the unique preferences and needs of each client.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Global Network Expansion: </span>Expand our reach and partnerships to offer a wide range of travel, immigration, and educational services across various countries and regions.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Service Diversity and Enhancement: </span>Continuously enhance and diversify our service offerings to cover a comprehensive spectrum of travel, immigration, and education solutions.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Ethical Integrity: </span>Uphold the highest ethical standards in all our operations, ensuring transparency, honesty, and integrity in every interaction.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Employee Growth and Development: </span>Nurture a supportive and growth-oriented work environment that empowers our team members to excel and innovate.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Client Empowerment through Information: </span>Empower clients with accurate information, guidance, and resources to make informed decisions about their travel, immigration, and educational pursuits.</li>
                            <li className='text-justify text-gray-700 mb-2'><span className='font-semibold text-gray-800'>Specific Objectives: </span>Empower clients with accurate information, guidance, and resources to make informed decisions about their travel, immigration, and educational pursuits.</li>
                        </ol>
                        <p className="text-justify text-gray-700 mb-2">These values collectively reflect the company&lsquo;s dedication to providing high-quality services in the fields of tourism, immigration, and education consultancy, with a strong emphasis on professionalism, integrity, and customer satisfaction.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoWeAre;
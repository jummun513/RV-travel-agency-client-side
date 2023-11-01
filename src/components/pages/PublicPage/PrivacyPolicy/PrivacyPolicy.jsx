import { Helmet } from 'react-helmet';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>Privacy & Policy - Royal Venture Limited</title>
            </Helmet>
            <div className="relative bg-privacy&policy bg-center bg-contain 3xl:bg-cover bg-no-repeat min-h-fit mx-auto max-w-screen-4xl pt-[45px] xxs:pt-[64px] lg:pt-[74px] 3xl:pt-[106px] pb-[45px] xxs:pb-[64px] lg:pb-[74px] xl:pb-[100px] 3xl:pb-[106px]">
                <div className="h-full w-full z-10 absolute top-0 bg-[#fff] opacity-[0.85]"></div>
                <div className="relative z-[11] h-full w-full top-0 px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                    <div>
                        <h2 className='slideInLeft text-center lg:text-left text-base xxs:text-2xl xs:text-3xl md:text-4xl 3xl:text-5xl font-extrabold text-black md:mb-2'>Customer Privacy Policy for</h2>
                        <h2 className='slideInLeftDelay text-center lg:text-left text-base xxs:text-2xl xs:text-3xl md:text-4xl 3xl:text-5xl font-extrabold text-primary'>Royal Venture Limited</h2>
                        <p className="text-base xxs:text-lg md:text-xl text-gray-800 font-bold my-5 sm:my-8">Effective Date: <span className="font-normal bg-primary p-1 text-gray-950 text-sm xxs:text-base md:text-lg">October 01, 2023</span></p>
                        <p className='text-gray-700 text-justify xl:text-xl lg:w-[80%]'>At Royal Venture Limited, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you interact with our services.</p>
                    </div>
                    <div className="xxs:ms-2 xs:ms-5 mt-8 xs:mt-10">
                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%]">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">1. Information We Collect</h3>
                            <p className="xl:text-lg text-justify">We may collect the following types of information:</p>
                            <ul className="list-disc ms-4 xxs:ms-5 xs:ms-10 mt-2">
                                <li className="font-semibold text-gray-800 text-justify">Personal Identification Information: <span className="font-normal">Name, address, email address, phone number, passport details, and other relevant personal details.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Payment Information: <span className="font-normal">Credit card details, billing information, and other financial data necessary for processing transactions.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Travel Preferences: <span className="font-normal">Information about your travel preferences, special requirements, and any other relevant details to ensure a personalized experience.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Communication Records: <span className="font-normal">Correspondence with us, including emails, chat logs, and phone call recordings.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Device and Usage Information: <span className="font-normal">Information about your device and how you interact with our website or mobile applications.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Cookies and Tracking Technologies: <span className="font-normal">Information collected through cookies and similar technologies for analytics, customization, and advertising purposes. You can manage cookie preferences through your browser settings.</span></li>
                            </ul>
                        </div>

                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%] mt-4 xs:mt-5">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">2. How We Use Your Information</h3>
                            <p className="xl:text-lg text-justify">We use your information for the following purposes:</p>
                            <ul className="list-disc ms-4 xxs:ms-5 xs:ms-10 mt-2">
                                <li className="font-semibold text-gray-800 text-justify">Providing Services: <span className="font-normal">To offer and fulfill travel, immigration, and education consultancy services, including booking reservations, processing payments, and delivering relevant information.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Communication: <span className="font-normal">To respond to inquiries, provide updates on services, and address any concerns or feedback you may have.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Customization: <span className="font-normal">To personalize your experience, tailor our services to your preferences, and offer relevant recommendations.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Legal Compliance: <span className="font-normal">To comply with legal obligations, resolve disputes, and enforce agreements.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Marketing and Promotions: <span className="font-normal">With your consent, to send promotional offers, newsletters, and updates about our services.</span></li>
                            </ul>
                        </div>

                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%] mt-4 xs:mt-5">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">3. Information Sharing and Disclosure</h3>
                            <p className="xl:text-lg  text-justify">We do not sell, rent, or trade your personal information to third parties. However, we may share your information under the following circumstances:</p>
                            <ul className="list-disc ms-4 xxs:ms-5 xs:ms-10 mt-2">
                                <li className="font-semibold text-gray-800 text-justify">Service Providers: <span className="font-normal">We may engage trusted third-party service providers to assist with various aspects of our operations, such as payment processing, customer service, and marketing. These providers have access to your information only to perform their designated functions and are bound by confidentiality obligations.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Legal Compliance: <span className="font-normal">We may disclose your information when required by law or in response to valid legal processes, including subpoenas, court orders, or government requests.</span></li>
                                <li className="font-semibold text-gray-800 text-justify">Protection of Rights: <span className="font-normal">To protect the rights, safety, and property of Royal Venture Limited, our customers, and others.</span></li>
                            </ul>
                        </div>

                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%] mt-4 xs:mt-5">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">4. Security Measures</h3>
                            <p className="xl:text-lg text-justify">We implement industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</p>
                        </div>

                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%] mt-4 xs:mt-5">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">5. Your Choices and Rights</h3>
                            <p className="xl:text-lg  text-justify">You have the right to:</p>
                            <ul className="list-disc ms-4 xxs:ms-5 xs:ms-10 mt-2">
                                <li className="font-normal text-gray-800 text-justify">Access and update your personal information.</li>
                                <li className="font-normal text-gray-800 text-justify">Request the deletion of your personal information, subject to legal obligations.</li>
                                <li className="font-normal text-gray-800 text-justify">Opt-out of receiving marketing communications.</li>
                                <li className="font-normal text-gray-800 text-justify">Manage cookie preferences through your browser settings.</li>
                            </ul>
                        </div>

                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%] mt-4 xs:mt-5">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">6. Contact Us</h3>
                            <p className="xl:text-lg text-justify">If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please contact us at: <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=info@theroyalventure.com&su=Question%20on%20privacy%20and%20policy&body=Write%20your%20opinion%20here..." className="text-blue-600 underline">info@theroyalventure.com</a></p>
                        </div>

                        <div className="text-gray-700 w-[98%] xxs:w-[95%] xs:w-[90%] lg:w-[70%] mt-4 xs:mt-5">
                            <h3 className="text-gray-800 font-bold mb-1 xl:text-lg">7. Changes to this Policy</h3>
                            <p className="xl:text-lg text-justify">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The revised policy will be effective immediately upon posting on our website.</p>
                        </div>
                    </div>
                    <div className="my-5 sm:my-10 2xl:my-16 text-gray-700">
                        <p className='text-gray-700 text-justify xl:text-xl lg:w-[80%]'>Thank you for entrusting Royal Venture Limited with your personal information. We are dedicated to ensuring your privacy and providing you with exceptional services.</p>
                        <p className="font-bold text-gray-800 mt-5 sm:mt-7 xl:mt-10 text-sm xs:text-base lg:text-lg">Ashikul Zaman</p>
                        <p>Managing Director</p>
                        <p>Royal Venture Limited</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
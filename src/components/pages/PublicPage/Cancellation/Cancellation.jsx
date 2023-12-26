import { Helmet } from "react-helmet-async";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Cancellation = () => {
    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>Cancellation and Refund Policy | Royal Venture Limited</title>
            </Helmet>
            <Tabs>
                <div className='pt-[45px] xxs:pt-[64px] lg:pt-[74px] 3xl:pt-[106px] pb-[45px] xxs:pb-[64px] lg:pb-[74px] xl:pb-[100px] 3xl:pb-[106px]'>
                    <TabList className='flex flex-col xxs:flex-row justify-center px-5 xxs:px-0'>
                        <Tab className='btn btn-xs xs:btn-sm lg:btn-wide 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Cancellation</Tab>
                        <Tab className='btn btn-xs xs:btn-sm lg:btn-wide 2xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 mt-2 xxs:mt-0 xxs:mr-2'>Refund</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="bg-cover bg-no-repeat bg-center mx-auto max-w-screen-4xl pb-20 xs:pb-32 pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
                            <div className="xs:shadow-xl pb-5 mx-auto px-2 xxs:px-5 xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                                <div className="md:border-l-8 sm:py-3 3xl:py-5 border-primary mb-8">
                                    <h3 className="text-center md:text-left md:ms-2 text-base xxs:text-xl sm:text-3xl xl:text-4xl 3xl:text-5xl font-bold text-gray-800">Cancellation Policy</h3>
                                </div>
                                <p className="text-justify text-gray-700 mb-1 xs:mb-2 xl:text-lg 3xl:text-xl">Royal Venture Limited values our customers&apos; travel plans and strives to offer flexibility wherever possible. However, to ensure the smooth functioning of our services and to maintain fairness for all parties involved, we have formulated the following cancellation policy:</p>
                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Cancellation Timeline:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">48!Hours prior notice is required for cancellations without incurring any penalty.</li>
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">Cancellations made within this timeline may result in 40% Percentage of the total booking cost being non-refundable.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Refunds:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">If cancellation occurs within the stipulated timeline, Royal Venture Limited will refund the appropriate amount in accordance with the cancellation policy.</li>
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">Refunds will be processed within 30-60 Days of the cancellation request and will be subject to any applicable administrative fees.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Special Circumstances:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">In cases of unforeseen circumstances (e.g., natural disasters, emergencies), Royal Venture Limited will assess each situation individually and may offer exceptions to the cancellation policy.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Change Requests:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">For any changes to bookings (e.g., altering dates, modifying itinerary), we encourage clients to contact us at the earliest convenience to explore available options. Additional charges may apply based on the nature of the changes and availability.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">No Shows:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">Failure to inform Royal Venture Limited of a cancellation or not showing up for a reservation without prior notice may result in the forfeiture of the entire booking amount.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Communication:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">All cancellation requests must be communicated directly to Royal Venture Limited through our official communication channels (phone, email, etc.) to be considered valid.</li>
                                </ul>
                                <p className="text-justify text-gray-700 mt-2 xxs:mt-3 sm:mt-4 xl:mt-5 3xl:mt-6">Please note that this cancellation policy is subject to change and may vary based on specific bookings, tours, or packages. We recommend reviewing the cancellation terms at the time of booking to ensure clarity and understanding of the policy applicable to your reservation.
                                    Should you have any queries or require further clarification regarding our cancellation policy, please do not hesitate to contact us.</p>
                                <p className="text-justify text-gray-700 mt-2 xxs:mt-3 sm:mt-4 xl:mt-5 3xl:mt-6">Thank you for choosing Royal Venture Limited. We appreciate your understanding and cooperation regarding our cancellation policy.</p>
                                <p className='text-gray-900 text-sm xxs:text-base sm:text-lg mt-8 xs:mt-10'>Sincerely,</p>
                                <p className='text-gray-900 text-sm xxs:text-base sm:text-lg font-bold'>Ashikul Zaman</p>
                                <p className='text-gray-900 text-sm xxs:text-base sm:text-lg'>Managing Director, <span className="font-semibold text-gray-900 text-sm xxs:text-base sm:text-lg">Royal Venture Limited</span></p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="bg-cover bg-no-repeat bg-center mx-auto max-w-screen-4xl pb-20 xs:pb-32 pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
                            <div className="xs:shadow-xl pb-5 mx-auto px-2 xxs:px-5 xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                                <div className="md:border-l-8 sm:py-3 3xl:py-5 border-primary mb-8 md:mb-10 2xl:mb-14 3xl:mb-20">
                                    <h3 className="text-center md:text-left md:ms-2 text-base xxs:text-xl sm:text-3xl xl:text-4xl 3xl:text-5xl font-bold text-gray-800">Refund Policy</h3>
                                </div>
                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Cancellation by Customer:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg"><b>Full Refund:</b> Cancellations made 24 hour after the sign-up date will receive a full refund, minus any non-refundable fees or deposits.</li>
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg"><b>Partial Refund:</b> Cancellations made between 3 and 5 days after the signup date will receive a 50% refund, minus any non-refundable fees or deposits.</li>
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg"><b>No Refund:</b> Cancellations made after 5 days of the signup date will not be eligible for a refund.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Cancellation Policy for other reason:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">In the event that the travel agency cancels the trip due to unforeseen circumstances or reasons beyond their control, customers will receive a full refund of all payments made for the trip.</li>
                                </ul>

                                <h4 className="text-sm xxs:text-base sm:text-lg text-gray-700 font-semibold mt-3 xl:mt-4 mb-2 xl:mb-3">Refund Process:</h4>
                                <ul className="list-disc ml-5 xxs:ml-6 md:ml-7 xl:ml-10 3xl:ml-14">
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">Refunds will be processed within 30 - 60 days from the date of cancellation.</li>
                                    <li className="text-justify text-gray-700 xxs:mb-1 sm:mb-2 3xl:text-lg">All refund requests must be made in writing and sent to the travel agency&#39;s designated contact email or address.</li>
                                </ul>

                                <p className="text-justify text-gray-700 mt-2 xxs:mt-3 sm:mt-4 xl:mt-5 3xl:mt-6"><b>Note:</b> Please be aware that certain components of the trip, such as non-refundable flight tickets or accommodations, may have separate refund policies governed by the respective service providers.</p>
                                <p className="text-justify text-gray-700 mt-2 xxs:mt-3 sm:mt-4 xl:mt-5 3xl:mt-6">Thank you for choosing Royal Venture Limited. We appreciate your understanding and cooperation regarding our cancellation policy.</p>
                                <p className='text-gray-900 text-sm xxs:text-base sm:text-lg mt-8 xs:mt-10'>Sincerely,</p>
                                <p className='text-gray-900 text-sm xxs:text-base sm:text-lg font-bold'>Ashikul Zaman</p>
                                <p className='text-gray-900 text-sm xxs:text-base sm:text-lg'>Managing Director, <span className="font-semibold text-gray-900 text-sm xxs:text-base sm:text-lg">Royal Venture Limited</span></p>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default Cancellation;
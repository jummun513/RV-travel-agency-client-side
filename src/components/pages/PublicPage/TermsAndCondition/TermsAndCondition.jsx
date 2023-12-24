import { Helmet } from 'react-helmet-async';
import url from '../../../../assets/images/terms-and-conditions.svg';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const TermsAndCondition = () => {
    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <Helmet>
                <title>Terms & Conditions - Royal Venture Limited</title>
            </Helmet>
            <Tabs>
                <div className='pt-[45px] xxs:pt-[64px] lg:pt-[74px] 3xl:pt-[106px] pb-[45px] xxs:pb-[64px] lg:pb-[74px] xl:pb-[100px] 3xl:pb-[106px]'>
                    <TabList className='flex flex-col xxs:flex-row justify-center px-5 xxs:px-0'>
                        <Tab className='btn btn-xs xs:btn-sm lg:btn-wide 3xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 xxs:mt-0 xxs:mr-2'>Air Ticket</Tab>
                        <Tab className='btn btn-xs xs:btn-sm lg:btn-wide 3xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 mt-2 xxs:mt-0 xxs:mr-2'>Tour Package</Tab>
                        <Tab className='btn btn-xs xs:btn-sm lg:btn-wide 3xl:btn-md border-none text-gray-950 bg-slate-300 hover:bg-slate-200 mt-2 xxs:mt-0'>Visa Service</Tab>
                    </TabList>
                    <TabPanel className='px-3 xxs:px-5 xs:px-0'>
                        <div style={{ backgroundImage: `url(${url})` }} className="mt-10 py-7 sm:pt-10 sm:pb-14 3xl:pb-16 rounded-md sm:rounded-lg shadow-md sm:shadow-lg relative bg-center bg-contain bg-no-repeat mx-auto xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                            <div className="h-full w-full z-10 absolute top-0 bg-[#fff] opacity-[0.85] rounded-md sm:rounded-lg"></div>
                            <div className="relative z-[11] h-full w-full top-0 px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                                <h2 className='text-gray-800 font-bold text-sm xxs:text-base sm:text-xl md:text-2xl 2xl:text-3xl text-center'>Terms and Conditions on</h2>
                                <h2 className='text-primary font-bold text-base xxs:text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-center mt-1 sm:mt-3 mb-5 xl:mb-8'>Air Ticket</h2>
                                <ol className='list-decimal text-gray-700 mx-3 xxs:mx-5'>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5'>All air ticket & other service price subject to availability at the time of booking. Not at the time of payment.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>After client payment if any price of service increases or becomes unavailable for booking then client must pay the difference of price. If the client decides not to purchase the service, all together then refund will be given minus service charge of minimum <span className='font-semibold'>5000 BDT</span> per person or as mentioned at the time of refund depending on service.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All air tickets are non-refundable in any case unless mentioned otherwise.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any change in air ticket is subject to airline fee, agency service charge, fare difference and airline policies.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All changes in airline tickets subject to airline rules.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Date change, cancellation, refunds and other services depend on airline policy, airline fees and agent service charges. Agent is not liable to declare any other information to passengers other than the gross price of service taken.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any financial information communication shall be made through the agent&lsquo;s official methods such as email / WhatsApp/ money receipt / invoice. We do not provide any kind of information related to internal financials or third party financials.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Passengers are expected to read all details of an air ticket that is provided before purchasing air tickets and other services. All passengers are expected to enquire any and all details about an air ticket before purchasing. Any issue raised about an air ticket mentioning passengers did not know about the certain aspect will not be entertained in any case after the ticket is issued.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Air tickets cannot be booked for more than the allowed timeline provided by each airline.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any issue related to flight is the responsibility of the airline such as delay or flight cancellation & others.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All air tickets will be canceled 24 hours before flight time if 100% payment is not made by the passenger.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Passengers must provide valid passport and visa proof to issue tickets.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any service other than air ticket issuing is subject to extra fees depending on airline policy such as seat selection, meals, upgrading, wheelchair, transit visa, transit accommodation or other services</li>
                                </ol>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className='px-3 xxs:px-5 xs:px-0'>
                        <div style={{ backgroundImage: `url(${url})` }} className="mt-10 py-7 sm:pt-10 sm:pb-14 3xl:pb-16 rounded-md sm:rounded-lg shadow-md sm:shadow-lg relative bg-center bg-contain bg-no-repeat mx-auto xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                            <div className="h-full w-full z-10 absolute top-0 bg-[#fff] opacity-[0.85] rounded-md sm:rounded-lg"></div>
                            <div className="relative z-[11] h-full w-full top-0 px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                                <h2 className='text-gray-800 font-bold text-sm xxs:text-base sm:text-xl md:text-2xl 2xl:text-3xl text-center'>Terms and Conditions on</h2>
                                <h2 className='text-primary font-bold text-base xxs:text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-center mt-1 sm:mt-3 mb-5 xl:mb-8'>Tour Package</h2>
                                <ol className='list-decimal text-gray-700 mx-3 xxs:mx-5'>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5'>All prices are subject to change without prior notice as per availability. Even after advance payment prices may change till booking is confirmed.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All tour packages & related services are subject to availability at the time of booking. Not at the time of payment received from guests</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All accommodation names mentioned will be included as per individual tour package details but in the case of un availability similar accommodation will be provided. By the word “similar” we mean an alternative accommodation that will <span className='font-semibold'>a)</span> be of the same star category <span className='font-semibold'>b)</span> be near to the original accommodation or in another location that serves the tour package in the same way have comparable room category (double/twin/triple/family) & breakfast. In case of any accommodation change we try our utmost best to provide an even better & upgraded facility but may not match exactly with the original offered one.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All price quotations provided may be valid for a maximum of 24 hours and are subject to availability.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>After client payment if any price of service increases or becomes unavailable for booking then client must pay the difference of price. If the client decides not to purchase the service, all together then refund will be given minus service charge of minimum 5000 BDT per person or as mentioned at the time of refund depending on service.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Service charges applicable if you don&apos;t purchase a given service quotation after a visa is approved depending on purchase conditions agreed upon first service confirmation.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All unpaid service will be cancelled 4 days before departure date.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will not provide any custom tour package quotation without being informed of guest actual budget for tour.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Hotel standard check in 1400 hrs & check out 1200 hrs. Early check in or late check out may have extra fees charged by accommodation directly to guest.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We encourage all guests to check hotel website online to see hotel standard & facilities. But purchasing travel services from us you agree to the service standard of the hotel provided through checking the facilities of the hotel online from the hotel official website.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will provide travel services / accommodation images if available after full payment for booking is complete.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Published rates are not valid during blackout periods such as holidays, trade fairs, exhibitions and special events.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>It is your responsibility to be at the designated pick up / drop off spot & locate your driver / tour guide. Failure to do so will result in cancellation of the transfer or tour without refunds.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If you can’t find your driver/guide, please wait 15 minutes and call the local operator number given in your voucher. If you call us it will take much more time to solve your problem.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If your hotel is out of local operator services, then extra surcharges apply that must be paid by passenger on spot to the driver directly</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Transfers from 09 PM to 07 AM may have extra surcharges applied that must be paid by passenger on spot to the driver directly.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If your hotel is outside local operator service you must meet your driver / tour guide at mentioned location on your own expense.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Entry fees to attractions are not included in any tour unless mentioned otherwise.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Package prices mentioned are per person based on a minimum of 2 passengers or said otherwise.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Booked packages must be canceled 31+ days prior to departure date subject to each tour package individual terms & conditions. If done so refund may be given minus nonrefundable services & 10% service charge. If canceled after 31 days prior to departure, then no refunds will be given in any case.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>No refunds will be given for unutilized services. Any advance given for any package is nonrefundable in any case.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Due to unavoidable circumstances some changes to the package may be necessary, we apologies for any inconvenience & expect your kind understanding.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Rooms near your family / friends depend on availability, there is no certainty for that.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Waiting time at the airport may be 15-90 min depending on the local operator. Waiting/extra luggage charges may apply. Each adult is allowed one luggage (28 inch max) & one carry on (12 inch max). Failure to arrive on time for any reason whatsoever will result in booking cancellation / no show & guests must arrange their own transport.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>No additional instruction to the local operator / guide / driver for any changes in itinerary can be made. Exact timing & itinerary should be followed. Any instruction to wait / return / come back / other changes may result in confusion & cancellation of the booking with no responsibility to Dragon Holidays BD</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Air fare is nonrefundable in any situation regardless of airlines rules. Any changes made to the itinerary are subject to fees & service charges.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All tour packages are nonrefundable non changeable. If change is permitted you are required to pay the price difference for new dates.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>The guests are requested to follow the rules and regulations of the resort / hotel where they are accommodated.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>In the unlikely event of reserved accommodation not available for you upon arrival at your destination, we would immediately arrange for an alternate accommodation of the same standards.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We shall have no legal liability for any loss, damage, personal injury arising directly or indirectly from any aspect of your holiday.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Journey undertaken by air, land or sea is governed by the terms and conditions of the service provider. Any changes made by the service provider are out of our control.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>In the unfortunate event of vehicle breakdown, local operators provide you alternate vehicle. However, the time loss due to the event will not be compensated.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>In case of any immigration/Visa complications, the cancellation policy shall be applicable in full as non-refundable.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All communications during the tour must be done to the local operator (number given in tourist vouchers). Any issue must be communicated with the local operator at the time of the issue. Communicating with us about local issues will require a complaint form to be filled up & submitted for review which will take from one to four months to investigate and process.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>70% of total payment must be made for bookings the departure date of which is 31+ days later. For bookings less than 31 days early 100% payment is required. Advanced booking money is nonrefundable in any case of cancellation in all situations after less than 30 days is left of departure date regardless of accommodation or any other party involved.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any changes to your tour after you have made payment requires new fees depending on the changes you require.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any bookings made by us may or may not be under guest name. As per different local establishment rules & policies.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>It may take up to 2-7 working days to issue actual service vouchers depending on accommodation & other local operators.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Hotels, resorts, transportation or any tour operator may charge guests extra as per their specific policies on surcharges regardless of what is mentioned in the guest voucher. Royal Venture Limited is not responsible for this type of fees.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We are not responsible for any delays by 3rd party airlines, local transport or local tour operators. Any financial loss due to delays is not our responsibility. Any transport will not wait after a specific waiting time. Delay due to flights will result in booking becoming a no show with no refunds given. Guests must arrange their own transport in this case.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any delay by the airline will result in missing your airport transfer or tour & is not
                                        changeable. Please arrange alternative transport yourself.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Your driver will wait a limited amount of time after your flight lands depending
                                        upon local operator waiting time which can be 30 – 60 minutes. If you don&apos;t find a driver near the
                                        arrival area / exit gates, then the driver will leave with no refunds given. If flight is delayed,
                                        inform the local operator immediately. They may be able to reschedule your pick up. Otherwise
                                        pick up will be canceled with no refunds.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>As budget travel arrangements local providers are cheap & do not follow
                                        standard levels of service compliance we will not provide any support for this type of services
                                        booked.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Please note it is the customer&apos;s responsibility to locate the driver as the driver
                                        has limited authority to move inside the airport.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Child / Infant policy subject to individual hotel/transport/local tour operator.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We are not responsible for any aspect of the tour that is out of our control or
                                        jurisdiction.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Failure to mention all details of children including age, height, number or any
                                        other information is subject to local establishment or tour operator decision. We are not liable for
                                        any financial loss if incurred.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any TAX, service charge, or other fees imposed by local or foreign government
                                        must be paid by guests directly to authority upon arrival or check in.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any extra charge imposed by any 3rd party is payable to the 3rd party directly by
                                        the guest and is not our responsibility. Any fee may be imposed by 3rd party like airlines or hotel
                                        as per their policy or as per extra facility given to the guests, payable by guest directly</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any change made by a local operator is out of our control therefore is not our
                                        responsibility.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If any hotel / tour / transport or other service is not available on spot please call
                                        the local tour operator or local partner number on the voucher & mention your booking number
                                        & name. No other information is required. Local operator will arrange alternative service as per
                                        availability
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any tours may or may not include transfers from hotel depending on tour
                                        operator policy. Any tour which includes hotel transfers may not be available if your hotel is not
                                        covered by the tour operator service area.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>It is the passenger&apos;s responsibility to bring required documents for entry to a
                                        foreign country</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If a flight is canceled or missed by a passenger, he must contact airlines to
                                        change dates.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any refunds processing time will be from 30 to 90 days depending on local tour
                                        operator policy.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Entry fees to attractions, sights, historical or other places are not included & must
                                        be paid by guest on spot.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All hotel rooms are provided as a basic version of any hotel in DBL / TWN if not
                                        mentioned otherwise by guests in advance. Any request for a specific room subject to
                                        availability & extra fees.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Purchasing a tour package or hotel service means you have seen the hotel that
                                        is offered and agree to it. Please look at the hotel information online before confirming.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Royal Venture Limited reserves the right to change any policy without prior
                                        notice.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className='px-3 xxs:px-5 xs:px-0'>
                        <div style={{ backgroundImage: `url(${url})` }} className="mt-10 py-7 sm:pt-10 4xl:pt-20 sm:pb-14 3xl:pb-16 rounded-md sm:rounded-lg shadow-md sm:shadow-lg relative bg-center bg-contain bg-no-repeat mx-auto xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl">
                            <div className="h-full w-full z-10 absolute top-0 bg-[#fff] opacity-[0.85] rounded-md sm:rounded-lg"></div>
                            <div className="relative z-[11] h-full w-full top-0 px-2 xxs:px-[16px] sm:px-[32px] 2xl:px-[20]">
                                <h2 className='text-gray-800 font-bold text-sm xxs:text-base sm:text-xl md:text-2xl 2xl:text-3xl text-center'>Terms and Conditions on</h2>
                                <h2 className='text-primary font-bold text-base xxs:text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-center mt-1 sm:mt-3 mb-5 xl:mb-8'>Visa Service</h2>
                                <ol className='list-decimal text-gray-700 mx-3 xxs:mx-5'>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>100% processing fee and all of the required documents must be provided all
                                        together in advance.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>For a first world country visa processing may take 7 to 15 working days to
                                        process your visa unless said otherwise.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We are not responsible for any delay in the visa process due to embassy
                                        technical or non-technical issues.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All visa service charges & embassy fees are nonrefundable in any case or
                                        situation of the visa outcome whatsoever.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Visa processing time will start after 100% of processing fee paid & has provided
                                        all correct information and documents related to the visa.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We do not give any guarantee of any visa approval for any client. Visa approval
                                        depends on the embassy decision. If any visa is refused, the respective embassy may or may
                                        not provide reason, rejection seal or any other official protocol that embassy might have. We are
                                        not responsible or will answer for any such decision.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Clients will have to provide fully ready and submit table documents to us. This
                                        includes all notary, certification, translation etc</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We do not provide any false papers or identity of any kind. Royal Venture Limited
                                        will not advise anyone of anything that is not legal or unethical.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>After full payment if client wants to cancel the service with in one-hour client will
                                        get 80% of visa processing fee & 100% of embassy fee if embassy fee is not paid already, if
                                        embassy fee already paid then no refund will be given. No refunds after one hour of payment.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>No claim shall be entertained for missing documents after the visa file is
                                        delivered to the client. It is the client&apos;s duty to receive all documents properly.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any kind of reference numbers will not be given to any applicant during or after
                                        visa processing timeline for any situation. This is strictly our business process and this
                                        information will not be disclosed to the applicant to ensure smooth and hassle free operation.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any delay in passport delivery by the embassy & any financial loss as a result of
                                        it is not our responsibility.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All our clients are expected to read all of the terms and conditions before taking our services. We are not bound to disclose any information related to visa processing to any individual, organization or part.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any changes made to any visa service (early withdrawal, cancellation, resubmission, repeat appointment, un-scheduled delivery / pick up / logistics work/other work not included in the visa service package) will be charged extra and must be paid before visa processing is done.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will not be giving any information regarding any visa process other than visa delivery notice to client. We will not share any visa tracking information and nor will we give any document related to our internal visa process. We do not share any information on how visa application was prepared & what information was used to prepare. Rest assured only information provided by the applicant will be used to apply for his / her visa application.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If any pressure is created to break our agency rules by any party, they will face
                                        legal action with serious consequences. We reserve the right to file lawsuits against any
                                        individual or organization with any unethical accusations portrayed against us in any public,
                                        private, social or digital media platforms.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any embassy may take extra time to process any visa. All delivery times
                                        mentioned are approximate. We are not responsible for any losses due to late visa decisions by
                                        the embassy. Any complaint must be made by the applicant to the respective embassy
                                        regarding any irregular procedures. We do not provide any contact information about any
                                        embassy regarding any issue.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>For any visa refusal we are not bound to show cause of refusal as it is strictly an
                                        embassy decision.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If a visa applicant or client has any due payments towards the agency, then the
                                        due must be cleared before passport or other visa related document is delivered.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any embassy may change their visa process, rule, timeline, required papers list,
                                        qualification, fees or any other aspect without prior notice. We are not responsible for any such
                                        changes made as no embassy is obligated to have notice standards.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any mistake made due to misrepresentation from applicant or wrong/not up to
                                        date information provided by applicant is the responsibility of the applicant alone and any
                                        consequence that may result from the situation</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If any document is proven to be lost due to our mishandling of applicant
                                        documents, we will pay up to BDT 5000-taka total after receiving legal written proof of the value
                                        of the document lost. Service taken by the applicant must be more than BDT 10,000 to qualify.
                                        We are not responsible for unfortunate circumstances outside our control.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>For a Russian visa if we fail to provide an invitation within 7 working days then we
                                        will do it in 15 working days & 15 working days’ visa service will apply. For Russian visa process
                                        working days = Monday to Thursday except other holidays in between. We are not responsible
                                        for any delay in this process due to situations out of our control. In that case our original fee will
                                        be collected.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will take written consent of all visa application details. Once the process is
                                        started no change is allowed. Any change requires a new application & full new visa service
                                        payment.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>No change in service purchased shall be accepted after service has been started
                                        or payment is made. Any change subject to new fees/availability.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will only communicate with the applicant OR contact person in all regards.
                                        NO other communication from others will be entertained.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Royal Venture Limited reserves the right to deny service to anyone after
                                        evaluation.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will not delay any of our process due to lack of information, documents from
                                        the applicant or any other situation of the applicant that will delay our service process. You must
                                        receive the service within the time frame mentioned by us. 1 to 7 days of delay = 10% extra
                                        charge.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We will not entertain any service claim after the delivery date is over.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any un utilized service is not transferable in any situation. If you paid & canceled
                                        a service, then all fees are non-refundable.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All due payments must be cleared within 3 working days of service completion.
                                        Otherwise 10% extra charge applicable for 1 to 7 days’ delay. 30% extra charge applicable for 8
                                        to 10 days’ delay. More than that we will take legal action.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>If you don’t submit documents for the visa on our mentioned date then we will
                                        cancel all bookings, invitation.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We do not provide any documentation printing, copy, scanning, notary, translation
                                        or other document services. Subject to extra charges during purchase.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>You must send a visa scan copy after visa approval for our record & reporting to
                                        the respective inviting company in the respective country</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>We reserve the right to display or make reference to any approved visa which we
                                        have processed.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Any delay more than 5 working days in giving information/documents to us for
                                        your service, then service will be canceled without refund.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>For all visa service: after making payment for visa if you do not finish the
                                        complete visa process then we will not provide any refund whatsoever</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>For Russian visa rejection, some employees from the embassy may tell you
                                        different things like invitations are not paid or something. That is not true and we have proven it
                                        time & time again. They say this so that you don’t create problems for them & go to travel
                                        agencies to argue. We will not entertain any kind of accusations like this what so ever.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>Royal Venture Limited reserves the right to make any changes to its internal
                                        policies without prior notice.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>All other services: Visa rejection letter request: BDT 3000, 5 correspondences
                                        with embassy / authority BDT 5000, Re application BDT 8000, Reschedule appointment BDT
                                        3000. All these service fees are subject to change. Please check the latest add on extra service
                                        fees for visa processing service on our website.</li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>It is the passenger&lsquo;s responsibility to make sure he has all required valid
                                        documents to travel abroad including valid passport, visa & other documents.
                                    </li>
                                    <li className='text-justify xxs:pl-1 sm:pl-3 xl:pl-5 mt-2'>For Vietnam visa approval 100% refund may be given if the visa is rejected by
                                        the Vietnam Immigration Authority. No refunds will be given if Vietnam Immigration Authority is
                                        late in issuing a visa or if Vietnam Immigration Authority issues a visa with a different visa
                                        validity period than client requested. Visa date may be required to be changed as per Vietnam
                                        Immigration Authority instruction. No refunds will be given if the visa is not rejected. No date
                                        change allowed by the applicant after visa service is purchased from Dragon Holidays BD. Visa
                                        letters may be issued for 1 – 20 days’ maximum as per Vietnam Immigration Authority decision.</li>
                                </ol>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TermsAndCondition;
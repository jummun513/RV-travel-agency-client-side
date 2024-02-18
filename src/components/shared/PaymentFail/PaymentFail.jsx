import { Link } from "react-router-dom";

const PaymentFail = () => {
    return (
        <div>
            <div className="bg-[#fbfbfb] h-screen flex items-center justify-center">
                <div className="bg-gray-100 p-6  md:mx-auto md:w-96">
                    <svg className="text-green-600 w-16 h-16 mx-auto my-6" viewBox="0 0 20 20" fill="#FF0000">
                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Oops!</h3>
                        <p className="text-gray-700 my-2">Payment Unsuccessfull! Try later.</p>
                        <p className="text-gray-500"> Have a great day!</p>
                        <div className="py-10 text-center">
                            <Link to='/dashboard/my-order-history/hotel-booked' className="px-12 bg-primary hover:bg-secondary text-gray-950 font-semibold py-3">
                                GO BACK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="grid h-[100vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <Helmet>
                <title>Not found - Royal Venture Limited</title>
            </Helmet>
            <div className="sm:text-center">
                <p className="text-xl sm:text-2xl lg:text-4xl font-semibold text-primary">404</p>
                <h1 className="mt-2 sm:mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-3 sm:mt-6 md:text-base leading-7 text-gray-600">Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.</p>
                <div className="mt-6 sm:mt-10 flex items-center sm:justify-center gap-x-3 xs:gap-x-6">
                    <Link to='/' className="rounded-md bg-primary px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 xxs:text-sm md:text-base font-semibold text-gray-950 shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">Go back home</Link>
                    <Link to="/contact-us" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
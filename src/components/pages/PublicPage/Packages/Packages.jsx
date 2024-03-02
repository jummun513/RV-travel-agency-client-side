import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import PackageSearch from "../../../shared/PackageSearch/PackageSearch";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import NotFound from "../../../shared/NotFound/NotFound";
import { useEffect, useState } from "react";
import Package from "./Package/Package";
import ReactPaginate from "react-paginate";

const Packages = () => {
    const { data: allPackages = [], isLoading, isError } = useQuery(['allPackages'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/packages`);
        return res.json();
    });
    const location = useLocation();
    const packageName = new URLSearchParams(location.search)?.get('name');
    const city = new URLSearchParams(location.search)?.get('city');
    const type = new URLSearchParams(location.search)?.get('type');
    const [searchResults, setSearchResults] = useState([]);
    const itemsPerPage = 6;

    useEffect(() => {
        if (packageName === null && city === null && type === null && allPackages.length > 0) {
            setSearchResults(allPackages);
        }
        else if (allPackages.length > 0) {
            const newData = allPackages?.filter(d => ((packageName !== null && d.packageName.toLowerCase().includes(packageName.toLowerCase())) || (city !== null && d.packageZone.city.toLowerCase().includes(city.toLowerCase())) || (city !== null && d.packageZone.country.toLowerCase().includes(city.toLowerCase())) || (type !== null && d.packageType.value.toLowerCase().includes(type.toLowerCase()))));
            setSearchResults(newData);
        }
    }, [packageName, city, type, allPackages]);

    if (isLoading) {
        <Loading></Loading>
    }

    if (isError) {
        <NotFound></NotFound>
    }

    return (
        <div className='bg-[#fbfbfb] py-16 xxs:py-24 xs:py-36 md:py-40 xl:py-48 3xl:py-56'>
            <Helmet>
                <title>Packages - Royal Venture Limited</title>
            </Helmet>
            <div className='xs:bg-gray-50 rounded-md xs:border px-2 xxs:px-5 xs:px-0 mx-auto max-w-screen-[250px] xs:max-w-screen-xxs sm:max-w-screen-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl 3xl:max-w-screen-2xl 4xl:max-w-screen-3xl'><PackageSearch></PackageSearch></div>
            <div className="mt-16 xxs:mt-20 lg:mt-24 mx-auto max-w-screen-4xl px-2 xxs:px-3 sm:px-5 lg:px-10">
                <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl uppercase text-center">all Packages</h2>
                <div className="mt-10 sm:mt-16 xl:mt-20">
                    {
                        (searchResults.length > 0) ?
                            (searchResults.length > itemsPerPage ?
                                <Pagination itemsPerPage={itemsPerPage} items={searchResults} />
                                :
                                <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(448px,1fr))] justify-center sm:place-items-center md:gap-x-5 gap-y-4 xs:gap-y-5 lg:gap-y-10">
                                    {
                                        searchResults.map((d, i) => <Package key={i} data={d}></Package>)
                                    }
                                </div>
                            ) :
                            <div className='mt-36 text-gray-500 text-sm md:text-base 2xl:text-lg 4xl:text-xl text-center'>No Data Available!</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Packages;

function Pagination({ itemsPerPage, items }) {
    const [currentPage, setCurrentPage] = useState(1);


    // Get current post 
    const indexOfLastCard = currentPage * itemsPerPage;
    const indexOfFirstCard = indexOfLastCard - itemsPerPage;
    const currentItems = items.slice(indexOfFirstCard, indexOfLastCard);
    const pageCount = Math.ceil((items.length) / itemsPerPage);

    return (
        <>
            <Item currentItems={currentItems} />
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                previousLabel={'BACK'}
                nextLabel={'NEXT'}
                breakLabel={'...'}
                onPageChange={(event) => setCurrentPage(event.selected + 1)}
                containerClassName={'flex justify-center space-x-1 xs:space-x-3 items-center text-gray-950 mt-14 sm:mt-16 lg:mt-24'}
                pageLinkClassName={'btn btn-sm xs:btn-md bg-[#fbfbfb] text-gray-950 border-primary hover:border-primary hover:bg-primary'}
                previousLinkClassName={'btn btn-sm xs:btn-md bg-[#fbfbfb] text-gray-950 border-primary hover:border-primary hover:bg-primary'}
                nextLinkClassName={'btn btn-sm xs:btn-md bg-[#fbfbfb] text-gray-950 border-primary hover:border-primary hover:bg-primary'}
                activeLinkClassName={'active bg-primary'}
            />
        </>
    );
}
function Item({ currentItems }) {
    return (
        <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(448px,1fr))] justify-center sm:place-items-center md:gap-x-5 gap-y-4 xs:gap-y-5 lg:gap-y-10">
            {
                currentItems.map((d, i) => <Package key={i} data={d}></Package>)
            }
        </div>
    );
}
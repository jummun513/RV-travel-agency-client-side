import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import NotFound from "../../../shared/NotFound/NotFound";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import SinglePgReviews from "./SinglePgReviews/SinglePgReviews";

const PgReviewsClient = () => {
    const { data: reviews = [], isLoading, isError } = useQuery(['reviews'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/reviews`);
        return res.json();
    });
    const itemsPerPage = 6;

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className='bg-[#fbfbfb] py-16 xxs:py-24 xs:py-36 md:py-40 xl:py-48 3xl:py-56'>
            <Helmet>
                <title>Privilege Guest Reviews - Royal Venture Limited</title>
            </Helmet>
            <div className="mx-auto max-w-screen-4xl px-2 xxs:px-3 sm:px-5 lg:px-10">
                <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl uppercase text-center">all Reviews</h2>
                <div className="mt-10 sm:mt-16 xl:mt-20">
                    {
                        (reviews.length > 0) ?
                            (reviews.length > itemsPerPage ?
                                <Pagination itemsPerPage={itemsPerPage} items={reviews} />
                                :
                                <div className="grid grid-cols-1 2xl:grid-cols-2 4xl:grid-cols-3 justify-items-center 2xl:gap-x-5 gap-y-5 xxs:gap-y-6 sm:gap-y-7 md:gap-y-8 3xl:gap-y-10">
                                    {
                                        reviews?.map((d, i) => <SinglePgReviews key={i} d={d}></SinglePgReviews>)
                                    }
                                </div>) :
                            <div className='mt-36 text-gray-500 text-sm md:text-base 2xl:text-lg 4xl:text-xl text-center'>No Data Available!</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PgReviewsClient;


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
                pageRangeDisplayed={2}
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
        <div className="grid grid-cols-1 2xl:grid-cols-2 4xl:grid-cols-3 justify-items-center 2xl:gap-x-5 gap-y-5 xxs:gap-y-6 sm:gap-y-7 md:gap-y-8 3xl:gap-y-10">
            {
                currentItems.map((d, i) => <SinglePgReviews key={i} d={d}></SinglePgReviews>)
            }
        </div>
    );
}
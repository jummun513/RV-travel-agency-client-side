import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import NotFound from "../../../shared/NotFound/NotFound";
import userImg from "../../../../assets/images/user.svg";
import { Rating } from "@mui/material";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const PgReviewsClient = () => {
    const { data: reviews = [], isLoading, isError } = useQuery(['reviews'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/reviews`);
        return res.json();
    });
    const [isReadMore, setIsReadMore] = useState(true);
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
                                <Pagination itemsPerPage={itemsPerPage} items={reviews} isReadMore={isReadMore} setIsReadMore={setIsReadMore} />
                                :
                                <div className="grid grid-cols-1 2xl:grid-cols-2 4xl:grid-cols-3 justify-items-center 2xl:gap-x-5 gap-y-5 xxs:gap-y-6 sm:gap-y-7 md:gap-y-8 3xl:gap-y-10">
                                    {
                                        reviews.map((d, i) => {
                                            const toggleReadMore = () => {
                                                setIsReadMore(!isReadMore);
                                            };
                                            return (
                                                <div key={i} className="w-[250px] xxs:w-[350px] xs:w-[470px] md:w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-md md:rounded-lg border hover:shadow-sm">
                                                    <div className="flex xs:items-center justify-between">
                                                        <div className="xs:flex items-center">
                                                            <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                                                                <img loading="lazy" className="aspect-square rounded-full w-full" src={d?.userId?.avatar.length > 0 ? d?.userId?.avatar?.[0]?.thumbnailUrl : userImg} alt={d?.userId?.fullName || d?.userId?.name + ' image'} />
                                                            </div>
                                                            <div className="mt-2 xs:mt-0 xs:ms-4">
                                                                <h4 className="text-gray-800 font-semibold">{d?.userId?.fullName || d?.userId?.name}</h4>
                                                                <p className="text-gray-500">{d?.userId?.occupation || (d?.userType === 'user' ? 'General User' : 'Privilege User')}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Rating name="size-large" precision={0.5} value={d.rating} size="large" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 xs:mt-5">
                                                        <div className="text-gray-500 text-justify">
                                                            {isReadMore ? d.desc.slice(0, 100) + ' ...' : d.desc}
                                                            <br />
                                                            <a onClick={toggleReadMore} className="btn btn-xs 3xl:btn-sm border-primary bg-gray-50 text-gray-950 hover:bg-transparent mt-2">
                                                                {isReadMore ? "read more" : "show less"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
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


function Pagination({ itemsPerPage, items, isReadMore, setIsReadMore }) {
    const [currentPage, setCurrentPage] = useState(1);


    // Get current post 
    const indexOfLastCard = currentPage * itemsPerPage;
    const indexOfFirstCard = indexOfLastCard - itemsPerPage;
    const currentItems = items.slice(indexOfFirstCard, indexOfLastCard);
    const pageCount = Math.ceil((items.length) / itemsPerPage);

    return (
        <>
            <Item currentItems={currentItems} isReadMore={isReadMore} setIsReadMore={setIsReadMore} />
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
function Item({ currentItems, setIsReadMore, isReadMore }) {
    return (
        <div className="grid grid-cols-1 2xl:grid-cols-2 4xl:grid-cols-3 justify-items-center 2xl:gap-x-5 gap-y-5 xxs:gap-y-6 sm:gap-y-7 md:gap-y-8 3xl:gap-y-10">
            {
                currentItems.map((d, i) => {
                    const toggleReadMore = () => {
                        setIsReadMore(!isReadMore);
                    };
                    return (
                        <div key={i} className="w-[250px] xxs:w-[350px] xs:w-[470px] md:w-[640px] p-3 xxs:p-5 bg-[#fbfbfb] rounded-md md:rounded-lg border hover:shadow-sm">
                            <div className="flex xs:items-center justify-between">
                                <div className="xs:flex items-center">
                                    <div className="aspect-square rounded-full w-16 h-16 xs:w-20 xs:h-20">
                                        <img loading="lazy" className="aspect-square rounded-full w-full" src={d?.userId?.avatar.length > 0 ? d?.userId?.avatar?.[0]?.thumbnailUrl : userImg} alt={d?.userId?.fullName || d?.userId?.name + ' image'} />
                                    </div>
                                    <div className="mt-2 xs:mt-0 xs:ms-4">
                                        <h4 className="text-gray-800 font-semibold">{d?.userId?.fullName || d?.userId?.name}</h4>
                                        <p className="text-gray-500">{d?.userId?.occupation || (d?.userType === 'user' ? 'General User' : 'Privilege User')}</p>
                                    </div>
                                </div>
                                <div>
                                    <Rating name="size-large" precision={0.5} value={d.rating} size="large" readOnly />
                                </div>
                            </div>
                            <div className="mt-3 xs:mt-5">
                                <div className="text-gray-500 text-justify">
                                    {isReadMore ? d.desc.slice(0, 100) + ' ...' : d.desc}
                                    <br />
                                    <a onClick={toggleReadMore} className="btn btn-xs 3xl:btn-sm border-primary bg-gray-50 text-gray-950 hover:bg-transparent mt-2">
                                        {isReadMore ? "read more" : "show less"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
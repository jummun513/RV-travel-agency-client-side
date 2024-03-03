import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import NotFound from "../../../shared/NotFound/NotFound";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const ClientSideBlogs = () => {
    const { data: allBlogs = [], isLoading, isError } = useQuery(['allBlogs'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/blogs`);
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
                <h2 className="text-gray-950 font-extrabold text-base xxs:text-2xl xs:text-3xl md:text-5xl xl:text-5xl uppercase text-center">Our blogs & news</h2>
                {
                    (allBlogs.length > 0) ?
                        (
                            allBlogs.length > itemsPerPage ?
                                <Pagination itemsPerPage={itemsPerPage} items={allBlogs} /> :
                                <Item currentItems={allBlogs} />
                        )
                        :
                        <div className='mt-36 text-gray-500 text-sm md:text-base 2xl:text-lg 4xl:text-xl text-center'>No Data Available!</div>
                }
            </div>
        </div>
    );
};

export default ClientSideBlogs;


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
    const navigate = useNavigate();
    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }
    return (
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-y-3 xs:gap-y-4 sm:gap-y-5 lg:gap-x-5 3xl:gap-7 mt-10 sm:mt-16 xl:mt-20">
            {currentItems?.map((d, i) => {
                return (
                    <div key={i}>
                        <div onClick={() => navigate(`/blog&news/details/${d?._id}`)} className="relative group/container hover:cursor-pointer">
                            <div className="relative rounded-md xs:rounded-xl aspect-[16/9] flex justify-between overflow-hidden items-center group/container">
                                <div style={{ backgroundImage: `url(${d?.thumbnail?.[0]?.thumbnailUrl})` }} className="rounded-md xs:rounded-xl h-full w-full transition-all duration-[700ms] ease-in-out transform bg-center bg-cover bg-no-repeat group-hover/container:scale-105"></div>
                                <div className="h-full w-full absolute top-0 left-0 bg-black opacity-[0.55] rounded-md xs:rounded-xl z-10"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-2 xxs:p-3 xxs:pb-4 xs:pb-5 xs:p-5 z-[11]">
                                <h4 className="font-bold text-sm xxs:text-base sm:text-lg md:text-2xl lg:text-base 2xl:text-xl 3xl:text-2xl text-slate-50">{d?.heading}</h4>
                                <p className="text-[10px] xxs:text-xs sm:text-sm lg:text-base text-slate-100 xxs:pt-1">Written By: {d?.writtenBy}</p>
                                <p className="text-[10px] xxs:text-xs sm:text-sm lg:text-base text-gray-300 xxs:pt-1">Published At: {convertDate(d?.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
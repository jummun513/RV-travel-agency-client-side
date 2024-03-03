import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../../../shared/Loading/Loading";
import NotFound from "../../../../shared/NotFound/NotFound";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const { blogId } = useParams();
    const { data: singleBlog = {}, isLoading, isError } = useQuery(['singleBlog'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/blogs/${blogId}`);
        return res.json();
    });

    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${month} ${date}, ${year}`);
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className="bg-[#fbfbfb] py-20 xxs:py-32 xs:py-36 md:py-40 xl:py-48 3xl:py-56">
            <Helmet>
                <title> {singleBlog?.heading} | Blog Details - Royal Venture Limited</title>
            </Helmet>
            <div className="rounded-md px-2 xxs:px-3 xs:px-5 md:px-7 lg:px-10 mx-auto max-w-screen-3xl">
                <div className="mx-auto xl:max-w-screen-xl 3xl:max-w-screen-3xl">
                    <div className="relative rounded-lg mx-auto xl:max-w-screen-lg 3xl:max-w-screen-2xl">
                        <img className="w-full rounded-lg" src={singleBlog?.thumbnail?.[0]?.url} alt='Hot Offer' />
                        <div className="absolute h-full w-full bg-black opacity-40 top-0 rounded-lg"></div>
                        <div className="absolute bottom-3 xxs:bottom-5 sm:bottom-10 pl-2 sm:flex flex-col items-center w-full">
                            <h3 className="text-gray-50 font-bold text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl mb-1 sm:mb-2">{singleBlog?.heading}</h3>
                            <p className="text-gray-100 font-semibold text-[10px] xxs:text-xs xs:text-sm lg:text-base">By {singleBlog?.writtenBy} | {convertDate(singleBlog?.createdAt)}</p>
                        </div>
                    </div>
                    <div className="mt-7 sm:mt-10 lg:mt-14 2xl:mt-16 3xl:mt-20">
                        <pre className='whitespace-pre-wrap text-xs xxs:text-sm sm:text-base 2xl:text-lg 4xl:text-xl text-justify text-gray-800'>{singleBlog?.desc}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
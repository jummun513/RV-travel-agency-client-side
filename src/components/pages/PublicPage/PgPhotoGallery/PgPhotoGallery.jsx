import { useQuery } from "react-query";
import Loading from "../../../shared/Loading/Loading";
import NotFound from "../../../shared/NotFound/NotFound";
import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";

const PgPhotoGallery = () => {
    const [images, setImages] = useState([]);
    const { data: photoAlbum = [], isLoading, isError } = useQuery(['photoAlbum'], async () => {
        const res = await fetch(`${import.meta.env.VITE_clientSideLink}/api/photo-albums`);
        return res.json();
    });

    // console.log(photoAlbum);
    useEffect(() => {
        const newArray = photoAlbum.map((item, i) => ({
            key: i,
            src: item.photo[0].url,
            thumbnailURL: item.photo[0].thumbnailUrl,
            width: item.photo[0].width,
            height: item.photo[0].height,
            caption: item.holderName,
        }));
        if (newArray.length > 0) {
            setImages(newArray);
        }
    }, [photoAlbum])




    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return <NotFound></NotFound>
    }

    return (
        <div className="bg-[#fbfbfb] pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]">
            <div className="mt-10 md:mt-16 2xl:mt-24 mb-2 xxs:mb-4 sm:mb-6 lg:mb-10 2xl:mb-14 flex justify-center">
                <h1 className="border-b-2 sm:border-b-4 border-primary py-1 sm:py-2 w-fit text-center text-gray-950 font-bold text-base xxs:text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl">Our Photo Album</h1>
            </div>
            {
                photoAlbum.length > 0 ?
                    <div className="pb-20 sm:pb-28 lg:pb-36 px-3 xxs:px-5 sm:px-8 4xl:px-12 mx-auto max-w-screen-4xl">
                        <PhotoAlbum padding={(containerWidth) => {
                            if (containerWidth < 400) return 0;
                            if (containerWidth < 800) return 1;
                            if (containerWidth < 1200) return 2;
                            return 3;
                        }}
                            columns={(containerWidth) => {
                                if (containerWidth < 400) return 1;
                                if (containerWidth < 800) return 2;
                                if (containerWidth < 1200) return 3;
                                return 4;
                            }} photos={images} layout="masonry"
                            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
                                <a
                                    id="styled-font"
                                    href={photo.href}
                                    style={wrapperStyle}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="text-gray-900 text-[10px] xxs:text-xs sm:text-sm lg:text-base mt-4 xs:mt-3 font-cursive font-semibold"
                                >
                                    {renderDefaultPhoto({ wrapped: true })}
                                    {photo.caption}
                                </a>
                            )} />
                    </div>
                    :
                    <div className="h-[70vh] text-gray-600 font-semibold text-center mt-[35vh]">
                        Nothing Found!
                    </div>
            }
        </div >
    );
};

export default PgPhotoGallery;
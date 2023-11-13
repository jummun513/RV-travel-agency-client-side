import url from '../../../assets/images/under-developing.svg';

const Developing = () => {
    return (
        <div className="h-[100vh] bg-[#fbfbfb] px-10 xs:px-0 pt-20 xxs:pt-32 xs:pt-40 xl:pt-56 pb-20 xxs:pb-32 xs:pb-40 xl:pb-56 flex flex-col items-center 4xl:justify-center">
            <div className='h-full max-h-[50vh]'>
                <img loading='lazy' className='h-full w-full' src={url} alt="developing image" />
            </div>
            <p className="xs:mt-6 sm:mt-10 md:text-xl leading-12 text-gray-600">This section is under maintenance, coming soon.......</p>
        </div>
    );
};

export default Developing;
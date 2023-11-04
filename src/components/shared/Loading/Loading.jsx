import url from '../../../assets/Logos/preloader.gif';

const Loading = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }} className="relative z-[21]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10 bg-[#FCFCFC] w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <img className='w-[75px] sm:w-[100px] lg:w-[125px] 2xl:w-[150px] 4xl:w-[182px]' src={url} loading='lazy' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Loading;
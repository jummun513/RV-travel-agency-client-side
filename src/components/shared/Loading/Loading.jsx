
const Loading = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }} className="relative z-[21]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-200 bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <button className="btn btn-sm cursor-wait md:btn-md bg-primary text-gray-950 border-none hover:border-none hover:bg-primary">
                        <span className="loading loading-spinner text-gray-950"></span>
                        <span className="text-xs xxs:text-sm md:text-base">loading...</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Loading;
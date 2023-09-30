const Modal = (data) => {
    const { from, okAction, content, text, heading } = data;
    return (
        <div id={from} className="relative z-[21]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center xs:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-3xl 3xl:max-w-4xl">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                {
                                    // <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    //     <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    //         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    //     </svg>
                                    // </div>
                                }
                                {
                                    content.includes('success') &&
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 xl:h-8 xl:w-8 text-green-600" fill="none" viewBox="0 0 50 50" strokeWidth="3" stroke="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z"></path>
                                        </svg>
                                    </div>
                                }
                                {
                                    // <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    //     <svg className="h-6 w-6 xl:h-8 xl:w-8 text-red-600" fill="none" viewBox="0 0 16 16" strokeWidth="1" stroke="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg>
                                    // </div>

                                }

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-sm md:text-base 2xl:text-lg font-semibold leading-6 text-gray-900" id="modal-title">{heading}</h3>
                                    <div className="mt-2">
                                        <p className="text-xs md:text-sm 2xl:text-base text-gray-500">{text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            // <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            //     <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xs md:text-sm 2xl:text-base font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                            //     <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-xs md:text-sm 2xl:text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            // </div>
                        }
                        {
                            // <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            //     <button onClick={okAction} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xs md:text-sm 2xl:text-base font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">OK</button>
                            // </div>
                        }
                        {
                            from.includes('register') &&
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={okAction} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-xs md:text-sm 2xl:text-base font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">OK</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
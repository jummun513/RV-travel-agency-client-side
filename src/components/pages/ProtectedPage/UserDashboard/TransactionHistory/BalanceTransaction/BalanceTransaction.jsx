import { useContext, useState } from "react";
import { AuthContextPG } from "../../../../../../providers/AuthProviderPG";
import Loading from "../../../../../shared/Loading/Loading";

const BalanceTransaction = () => {
    const { PGuser, pgLoading } = useContext(AuthContextPG);
    const [data, setCurrentData] = useState({});

    if (pgLoading) {
        return <Loading></Loading>
    }

    const convertDate = (d) => {
        if (d === undefined) {
            return 'null'
        }
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${month} ${date}, ${year}`);
    };

    function formatTimeWithSeconds(inputDate) {
        if (inputDate === undefined) {
            return 'null';
        }
        // Create a Date object from the input string
        const date = new Date(inputDate);

        // Format the time with seconds in 12-hour format
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        return formattedTime;
    }

    const openModal = (d) => {
        setCurrentData(d);
        document.getElementById('my_modal_10').showModal();
    };

    // currency add commas
    const addCommas = (number) => {
        if (typeof number !== 'number' || isNaN(number)) {
            return '0';
        }
        const numberString = number.toString();
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14 2xl:pb-24">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Balance Transaction History</h2>
            {
                (PGuser === null || PGuser?.transaction?.length < 1) ?
                    <div className="text-center text-gray-600 font-semibold mt-40">No Previous Balance Transaction</div>
                    :
                    <div>
                        <p className="text-center my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {PGuser?.transaction?.length}</p>
                        <div className="mt-10">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4">
                                                Transaction No
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4">
                                                Date & Time
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Balance
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            PGuser?.transaction?.map((d, i) => {
                                                return (
                                                    <tr key={i} className="bg-white border-t border-t-gray-600 text-gray-800 hover:bg-gray-50">
                                                        <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 whitespace-nowrap">
                                                            {d?.transactionType + (d?._id?.slice(-4))}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 whitespace-nowrap">
                                                            {convertDate(d?.paymentDate ? d?.paymentDate : d?.invoiceDate)}<br></br>
                                                            {formatTimeWithSeconds(d?.paymentDate ? d?.paymentDate : d?.invoiceDate)}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 whitespace-nowrap text-center">
                                                            {d?.paymentAmount ? addCommas(d?.paymentAmount) : addCommas(d?.invoiceAmount)}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center font-semibold whitespace-nowrap">
                                                            {addCommas(d?.payableAmount)}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end font-semibold whitespace-nowrap">
                                                            <button onClick={() => openModal(d)} className="btn btn-xs xs:btn-sm 2xl:btn-md text-slate-50 bg-green-600 border-none hover:bg-green-500">Details</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}

            {/* Modal content */}
            <dialog id="my_modal_10" className="modal">
                <div className="modal-box bg-[#fbfbfb] max-w-screen-lg">
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm md:btn-md btn-circle bg-primary border-none text-gray-950 hover:bg-secondary absolute right-4 top-4">✕</button>
                        </form>
                    </div>
                    <h3 className="font-bold text-xl 2xl:text-xl 3xl:text-2xl text-gray-900 text-center my-3 sm:mb-5 md:mb-8">{data.transactionType === 'payment' ? 'Payment Details' : 'Invoice Details'}</h3>
                    {
                        data?.transactionType === 'invoice' ?
                            <div>
                                <table className="w-full text-left text-gray-500">
                                    <tbody>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Transaction No
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {data?.transactionType + (data?._id?.slice(-4))}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Purchased Point
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {data?.invoicePoints}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Balance
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {addCommas(data?.payableAmount)}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Purchased Time
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {convertDate(data?.invoiceDate)}<br></br>
                                                {formatTimeWithSeconds(data?.invoiceDate)}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Bill Reason
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {data?.invoiceReason}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Amount
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {addCommas(data?.payableAmount)}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Expired On
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {convertDate(data?.expires)}<br></br>
                                                {formatTimeWithSeconds(data?.expires)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div>
                                <table className="w-full text-left text-gray-500">
                                    <tbody>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Transaction No
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {data?.transactionType + (data?._id?.slice(-4))}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Payment Mode
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {data?.paymentMethod?.label}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Reference No
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {data?.paymentRemark}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Purchased Time
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {convertDate(data?.paymentDate)}<br></br>
                                                {formatTimeWithSeconds(data?.paymentDate)}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Payment Amount
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {addCommas(data?.paymentAmount)}
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b xxs:w-[600px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                            <th scope="row" className='px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12'>
                                                Remaining Balance
                                            </th>
                                            <td className="px-6 py-4 text-gray-800 w-1/12">
                                                :
                                            </td>
                                            <td className='px-6 py-4 text-gray-800'>
                                                {addCommas(data?.payableAmount)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </dialog>
        </div>
    );
};

export default BalanceTransaction;
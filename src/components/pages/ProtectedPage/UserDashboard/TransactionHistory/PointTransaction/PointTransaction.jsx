import { useContext } from "react";
import { AuthContextPG } from "../../../../../../providers/AuthProviderPG";
import Loading from "../../../../../shared/Loading/Loading";

const PointTransaction = () => {
    const { PGuser, pgLoading } = useContext(AuthContextPG);

    if (pgLoading) {
        return <Loading></Loading>
    }

    const convertDate = (d) => {
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

    const addCommas = (number) => {
        if (typeof number !== 'number' || isNaN(number)) {
            return '0';
        }
        if (number) {
            const numberString = number.toString();
            return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    };

    return (
        <div className="px-5 sm:px-10 py-7 xxs:pt-10 xxs:pb-14 2xl:pb-24">
            <h2 className="text-center text-xl xs:text-3xl font-bold text-gray-800 xxs:mb-10">Point Transaction History</h2>
            {
                (PGuser === null || PGuser?.spendPoints?.length < 1) ?
                    <div className="text-center text-gray-600 font-semibold mt-40">No Previous Point Transaction</div>
                    :
                    <div>
                        <p className="text-center my-4 font-semibold text-gray-800 xxs:text-base xs:text-xl">Total : {PGuser?.spendPoints?.length}</p>
                        <div className="mt-10">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4">
                                                Trace No
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Details of spend
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Spend
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-center">
                                                Remaining
                                            </th>
                                            <th scope="col" className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end">
                                                Date & Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            PGuser?.spendPoints?.map((d, i) => {
                                                return (
                                                    <tr key={i} className="bg-white border-t border-t-gray-600 text-gray-800 hover:bg-gray-50">
                                                        <td className="px-3 md:px-6 lg:px-3 py-2 xl:py-4 whitespace-nowrap">
                                                            {d._id.slice(-4)}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 whitespace-nowrap text-center">
                                                            {d.pointSpendCause}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 whitespace-nowrap text-center">
                                                            {addCommas(d.points)}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-gray-900 font-semibold text-center whitespace-nowrap">
                                                            {addCommas(d.remainingPoint)}
                                                        </td>
                                                        <td className="px-3 sm:px-6 lg:px-3 xl:px-6 py-4 text-end whitespace-nowrap">
                                                            {convertDate(d?.currentTime)}<br></br>
                                                            {formatTimeWithSeconds(d?.currentTime)}
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
        </div>
    );
};

export default PointTransaction;
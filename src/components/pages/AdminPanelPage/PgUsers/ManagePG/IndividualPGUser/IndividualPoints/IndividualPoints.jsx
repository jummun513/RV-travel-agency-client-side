import axios from "axios";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const IndividualPoints = ({ singlePGUser, refetch }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({});
    const pointFormRef = useRef();
    const pointFormCloseRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { pgId } = useParams();
    const token = localStorage.getItem('access_token');
    const notify = () => toast.success("Successfully! Added.", { theme: "light" });
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
    const notifyWarning = () => toast.warn("Not enough points!", { theme: "light" });

    const handleInputChange = (field, e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    const numberValidation = (field, e) => {
        if (/^[0-9]+$/.test(e.target.value)) {
            setError('');
            handleInputChange(field, e);
        }
        else {
            setError('invalid_number')
        }
    }

    const pointFormSubmit = async (event) => {
        event.preventDefault();

        if (error === '') {
            setLoading(true);

            try {
                const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/spend-points/${pgId}`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });

                if (response?.data?.modifiedCount === 1) {
                    setLoading(false);
                    refetch();
                    setError('');
                    pointFormCloseRef.current.click();
                    notify();
                }
                else if (response?.data === 'not_enough_points') {
                    setLoading(false);
                    setError('');
                    pointFormCloseRef.current.click();
                    notifyWarning();
                }
                else {
                    setLoading(false);
                    notifyError();
                }
            } catch (error) {
                setLoading(false);
                notifyError();
            }
        }
    }

    return (
        <div>
            <div>
                <div className="flex justify-end mb-10">
                    <button onClick={() => { document.getElementById('my_modal_3').showModal(), setFormData({}), pointFormRef.current.reset() }} type="button" className="btn btn-sm 2xl:btn-md bg-blue-600 text-gray-50 border border-blue-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"><FaPlus /> Points Spend</button>
                </div>
                <div>
                    <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                        Trace No
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                        Details of spend
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                        Spend
                                    </th>
                                    <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                        Remaining
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    singlePGUser?.spendPoints.map((d, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                    {d._id.slice(-4)}
                                                </td>
                                                <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                    {d.pointSpendCause}
                                                </td>
                                                <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                    {d.points}
                                                </td>
                                                <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                    {d.remainingPoint}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-w-5xl bg-gray-50">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button ref={pointFormCloseRef} className="btn btn-sm 2xl:btn-md btn-circle btn-ghost text-red-600 absolute right-3 top-3 2xl:right-4 2xl:top-4 bg-red-100 hover:bg-red-200"><RxCross1 className="lg:h-5 lg:w-5 2xl:h-6 2xl:w-6" /></button>
                    </form>
                    <h3 className="font-bold text-2xl text-gray-800">Make Payment</h3>
                    <form ref={pointFormRef} className="mt-5" onSubmit={pointFormSubmit}>
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr className="bg-white border-b whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Spend points <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onKeyUp={(e) => numberValidation('points', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" autoComplete='on' placeholder="Points" className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                        {
                                            ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number allowed.</p>)
                                        }
                                    </td>
                                </tr>
                                <tr className="bg-white whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Points Spend Cause <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onBlur={(e) => handleInputChange('pointSpendCause', e)} type="text" autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className=" text-red-600 text-xs md:text-sm mt-8 lg:mt-10">(*) These fields are required.</p>
                        <div className="modal-action">
                            {
                                loading ?
                                    <button className="btn bg-blue-600 hover:bg-blue-500 text-gray-50 border-none">
                                        <span className="loading loading-dots loading-sm 2xl:loading-md"></span>
                                    </button>
                                    :
                                    <button className="btn bg-blue-600 hover:bg-blue-500 text-gray-50 border-none">
                                        Save
                                    </button>
                            }
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default IndividualPoints;
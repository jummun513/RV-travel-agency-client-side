import axios from "axios";
import { useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import Select from 'react-select';
import { toast } from "react-toastify";

const IndividualTransactions = ({ singlePGUser, refetch }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({});
    const paymentFormRef = useRef();
    const invoiceFormRef = useRef();
    const paymentFormCloseRef = useRef(null);
    const invoiceFormCloseRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { pgId } = useParams();
    const token = localStorage.getItem('access_token');
    const notify = () => toast.success("Successfully! Added.", { theme: "light" });
    const notifyError = () => toast.error("There was a problem, try later!", { theme: "light" });
    const notifyWarning = () => toast.warn("Not enough invoice!", { theme: "light" });

    const convertDate = (d) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = new Date(d).getFullYear();
        const month = months[new Date(d).getMonth()];
        const date = new Date(d).getDate();
        return (`${date} ${month}, ${year}`);
    }

    function formatTimeWithSeconds(inputDate) {
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

    const handleInputChange = (field, e) => {
        let value;
        if (field === 'paymentDate' || field === 'paymentMethod' || field === 'expires') {
            value = e;
        }
        else {
            value = e.target.value;
        }

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
            if (field === 'invoiceAmount') {
                setError('invalid_amount')
            }
            else {
                setError('invalid_number')
            }
        }
    }

    const paymentSubmit = async (event) => {
        event.preventDefault();

        if (error === '') {
            setLoading(true);

            try {
                const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/payment-add/${pgId}`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });

                if (response?.data === 'not_enough_invoice') {
                    setLoading(false);
                    setError('');
                    paymentFormCloseRef.current.click();
                    notifyWarning();
                }
                else if (response?.data?.modifiedCount === 1) {
                    setLoading(false);
                    refetch();
                    setError('');
                    paymentFormCloseRef.current.click();
                    notify();
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

    const invoiceSubmit = async (event) => {
        event.preventDefault();

        if (error === '') {
            setLoading(true);

            try {
                const response = await axios.patch(`${import.meta.env.VITE_clientSideLink}/api/privilege-users/invoice-add/${pgId}`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });

                if (response?.data?.modifiedCount === 1) {
                    setLoading(false);
                    refetch();
                    setError('');
                    invoiceFormCloseRef.current.click();
                    notify();
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

    const optionsPayment = [
        { value: 'cast', label: 'Cash' },
        { value: 'check', label: 'Check' },
        { value: 'banking', label: 'Banking' },
        { value: 'others', label: 'Others' },
    ]

    return (
        <div>
            <div className="flex justify-end mb-10">
                <button onClick={() => { document.getElementById('my_modal_0').showModal(), setFormData({}), paymentFormRef.current.reset() }} type="button" className="btn btn-sm 2xl:btn-md bg-blue-600 text-gray-50 border border-blue-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 mr-4"><FaPlus /> Make Payment</button>
                <button onClick={() => { document.getElementById('my_modal_1').showModal(), setFormData({}), invoiceFormRef.current.reset() }} type="button" className="btn btn-sm 2xl:btn-md bg-blue-600 text-gray-50 border border-blue-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"><FaPlus /> Create Invoice</button>
            </div>
            <div>
                <div className="relative overflow-x-auto sm:overflow-x-hidden shadow-md sm:rounded-lg lg:min-w-[720px]">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs md:text-base text-gray-800 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Transaction No
                                </th>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Date
                                </th>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 md:px-6 lg:px-3 py-4">
                                    Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                singlePGUser?.transaction.map((d, i) => {
                                    return (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {d.transactionType + (d._id.slice(-4))}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {convertDate(d.paymentDate ? d.paymentDate : d.createdAt)} {formatTimeWithSeconds(d.paymentDate ? d.paymentDate : d.createdAt)}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {d.paymentAmount || d.invoiceAmount}
                                            </td>
                                            <td className="px-3 sm:px-6 lg:px-3 py-2 xl:py-4 text-gray-800">
                                                {d.payableAmount}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <dialog id="my_modal_0" className="modal">
                <div className="modal-box max-w-5xl bg-gray-50">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button ref={paymentFormCloseRef} className="btn btn-sm 2xl:btn-md btn-circle btn-ghost text-red-600 absolute right-3 top-3 2xl:right-4 2xl:top-4 bg-red-100 hover:bg-red-200"><RxCross1 className="lg:h-5 lg:w-5 2xl:h-6 2xl:w-6" /></button>
                    </form>
                    <h3 className="font-bold text-2xl text-gray-800">Make Payment</h3>
                    <form ref={paymentFormRef} className="mt-5" onSubmit={paymentSubmit}>
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Payment Date <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <ReactDatePicker
                                            dateFormat="d MMMM, yyyy (h:mm aa)"
                                            placeholderText="Payment Date"
                                            closeOnScroll={true}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            isClearable
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            selected={formData?.paymentDate}
                                            required
                                            onChange={(e) => handleInputChange('paymentDate', e)}
                                            className='input input-info border-2 border-gray-300 text-gray-950 bg-white min-w-[250px]'
                                        />
                                    </td>
                                </tr>
                                <tr className="bg-white border-b whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Amount <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onKeyUp={(e) => numberValidation('paymentAmount', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" autoComplete='on' placeholder="Amount" className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                        {
                                            ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number allowed.</p>)
                                        }
                                    </td>
                                </tr>
                                <tr className="bg-white border-b whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Payment Method <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <Select onChange={(e) => { handleInputChange('paymentMethod', e) }} value={
                                            optionsPayment.filter(option =>
                                                option.label === formData?.paymentMethod?.label)
                                        } options={optionsPayment} required />
                                    </td>
                                </tr>
                                <tr className="bg-white whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Payment Remarks
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onBlur={(e) => handleInputChange('paymentRemark', e)} type="text" autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-5xl bg-gray-50">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button ref={invoiceFormCloseRef} className="btn btn-sm 2xl:btn-md btn-circle btn-ghost text-red-600 absolute right-3 top-3 2xl:right-4 2xl:top-4 bg-red-100 hover:bg-red-200"><RxCross1 className="lg:h-5 lg:w-5 2xl:h-6 2xl:w-6" /></button>
                    </form>
                    <h3 className="font-bold text-2xl text-gray-800">Invoice Create</h3>
                    <form ref={invoiceFormRef} className="mt-5" onSubmit={invoiceSubmit} method="dialog">
                        <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                                <tr className="bg-white border-b w-[640px] whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Expires Date <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <ReactDatePicker
                                            dateFormat="d MMMM, yyyy (h:mm aa)"
                                            placeholderText="Expires Date"
                                            closeOnScroll={true}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            isClearable
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            selected={formData?.expires}
                                            required
                                            onChange={(e) => handleInputChange('expires', e)}
                                            className='input input-info border-2 border-gray-300 text-gray-950 bg-white min-w-[250px]'
                                        />
                                    </td>
                                </tr>
                                <tr className="bg-white border-b whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Amount <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onKeyUp={(e) => numberValidation('invoiceAmount', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                        {
                                            ((error.includes('invalid_amount')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number allowed.</p>)
                                        }
                                    </td>
                                </tr>
                                <tr className="bg-white border-b whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Points <sup className='text-red-500'>*</sup>
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onKeyUp={(e) => numberValidation('invoicePoints', e)} type="number" min={0} pattern="[0-9]*" step="1" inputMode="numeric" autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" required />
                                        {
                                            ((error.includes('invalid_number')) && <p className='text-xs sm:text-sm mt-1 sm:mt-3 text-red-600'>Only number allowed.</p>)
                                        }
                                    </td>
                                </tr>
                                <tr className="bg-white whitespace-nowrap sm:whitespace-normal text-xs xxs:text-sm sm:text-md xl:text-base">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-5/12 sm:w-4/12 lg:w-3/12 xl:w-3/12 3xl:w-2/12">
                                        Invoice Reason
                                    </th>
                                    <td className="px-6 py-4 text-gray-800 w-1/12">
                                        :
                                    </td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <input onBlur={(e) => handleInputChange('invoiceReason', e)} type="text" autoComplete='on' className="bg-white min-w-[200px] w-full px-2 py-1 xs:px-4 xs:py-2 outline-none border border-gray-300 rounded focus:border-primary" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

export default IndividualTransactions;
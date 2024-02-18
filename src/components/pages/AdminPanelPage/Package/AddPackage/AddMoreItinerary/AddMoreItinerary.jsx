import { useEffect, useState } from "react";
import { CiSquarePlus } from 'react-icons/ci';

const AddMoreItinerary = ({ itineraryData, setItineraryData }) => {
    const [divs, setDivs] = useState([]);

    // add new div of new quest
    const addNewDiv = () => {
        const newLabel = `Itinerary (Day-${divs.length + 1})`;
        setDivs((prevDivs) => [...prevDivs, newLabel]);
        setItineraryData((prevFormData) => [...prevFormData, { title: '', details: '' }]);
    };

    // In first render add a single room automatically
    useEffect(() => { addNewDiv(); removeDiv(1); }, []);

    // handle each field by changing something
    const handleInputChange = (field, divIndex, event) => {
        const value = event.target.value;

        setItineraryData((prevFormData) => {
            const updatedData = [...prevFormData];
            updatedData[divIndex][field] = value;
            return updatedData;
        });
    };

    // remove single room by clicking remove button
    const removeDiv = (index) => {
        setDivs((prevDivs) => {
            const updatedDivs = [...prevDivs];
            updatedDivs.splice(index, 1);
            return updatedDivs;
        });
        setItineraryData((prevFormData) => {
            const updatedData = [...prevFormData];
            updatedData.splice(index, 1);
            return updatedData;
        });
    };

    // remove all room by clicking remove all button
    const removeAllDivs = () => {
        setDivs([]);
        setItineraryData([]);
    };

    return (
        <div className="mt-10">
            {/* this div will continuously clicking new room button */}
            {divs.map((label, index) => (
                <DynamicDiv key={index} index={index} label={label} removeDiv={removeDiv} handleInputChange={handleInputChange}
                    itineraryData={itineraryData} />
            ))}

            {/* remove-all and add new room button */}
            <div className="flex items-center">
                <a className="rounded bg-blue-600 px-2 py-1 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-[10px] md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-50 inline-flex items-center cursor-pointer"
                    onClick={addNewDiv}>Add More Room <CiSquarePlus className="ms-1 xxs:ms-2 h-3 w-3 xs:h-5 xs:w-5">
                    </CiSquarePlus></a>
                <a className="ms-2 xxs:ms-4 rounded bg-red-600 px-2 py-1 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-[10px] md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-50 inline-flex items-center cursor-pointer"
                    onClick={removeAllDivs}>Remove All</a>
            </div>
        </div>
    );
};

export default AddMoreItinerary;

// new guest contains item
const DynamicDiv = (data) => {
    const { index, label, removeDiv, handleInputChange, itineraryData } = data;

    const onRemoveDiv = () => {
        removeDiv(index);
    };

    return (
        <div id="add_more_pg" key={index} className='mb-6 md:mb-10 border p-2 bg-gray-50'>
            <div className='px-3'>
                {/* room number */}
                <h2 className="text-gray-800 font-semibold my-2 md:my-4">{label}</h2>

                {/* name field */}
                <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                    <label htmlFor="title">Title <sup className='text-red-500'>*</sup></label>
                    <input name={`title-${index}`}
                        value={itineraryData[index]?.name}
                        onChange={(e) => handleInputChange('title', index, e)} type="text" placeholder="Business Room (Class - Lounge Access)" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                </div>
                <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0 mt-6">
                    <label htmlFor="details">Details <sup className='text-red-500'>*</sup></label>
                    <textarea name={`details-${index}`}
                        value={itineraryData[index]?.name}
                        onChange={(e) => handleInputChange('details', index, e)} style={{ resize: 'none' }} className="w-full h-48 bg-gray-50 border border-gray-400 rounded-md text-gray-950 text-sm p-4" placeholder="Write Here..." required></textarea>
                </div>
                <p className="text-end mt-2"><a onClick={() => onRemoveDiv()} className='ms-2 xxs:ms-0 cursor-pointer text-blue-600 underline'>Remove</a></p>
            </div>
        </div>
    );
};
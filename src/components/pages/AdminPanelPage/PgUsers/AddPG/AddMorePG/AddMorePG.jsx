import { useState } from "react";
import { CiSquarePlus } from 'react-icons/ci';
import ReactDatePicker from "react-datepicker";
import Select from 'react-select';
import './AddMorePG.css';

const AddMorePG = (data) => {
    const { moreData, setMoreData } = data;
    const [divs, setDivs] = useState([]);

    // add new div of new quest
    const addNewDiv = () => {
        const newLabel = `Guest-${divs.length + 1}`;
        setDivs((prevDivs) => [...prevDivs, newLabel]);
        setMoreData((prevFormData) => [...prevFormData, { relation: '', name: '', dob: '', mobile: '', passport: '', nid: '' }]);
    };

    // handle each field by changing something
    const handleInputChange = (field, divIndex, event) => {
        let newValue;
        if (field === 'relation') {
            newValue = event;
        }
        else if (field === 'dob') {
            newValue = event;
        }
        else {
            newValue = event.target.value;
        }

        setMoreData((prevFormData) => {
            const updatedData = [...prevFormData];
            updatedData[divIndex][field] = newValue;
            return updatedData;
        });
    };

    // remove single guest by clicking remove button
    const removeDiv = (index) => {
        setDivs((prevDivs) => {
            const updatedDivs = [...prevDivs];
            updatedDivs.splice(index, 1);
            return updatedDivs;
        });

        setMoreData((prevFormData) => {
            const updatedData = [...prevFormData];
            updatedData.splice(index, 1);
            return updatedData;
        });
    };

    // remove all div by clicking remove all button
    const removeAllDivs = () => {
        setDivs([]);
        setMoreData([]);
    };

    return (
        <div>
            {/* this div will continuously clicking new guest button */}
            {divs.map((label, index) => (
                <DynamicDiv key={index} index={index} label={label} removeDiv={removeDiv} handleInputChange={handleInputChange}
                    moreData={moreData} />
            ))}

            {/* remove-all and add new guest button */}
            <div className="flex items-center">
                <a className="rounded bg-blue-600 px-2 py-1 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-[10px] md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-50 inline-flex items-center cursor-pointer"
                    onClick={addNewDiv}>Add More Guest <CiSquarePlus className="ms-1 xxs:ms-2 h-3 w-3 xs:h-5 xs:w-5">
                    </CiSquarePlus></a>
                <a className="ms-2 xxs:ms-4 rounded bg-red-600 px-2 py-1 xxs:px-4 xs:px-6 xxs:pb-2 xxs:pt-2.5 text-[10px] md:text-sm 2xl:text-base font-medium uppercase leading-normal text-gray-50 inline-flex items-center cursor-pointer"
                    onClick={removeAllDivs}>Remove All</a>
            </div>
        </div>
    );
};

export default AddMorePG;

// option for relation select dropdown
const options = [
    { value: 'husband', label: 'Husband' },
    { value: 'wife', label: 'Wife' },
    { value: 'son', label: 'Son' },
    { value: 'daughter', label: 'Daughter' },
    { value: 'other', label: 'Other' }
]

// new guest contains item
const DynamicDiv = (data) => {
    const { index, label, removeDiv, handleInputChange, moreData } = data;
    const onRemoveDiv = () => {
        removeDiv(index);
    };

    return (
        <div id="add_more_pg" key={index} className='flex items-end justify-between mb-6 md:mb-10 border p-2 bg-gray-50'>
            <div className='w-[250px] xxs:w-[320px] sm:w-[95%]'>
                {/* guest number */}
                <h2 className="text-gray-800 font-semibold my-2 md:my-4">{label}</h2>

                <div className='sm:flex items-center'>
                    {/* relation select dropdown with registered guest */}
                    <div className="mb-3 sm:mb-0 w-full sm:max-w-[200px] sm:mr-5 2xl:mr-10 group text-gray-600">
                        <label htmlFor="relation">Relation <sup className='text-red-500'>*</sup></label>
                        <Select value={moreData[index]?.relation} name={`relation-${index}`} onChange={(e) => handleInputChange('relation', index, e)} className='mt-1' options={options} required />
                    </div>
                    {/* name field */}
                    <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="name">Name <sup className='text-red-500'>*</sup></label>
                        <input name={`name-${index}`}
                            value={moreData[index]?.name}
                            onChange={(e) => handleInputChange('name', index, e)} type="text" placeholder="Mr. X" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                    </div>
                    {/* nid number */}
                    <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="nid">NID No.</label>
                        <input
                            name={`nid-${index}`}
                            value={moreData[index]?.nid}
                            onChange={(e) => handleInputChange('nid', index, e)} onWheel={(e) => e.target.blur()} type="number" pattern="[0-9]*" inputMode="numeric" placeholder='0123' className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                    </div>
                </div>

                <div className='sm:flex items-center sm:mt-7'>
                    {/* passport number */}
                    <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="passport">Passport No.</label>
                        <input name={`passport-${index}`}
                            value={moreData[index]?.passport}
                            onChange={(e) => handleInputChange('passport', index, e)} onWheel={(e) => e.target.blur()} type="number" pattern="[0-9]*" inputMode="numeric" placeholder='0123' className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                    </div>
                    {/* mobile number */}
                    <div className="mb-3 sm:mb-0 w-full sm:max-w-[300px] sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="mobile">Mobile No.</label>
                        <input type="number" pattern="[0-9]*" inputMode="numeric" placeholder='017xxxxxxxx'
                            name={`mobile-${index}`}
                            value={moreData[index]?.mobile}
                            onWheel={(e) => e.target.blur()}
                            onChange={(e) => handleInputChange('mobile', index, e)}
                            className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" />
                    </div>
                    {/* date of birth pick */}
                    <div className="relative z-10 w-full xs:max-w-[200px] xs:mr-5 2xl:mr-10 group text-gray-600">
                        <label htmlFor="dob" className='me-2'>Date of Birth:</label>
                        <br />
                        <ReactDatePicker
                            dateFormat="d MMMM, yyyy"
                            placeholderText="Birthday"
                            closeOnScroll={true}
                            name={`dob-${index}`}
                            maxDate={Date.now()}
                            isClearable
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={moreData[index]?.dob}
                            onChange={(e) => handleInputChange('dob', index, e)}
                            className='mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full'
                        />
                    </div>
                </div>
            </div>
            <a onClick={() => onRemoveDiv()} className='ms-2 xxs:ms-0 cursor-pointer text-blue-600 underline'>Remove</a>
        </div>
    );
};
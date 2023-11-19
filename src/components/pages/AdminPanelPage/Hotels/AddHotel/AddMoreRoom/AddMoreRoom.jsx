import { useEffect, useState } from "react";
import { CiSquarePlus } from 'react-icons/ci';
import RoomImage from "../RoomImage/RoomImage";

const AddMoreRoom = ({ moreData, setMoreData }) => {
    const [divs, setDivs] = useState([]);
    const [roomImage, setRoomImage] = useState([]);

    // add new div of new quest
    const addNewDiv = () => {
        const newLabel = `Room-${divs.length + 1}`;
        setDivs((prevDivs) => [...prevDivs, newLabel]);
        setMoreData((prevFormData) => [...prevFormData, { name: '', price: '', bed: '', sleep: '', size: '', wifi: true, breakfast: true, parking: true, pictures: [] }]);
    };

    // In first render add a single room automatically
    useEffect(() => { addNewDiv(); removeDiv(1); }, []);

    const handleRoomImage = (index) => {
        setMoreData(moreData?.map((item, idx) => {
            if (idx === index) {
                return { ...item, pictures: roomImage };
            }
            return item;
        })
        );
    }

    // handle each field by changing something
    const handleInputChange = (field, divIndex, event) => {
        let newValue;
        let finalField;
        if (field.startsWith('wifi') || field.startsWith('breakfast') || field.startsWith('parking')) {
            const string = field.split('-');
            finalField = string[0];
            string[1] == 'true' ? newValue = true : newValue = false;
        }
        else {
            finalField = field;
            newValue = event.target.value;
        }

        setMoreData((prevFormData) => {
            const updatedData = [...prevFormData];
            updatedData[divIndex][finalField] = newValue;
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
        setMoreData((prevFormData) => {
            const updatedData = [...prevFormData];
            updatedData.splice(index, 1);
            return updatedData;
        });
    };

    // remove all room by clicking remove all button
    const removeAllDivs = () => {
        setDivs([]);
        setMoreData([]);
    };

    return (
        <div>
            {/* this div will continuously clicking new room button */}
            {divs.map((label, index) => (
                <DynamicDiv key={index} index={index} label={label} removeDiv={removeDiv} handleInputChange={handleInputChange}
                    moreData={moreData} roomImage={roomImage} setRoomImage={setRoomImage} handleRoomImage={handleRoomImage} />
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

export default AddMoreRoom;

// new guest contains item
const DynamicDiv = (data) => {
    const { index, label, removeDiv, handleInputChange, moreData, roomImage, setRoomImage, handleRoomImage } = data;
    const onRemoveDiv = () => {
        removeDiv(index);
    };

    // useEffect(() => {
    //     handleRoomImage(index);
    // }, [roomImage])

    return (
        <div id="add_more_pg" key={index} className='mb-6 md:mb-10 border p-2 bg-gray-50'>
            <div className='px-3'>
                {/* room number */}
                <h2 className="text-gray-800 font-semibold my-2 md:my-4">{label}</h2>

                <div className='grid grid-cols-2 gap-x-5'>
                    {/* name field */}
                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="name">Room Type or Name <sup className='text-red-500'>*</sup></label>
                        <input name={`name-${index}`}
                            value={moreData[index]?.name}
                            onChange={(e) => handleInputChange('name', index, e)} type="text" placeholder="Business Room (Class - Lounge Access)" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                    </div>
                    {/* price */}
                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="price">Price (&#2547;) <sup className='text-red-500'>*</sup> <small>(Per night)</small></label>
                        <input
                            name={`price-${index}`}
                            value={moreData[index]?.price}
                            onChange={(e) => handleInputChange('price', index, e)} type="number" pattern="[0-9]*" inputMode="numeric" placeholder='2000' className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-x-5 mt-7'>
                    {/* bed field */}
                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="bed">Bed Type <sup className='text-red-500'>*</sup></label>
                        <input name={`bed-${index}`}
                            value={moreData[index]?.bed}
                            onChange={(e) => handleInputChange('bed', index, e)} type="text" placeholder="1 King Bed" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                    </div>
                    {/* sleep number */}
                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="sleep">How many people sleep? <sup className='text-red-500'>*</sup></label>
                        <input
                            name={`sleep-${index}`}
                            value={moreData[index]?.sleep}
                            onChange={(e) => handleInputChange('sleep', index, e)} type="number" pattern="[0-9]*" inputMode="numeric" placeholder='2' className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                    </div>
                    {/* size field */}
                    <div className="mb-3 sm:mb-0 w-full sm:mr-5 2xl:mr-10 text-gray-600 group z-0">
                        <label htmlFor="size">Room Size<sup className='text-red-500'>*</sup></label>
                        <input name={`size-${index}`}
                            value={moreData[index]?.size}
                            onChange={(e) => handleInputChange('size', index, e)} type="text" placeholder="80 sq. feet" className="mt-1 input input-bordered input-info input-xs xxs:input-sm xl:input-md text-gray-950 bg-white w-full" required />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-x-5 mt-7 mb-10'>
                    {/* free wifi */}
                    <div>
                        <p className="text-gray-700 mb-2">Free Wifi?</p>
                        <div className="flex">
                            <div className="flex items-center me-4">
                                <input onChange={(e) => handleInputChange('wifi-true', index, e)} type="radio" name={`radio-1-${index}`} className="radio radio-xs border-1 border-primary checked:bg-primary checked:shadow-none" defaultChecked />
                                <label className="ms-2 text-sm font-medium text-gray-700">Yes</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input onChange={(e) => handleInputChange('wifi-false', index, e)} type="radio" name={`radio-1-${index}`} className="radio radio-xs border-1 border-primary checked:bg-primary checked:shadow-none" />
                                <label className="ms-2 text-sm font-medium text-gray-700">No</label>
                            </div>
                        </div>
                    </div>

                    {/* breakfast */}
                    <div>
                        <p className="text-gray-700 mb-2">Free full Breakfast?</p>
                        <div className="flex">
                            <div className="flex items-center me-4">
                                <input onChange={(e) => handleInputChange('breakfast-true', index, e)} type="radio" name={`radio-2-${index}`} className="radio radio-xs border-1 border-primary checked:bg-primary checked:shadow-none" defaultChecked />
                                <label className="ms-2 text-sm font-medium text-gray-700">Yes</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input onChange={(e) => handleInputChange('breakfast-false', index, e)} type="radio" name={`radio-2-${index}`} className="radio radio-xs border-1 border-primary checked:bg-primary checked:shadow-none" />
                                <label className="ms-2 text-sm font-medium text-gray-700">No</label>
                            </div>
                        </div>
                    </div>

                    {/* free parking */}
                    <div>
                        <p className="text-gray-700 mb-2">Free parking?</p>
                        <div className="flex">
                            <div className="flex items-center me-4">
                                <input onChange={(e) => handleInputChange('parking-true', index, e)} type="radio" name={`radio-3-${index}`} className="radio radio-xs border-1 border-primary checked:bg-primary checked:shadow-none" defaultChecked />
                                <label className="ms-2 text-sm font-medium text-gray-700">Yes</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input onChange={(e) => handleInputChange('parking-false', index, e)} type="radio" name={`radio-3-${index}`} className="radio radio-xs border-1 border-primary checked:bg-primary checked:shadow-none" />
                                <label className="ms-2 text-sm font-medium text-gray-700">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => handleRoomImage(index)}>
                    <RoomImage roomImage={roomImage} setRoomImage={setRoomImage}></RoomImage>
                </div>
                <p className="text-end mt-2"><a onClick={() => onRemoveDiv()} className='ms-2 xxs:ms-0 cursor-pointer text-blue-600 underline'>Remove</a></p>
            </div>
        </div>
    );
};
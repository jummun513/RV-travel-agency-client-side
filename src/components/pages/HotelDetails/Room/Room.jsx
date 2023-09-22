import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Room.css';
import { MdOutlinePhotoSizeSelectSmall, MdOutlineBed } from 'react-icons/md';
import { BsFillPersonFill, BsWifi2, BsFillMoonFill } from 'react-icons/bs';
import { GiCoffeeCup } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';


const Room = (data) => {
    const { img, heading, rating, bed, sleep, size, wifi, food, parking, offer, price } = data.data;
    return (
        <div className="w-96 bg-base-100 border relative z-10 rounded-md">
            <div>
                <Swiper cssMode={true} navigation={true} modules={[Navigation]} className="mySwiper rounded-t-md">
                    {
                        img.map((x, i) => <SwiperSlide key={i}><img src={x} className='rounded-t-md' alt='' /></SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className='px-3 py-5 text-gray-700'>
                <h5 className='text-gray-800 text-xl font-medium'>{heading}</h5>
                <p className='text-sm text-gray-600 mt-1 mb-3'>{rating}</p>
                <p className='flex items-center mt-2'><MdOutlineBed className='h-5 w-5 me-3'></MdOutlineBed><span>{bed}</span></p>
                <p className='flex items-center mt-2'><BsFillPersonFill className='h-5 w-5 me-3'></BsFillPersonFill><span>{sleep}</span></p>
                <p className='flex items-center mt-2'><MdOutlinePhotoSizeSelectSmall className='h-5 w-5 me-3'></MdOutlinePhotoSizeSelectSmall><span>{size}</span></p>
                <p className='flex items-center mt-2'><BsWifi2 className='h-5 w-5 me-3'></BsWifi2><span>{wifi}</span></p>
                <p className='flex items-center mt-2'><GiCoffeeCup className='h-5 w-5 me-3'></GiCoffeeCup><span>{food}</span></p>
                <p className='flex items-center mt-2'><AiFillCar className='h-5 w-5 me-3'></AiFillCar><span>{parking}</span></p>
                <p className='flex items-center mt-2'><BsFillMoonFill className='h-5 w-5 me-3 bg-purple-600 text-[#fff] p-1 rounded'></BsFillMoonFill><span>{offer}</span></p>
                <div className='flex justify-between items-end mt-4'>
                    <div>
                        <p className='text-lg font-semibold'>USD {price}</p>
                        <p>USD {price + 20} total</p>
                        <p className='text-sm'>Includes taxes & fees</p>
                    </div>
                    <button className='btn btn-sm border-none bg-primary hover:bg-primary text-gray-950'>Select</button>
                </div>
            </div>
        </div>
    );
};

export default Room;
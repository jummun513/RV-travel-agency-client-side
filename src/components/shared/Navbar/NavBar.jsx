import logo from '../../../assets/Logo/full-logo-for-light.png';
import { PiStudent } from 'react-icons/pi';
import { BsNewspaper, BsPatchQuestion } from 'react-icons/bs';
import { RiPassportLine, RiVipCrownLine } from 'react-icons/ri';
import { AiOutlineLogin, AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineHome } from 'react-icons/ai';
import { BiHotel } from 'react-icons/bi';
import { FcBusinessman } from 'react-icons/fc';
import { MdOutlineSpeakerNotes, MdRateReview, MdContactPage } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { FaUserTie } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';


const NavBar = () => {
    const [navToggle, setNavToggle] = useState(false);
    const user = false;
    return (
        <div>
            <div className={`relative flex items-center justify-between lg:h-[74px] 2xl:h-[90px] 3xl:h-[106px] pe-[10px] sm:pe-[20px] mx-auto xxs:max-w-screen-xxs xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl`}>
                <div>
                    <img className='h-12 lg:h-16 2xl:h-20 3xl:h-24 max-h-full w-auto' src={logo} alt="Company Logo" />
                </div>
                <div className='hidden xl:flex items-center'>
                    <NavList></NavList>
                    <div className='ms-1 xxs:ms-2 sm:ms-3 md:ms-5'>
                        {
                            user ? <UserProfile></UserProfile> : <button className="btn btn-xs sm:btn-sm lg:btn-md bg-primary text-gray-950 font-semibold lg:font-bold hover:bg-secondary border-none">Sign In</button>
                        }
                    </div>
                </div>
                <div className='flex items-center xl:hidden'>
                    {
                        user ? <UserProfile></UserProfile> : <button className="btn btn-xs sm:btn-sm lg:btn-md bg-primary text-gray-950 font-semibold lg:font-bold hover:bg-secondary border-none mr-3">Sign In</button>
                    }
                    {
                        navToggle ? <span onClick={() => { setNavToggle(!navToggle) }} className='cursor-pointer me-3 ring-2 ring-gray-400 hover:ring-primary btn bg-transparent text-gray-700 border-none hover:bg-transparent'><AiOutlineMenuUnfold className='h-8 w-8' /></span> : <span onClick={() => { setNavToggle(!navToggle) }} className='cursor-pointer me-3 ring-2 ring-gray-400 hover:ring-primary btn bg-transparent text-gray-700 border-none hover:bg-transparent'><AiOutlineMenuFold className='h-8 w-8' /></span>
                    }
                </div>
                <div className={`xl:hidden absolute top-[74px] right-0 ${navToggle ? 'opacity-100 visible translate-x-0 duration-500 ease-in' : 'hidden opacity-0 invisible translate-x-48 duration-500 ease-in'}`}><SmallNavList></SmallNavList></div>
            </div>
        </div>
    );
};

export default NavBar;

const navItems = [
    {
        label: 'Home',
        icon: <AiOutlineHome className='h-6 w-6 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'Privileged Guest',
        icon: <RiVipCrownLine className='h-6 w-6 2xl:h-8 2xl:w-8' />,
        children: [
            { label: 'Login', icon: <AiOutlineLogin className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'Hotel list', icon: <BiHotel className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'PG Photo Gallery', icon: <GrGallery className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'PG Reviews', icon: <MdRateReview className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
        ],
    },
    {
        label: 'Student Service',
        icon: <PiStudent className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-7 2xl:w-7' />
    },
    {
        label: 'Immigration Service',
        icon: <RiPassportLine className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-7 2xl:w-7' />
    },
    {
        label: 'Blog & News',
        icon: <BsNewspaper className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-7 2xl:w-7' />
    },
    {
        label: 'About Us',
        icon: <TbListDetails className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-7 2xl:w-7' />,
        children: [
            { label: 'Chairman Message', icon: <FcBusinessman className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'CEO Message', icon: <MdOutlineSpeakerNotes className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'Who We Are?', icon: <BsPatchQuestion className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'Company Profile', icon: <FaUserTie className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
        ],
    },
    {
        label: 'Contact Us',
        icon: <MdContactPage className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-7 2xl:w-7' />
    }
]


// large device menu
const NavList = () => {
    const [showDropdown, setShowDropdown] = useState({});

    const toggleDropdown = (index) => {
        setShowDropdown((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div>
            <ul className='flex items-center'>
                {navItems.map((item, index) => {
                    if (item.children) {
                        return (
                            <div className='relative' key={index}>
                                <div onClick={() => toggleDropdown(index)} className='flex items-center justify-between btn btn-link no-underline text-gray-950 hover:no-underline'>
                                    <div className='flex flex-col 3xl:flex-row items-center'>
                                        <span>{item.icon}</span>
                                        <span className='xl:mt-2 3xl:ms-2'>{item.label}</span>
                                    </div>
                                    {showDropdown[index] ? '▲' : '▼'}
                                </div>
                                {showDropdown[index] && (
                                    <ul className='absolute xl:top-[54px] 2xl:top-[60px] 3xl:top-[76px] -left-10 2xl:-left-0 w-[256px] bg-gray-50 shadow-sm rounded pt-2 pb-5 px-2'>
                                        {item.children.map((child, childIndex) => (
                                            <li className='mt-3 group/item' key={childIndex}><NavLink className='flex items-center justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary'>{child.label}</span></NavLink></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    }

                    return (
                        <li key={index}>
                            <NavLink className='btn btn-link no-underline text-gray-950 hover:no-underline'>
                                <span className='flex flex-col 3xl:flex-row items-center'>
                                    <span>{item.icon}</span>
                                    <span className='xl:mt-2 3xl:ms-2'>{item.label}</span>
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


// small device menu
const SmallNavList = () => {
    const [showDropdown, setShowDropdown] = useState({});

    const toggleDropdown = (index) => {
        setShowDropdown((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div>
            <ul className='bg-slate-50 pr-5 rounded-l-sm'>
                {navItems.map((item, index) => {
                    if (item.children) {
                        return (
                            <div key={index}>
                                <div onClick={() => toggleDropdown(index)} className='flex items-center justify-between btn btn-link no-underline text-gray-950 hover:no-underline'>
                                    <div className='flex items-center'>
                                        <span>{item.icon}</span>
                                        <span className='ms-2'>{item.label}</span>
                                    </div>
                                    {showDropdown[index] ? '▲' : '▼'}
                                </div>
                                {showDropdown[index] && (
                                    <ul className='ms-3'>
                                        {item.children.map((child, childIndex) => (
                                            <li className='group/item' key={childIndex}><NavLink className='flex items-center justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary'>{child.label}</span></NavLink></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    }

                    return (
                        <li key={index}>
                            <NavLink className='btn btn-link no-underline text-gray-950 hover:no-underline'>
                                <span className='flex items-center'>
                                    <span>{item.icon}</span>
                                    <span className='ms-2'>{item.label}</span>
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


const UserProfile = () => { }
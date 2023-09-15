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
import './NavBar.css';


const NavBar = () => {
    const [navToggle, setNavToggle] = useState(false);
    const user = false;
    return (
        <div className='fixed xl:static w-full bg-slate-50'>
            <div className={`flex items-center justify-between h-[45px] xxs:h-[64px] lg:h-[74px] 2xl:h-[90px] 3xl:h-[106px] pe-[10px] sm:pe-[20px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl`}>
                <div>
                    <img className='h-10 xxs:h-14 lg:h-16 2xl:h-20 3xl:h-24 max-h-full w-auto' src={logo} alt="Company Logo" />
                </div>
                <div className='hidden xl:flex items-center'>
                    <NavList></NavList>
                    <div className='ms-1 xxs:ms-2 xl:ms-2 2xl:ms-5'>
                        {
                            user ? <UserProfile></UserProfile> : <button className="btn lg:btn-md 2xl:btn-lg bg-primary text-gray-800 font-semibold hover:bg-secondary border-none">Sign In</button>
                        }
                    </div>
                </div>
                <div className='flex items-center xl:hidden'>
                    {
                        user ? <UserProfile></UserProfile> : <button className="btn btn-xs xxs:btn-sm lg:btn-md bg-primary text-gray-950 font-semibold hover:bg-secondary border-none mr-2 sm:mr-4">Sign In</button>
                    }
                    <div onClick={() => { setNavToggle(!navToggle) }} className='cursor-pointer ring-2 ring-gray-400 hover:ring-primary btn btn-xs xxs:btn-sm lg:btn-md bg-transparent text-gray-700 border-none hover:bg-transparent'>
                        {
                            navToggle ? <AiOutlineMenuUnfold className='h-4 w-4 xxs:h-6 xxs:w-6 lg:h-8 lg:w-8' /> : <AiOutlineMenuFold className='h-4 w-4 xxs:h-6 xxs:w-6 lg:h-8 lg:w-8' />
                        }
                    </div>
                </div>
                <div className={`xl:hidden absolute top-[40px] xxs:top-[60px] lg:top-[74px] duration-300 ease-linear ${navToggle ? 'opacity-100 visible right-0' : 'opacity-0 invisible -right-[250px] overflow-hidden'}`}><SmallNavList></SmallNavList></div>
            </div>
        </div>
    );
};
export default NavBar;


// all navbar items
const navItems = [
    {
        label: 'Home',
        href: '/',
        icon: <AiOutlineHome className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'Privileged Guest',
        icon: <RiVipCrownLine className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />,
        children: [
            { label: 'Login', href: '/privileged-guest/login', icon: <AiOutlineLogin className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'Hotel list', href: '/privileged-guest/hotel-list', icon: <BiHotel className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'PG Photo Gallery', href: '/privileged-guest/pg-photo-gallery', icon: <GrGallery className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'PG Reviews', href: '/privileged-guest/pg-reviews', icon: <MdRateReview className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
        ],
    },
    {
        label: 'Student Service',
        href: '/student-service',
        icon: <PiStudent className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'Immigration Service',
        href: '/immigration-service',
        icon: <RiPassportLine className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'Blog & News',
        href: '/blog&news',
        icon: <BsNewspaper className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'About Us',
        icon: <TbListDetails className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />,
        children: [
            { label: 'Chairman Message', href: '/about-us/chairman-message', icon: <FcBusinessman className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'CEO Message', href: '/about-us/ceo-message', icon: <MdOutlineSpeakerNotes className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'Who We Are?', href: '/about-us/who-we-are', icon: <BsPatchQuestion className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
            { label: 'Company Profile', href: '/about-us/company-profile', icon: <FaUserTie className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
        ],
    },
    {
        label: 'Contact Us',
        href: '/contact-us',
        icon: <MdContactPage className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
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
                                <div onClick={() => toggleDropdown(index)} className='group/nav flex items-center justify-between btn btn-link no-underline text-gray-950 hover:no-underline'>
                                    <div className='flex flex-col 3xl:flex-row items-center'>
                                        <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                        <span className='xl:mt-2 3xl:ms-2 group-hover/nav:text-primary'>{item.label}</span>
                                    </div>
                                    <span className='group-hover/nav:text-primary'>{showDropdown[index] ? '▲' : '▼'}</span>
                                </div>
                                {showDropdown[index] && (
                                    <ul className='absolute xl:top-[54px] 2xl:top-[60px] 3xl:top-[76px] -left-10 2xl:-left-5 w-[256px] bg-gray-50 shadow-sm rounded pt-2 pb-5 px-2'>
                                        {item.children.map((child, childIndex) => (
                                            <li id='sidebar' className='mt-3 group/item' key={childIndex}><NavLink to={child.href} className='flex items-center justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary'>{child.label}</span></NavLink></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    }

                    return (
                        <li id='sidebar' key={index}>
                            <NavLink to={item.href} className='group/nav btn btn-link no-underline text-gray-950 hover:no-underline'>
                                <span className='flex flex-col 3xl:flex-row items-center'>
                                    <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                    <span className='xl:mt-2 3xl:ms-2 group-hover/nav:text-primary'>{item.label}</span>
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
        <div className=''>
            <ul className='bg-slate-50 pr-10 rounded-l-sm'>
                {navItems.map((item, index) => {
                    if (item.children) {
                        return (
                            <div key={index}>
                                <div onClick={() => toggleDropdown(index)} className='group/nav flex items-center justify-between mt-3 btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline'>
                                    <div className='flex items-center'>
                                        <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                        <span className='ms-2 group-hover/nav:text-primary'>{item.label}</span>
                                    </div>
                                    <span className='group-hover/nav:text-primary'>{showDropdown[index] ? '▲' : '▼'}</span>
                                </div>
                                {showDropdown[index] && (
                                    <ul className='ms-4'>
                                        {item.children.map((child, childIndex) => (
                                            <li id='sidebar' className='group/item mt-2' key={childIndex}><NavLink to={child.href} className='flex items-center justify-start btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary text-gray-500'>{child.label}</span></NavLink></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    }

                    return (
                        <li id='sidebar' key={index}>
                            <NavLink to={item.href} className='group/nav btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline mt-3'>
                                <span className='flex items-center'>
                                    <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                    <span className='ms-2 group-hover/nav:text-primary'>{item.label}</span>
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


// if user login show user profile
const UserProfile = () => { }
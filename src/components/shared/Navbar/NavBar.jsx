import logo from '../../../assets/Logos/full-logo-for-light.png';
import { PiStudent } from 'react-icons/pi';
import { BsNewspaper, BsPatchQuestion } from 'react-icons/bs';
import { RiPassportLine, RiVipCrownLine } from 'react-icons/ri';
import { AiOutlineLogin, AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineHome } from 'react-icons/ai';
import { BiHotel } from 'react-icons/bi';
import { FcBusinessman } from 'react-icons/fc';
import { MdOutlineSpeakerNotes, MdRateReview, MdContactPage, MdAdminPanelSettings } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { FaUserTie } from 'react-icons/fa';
import { GrUserManager } from 'react-icons/gr';
import { TbListDetails, TbLayoutDashboard } from 'react-icons/tb';
import { ImSwitch } from 'react-icons/im';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './NavBar.css';
import userImg from '../../../assets/images/user.svg'
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextPG } from '../../../providers/AuthProviderPG';

const NavBar = () => {
    const [navToggle, setNavToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const { PGuser } = useContext(AuthContextPG);
    const { user, Guser } = useContext(AuthContext);
    const navbarRef = useRef();

    // off navbar to profile toggle, when click outside
    useEffect(() => {
        const handler = (e) => {
            if (!navbarRef.current?.contains(e.target)) {
                setNavToggle(false);
                setProfileToggle(false);
            }
        }
        document.addEventListener('mousedown', handler);
    })

    // location check for conditionally show sign in button
    const location = useLocation();

    return (
        <div className='fixed z-20 w-full bg-[#fbfbfb] shadow-md'>
            <div ref={navbarRef} className='relative flex items-center justify-between h-[45px] xxs:h-[64px] lg:h-[74px] xl:h-[100px] 3xl:h-[106px] pe-[10px] sm:pe-[20px] mx-auto xxs:max-w-screen-xs xs:max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl 3xl:max-w-screen-4xl'>
                <Link to='/home'>
                    <img loading='lazy' className='h-10 xxs:h-14 lg:h-16 xl:h-[4.5rem] 2xl:h-20 3xl:h-24 max-h-full w-auto' src={logo} alt="Company Logo" />
                </Link>

                {/* navbar for extra-large device */}
                <div className='hidden xl:flex items-top'>
                    <NavList></NavList>
                    <div className='xl:ms-2 2xl:ms-5'>
                        {
                            ((PGuser !== null && Guser === null) &&
                                <div onClick={() => { setProfileToggle(!profileToggle); setNavToggle(false) }} className="avatar cursor-pointer pt-1">
                                    <div className="xl:w-10 2xl:w-14 rounded-full ring-2 ring-primary">
                                        <img src={PGuser?.avatar?.length > 0 ? PGuser?.avatar?.[0]?.thumbnailUrl : userImg} alt='User Image' />
                                    </div>
                                </div>) ||
                            ((PGuser === null && Guser !== null) &&
                                <div onClick={() => { setProfileToggle(!profileToggle); setNavToggle(false) }} className="avatar cursor-pointer pt-1">
                                    <div className="xl:w-10 2xl:w-14 rounded-full ring-2 ring-primary">
                                        <img src={Guser?.avatar?.length > 0 ? Guser?.avatar?.[0]?.thumbnailUrl : userImg} alt='User Image' />
                                    </div>
                                </div>) ||
                            ((PGuser === null && Guser === null) && ((!location.pathname.includes('login') && !location.pathname.includes('registration')) && <Link to='/login'><button className="btn lg:btn-md 2xl:btn-lg bg-primary text-gray-800 font-semibold hover:bg-secondary border-none">Sign In</button></Link>))
                        }
                    </div>
                </div>

                {/* navbar for large device */}
                <div className='flex items-center xl:hidden'>
                    {
                        ((PGuser !== null && Guser === null) &&
                            <div onClick={() => { setProfileToggle(!profileToggle), setNavToggle(false) }} className="avatar cursor-pointer lg:pt-1 mr-2 sm:mr-4">
                                <div className="w-8 xxs:w-10 lg:w-14 rounded-full ring-2 ring-primary">
                                    <img src={PGuser?.avatar?.length > 0 ? PGuser?.avatar[0].thumbnailUrl : userImg} alt='User Image' />
                                </div>
                            </div>) ||
                        ((PGuser === null && Guser !== null) &&
                            <div onClick={() => { setProfileToggle(!profileToggle), setNavToggle(false) }} className="avatar cursor-pointer lg:pt-1 mr-2 sm:mr-4">
                                <div className="w-8 xxs:w-10 lg:w-14 rounded-full ring-2 ring-primary">
                                    <img src={Guser?.avatar?.length > 0 ? Guser?.avatar?.[0]?.thumbnailUrl : userImg} alt='User Image' />
                                </div>
                            </div>) ||
                        ((PGuser === null && Guser === null) && ((!location.pathname.includes('login') && !location.pathname.includes('registration')) && <Link to='/login'><button className="btn btn-xs xxs:btn-sm lg:btn-md bg-primary text-gray-950 font-semibold hover:bg-secondary border-none mr-2 sm:mr-4">Sign In</button></Link>))
                    }
                    <div onClick={() => { setNavToggle(!navToggle), setProfileToggle(false) }} className='cursor-pointer ring-2 ring-gray-400 hover:ring-primary btn btn-xs xxs:btn-sm lg:btn-md bg-transparent text-gray-700 border-none hover:bg-transparent'>
                        {
                            navToggle ? <AiOutlineMenuUnfold className='h-4 w-4 xxs:h-6 xxs:w-6 lg:h-8 lg:w-8' /> : <AiOutlineMenuFold className='h-4 w-4 xxs:h-6 xxs:w-6 lg:h-8 lg:w-8' />
                        }
                    </div>
                </div>

                {/* for small device show small-nav-list */}
                <div className={`xl:hidden absolute top-[40px] xxs:top-[60px] lg:top-[74px] duration-100 ease-linear ${navToggle ? 'opacity-100 visible right-0' : 'opacity-0 invisible -right-[50px] overflow-hidden'}`}><SmallNavList></SmallNavList></div>

                {/* if user login true show user panel */}

                {/* user panel control for general and privileged users */}
                {
                    (user !== null) ?
                        <div className={`absolute right-0 sm:right-10 xl:right-0 duration-100 ease-linear ${profileToggle ? 'opacity-100 visible top-[45px] xxs:top-[64px] lg:top-[74px] xl:top-[100px] 3xl:top-[106px]' : 'opacity-0 invisible top-[35px] xxs:top-[54px] lg:top-[64px] xl:top-[90px] 3xl:top-[96px] overflow-hidden'}`}><UserProfile setProfileToggle={setProfileToggle}></UserProfile></div>
                        :
                        <div className={`absolute right-0 sm:right-10 xl:right-0 duration-100 ease-linear ${profileToggle ? 'opacity-100 visible top-[45px] xxs:top-[64px] lg:top-[74px] xl:top-[100px] 3xl:top-[106px]' : 'opacity-0 invisible top-[35px] xxs:top-[54px] lg:top-[64px] xl:top-[90px] 3xl:top-[96px] overflow-hidden'}`}><UserProfile2 setProfileToggle={setProfileToggle}></UserProfile2></div>
                }
            </div>
            <ToastContainer autoClose={5000} />
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
            { label: 'Hotel list', href: '/hotels-list', icon: <BiHotel className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
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
            { label: "MD'S Message", href: '/about-us/director-message', icon: <GrUserManager className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6' /> },
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

// Nav menu for large device
const NavList = () => {
    const [showDropdown, setShowDropdown] = useState({});
    const { PGuser } = useContext(AuthContextPG);

    const navbarRef = useRef();

    const toggleDropdown = (index) => {
        setShowDropdown((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    useEffect(() => {
        const handler = (e) => {
            if (!navbarRef.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handler);
    })

    return (
        <div>
            {/* <ul ref={navbarRef} className='flex items-center mt-2 3xl:mt-2'> */}
            <ul ref={navbarRef} className='flex items-center mt-2'>
                {navItems.map((item, index) => {
                    if (item.children) {
                        return (
                            <div onMouseLeave={() => toggleDropdown(index)} className='relative' key={index}>
                                <div onMouseEnter={() => toggleDropdown(index)} className='group/nav flex items-center justify-between btn btn-link xl:btn-sm 2xl:btn-md no-underline text-gray-700 hover:no-underline'>
                                    <div className='flex flex-col 3xl:flex-row items-center'>
                                        {/* <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                        <span className='xl:mt-2 3xl:ms-2 text-sm 2xl:text-base group-hover/nav:text-primary'>{item.label}</span> */}
                                        <span className='text-sm 2xl:text-base group-hover/nav:text-primary'>{item.label}</span>
                                    </div>
                                    <span className='group-hover/nav:text-primary'>{showDropdown[index] ? '▲' : '▼'}</span>
                                </div>
                                {showDropdown[index] && (
                                    // <ul className='absolute xl:top-[75px] 2xl:top-[85px] 3xl:top-[80px] -left-10 2xl:-left-5 w-[256px] bg-[#fbfbfb] shadow-sm rounded-b-md pt-2 pb-5 px-2'>
                                    <div className='relative bg-transparent xl:-top-[70px] 2xl:-top-[80px]'>
                                        <ul className='absolute xl:top-[70px] 2xl:top-[80px] -left-10 2xl:-left-5 w-[220px] bg-[#fbfbfb] shadow-sm rounded-b-md pt-2 pb-5 px-2'>
                                            {
                                                (PGuser && (item.label.includes('Privileged Guest'))) ?
                                                    item.children.slice(1, 4).map((child, childIndex) => (
                                                        // <li id='sidebar' className='mt-3 group/item' key={childIndex}><NavLink to={child.href} className='flex items-center xl:items-end justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary text-gray-600'>{child.label}</span></NavLink></li>
                                                        <li id='sidebar' className='mt-3 group/item' key={childIndex}><NavLink to={child.href} className='flex items-center xl:items-end justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span className='group-hover/item:text-primary text-black'>{child.label}</span></NavLink></li>
                                                    ))
                                                    :
                                                    item.children.slice(0, 4).map((child, childIndex) => (
                                                        // <li id='sidebar' className='mt-3 group/item' key={childIndex}><NavLink to={child.href} className='flex items-center xl:items-end justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary text-gray-600'>{child.label}</span></NavLink></li>
                                                        <li id='sidebar' className='mt-3 group/item' key={childIndex}><NavLink to={child.href} className='flex items-center xl:items-end justify-start btn btn-link no-underline text-gray-950 hover:no-underline'><span className='group-hover/item:text-primary text-gray-800'>{child.label}</span></NavLink></li>
                                                    ))
                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <li id='sidebar' key={index}>
                            <NavLink to={item.href} className='group/nav btn btn-link xl:btn-sm 2xl:btn-md no-underline text-gray-700 hover:no-underline'>
                                <span className='flex flex-col 3xl:flex-row items-center'>
                                    {/* <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                    <span className='xl:mt-2 3xl:ms-2 xl:text-sm 2xl:text-base group-hover/nav:text-primary'>{item.label}</span> */}
                                    <span className='xl:text-sm 2xl:text-base group-hover/nav:text-primary'>{item.label}</span>
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// Nav menu for small device
const SmallNavList = () => {
    const [showDropdown, setShowDropdown] = useState({});
    const { PGuser } = useContext(AuthContextPG);

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
                                <div onClick={() => toggleDropdown(index)} className='group/nav flex items-center justify-between mt-3 btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-700 hover:no-underline'>
                                    <div className='flex items-center'>
                                        {/* <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                        <span className='ms-2 group-hover/nav:text-primary'>{item.label}</span> */}
                                        <span className='group-hover/nav:text-primary'>{item.label}</span>
                                    </div>
                                    <span className='group-hover/nav:text-primary'>{showDropdown[index] ? '▲' : '▼'}</span>
                                </div>
                                {showDropdown[index] && (
                                    <ul className='ms-4'>
                                        {
                                            PGuser ?
                                                item.children.slice(1, 4).map((child, childIndex) => (
                                                    // <li id='sidebar' className='group/item mt-2' key={childIndex}><NavLink to={child.href} className='flex items-center justify-start btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary text-gray-600'>{child.label}</span></NavLink></li>
                                                    <li id='sidebar' className='group/item mt-2' key={childIndex}><NavLink to={child.href} className='flex items-center justify-start btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline'><span className='group-hover/item:text-primary text-gray-600'>{child.label}</span></NavLink></li>
                                                ))
                                                :
                                                item.children.map((child, childIndex) => (
                                                    // <li id='sidebar' className='group/item mt-2' key={childIndex}><NavLink to={child.href} className='flex items-center justify-start btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline'><span>{child.icon}</span><span className='xl:mt-2 3xl:ms-2 group-hover/item:text-primary text-gray-600'>{child.label}</span></NavLink></li>
                                                    <li id='sidebar' className='group/item mt-2' key={childIndex}><NavLink to={child.href} className='flex items-center justify-start btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-950 hover:no-underline'><span className='group-hover/item:text-primary text-gray-600'>{child.label}</span></NavLink></li>
                                                ))
                                        }
                                    </ul>
                                )}
                            </div>
                        );
                    }

                    return (
                        <li id='sidebar' key={index}>
                            <NavLink to={item.href} className='group/nav btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline text-gray-700 hover:no-underline mt-3'>
                                <span className='flex items-center'>
                                    {/* <span className='group-hover/nav:text-primary'>{item.icon}</span>
                                    <span className='ms-2 group-hover/nav:text-primary'>{item.label}</span> */}
                                    <span className='group-hover/nav:text-primary'>{item.label}</span>
                                </span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}





// user nav item
const userItems = [
    {
        label: 'Admin Panel',
        href: '/admin-panel',
        icon: <MdAdminPanelSettings className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'My DashBoard',
        href: '/dashboard/profile',
        icon: <TbLayoutDashboard className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
    {
        label: 'Sign Out',
        href: '',
        icon: <ImSwitch className='h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8' />
    },
]

// After login as general user show this User panel
const UserProfile = (data) => {
    const { logOut, setLoading, user, Guser } = useContext(AuthContext);
    const { setProfileToggle } = data;
    const navigate = useNavigate();

    // toast from toastify
    const notify = () => toast.success("Sign out successfully.", { theme: "light" });
    const errorNotify = () => toast.error("There was a problem. Try again!", { theme: "light" });

    // sing out clicked handle    
    const handleSignOut = () => {
        if (user !== null) {
            logOut().then(() => {
                // after successfully logged out
                setLoading(false);
                setProfileToggle(false);
                navigate('/login');
                notify();
            })
                .catch((error) => {
                    setLoading(false);
                    errorNotify(error);
                });
        }

    }

    return (
        <div>
            <ul className='relative flex flex-col justify-center items-start bg-slate-50 pt-1 sm:pt-3 w-48 xl:rounded-l-sm'>
                <p className='break-words px-2 w-48 sm:w-44 text-gray-950 font-bold sm:text-sm'>{Guser?.email}</p>
                {
                    (Guser?.role === 'admin' || Guser?.role === 'developer') ?
                        userItems.slice(0, 3).map((item, index) => {
                            const isLastItem = index === userItems.slice(0, 3).length - 1;
                            return (
                                <li onClick={() => { isLastItem && handleSignOut() }} id={`${!isLastItem && 'sidebar'}`} className={`mt-4 sm:mt-5 md:mt-3 cursor-pointer ${isLastItem ? 'bg-red-600 w-full hover:bg-red-500 duration-150 ease-linear' : 'border-b'}`} key={index}>
                                    <NavLink to={item.href} className={`btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline hover:no-underline font-semibold ${isLastItem ? 'text-gray-50' : 'text-gray-800 group/nav'}`}>
                                        <span className='flex items-center'>
                                            <span className='group-hover/nav:text-primary text-sm'>{item.icon}</span>
                                            <span className='ms-3 group-hover/nav:text-primary text-sm'>{item.label}</span>
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })
                        :
                        userItems.slice(1, 3).map((item, index) => {
                            const isLastItem = index === userItems.slice(1, 3).length - 1;
                            return (
                                <li onClick={() => { isLastItem && handleSignOut() }} id={`${!isLastItem && 'sidebar'}`} className={`mt-4 sm:mt-5 md:mt-3 cursor-pointer ${isLastItem ? 'bg-zinc-200 w-full hover:bg-slate-300 duration-150 ease-linear' : 'border-b'}`} key={index}>
                                    <NavLink to={item.href} className={`btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline hover:no-underline font-semibold ${isLastItem ? 'text-gray-900' : 'text-slate-800 group/nav'}`}>
                                        <span className='flex items-center'>
                                            <span className='group-hover/nav:text-primary text-sm'>{item.icon}</span>
                                            <span className='ms-3 group-hover/nav:text-primary text-sm'>{item.label}</span>
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })
                }
            </ul>
        </div >
    );
}

// After login as privileged guest User panel
const UserProfile2 = (data) => {
    const { PGuser, dispatch, error } = useContext(AuthContextPG);
    const { setProfileToggle } = data;
    const navigate = useNavigate();

    const notify = () => toast.success("Sign out successfully.", { theme: "light" });

    // sing out clicked handle    
    const handleSignOut = () => {
        dispatch({ type: "LOG_OUT" });
        navigate('/privileged-guest/login');
        setProfileToggle(false);
        notify();
    }

    if (error) {
        return <p>There was a problem try later.</p>
    }

    return (
        <div>
            <ul className='flex flex-col justify-center items-start bg-slate-50 pt-1 sm:pt-3 w-48 xl:rounded-l-sm'>
                <p className='break-words px-2 w-48 sm:w-44 text-gray-950 font-bold sm:text-sm'>{PGuser?.register_email}</p>
                {
                    userItems.slice(1, 3).map((item, index) => {
                        const isLastItem = index === userItems.slice(1, 3).length - 1;
                        return (
                            <li onClick={() => { isLastItem && handleSignOut() }} id={`${!isLastItem && 'sidebar'}`} className={`mt-4 sm:mt-5 md:mt-3 cursor-pointer ${isLastItem ? 'bg-primary w-full hover:bg-secondary duration-150 ease-linear' : 'border-b'}`} key={index}>
                                <NavLink to={item.href} className={`btn btn-link btn-xs xxs:btn-sm sm:btn-md no-underline hover:no-underline font-semibold ${isLastItem ? 'text-gray-900' : 'text-slate-800 group/nav'}`}>
                                    <span className='flex items-center'>
                                        <span className='group-hover/nav:text-primary text-sm'>{item.icon}</span>
                                        <span className='ms-3 group-hover/nav:text-primary text-sm'>{item.label}</span>
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
            </ul>
        </div >
    );
}
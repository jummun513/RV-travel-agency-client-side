import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { RiVipCrownLine } from 'react-icons/ri';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../../assets/Logos/full-logo-for-dark.png';
import userImg from '../../../assets/images/user.jpg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import './AdminPanelPage.css';

const AdminPanelPage = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-[#fbfbfb] relative flex min-h-screen mx-auto max-w-screen-4xl">

            {/* for large device */}
            <div className="hidden lg:block w-96 bg-zinc-800 shadow-2xl relative">
                <div className='p-2 xl:p-3 w-full'>
                    <div className='w-full'>
                        <Link to='/'>
                            <img className='h-16 xl:h-[4.5rem] 2xl:h-20 3xl:h-24 w-auto' src={logo} alt="Company Logo" />
                        </Link>
                    </div>
                    <ul id='admin_panel_sidebar' className="menu mt-7 h-full">
                        <li>
                            <details>
                                <summary className='text-gray-50 hover:bg-primary hover:text-gray-950'>
                                    <RiVipCrownLine></RiVipCrownLine> Privileged Guest
                                </summary>
                                <ul className="p-2">
                                    <li className='text-gray-100 mb-1'><NavLink to='manage-privileged-guest' className='hover:bg-primary hover:text-gray-950'>Manage All Guest</NavLink></li>
                                    <li className='text-gray-100'><NavLink to='add-new-privileged-guest' className='hover:bg-primary hover:text-gray-950'>Register New Guest</NavLink></li>
                                </ul>
                            </details>
                        </li>
                        <li className='text-gray-50 mt-3'><Link to='' className='hover:bg-primary hover:text-gray-950'><MdOutlineLocalOffer></MdOutlineLocalOffer>Offer Manage</Link></li>
                        <li className='text-gray-50 mt-3'><Link to='' className='hover:bg-primary hover:text-gray-950'><MdOutlineLocalOffer></MdOutlineLocalOffer>Offer Manage</Link></li>
                        <li className='text-gray-50 absolute bottom-2 w-full pe-9'>
                            <a className='bg-[#ffffff3c]'>
                                <img className='w-8 xs:w-10 lg:w-12 border p-1 rounded-full me-1 sm:me-2 lg:me-3' src={userImg} alt='User Image' /> Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {
                drawerOpen && <div className='lg:hidden absolute h-full w-full bg-[#000] z-10 opacity-20'></div>
            }

            {/* for small device */}
            <div className={`lg:hidden absolute z-[21] h-full overflow-hidden w-[250px] xxs:w-80 bg-zinc-800 shadow-xl duration-200 ease-linear ${drawerOpen ? 'visible opacity-100 translate-x-0' : '-translate-x-20 invisible opacity-0'}`}>
                <div className='p-2 w-full'>
                    <div className='w-full'>
                        <Link to='/'>
                            <img className='h-10 xxs:h-14 lg:h-16 xl:h-[4.5rem] 2xl:h-20 3xl:h-24 max-h-full w-auto' src={logo} alt="Company Logo" />
                        </Link>
                    </div>
                    <ul id='admin_panel_sidebar' className="menu mt-4 xs:mt-8 h-full">
                        <li>
                            <details>
                                <summary className='text-gray-50 hover:bg-primary hover:text-gray-950'>
                                    <RiVipCrownLine></RiVipCrownLine> Privileged Guest
                                </summary>
                                <ul className="p-2">
                                    <li className='text-gray-100 mb-1'><Link to='manage-privileged-guest' className='hover:bg-primary hover:text-gray-950'>Manage All Guest</Link></li>
                                    <li className='text-gray-100'><Link to='add-new-privileged-guest' className='hover:bg-primary hover:text-gray-950'>Register New Guest</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li className='text-gray-50 mt-3'><Link to='' className='hover:bg-primary hover:text-gray-950'><MdOutlineLocalOffer></MdOutlineLocalOffer>Offer Manage</Link></li>
                        <li className='text-gray-50 mt-3'><Link to='' className='hover:bg-primary hover:text-gray-950'><MdOutlineLocalOffer></MdOutlineLocalOffer>Offer Manage</Link></li>
                        <li className='text-gray-50 absolute bottom-2 w-full pe-10'>
                            <a className='bg-[#ffffff3c]'>
                                <img className='w-8 xs:w-10 md:w-12 border p-1 rounded-full me-1 sm:me-2' src={userImg} alt='User Image' /> Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
                <button onClick={() => setDrawerOpen(!drawerOpen)} className='absolute right-1 top-1 border-none btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary'><AiOutlineClose className='text-gray-950 h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6'></AiOutlineClose></button>
            </div>


            {/* drawer content */}
            <div className='w-full'>

                {/* drawer content top heading for mini device */}
                <div className='xxs:hidden px-2 pt-3 pb-4 border-b flex flex-col items-center'>
                    <div className='flex justify-between items-center w-full mb-4'>
                        <button onClick={() => setDrawerOpen(!drawerOpen)} className={`border-none btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary ${drawerOpen && 'visible opacity-0 translate-x-0'}`}><AiOutlineMenu className='text-gray-950 h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6'></AiOutlineMenu></button>
                        <button className='btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary border-none text-gray-950'>Back to home</button>
                    </div>
                    <p className='text-gray-700 font-bold sm:text-xl'><span className='text-secondary font-bold sm:text-xl'>Welcome,</span> {user?.email}</p>
                </div>

                {/* drawer content top heading for medium device */}
                <div className='hidden xxs:flex lg:hidden px-3 sm:px-5 pt-3 sm:pt-5 pb-5 xs:pb-8 border-b items-center justify-between'>
                    <button onClick={() => setDrawerOpen(!drawerOpen)} className={`border-none btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary ${drawerOpen && 'visible opacity-0 translate-x-0'}`}><AiOutlineMenu className='text-gray-950 h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6'></AiOutlineMenu></button>
                    <p className='text-gray-700 font-bold sm:text-xl'><span className='text-secondary font-bold sm:text-xl'>Welcome,</span> {user?.email}</p>
                    <button className='btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary border-none text-gray-950'>Back to home</button>
                </div>

                {/* drawer content top heading for large device */}
                <div className='hidden lg:flex w-full justify-between items-center py-10 border-b-2 px-5'>
                    <p className='text-gray-700 font-bold text-xl xl:text-2xl'><span className='text-secondary font-bold text-xl xl:text-2xl'>Welcome,</span> {user?.email}</p>
                    <button className='btn btn-md bg-primary hover:bg-secondary border-none text-gray-950'>Back to home</button>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AdminPanelPage;
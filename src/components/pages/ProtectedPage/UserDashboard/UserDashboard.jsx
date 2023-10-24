import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ImProfile } from 'react-icons/im';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiSolidEdit } from 'react-icons/bi';
import './UserDashboard.css';
import Loading from "../../../shared/Loading/Loading";
import { useContext } from "react";
import { AuthContextPG } from "../../../../providers/AuthProviderPG";
import { AuthContext } from "../../../../providers/AuthProvider";

const UserDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dashboardRef = useRef();
    const { PGuser, pgLoading } = useContext(AuthContextPG);
    const { Guser, isLoading } = useContext(AuthContext);

    // off navbar to profile toggle, when click outside
    useEffect(() => {
        const handler = (e) => {
            if (!dashboardRef.current?.contains(e.target)) {
                setDrawerOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
    })

    if (pgLoading || isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className="bg-[#fbfbfb]">
            <div id="user_dashboard" className={`min-h-[100vh] xl:h-[100vh] bg-[#fbfbfb] mx-auto max-w-screen-4xl flex pt-[45px] xxs:pt-[64px] lg:pt-[74px] xl:pt-[100px] 3xl:pt-[106px]`}>
                {/* for large device */}
                <div id="drawer" className="hidden xl:block w-96 bg-black shadow-2xl relative">
                    <div className='p-2 xl:p-3 w-full'>
                        <ul id='user_dashboard_sidebar' className="menu mt-4 h-full">
                            <li className='text-gray-50 mt-3'><NavLink to='profile' className='hover:bg-primary hover:text-gray-950'><ImProfile></ImProfile>My Profile</NavLink></li>
                            <li className='text-gray-50 mt-3'><NavLink to='edit-profile' className='hover:bg-primary hover:text-gray-950'><BiSolidEdit></BiSolidEdit>Edit Profile</NavLink></li>
                        </ul>
                    </div>
                </div>

                {
                    drawerOpen && <div className='xl:hidden absolute h-full w-full bg-[#000] z-10 opacity-30'></div>
                }

                {/* for small device */}
                <div id="drawer" ref={dashboardRef} className={`xl:hidden absolute z-[19] h-full overflow-hidden w-[250px] xxs:w-80 bg-zinc-800 shadow-xl duration-200 ease-linear ${drawerOpen ? 'visible opacity-100 translate-x-0' : '-translate-x-20 invisible opacity-0'}`}>
                    <div className='p-2 w-full'>
                        <ul id='user_dashboard_sidebar' className="menu mt-10 xs:mt-16 h-full">
                            <li className='text-gray-50 mt-3'><NavLink to='profile' className='hover:bg-primary hover:text-gray-950'><ImProfile></ImProfile>My Profile</NavLink></li>
                            <li className='text-gray-50 mt-3'><NavLink to='edit-profile' className='hover:bg-primary hover:text-gray-950'><BiSolidEdit></BiSolidEdit>Edit Profile</NavLink></li>
                        </ul>
                    </div>
                    <button onClick={() => setDrawerOpen(!drawerOpen)} className='absolute right-1 top-4 border-none btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary'><AiOutlineClose className='text-gray-950 h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6'></AiOutlineClose></button>
                </div>

                {/* drawer content */}
                <div id="content" className={`${drawerOpen && 'h-[100vh] overflow-hidden'} w-full xl:overflow-y-auto`}>
                    {/* drawer content top heading for mini device */}
                    <div className='xxs:hidden px-2 pt-4 pb-4 border-b flex flex-col items-center'>
                        <div className='flex justify-between items-center w-full mb-4'>
                            <button onClick={() => setDrawerOpen(!drawerOpen)} className={`border-none btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary ${drawerOpen && 'visible opacity-0 translate-x-0'}`}><AiOutlineMenu className='text-gray-950 h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6'></AiOutlineMenu></button>
                        </div>
                        <p className='text-gray-700 font-bold sm:text-xl'><span className='text-secondary font-bold sm:text-xl'>Welcome Back,</span> {Guser?.name || PGuser?.name}</p>
                    </div>

                    {/* drawer content top heading for medium device */}
                    <div className='hidden xxs:flex xl:hidden px-3 sm:px-5 pt-4 sm:pt-5 pb-5 xs:pb-8 border-b items-center justify-between'>
                        <button onClick={() => setDrawerOpen(!drawerOpen)} className={`border-none btn btn-xs xs:btn-sm sm:btn-md bg-primary hover:bg-secondary ${drawerOpen && 'visible opacity-0 translate-x-0'}`}><AiOutlineMenu className='text-gray-950 h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6'></AiOutlineMenu></button>
                        <p className='text-gray-700 font-bold sm:text-xl'><span className='text-secondary font-bold sm:text-xl'>Welcome Back,</span> {Guser?.name || PGuser?.name}</p>
                    </div>

                    {/* drawer content top heading for large device */}
                    <div className='hidden xl:flex w-full justify-between items-center py-10 border-b-2 px-5'>
                        <p className='text-gray-700 font-bold text-xl xl:text-2xl'><span className='text-secondary font-bold text-xl xl:text-2xl'>Welcome Back,</span> {Guser?.name || PGuser?.name}</p>
                    </div>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
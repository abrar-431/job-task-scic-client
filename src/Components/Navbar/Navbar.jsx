import React from 'react';
import logo from '../../../public/logo.jpeg'
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navLinks = <>
        <li><NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 pb-1 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/'>Home</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-200">
            <div className='w-5/6 mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navLinks}
                            </ul>
                        </div>
                    </div>
                    <img src={logo} className='w-2/12' alt="MegaBuyz" />
                </div>
                <div className="navbar-center mr-2 hidden lg:flex">
                    {navLinks}
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className='md:flex hidden gap-2 items-center'>
                                <button onClick={handleLogOut} className='btn btn-info btn-outline'>Logout</button>
                                <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <img className='w-10 h-10 rounded-full' src={user.photoURL} alt={user.displayName} />
                                </div>
                            </div>
                            :
                            <NavLink className={({ isActive }) => isActive ? "text-sky-500 font-semibold border-b-4 pb-1 border-sky-500" : "hover:text-sky-500 font-semibold"} to='/login'>Login</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
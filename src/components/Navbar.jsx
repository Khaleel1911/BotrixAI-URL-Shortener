import React, { useState,useEffect } from 'react'
import { ImScissors } from "react-icons/im";
import BotrixLight from "../assets/BotrixAI_Light.avif";
import BotrixDark from "../assets/BotrixAI_Dark.avif";
import { IoHome } from 'react-icons/io5';
import { MdChecklist, MdInfoOutline } from 'react-icons/md';
import { GiWrench } from 'react-icons/gi';
import { FaBars, FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useHandleAuth } from "../hooks/useHandleAuth";
const Navbar = () => {

    const navItems = [
        { name: "Home", path: "home", type: "scroll", logo: <IoHome /> },
        { name: "Features", path: "features", type: "scroll", logo: <MdChecklist /> },
        { name: "Integration", path: "integration", type: "scroll", logo: <GiWrench /> },
        { name: "About us", path: "/about", type: "route", logo: <MdInfoOutline /> }
    ];


    const { handleAuth } = useHandleAuth();

    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true; // default TRUE means dark initially
    });

    useEffect(() => {
    if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
    }, [dark]);  

    

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleTheme = () => {
        setDark(prev => {
            const theme = !prev ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
            return !prev;
        });
    };



    return (

        <>
            <div className='w-full sticky top-0 z-50 flex justify-between lg:px-10 px-2 py-2 dark:text-dark-text dark:bg-bg-primary-dark  bg-bg-primary-light shadow-md shadow-black-50 dark:shadow-gray-800'>
                {/* logo section */}
                <div className=''>
                    <div>
                        <div className='flex justify-center items-center gap-1'>
                            <ImScissors className='h-6  lg:w-10 lg:h-10' />
                            <h1 className='text-normal lg:text-secondary font-bold'>URL Shortener</h1>
                        </div>
                        <div className='flex place-self-end relative '>
                            <span className='text-[10px]  font-semibold'>powered by</span>
                            <a href="https://botrixai.com/" target='_blank'>
                                <img src={dark ? BotrixDark : BotrixLight} alt="BotrixAi" className='w-8 lg:w-16 lg:relative top-[-4px]' /></a>
                        </div>
                    </div>
                </div>

                {/* Navbar Items  */}
                <div className='hidden lg:flex items-center'>
                    <ul className="flex gap-8">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                {item.type === "scroll" ? (
                                    <ScrollLink
                                        to={item.path}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                        offset={-90}
                                        activeClass="text-red-500 font-bold"
                                        className="flex justify-center items-center gap-1 hover:text-red-500 cursor-pointer"
                                    >
                                        {item.logo}{item.name}
                                    </ScrollLink>
                                ) : (
                                    <RouterLink
                                        to={item.path}
                                        className="flex justify-center items-center gap-1 hover:text-red-500 cursor-pointer"
                                    >
                                        {item.logo}{item.name}
                                    </RouterLink>
                                )}
                            </li>
                        ))}
                    </ul>


                </div>

                {/* Auth Buttons  */}
                <div className='flex items-center gap-6'>
                    <button className='cursor-pointer ' onClick={toggleTheme}>
                        {dark ? <FaSun /> : <FaMoon />}

                    </button>

                    <button onClick={() => { setMenuOpen(!menuOpen) }} className='cursor-pointer lg:hidden'>
                        {menuOpen ? <FaX /> : <FaBars />}
                    </button>

                    <div className='hidden lg:flex gap-4'>
                        <button className='border-1 border-border-light rounded-xl h-10 w-22 cursor-pointer bg-btn-primary dark:text-black hover:bg-btn-hover' onClick={handleAuth}>
                            Sign In
                        </button>
                        <button className='border-1 border-border-light rounded-xl h-10 w-22 cursor-pointer bg-btn-primary dark:text-black hover:bg-btn-hover' onClick={handleAuth}>
                            Sign Up
                        </button>
                    </div>
                </div>

            </div>
            {/* Mobile menu section */}

            {menuOpen &&

                <div className='dark:bg-bg-primary-dark bg-bg-primary-light dark:text-dark-text fixed  w-full top-13 z-45'>

                    <ul className='flex flex-col '>

                        {navItems.map((item, index) =>
                            <li key={index} className='hover:bg-gray-100 dark:hover:bg-gray-950 h-16 flex justify-center items-center cursor-pointer' >
                                {item.type === "scroll" ? (
                                    <ScrollLink
                                        to={item.path}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                        offset={-90}
                                        activeClass="text-red-500 font-bold"
                                        className="flex justify-center items-center gap-1 hover:text-red-500 cursor-pointer"
                                        onClick={() => setMenuOpen(prev => !prev)}
                                    >
                                        {item.logo}{item.name}
                                    </ScrollLink>
                                ) : (
                                    <RouterLink
                                        to={item.path}
                                        className="flex justify-center items-center gap-1 hover:text-red-500 cursor-pointer"
                                        onClick={() => setMenuOpen(prev => !prev)}
                                    >
                                        {item.logo}{item.name}
                                    </RouterLink>
                                )}
                            </li>
                        )}
                    </ul>

                    <div className='flex justify-center items-center gap-2 py-2'>
                        <button className='border-1 border-border-light rounded-lg h-8 w-1/3 cursor-pointer bg-btn-primary dark:text-black hover:bg-btn-hover' onClick={() => (handleAuth(), setMenuOpen(prev => !prev))}
>
                            Sign In
                        </button>
                        <button className='border-1 border-border-light rounded-lg h-8 w-1/3 cursor-pointer bg-btn-primary dark:text-black hover:bg-btn-hover' onClick={() => (handleAuth(), setMenuOpen(prev => !prev))}
>
                            Sign Up
                        </button>
                    </div>


                </div>
            }


        </>

    )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom';
import {PlusIcon} from "lucide-react";
import logo from '../assets/thinkboard-logo.svg';

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="ThinkBoard Logo" className="h-10" />
                </Link>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className='btn btn-primary'>
                        <PlusIcon className='size-5' />
                        <span className='hidden md:block'>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar;
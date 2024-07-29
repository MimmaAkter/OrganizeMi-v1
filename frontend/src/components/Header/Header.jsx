cimport React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { LogoutBtn } from '../index.js'
import {useSelector} from 'react-redux'

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false);
    const showNav = () => {
        setToggle(!toggle);
      };
  
    const navItems = [
      {
        name: 'Home',
        slug: "/",
        active: true
      }, 
      {
        name: "Login",
        slug: "/Login",
        active: !authStatus,
    },
    {
        name: "Create Account",
        slug: "/password",
        active: !authStatus,
    },
    {
        name: "User List",
        slug: "/ReadUser",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/upload",
        active: authStatus,
    },
    ]


    //console.log("header authstatus active", navItems.active)
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img 
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            //src='../public/logo_theme.svg'
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <button className="flex justify-end md:hidden ring-1 ring-black rounded" onClick={showNav}>
                      <i className="fas fa-bars text-white w-9 h-9 flex justify-center items-center hover:text-black"></i>
                    </button>
                    <div className={`${toggle ? " flex" : " hidden"}flex items-center lg:order-2`}>

                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className={`${toggle ? " flex" : " hidden"} flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`}>
                                { //dynamic menu
                                    navItems.map((item) => 
                                        item.active ? (
                                        <li key={item.name}>
                                            <Link className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                                to={() => navigate(item.slug)} onClick={showNav}>{item.name}
                                            </Link>
                                        </li>
                                        ) : null
                                    )
                                }   
                                {
                                    authStatus && (<LogoutBtn />)    
                                }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

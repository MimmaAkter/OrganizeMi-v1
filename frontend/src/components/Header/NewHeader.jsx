import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutBtn } from '../index.js'
import { useSelector } from 'react-redux'
import '../../assets/css/nav.css'

const NewHeader = () => {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const menuData = [
    { label: "Home",slug: "/",active: true },
    {
      label: "User List",
      slug: "",
      active: false,
      submenu: [
        { label: "Regular List", slug : "/", active: authStatus}, 
        { label: "List with avatar", slug : "/", active: authStatus}
      ],
    },
    {
      label: "Create Account",
      slug: "",
      active: true,
      submenu: [
        { label: "Sign up", slug: "/", active: !authStatus },
        { label: "Sign up with avatar", slug: "/", active: authStatus},
        { label: "Upload", slug: "/", active: authStatus},
        { label: "Upload Photo",
          submenu: [
            { label: "Upload Profile Photo", slug: "/", active: authStatus },
            { label: "Upload Cover Photo", slug: "/", active: authStatus },
          ],
        },
      ],
    },
    {
      label: "Contact Us",
      submenu: [
        { label: "Sub Menu 1",slug: "/", active: true }, 
        { label: "Sub Menu 2",slug:"/",active:true }],
    },
  ];

  const toggleSubMenu = (e) => {
    e.stopPropagation();

    let submenu = document.querySelector("ul");
    console.log(submenu)
    if (!submenu) return;
    if (submenu.style.display === "none" || !submenu.style.display) {
      submenu.style.display = "block";
    } else {
      submenu.style.display = "none";
    }
  };
  const renderSubMenu = (subMenu) => {
    return (
      <ul className="submenu">
        {subMenu.map((subItem, index) => (
          <li key={index} onClick={toggleSubMenu}>
            {subItem.label}
            {subItem.submenu && renderSubMenu(subItem.submenu)}
          </li>
        ))}
      </ul>
    );
  };

  let [open, setOpen] = useState(false);

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
    <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800'>
      <span className='text-3xl text-indigo-600 mr-1 pt-2'>
      <ion-icon name="logo-ionic"></ion-icon>
      </span>
      OrganizeMI
    </div>
    
    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
    <ion-icon name={open ? 'close':'menu'}></ion-icon>
    </div>

    <div className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
    <ul>
    {menuData.map((item, index) => item.active? (
          <li key={index} onClick={toggleSubMenu}>
            {item.label}
            {item.submenu && renderSubMenu(item.submenu)}
          </li>
        ):null
        )}
      {
        authStatus && (<LogoutBtn />)    
      }
    </ul>
    </div>
    </div>
  </div>
  );
}

export default NewHeader;

import React from 'react'
import {useDispatch} from 'react-redux'
import { Logout } from '../../services/user.service'
import { logout } from '../../store/authSlice'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Link } from 'react-router-dom'

function LogoutBtn() {

  const userNavigation = [
    { name: 'Your Profile', href: '/' },
    { name: 'Settings', href: '/' },
  ]

  const callsToAction = [
    { name: 'Sign out', href: '/Login' },
  ]


    const dispatch = useDispatch()
    const logoutHandler = () => {
        Logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    /* Profile dropdown */
    <Popover className="relative">
    <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-8 w-8 rounded-full"
        />
    </PopoverButton>

    <PopoverPanel
      transition
      className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="p-4">
          {userNavigation.map((item) => (
            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <Link to={item.href} className="font-semibold text-gray-900">
                  {item.name}
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="grid divide-x divide-gray-900/5 bg-gray-50">
          {callsToAction.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={logoutHandler}
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </PopoverPanel>
  </Popover>
  /*
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
    */
  )
}

export default LogoutBtn
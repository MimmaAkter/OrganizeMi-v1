import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Create } from "../../services/user.service.js";
//import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'

const UserContact = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      const [agreed, setAgreed] = useState(false)
      
        const navigate=useNavigate()
        const [formObj,setFormObj]=useState({fullName:"",avatar:"",coverImage:"",email:"",password:"",username:""})
        const InputOnChange=(property,value)=>{
            //property === "avatar" ? e.target.files[0] : e.target.value;
            setFormObj(prevObj=>({
                ...prevObj,[property]:value
            }))
        }
        const FromSubmit=(e)=>{
            e.preventDefault()
            Create(formObj)
            .then(result=>{
                navigate('/ReadUser')
            })
            .catch(err=>console.log(err))
            //alert(JSON.stringify(formObj))
        }
        return (
            <div className='px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Account</h2>
                <p className="mt-2 text-sm leading-8 text-gray-600">
                  Aute magna irure deserunt veniam aliqua magna enim voluptate.
                </p>
              </div>
              <form onSubmit={FromSubmit} className="mx-auto mt-10 max-w-xl sm:mt-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                      Full Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name='fullName' onChange={(e)=>{InputOnChange("fullName",e.target.value)}} value={formObj.fullName}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                      User Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name='username' onChange={(e)=>{InputOnChange("username",e.target.value)}} value={formObj.username}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name='email' onChange={(e)=>{InputOnChange("email",e.target.value)}} value={formObj.email}
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        name='password' onChange={(e)=>{InputOnChange("password",e.target.value)}} value={formObj.password}
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="file"
                        name='avatar' multiple onChange={(e)=>{InputOnChange("avatar",e.target.files[0])}}
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name='fullName' onChange={(e)=>{InputOnChange("fullName",e.target.value)}} value={formObj.fullName}
                        id="message"
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                  <Field as="div" className="flex gap-x-4 sm:col-span-2">
                    <div className="flex h-6 items-center">
                      <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className={classNames(
                          agreed ? 'bg-indigo-600' : 'bg-gray-200',
                          'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                        )}
                      >
                        <span className="sr-only">Agree to policies</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            agreed ? 'translate-x-3.5' : 'translate-x-0',
                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out',
                          )}
                        />
                      </Switch>
                    </div>
                    <Label className="text-sm leading-6 text-gray-600">
                      By selecting this, you agree to our{' '}
                      <a href="#" className="font-semibold text-indigo-600">
                        privacy&nbsp;policy
                      </a>
                      .
                    </Label>
                  </Field>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )
};

export default UserContact;
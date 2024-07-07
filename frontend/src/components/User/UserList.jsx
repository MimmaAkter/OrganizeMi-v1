import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
//import axios from "axios";
import { Read, Delete } from "../../services/user.service.js";
import { ArrowLeft, ArrowRight } from 'lucide-react'
//import UserDelete from './UserDelete.jsx';

//className="sr-only" (hides content from devices other than screen readers)

const UserList = () => {

    const [DataList,SetDataList]=useState([]);
    //const [userId, setUserId] = useState()

    useEffect( ()=>{
       loadUsers();
    },[])

    const loadUsers = async () => {
      const result = await Read();
      SetDataList(result);
     /*return await axios.get("http://localhost:5050/api/v1/user/ReadUser")
      .then(res => {console.log(res.data),
        SetDataList(res.data)
      })
      .catch(err=>console.log(err));
      */
    };
/*
    const DeleteUser = (userid) => {
      setUserId(userid)
  }
*/
    const handleDelete = async (id) => {
      console.log(id);

        await Delete(id)
        //await axios.delete(`http://localhost:8000/api/delete/${userId}`)
        window.location.reload()
/*
      axios.delete("http://localhost:5050/api/v1/user/Delete/"+id)
      .then(res => {console.log(res)
          //dispatch(deleteUser({id}))
          window.location.reload()
      }).catch(err => console.log(err))
*/
}



    return (
        <div>
          <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Employees</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new employees, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new employee
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Employee</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Title
                      </th>
                      <th scope="col" className="relative px-4 py-3.5 text-sm font-normal text-gray-700">
                        <span>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {DataList && DataList.map((person,i) => (
                      <tr key={person._id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.avatar}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{person.username}</div>
                              <div className="text-sm text-gray-700">{person.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{person.fullName}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <Link to={`/edit/${person._id}`} className="text-gray-700">Edit</Link>
                          <button onClick={() => handleDelete(person._id)} className="btn btn-danger ms-1">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>previous</span>
          </a>

          <div className="hidden items-center gap-x-3 md:flex">
            <a href="#" className="rounded-md bg-gray-100 px-2 py-1 text-sm">
              1
            </a>
            <a href="#" className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
              2
            </a>
            <a href="#" className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
              3
            </a>
            <a href="#" className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
              ...
            </a>
            <a href="#" className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
              12
            </a>
            <a href="#" className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
              13
            </a>
            <a href="#" className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
              14
            </a>
          </div>
          <a
            href="#"
            className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
    );
};

export default UserList;
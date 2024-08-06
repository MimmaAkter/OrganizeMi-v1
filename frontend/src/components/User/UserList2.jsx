import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import { Read } from "../../services/profile.service.js";

const UserList2 = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    if(users)
    loadUsers();
  }, [users]);

  const loadUsers = async () => {
    //const result = await axios.get("http://localhost:5050/api/v1/profile/Read");
    const result = await Read();
    if (result)
    setUser(result);
  };
/*
  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };
*/
  return (
    <div className="container">
      <div className="py-4">
        <h1>User List</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">SL #</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index.toString()}>
                <td scope="row">{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/profile/edit/${user._id}`} className="text-gray-700">View</Link>
                  <Link to={`/profile/edit/${user._id}`} className="text-gray-700 space-x-0.5">Edit</Link>
                  <Link to={`/profile/edit/${user._id}`} className="text-gray-700">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList2;

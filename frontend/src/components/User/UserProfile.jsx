import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import {Link, useNavigate} from 'react-router-dom';
import { Logout } from "../../services/user.service.js";
//import axios from 'axios'

function UserProfile() {
    const {user} = useContext(UserContext)

    const navigate = useNavigate()
    const handleLogout = () => {
        //e.preventDefault();
        //const localAccessToken = localStorage.getItem('accessToken');
        Logout().then(
            res=>{
                if(res){
                    alert('user logged out')
                    navigate(0)
                }
            }
        );

        /*
        axios.get('http://localhost:5050/api/v1/user/Logout')
        .then(res => {
            if(res.data === "Success")
            navigate(0)
        }).catch(err => console.log(err))
        */
    }

    if (!user) 
    return <div>
        <Link to="/Login" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
            Log in
        </Link>
    </div>

    return <div>
        <input type="button" onClick={handleLogout} value="Log out" className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"/>      
    </div>
}

export default UserProfile;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReadById, Update } from "../../services/user.service.js";
//import axios from 'axios';

const UserEdit = () => {

    const {id} = useParams()
    const navigate=useNavigate()
    const [formObj,setFormObj]=useState({fullName:"",avatar:"",coverImage:"",email:"",password:"",username:""})

    useEffect(()=>{
        loadById(id);
    },[id])

    const loadById = async (id) => {
      const response = await ReadById(id)
      //setFormObj(result)
      //const result = await axios.get("http://localhost:5050/api/v1/user/ReadById/"+id)
      setFormObj({...formObj, 
        username:response.data.data.username,
        email:response.data.data.email,
        fullName:response.data.data.fullName
    })
        console.log(result)
      
    };

    const InputOnChange=(property,value)=>{
        //property === "avatar" ? e.target.files[0] : e.target.value;
        setFormObj(prevObj=>({
            ...prevObj,[property]:value
        }))
    }
    const FromSubmit=(e)=>{
        e.preventDefault();
        Update(formObj,id);
        navigate('/ReadUser');
        /*
        Create(formObj)
        .then(result=>{
            navigate('/')
        })
        .catch(err=>console.log(err))
        console.log(formObj)
        //alert(JSON.stringify(formObj))
        */
    }


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={FromSubmit} encType='multipart/form-data'>
                    <h1>Add User</h1>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Name' className='form-control' name='fullName' onChange={(e)=>{InputOnChange("fullName",e.target.value)}} value={formObj.fullName}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='file' placeholder='Enter Name' className='form-control' name='avatar' multiple onChange={(e)=>{InputOnChange("avatar",e.target.files[0])}} ></input>
                    </div>   
                    <div className='mb-2'>
                        <input type='file' placeholder='Enter Name' className='form-control' name='coverImage' onChange={(e)=>{InputOnChange("coverImage",e.target.files[0])}} ></input>
                    </div>      
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter user name' className='form-control' name='username' onChange={(e)=>{InputOnChange("username",e.target.value)}} value={formObj.username}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Email' className='form-control' name='email' onChange={(e)=>{InputOnChange("email",e.target.value)}} value={formObj.email}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter password' className='form-control' name='password' onChange={(e)=>{InputOnChange("password",e.target.value)}} value={formObj.password}></input>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
import React,{useState} from 'react';
//import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Create } from "../../services/profile.service.js";

const UserCreate = () => {
    const navigate=useNavigate()
    const [formObj,setFormObj]=useState({name:"",email:"",age:0})
    const InputOnChange=(property,value)=>{
        setFormObj(prevObj=>({
            ...prevObj,[property]:value
        }))
    }
    const FromSubmit=(e)=>{
        e.preventDefault()
        Create(formObj.name,formObj.email,formObj.age)
        .then(result=>{
            navigate('/CreateUser')
        })
        .catch(err=>console.log(err))
        console.log(formObj)
        //alert(JSON.stringify(formObj))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={FromSubmit}>
                    <h1>Add User</h1>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Name' className='form-control' onChange={(e)=>{InputOnChange("name",e.target.value)}} value={formObj.name}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Email' className='form-control' onChange={(e)=>{InputOnChange("email",e.target.value)}} value={formObj.email}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Age' className='form-control' onChange={(e)=>{InputOnChange("age",e.target.value)}} value={formObj.age}></input>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserCreate;
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { ReadById, Update } from "../../services/profile.service.js";
import { useParams, useNavigate } from 'react-router-dom';

const initializeState={
    name:"",
    email:"",
    age:""
}

const UserEdit2 = () => {
    const {id} = useParams();
    const [formObj,setFormObj]=useState(initializeState);
    const {name,email,age}=formObj;
    //const[name,setName]=useState()
    //const[email,setEmail]=useState()
    //const[age,setAge]=useState()
    const navigate=useNavigate()

    useEffect(()=>{
        if (id){
            readById(id);
        }

        /*
        .then(result=>{console.log(result),
            setFormObj({...formObj, name:result.data.name,email:result.data.email,age:result.data.age})

            //setName(result.data.name)
            //setEmail(result.data.email)
            //setAge(result.data.age)
        })
        .catch(err=>console.log(err))*/
    },[id]);

    const readById = async (id) => {
        console.log(id)
        const response = await ReadById(id);
        //const response = await axios.get('http://localhost:5050/api/v1/profile/ReadById/'+id);
        console.log(response);
        setFormObj({...formObj, name:response.data.data.name,email:response.data.data.email,age:response.data.data.age})
        //setFormObj({...response.data.data[0]});
        console.log(formObj);
    }

    const InputOnChange = (e) => {
        let {name,value}=e.target;
        setFormObj({
            ...formObj,[name]:value,
        });
    };




    /*
    const InputOnChange=(property,value)=>{
        //property === "avatar" ? e.target.files[0] : e.target.value;
        setFormObj(prevObj=>({
            ...prevObj,[property]:value
        }))
    }
    */
    

    const Updatehanddler = (e)=>{
        e.preventDefault();
        Update(formObj.name,formObj.email,formObj.age,id);
        //setFormObj({...formObj, name:response.data.data.name,email:response.data.data.email,age:response.data.data.age})
        navigate('/ReadUser');
         /*
        
        axios.put('http://localhost:5050/api/v1/profile/Update/'+id,{
            name,email,age
        })
        .then(result=>{
            
        })
        .catch(err=>console.log(err))
        */
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Updatehanddler}>
                    <h1>Update User</h1>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Name' className='form-control' name='name' onChange={InputOnChange} value={name}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Email' className='form-control' name='email' onChange={InputOnChange} value={email}></input>
                    </div>
                    <div className='mb-2'>
                        <input type='text' placeholder='Enter Age' className='form-control' name='age' onChange={InputOnChange} value={age}></input>
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit2;
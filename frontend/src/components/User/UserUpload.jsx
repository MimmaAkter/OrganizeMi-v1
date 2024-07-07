import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Create } from "../../services/upload.service"
//import axios from "axios";

const UserUpload = () => {
  /*
  const [avatar, setAvatar] = useState();
  const[title,setTitle]=useState({title:""});
  */
  const navigate = useNavigate();
  const [formObj,setFormObj]=useState({title:"",avatar:""})
  const InputOnChange=(property,value)=>{
    //property === "avatar" ? e.target.files[0] : e.target.value;
    setFormObj(prevObj=>({
        ...prevObj,[property]:value
    }))
}

  const upload = (e) => {
    e.preventDefault();
    console.log(formObj)
/*
    const formData = new FormData();
    formData.append("title", formObj.title);
    formData.append("avatar", formObj.avatar);
*/
    Create(formObj)
    //axios.post("http://localhost:5050/api/v1/uploadFile/UploadFile", formData)
          .then((res) => { navigate("/") })
          .catch((er) => console.log(er));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <form className="w-50 bg-white rounded p-3" onSubmit={upload} encType="multipart/form-data">
        <div className="mb-2">
        <input
            type="text"
            className="form-control"
            name="title"
            value={formObj.title}
            onChange={(e)=>{InputOnChange("title",e.target.value)}}
          ></input>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            name="avatar"
            multiple
            onChange={(e)=>{InputOnChange("avatar", e.target.files[0])}}
          ></input>
        </div>
        <button className="btn btn-info">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UserUpload;

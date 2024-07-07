import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserUpload1 = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState({title:""});
  const [avatar, setAvatar] = useState();
  
  const handleSubmit = async (e) => {

    e.preventDefault();
        axios.post("http://localhost:5050/api/v1/uploadFile/UploadFile",{
            title,avatar
        })
        .then(result=>{
            navigate('/')
        })
        .catch(err=>console.log(err))
  /*
    try {
      let formData = new FormData();
      formData.append("avatar", file);
      formData.append("title", data);
        axios
          .post("http://localhost:5050/api/v1/uploadFile/UploadFile", formData)
          .then((res) => {
            navigate("/");
          })
          .catch((er) => console.log(er));
    } catch (error) {
      console.log(error);
    }
    */
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter name"
          type="text"
          value={title.title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserUpload1;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserUpload2 = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5050/api/v1/uploadFile", formData)
      .then((res) => {
        navigate("/");
      })
      .catch((er) => console.log(er));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="mb-2">
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>
        <button className="btn btn-info" onClick={upload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UserUpload2;

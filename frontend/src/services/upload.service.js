import axios from "axios";

/*
const Read = async () => {
    const URL = "/api/v1/user/ReadUser"
    const result = await axios.get(URL);
    return result.data.reverse();
  };
*/
  const Create = async (formObj) => {
    let URL="/api/v1/uploadFile/UploadFile";
    const formData = new FormData();
    formData.append("title", formObj.title);
    formData.append("avatar", formObj.avatar);
    console.log(formData)
    /*let PostBody={
        title:title,
        avatar:avatar.axios.post(avatar)
    }
    */
   return await axios.post(URL,formData).then((res)=>{
        if(res.status===200){
           return true;
        }
        else{
           return  false;
        }
    }).catch((err)=>{
        console.log(err);
        return false;
    });
};



export { Create }
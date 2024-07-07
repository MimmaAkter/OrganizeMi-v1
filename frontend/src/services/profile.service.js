import axios from "axios";

const Read = async () => {
    const URL = "/api/v1/profile/Read"
    const result = await axios.get(URL);
    console.log(result)
    return result.data.reverse();
  };

const ReadById = async (id) => {
    const URL = `/api/v1/profile/ReadById/${id}`
    console.log(URL)
    const result = await axios.get(URL);
    return result;
  };

const Create = async (name,email,age) => {
    let URL="/api/v1/profile/Create";
    let PostBody={
        name:name,
        email:email,
        age:age
    }
   return await axios.post(URL,PostBody).then((res)=>{
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

const Update = async (name,email,age,id) => {
    console.log(id);
    const URL = `/api/v1/profile/Update/${id}`
    console.log(URL)
    let PostBody={
        name:name,
        email:email,
        age:age
    }
    const result = await axios.put(URL,PostBody);
    return result;
}



export { Create, Read, ReadById, Update }
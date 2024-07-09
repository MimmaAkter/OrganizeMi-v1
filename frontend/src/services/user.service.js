import axios from "axios";

const Read = async () => {
    const URL = "/api/v1/user/ReadUser"
    console.log(URL)
    const result = await axios.get(URL)
    //.then(res=>console.log(res.data));
    //return result.data.reverse();
    console.log(result)
    return result.data.data;
  };

  const ReadById = async (id) => {
    const URL = `/api/v1/user/ReadById/${id}`
    console.log(URL)
    const result = await axios.get(URL);
    return result;
  };

  const Create = async (formObj) => {
    let URL="/api/v1/user/Create";

    console.log(formObj)

    const formData = new FormData();
    formData.append("fullName", formObj.fullName);
    formData.append("avatar", formObj.avatar);
    formData.append("coverImage", formObj.coverImage);
    formData.append("email", formObj.email);
    formData.append("password", formObj.password);
    formData.append("username", formObj.username);

    console.log(formData)

    /*
    let PostBody={
        fullName:fullName,
        avatar:avatar,
        coverImage:coverImage,
        email:email,
        password:password,
        username:username
    }
    */
   return await axios.post(URL,formData)
    .then((res)=>{
        console.log("created user", res)
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

const Update = async (formObj,id) => {
    let URL=`/api/v1/user/Update/${id}`;

    const formData = new FormData();
    formData.append("fullName", formObj.fullName);
    formData.append("avatar", formObj.avatar);
    formData.append("coverImage", formObj.coverImage);
    formData.append("email", formObj.email);
    formData.append("password", formObj.password);
    formData.append("username", formObj.username);

   return await axios.patch(URL,formData).then((res)=>{
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

  const Delete = async (id) => {
    const URL = `/api/v1/user/Delete/${id}`

    return await axios.delete(URL).then((res)=>{
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


  const Login = async (formObj) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    let URL="/api/v1/user/Login";

    /*
    const formData = new FormData();
    formData.append("email", formObj.email);
    formData.append("password", formObj.password);
    */
    let PostBody={
        email:formObj.email,
        password:formObj.password
    }
console.log('login service', URL, PostBody)
        return await axios.post(URL,PostBody).then((res)=>{
            if(res.data.statusCode===200){
               return (alert(res.data.message),true);
            }
            else{
               return (alert('Invalid'),false);
            }
        }).catch((err)=>{
            console.log(err);
            return false;
        });
    
}

const getCurrentUser = async () => {

    try{
        const URL = "/api/v1/user/getCurrentUser"
        return await axios.get(URL).then((res)=>{
            console.log("current user in service",res)
            if(res){
               return (res);
            }
            else{
               return (null);
            }
        }).catch((err)=>{
            console.log(err);
            return false;
        });;
    } catch(error){
        console.log("Appwrite services :: getCurrentUser :: error", error);
    }

    //return null;
/*
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;

*/
}

const Logout = async() => {

let URL="/api/v1/user/Logout";
//console.log(localAccessToken)
   return await axios.post(URL)
        .then(res => {
            //console.log(res.data.statusCode)
            if(res.data.statusCode===200){
                return true;
            }
            else{
                return false
            }
        }).catch((err)=>{
            console.log(err);
            return false;
        });
    
}


export { Read, ReadById, Create, Update, Delete, Login, getCurrentUser, Logout }













/*
export function Read(URL){

    const result = await axios.get("http://localhost:5050/api/v1/ReadUser");
    setUser(result.data.reverse());

    //debugger;
    //let URL="/api/v1/ReadUser";
      //debugger;
      return axios.get(URL).then((res)=>{
          //debugger;
          if(res.status===200){
              //debugger;
              return res.data['data'];
          }
          else{
              //debugger;
              return false;
          }
      }).catch((err)=>{
          //debugger;
          console.log(err);
          return false;
      });
  }

*/

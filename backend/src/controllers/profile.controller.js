import { Profile } from "../models/profile.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js"
//import mongoose from "mongoose";

// C=Create
const Create=(req,res)=>{
    Profile.create(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
}

// R=Read
const Read=(req,res)=>{
    Profile.find({})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
}

// R=ReadById
const ReadById= async (req,res)=>{

    const id = req.params.id;
    const user = await Profile.findById({_id:id})

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "User Fetched successfully")
    )

}

// U=Update
/*
 const Update = async (req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
};
*/

const Update = async (req, res) =>{
    const id=req.params.id;
    const user = await Profile.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
   
    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))

}

/*
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
        name: req.body.name || user.name,
        avatar: result?.secure_url || user.avatar,
        cloudinary_id: result?.public_id || user.cloudinary_id,
      };
      user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });

*/

export { Create, Read, ReadById, Update }
import { User} from "../models/user.model.js"
import { uploadOnCloudinary, cloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"
//import mongoose from "mongoose";

// C=Create
const Create= async (req,res) => {

    const {fullName, email, username, password } = req.body
    //console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0].path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   const user = await User.create({
        fullName:fullName,
        avatar: avatar?.secure_url || "",
        coverImage: coverImage?.secure_url || "",
        email:email, 
        password:password,
        username: username
    })

    return res.status(201).json(
        new ApiResponse(200, user, "User registered Successfully")
    )

}

// R=Read
const ReadUser= async (req,res)=>{
  const user = await User.find({})
   /* 
   .then(user=>res.json(user))
    .catch(err=>res.json(err))
    */

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "all User Fetched successfully")
    )

    /*
    User.find((err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
    */
}


// R=ReadById
const ReadById= async (req,res)=>{

    const id = req.params.id;
    const user = await User.findById({_id:id})

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "User Fetched successfully")
    )

}


// U=Upadte
const Update = async (req, res) =>{
    const id=req.params.id;
    const user = await User.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        username:req.body.username
    })
   
    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))

}

// D=Delete
const Delete= async (req,res)=>{

    let user = await User.findById(req.params.id);
    //console.log(user.avatar)
    if(user.avatar){
        const fileUrl = user.avatar
        const urlArray = fileUrl.split('/')
        const mainFile = urlArray[urlArray.length-1]
        const fileName = mainFile.split('.')[0]
        await cloudinary.uploader.destroy(fileName);
    }
    

    await user.deleteOne();

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "User Deleted successfully")
    )

}

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const Login = async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log('user in controller', email, password)
    if (!username && !email) {
      return res.json(new ApiError(400, "username or email is required"));
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        return res.json(new ApiError(404, "User does not exist"))
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    return res.json(new ApiError(401, "Invalid user credentials"))
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

}

const getCurrentUser = async(req, res) => {
    console.log('current user in controller',req.user)
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "Current User fetched successfully"
    ))
}

const Logout = async(req, res) => {
    //console.log(req.user.accessToken)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    //console.log(res)

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
}

const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    //console.log(email)
    try {
      //const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
        return res.json({ message: "user not registered" });
      }
      const resetPassToken = user.generateResetPassToken()

      var transporter = nodemailer.createTransport({
        //host: 'smtp.ethereal.email',
        host: 'smtp.gmail.com',
        secure: true,
        port: 587,
        service: "gmail",
        auth: {
          user: "mimma.akter.199001@gmail.com",
          pass: "ntsf ievt slhz ejsc",
          //user: "lisandro.mante@ethereal.email",
          //pass: "QD8gQ8MNap77yE618G",
        },
      });
      const encodedToken = encodeURIComponent(resetPassToken).replace(/\./g, "%2E");
      //console.log(encodedToken);
      var mailOptions = {
        from: '"Mimma Akter" <mimma@gmail.com>',
        to: email,
        subject: "Reset Password",
        text: `https://organizemi-v1-server.onrender.com/reset-password/${encodedToken}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json({ message: "error sending email" });
        } else {
          return res.json({ status: true, message: "email sent" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ResetPassword = async (req, res) => {
    const { resetPassToken } = req.params;
    const { password } = req.body;

    console.log(resetPassToken)
    try {
        console.log("im in try")
      const decoded = jwt.verify(resetPassToken, process.env.RESETPASS_TOKEN_SECRET);
      console.log(decoded)
      const id = decoded._id;
      const hashPassword = await bcryptjs.hash(password, 10);
      

      await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
      return res.json({ status: true, message: "updated password" });
    } catch (err) {
      return res.json("invalid token");
    }
  };

/*
  const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})
*/
export { 
    Create, ReadUser, ReadById, Update, Delete, 
    Login, getCurrentUser, Logout, ForgotPassword, ResetPassword
}

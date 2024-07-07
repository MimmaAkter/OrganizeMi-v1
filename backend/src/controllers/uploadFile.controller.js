import { Upload} from "../models/upload.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// C=Create
const UploadFile= async (req,res) => {

    //const {title } = req.body.title
    //console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0].path;
    //const avatarLocalPath = req.file.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const user = await Upload.create({
      title: req.body.title,
      avatar: avatar?.url || ""
  })
  

  return res.status(201).json(
      new ApiResponse(200, user, "User registered Successfully")
  )

}


export { UploadFile }

/*

const cloudinary = require("../utils/cloudinary");
const User = require("../model/user");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

*/
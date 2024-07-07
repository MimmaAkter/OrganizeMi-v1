import mongoose, {Schema} from "mongoose";

const profileSchema=new Schema({
    name:String,
    email:String,
    age:Number
})

export const Profile=mongoose.model("Profile",profileSchema)
import mongoose, {Schema} from "mongoose";

const uploadSchema = new Schema({
  title: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const Upload = mongoose.model("Upload", uploadSchema);
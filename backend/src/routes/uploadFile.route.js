import { Router } from "express";
import { UploadFile } from '../controllers/uploadFile.controller.js'
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

//router.route("/login").post(loginUser)

// C=Create
router.post("/UploadFile",
    upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), UploadFile);


export default router
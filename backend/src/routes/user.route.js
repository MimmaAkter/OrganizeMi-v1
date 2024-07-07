import { Router } from "express";
import { Create, ReadUser, ReadById, Update, Delete, Login, getCurrentUser, Logout, ForgotPassword, ResetPassword } from '../controllers/user.controller.js'
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

//router.route("/login").post(loginUser)

// C=Create
router.post("/Create",
    upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]), Create);

router.post("/Login",Login);

router.post("/forgot-password" , ForgotPassword)

router.post("/reset-password/:resetPassToken" , ResetPassword)
 
// R=Read
router.get("/ReadUser", verifyJWT, ReadUser);

// R=ReadById
router.get("/ReadById/:id",ReadById);

//U=Update
router.patch("/Update/:id", 
    upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]), Update)

// D=Delete
router.delete("/Delete/:id",Delete);

//Secure routes

router.get("/getCurrentUser", verifyJWT, getCurrentUser)

router.post("/Logout", verifyJWT, Logout);

//router.route("/change-password").post(verifyJWT, changeCurrentPassword)

export default router
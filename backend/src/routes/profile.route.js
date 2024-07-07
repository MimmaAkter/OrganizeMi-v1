import { Router } from "express";
import { Create, Read, ReadById, Update } from '../controllers/profile.controller.js'

const router = Router()

//router.route("/login").post(loginUser)

// C=Create
router.post("/Create",Create);

// R=Read
router.get("/Read",Read);

// R=ReadById
router.get("/ReadById/:id",ReadById);


router.put("/Update/:id", Update)


export default router
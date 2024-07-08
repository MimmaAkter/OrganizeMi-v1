import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from 'path'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
//app.use('../public',express.static("files"))

//routes import
import userRouter from './routes/user.route.js'
import profileRouter from './routes/profile.route.js'
import uploadFileRouter from './routes/uploadFile.route.js'

//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/uploadFile", uploadFileRouter)

// Add React Front End Routing
const _dirname=path._dirname("");
const buildPath =path.join(_dirname,"../frontend/dist");

app.use(express.static(buildPath));

app.get("/",function(req,res,next){
  res.sendFile(path.join(__dirname,"../frontend/dist/index.html"),function(err){
    if(err){
        res.static(500).send(err);
    }
  });
});
// http://localhost:8000/api/v1/user/register

export { app }
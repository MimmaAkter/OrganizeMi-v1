import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//import path from 'path'

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
//const __dirname = import.meta.dirname;
//app.get('*',function (req,res) {
    //res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
//})

// http://localhost:8000/api/v1/user/register

export { app }
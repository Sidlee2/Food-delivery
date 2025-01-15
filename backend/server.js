import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

//app config
const app=express()
const port=4000

//middleware
app.use(express.json())  //using this middleware,whenever we get the request from the frontend to backend then it will be parsed using this json
app.use(cors())  //using this we can access the backend from any frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working")
}) //to test our all API's, we'll use the extension Thunder Client

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://sidlee21lcw:dbMyprojects12345@cluster0.oalxq.mongodb.net/?
//mongodb+srv://sidlee21lcw:<db_password>@cluster0.oalxq.mongodb.net/?
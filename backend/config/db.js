import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://sidlee21lcw:dbMyprojects12345@cluster0.oalxq.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
    
 //mongodb+srv://sidlee21lcw:dbMyprojects12345@cluster0.oalxq.mongodb.net/food-del
//mongodb+srv://sidlee21lcw:dbMyprojects12345@cluster0.oalxq.mongodb.net/food-del
 //mongodb+srv://sidlee21lcw:dbMyprojects12345@cluster0.oalxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
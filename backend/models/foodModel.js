import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {type:String,required:true},
    category:{type:String,required:true}
})

const foodModel =mongoose.models.food || mongoose.model("food",foodSchema) //this means if food model is already there then it will use it otherwise it will create a new model called food model.This is to avoid re making of food model again and again if we run it again and again

export default foodModel;
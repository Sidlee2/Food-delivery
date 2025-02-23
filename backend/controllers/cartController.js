import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId); //i.e while finding the user,user id should be same as req.body.userId 
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])//if in this card there is no entry with the itemId
        {
            cartData[req.body.itemId] = 1;
        }
        else{ //if that cart idis available then we'll just increase the value
            cartData[req.body.itemId] +=1;
        }
        //when that item will be added in the cart then we have to update this user's card with the new card i.e update the card data in the database
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        //first we'll find the user data using findById method
        let userData = await userModel.findById(req.body.userId); //i.e middleware will decode our token into userId
        let cartData = await userData.cartData; //here we're extracting the cart data
        if (cartData[req.body.itemId]>0) { //if the itemId that we want to remove i present or not
            cartData[req.body.itemId] -=1;
        } 
        //now we'll update the new cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//fetch user cart data
const getCart = async (req,res) => { //from this we can fetch the user's cart data
    try {
        let userData = await userModel.findById(req.body.userId);//first using user's id we'll find the user's data
        let cartData = await userData.cartData;//from this user's data which we got,we'll fetch the cart data
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    
    }

}

export {addToCart,removeFromCart,getCart};
import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//We'll create the function using which we can place the user's order from frontend
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,//when middleware will decode the token,then it will generate this userId
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save(); //we've save the order in our database
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}); //ie after saving the order in the database, we've cleared the user's cart

        //now we'll create the logic using that we can create the payment link using the stripe
        //before creating the tripe payment link,1st we'll create the line items where we'll insert all the product data,currency,unit amount and quantity
        const line_items = req.body.items.map((item)=>({ //because req.body.items is an array that why map
            price_data:{
                currency:"usd", //here I selected usd,not inr because I created my stripe account for USA as for India,they were asking for permission
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))  

        line_items.push({ //here we'll push delivery items for line items
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        }) 

        //Now using this line item we'll create 1 session
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {placeOrder}

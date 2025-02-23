import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req,res) => { //this is an api using which our registered user can login
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email}) //i.e if that account is available then in will get stored in user variable

        if (!user) { //if we didn't have a user
            return res.json({success:false,message:"User Doesn't exist"})
            
        }

        //if we're getting the user then we'll match the user's password with the stored password in the database
        const isMatch = await bcrypt.compare(password,user.password) //here password is the pw user entered and user.password is the pw stored in the database

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        //if password is matched then we'll generate a token
        const token = createToken(user._id);
        res.json({success:true,token}) //i.e we'll also pass this token as a response

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET); //here we have generetaed a token for the user
}

//register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        //to check if a password length is greater than 8
        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing(encrypting) the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //now we'll create a new user using name,email and hashed password
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save() //to save the user in the database
        const token = createToken(user._id)
        res.json({success:true,token}) //here we have send this token as a response


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export {loginUser,registerUser}
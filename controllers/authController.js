
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparepassword, hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body

        //validation
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!email){
            return res.send({error:'Email is Required'})
        }
        if(!password){
            return res.send({error:'Password is Required'})
        }
        if(!phone){
            return res.send({error:'Phone no is Required'})
        }
        if(!address){
            return res.send({error:'Address is Required'})
        }
        //check user
        const isUserExist =await userModel.findOne({email})

        //existing user
        if(isUserExist){
            return res.status(200).send({
                success:true,
                messege:'Already Register please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const newUser = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        }).save();

        res.status(201).send({
            success:true,
            messege: 'User Registered succesfully',
            newUser,
        })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messege:'Error in registration',
            error
        })
        
    }

};


//POST LOGIN
export const loginController = async(req,res) => {
    try{
      const{email,password} = req.body
      //validation
      if(!email || !password){
        return res.status(404).send({
            success:false,
            messege:'Invalid email or password'
        })
      }
      //check user
      const user = await userModel.findOne({email})
      if(!user){
        return res.status(404).send({
            success:false,
            messege:'Email is not registered'
        })
      }
      const match = await comparepassword(password,user.password)
      if(!match){
        return res.status(200).send({
            success:false,
            messege:'Invalid password'
        })
    }
    //token
     const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d",});
        res.status(200).send({
            success:true,
            messege:'Logged in succesfully',
            user:{
                name:user.name,
                email:user.email,
                phonne:user.phone,
                address:user.address
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            messege:'Error in login',
            error
            
        })

    }
};

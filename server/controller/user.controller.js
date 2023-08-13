import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}
// ..............................registration...........................//
const register=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return next (new AppError('All data is required',400));
        }
        const userExists=await User.findOne({email});
        if(userExists){
            return next(new AppError('User Already Exists',400));
        }
        console.log(name);
        console.log(email);
        console.log(password);
        
        const user=await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:email,
                secure_url:process.env.DEMO
            }
        });
        console.log('4');
        if(!user){
            return next(new AppError('registration faild!!!!',400));
        }
        //TODO:FILE UPLOAD
        console.log('File Details > ', JSON.stringify(req.file));
        if(req.file){
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                });
                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.url;
                    //remove file from server
                   fs.rm(`uploads/${req.file.filename}`)
                }
                
               
                
            }catch(e){
                console.error('Caught an error:', e);
                return await next(new AppError('upload faild try again!!!',500));
            }
        }

        await user.save();
        user.password=undefined;
        console.log('1');
        const token=await user.generateJWToken();
        console.log('2');
        res.cookie('token',token,cookieOptions)
        res.status(201).json({
            sucess:true,
            message:"Registration Sucessful"
        })
    }catch(e){
        console.error('Caught an error:', e);
        return await next(new AppError('Invalid Data',400));
    }
    
};



// ..............................login...........................//
const login=async (req,res,next)=>{
    try{
        const {email , password}=req.body;
        if(!email || !password){
            return await next(new AppError('Invalid Data',400));
        }
        const user=await User.findOne({
            email
        }).select('+password');
        if(!user || !(await user.comparePassword(password))){
            return next( new AppError('Email or Password Cannot Match',400));
        }
        const token=await user.generateJWToken();
        res.cookie('token',token,cookieOptions);
        console.log(req.cookies.token); 
        res.status(201).json({
            sucess:true,
            message:"Login Sucessful",
            token
        })
    }catch(e){
        return new AppError(e.message,500);
    }
    
};



// ..............................logout...........................//

const logout=(req,res)=>{
    try{
        const cookieOption={
            expires:new Date(),
            httpOnly:true
        }
        res.cookie('token',null,cookieOption);
        return res.status(200).json({
            success:true,
            message:"logged out"
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
};



// ..............................profile...........................//
const profile=async (req,res)=>{
    try{
        const email=req.query.mail;

        console.log("1",email);
        const user=await User.findOne({email});
        console.log(user);
        res.status(200).json({
            succes:true,
            message:"user data mil geya",
            user
        })
    }catch(e){
        return new AppError(e.message,400);
    }
    
};



// ..............................forgot password...........................//
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({email});
    if (!user) {
        return next(new AppError('Email not registered', 400));
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

    console.log(resetPasswordUrl);

    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`
        })
    } catch(e) {

        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();
        return next(new AppError(e.message, 500));
    }
}


// ..............................reset password..........................//
const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    const forgotPasswordExpiry=Date.now()
    
        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry: { $gt: forgotPasswordExpiry }
        });

        if (!user) {
            return next(new AppError('Token is invalid or expired, please try again', 400));
        }

        // ... Rest of the code ...
        user.password = password;
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        
        // Save the user with the updated password
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully!'
        });
    
};

export{
    register,
    login,
    logout,
    profile,
    forgotPassword,
    resetPassword
}
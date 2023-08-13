import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema=new Schema({
    name:{
        type:'String',
        required:[true,'All Section Filling are Mandatory'],
        minLength:[5,'Fill Atleast 5 Character'],
        trim:true
    },
    email:{
        type:'String',
        required:[true,'All Section Filling are Mandatory'],
        minLength:[5,'Fill Atleast 5 Character'],
        lowercase:true,
        unique:true,
        trim:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
    },
    password:{
        type:'String',
        required:[true,'All Section Filling are Mandatory'],
        minLength:[5,'Fill Atleast 5 Character'],
        select:false
    },
    role:{
        type:'string',
        enum:['USER','ADMIN'],
        default:'USER'
    },
    avatar:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{
    timestamps:true
});
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password= await bcrypt.hash(this.password,10);
});
userSchema.methods={
    generateJWToken: async function(){
        return await jwt.sign(
            {id:this._id , email:this.email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword: async function(plainText){
        return await bcrypt.compare(plainText,this.password);
    },
    generatePasswordResetToken: async function() {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        ;
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15min from now

        return resetToken;
    }
}

const User=model('User',userSchema);
export default User;
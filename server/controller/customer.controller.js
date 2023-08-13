import Customer from "../models/customer.model.js";
import AppError from "../utils/error.util.js";


const customer_register=async (req,res,next)=>{
    try{
        const {name,email,number,role,serviceId_link}=req.body;
        console.log(name);
        if(!name || !email || !number || !role || !serviceId_link){
            return next (new AppError('All data is required',400));
        }
        const customerExists=await Customer.findOne({email});
        if(customerExists){
            return next(new AppError('customer Already Exists',400));
        }
        const customer=await Customer.create({
            name,
            email,
            number,
            role, 
            serviceId_link
        });
        if(!customer){
            return next(new AppError('registration faild!!!!',400));
        }
        await customer.save();
        res.status(201).json({
            sucess:true,
            message:"Registration Sucessful"
        })
    }catch(e){
        return await next(new AppError('Invalid Data',400));
    }
    
};

export{
    customer_register
}
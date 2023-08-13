import Feedback from "../models/feedback.model.js";
import AppError from "../utils/error.util.js";
const feedback_take=async (req,res,next)=>{
    try{
        const {name,reveiw}=req.body;
        const feedback=await Feedback.create({
            name,
            reveiw
        });
        await feedback.save();
        res.status(201).json({
            sucess:true,
            message:"Thank You"
        })
    }catch(e){
        return await next(new AppError('something wents wrong',400));
    }
    
};

export{
    feedback_take
}
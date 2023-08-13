import { Schema , model } from "mongoose";

const feedbackSchema=new Schema({
    name:{
        type:'String',
        required:[true,'All Section Filling are Mandatory'],
        minLength:[5,'Fill Atleast 5 Character'],
        trim:true
    },
    reveiw:{
        type:'string'
    }
});

const Feedback=model('Feedback',feedbackSchema);
export default Feedback;
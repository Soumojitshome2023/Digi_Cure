import { Schema , model } from "mongoose";

const customerSchema=new Schema({
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
    number:{
        type:'string',
        required:[true,'All Section Filling are Mandatory'],
        minLength:[10,'Enter a valid contact number'],
    },
    role:{
        type:'string',
        enum:['DOCTOR','ABBULANCE','MEDICAL_STORE'],
        default:'USER'
    },
    serviceId_link:{
        type:'String',
        required:[true,'All Section Filling are Mandatory'],
        minLength:[10,'Fill A valid link'],
        trim:true
    }
});

const Customer=model('Customer',customerSchema);
export default Customer;
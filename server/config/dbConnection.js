import mongoose from "mongoose";

const connect_db=async ()=>{
    try{
        const {connection}=await mongoose.connect(
            process.env.MONGO_URL
        )
        if(connection){
            console.log('connection succesful');
        }
    }catch(e){
        console.error(e);
    }
}
export default connect_db;
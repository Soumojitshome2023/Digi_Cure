import {config} from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

import errMiddleware from './middleware/error.middleware.js';
config();

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use(morgan('dev'));
app.use(errMiddleware);
app.use('/', userRoutes);
app.use('/ping',(req,res)=>{
    res.send('Pong');
});

// app.use('/',(req,res)=>{
//     return res.status(200).json({data:"My server"});
// });

//other 3 routes

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Not Found'); 
})

export default app;
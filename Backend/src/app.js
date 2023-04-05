import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import globalError from './globalError.js';
import registerUser from './controller.js';
import { AppError } from './Validation.js';
const app = express()

// avoid the cors error 
app.use(cors())

//  converting Data in Json 
app.use(express.json())

app.get('/', (req,res )=>{
    res.send('Hii welcome on Shiv Raj App ')
})
app.post('/register' , registerUser)

//  MongoDB Data Base connect by mongoose 
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_DB}`)
.then(v=>console.log('DataBase Connected !'))
.catch(e=>console.log(e.message))




app.all('/*' , (req, res, next)=>{
    next(new AppError(`${req.url} Not Found !` , 404))
})

app.use(globalError)
app.listen(process.env.PORT , ()=>{
    console.log('App is Running on PORT ' + process.env.PORT);
})




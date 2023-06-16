import dotenv from 'dotenv';
dotenv.config()
import express from 'express';

const app = express()
app.use(express.json())

// import internal files 
import './db.js';
import globalError, { AppError } from './errorHandler.js';
import { createBooks, getAverageRating, getPublishers, getReviewsByPublisherOfSpanish } from './controller.js';

//  APIs 

app.get('/' , (req,res)=>{
    res.status(200).send('hi welcome on server of book-store ! ')
})
app.post('/create/books' , createBooks )

// All Filters 
app.get('/getReviews' , getReviewsByPublisherOfSpanish )
app.get('/getAverageRating' , getAverageRating )
app.get('/getPublishers' , getPublishers )

// import fs from 'fs';
// const data = fs.readFile('/Users/mt932/Desktop/COMPANY-TASKs/Company-Task/data.json' , (err, data)=>{
//     if(err) console.log(err.message);
//     else console.log('data is ');
//     // console.log(JSON.parse(data));
// })



app.all('/*' , (req,res, next)=>{
    return next(new AppError('Provide Valid Path !', 400))
})
app.use(globalError)
app.listen(process.env.PORT , ()=>{
    console.log(`App is Running on ${process.env.PORT}`);
})
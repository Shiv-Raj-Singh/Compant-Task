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
//  Test Server 
app.get('/' , (req,res)=>{
    res.status(200).send('hi welcome on server of book-store ! ')
})

// Create dummy books
app.post('/create/books' , createBooks )

// All Filters 
app.get('/getReviews' , getReviewsByPublisherOfSpanish )
app.get('/getAverageRating' , getAverageRating )
app.get('/getPublishers' , getPublishers )

// Handle all invalid path
app.all('/*' , (req,res, next)=>{
    return next(new AppError('Provide Valid Path !', 400))
})

// Global Middleware for Error Handling 
app.use(globalError)

app.listen(process.env.PORT , ()=>{
    console.log(`App is Running on ${process.env.PORT}`);
})
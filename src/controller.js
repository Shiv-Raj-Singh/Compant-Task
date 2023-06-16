import moment  from"moment";
import bookModel from "./model/model.js"
import validBookSchema, { validPublisher } from "./model/validSchema.js"



//  Try Catch Block 
function catchAsync(con){
    return (req,res,next)=>{
        return Promise.resolve(con(req,res,next)).catch(next)
    }
}


//  Create Books 

import { data , arr } from "../xyz.js";

export const createBooks = catchAsync(async (req,res,next)=>{
    const result = []
    
    for (let i of arr){
        const data1 = await validBookSchema.validateAsync(i)
        const books = data1.books
        console.log(data1);
        books.forEach(book =>
            book.reviews.forEach(review =>{
                review.postDate = moment().format()    
            })
            )
        
        const abc = await bookModel.create(data1)
        result.push(abc)
       
    }
    
    return res.status(201).json({
        status : true , message : 'Books Created Successfully !'  , data : result 
    })
})


// A. Get reviews of books published by certain publishers, that are published in Spanish language

export const getReviewsByPublisherOfSpanish = catchAsync(async (req,res,next)=>{
        
        const publisher = await validPublisher.validateAsync(req.query)        
        console.log(publisher);
        publisher.publisher = {$regex : publisher[publisher] }
        publisher.books = {"$elemMatch" : { language :'Spanish'}}

        // Fetch all docs 
        // const data = await bookModel.find().select('books.reviews')
        
        const data = await bookModel.find(publisher).select('books.reviews')        
        return res.status(200).json({
            status : true , message : 'Book`s Reviews Found Successfully !'  , data : data 
        })
})


// *******************************************************************************************************

// Function to get average rating of reviews for books published by certain publishers within the last 365 days

export const getAverageRating = catchAsync(async function(req,res,next){
     const {publishers} = req.body
     // Calculate start date (365 days ago)
     const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);  
    
    const averageRating = await bookModel.aggregate([
        {
          $match: {
            "publisher": { $in: publishers },
            "books" : {"$elemMatch" : 
                      {
                      reviews : {"$elemMatch" :  { "postDate": { $gte: startDate.toISOString()}}}
                      }
              }         
          }
        },
         {
            $unwind: "$books"
         },
          {
            $unwind: "$books.reviews"
          },
          {
            $group: {
              _id: null,
              totalRatings: { $sum: "$books.reviews.rating" },
              numRatings: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              averageRating: { $divide: ["$totalRatings", "$numRatings"] }
            }
          }
        
      ]);


    // Send Response 
    return res.status(200).json({
        status : true , message : 'AverageRating Found Successfully !'  , averageRating : averageRating 
    })
      
  }
)


// ******************************  Get Publishers ************************************

export const getPublishers = catchAsync(async function(req,res,next){
     
    const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);  

    const publishers =  await bookModel.aggregate([
        {
          $unwind: "$books"
        },
        {
          $unwind: "$books.reviews"
        },
        {
          $match: {
            "books.reviews.postDate": {$gte: lastMonth.toISOString()},
            $or: [{ "books.reviews.isContained": true }, {"books.reviews.rating": { $gt: 4 }}]
            }
        },
        {
          $group: {
            _id: "$publisher",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            publisher: "$_id",
            reviewCount: "$count"
          }
        }
      ])
      
    // Send Response 
    return res.status(200).json({
        status : true , message : 'Publishers Found Successfully !'  , publisher : publishers 
    })
      
  }
)


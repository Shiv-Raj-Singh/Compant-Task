import {model , Schema} from "mongoose";

const bookSchema = new Schema({
    publisher : {
        type : String , 
        required : true,
        lowercase : true 
        // unique : true 
    },
    books:[{
            name : {
                type : String ,  
                required : true ,
                
            },            
            language : {
                type : String ,    
                required : true ,               
            },
            reviews : [
                {
                    message : String ,
                    rating : Number ,
                    postDate : String , 
                    isContained : Boolean  , 
                    _id: false
                    
                }
            ],
            _id: 0 ,

    }]
}, {timestamps : true})

const bookModel = model('Book Store' ,bookSchema )
export default bookModel
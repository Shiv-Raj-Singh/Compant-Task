//  Global Error Handler Middleware



export default function globalError(err,req,res,next){
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'
console.log(err.message);
    //  For Valid fields 
    if(err.isJoi == true){
        err.statusCode = 400
        err.message = err.message
    } 
    
    // For Unique Field
    if(err.code == 11000){
        err.statusCode = 400
        const values = Object.keys(err.keyValue)
        err.message = `Duplicate Key Error For ${values[0]} !`  
    }


    res.status(err.statusCode).json({
        status : false , 
        message : err.message
    })
}



//  Error Pass Class inside next 
export class AppError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode 
        this.message = message
        this.status = false
    }
}
import Joi from 'Joi'


const validUser = Joi.object({
    fname : Joi.string().required().trim().min(3).max(30).regex(/^[a-zA-Z(, \)]*$/) ,
    lname : Joi.string().required().trim().min(3).max(30).regex(/^[a-zA-Z(, \)]*$/) ,
    email: Joi.string().trim().email(),
    country : Joi.string(),
    state : Joi.string() ,
    city : Joi.string(),
    gender : Joi.string() ,
    DOB : Joi.date(),
    age : Joi.number().min(14).max(150)

})


export default validUser

//  Error Pass Class inside next 
export class AppError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode 
        this.message = message
        this.status = false
    }
}



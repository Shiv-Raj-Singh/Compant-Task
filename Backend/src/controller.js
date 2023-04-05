
import UserModel from './model.js'
import validUser, { AppError } from './Validation.js'

//  Try Catch block take Controller as Parameter 
const catchAsync = (controller)=>{
    return function(req,res,next){
        return Promise.resolve(controller(req,res,next)).catch(next)
    }
}


//  Register User Controller 
const registerUser = catchAsync( async (req,res,next)=>{
    //  Validate the Data
    console.log(req.body);
    const validData = await validUser.validateAsync(req.body)
    
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

// today is 2018-06-13
// 23
getAge('1994-06-13') // 24
    const equalAge = getAge(validData.DOB) == validData.age

    if(!equalAge) return (next( new AppError('Age is Not Valid' ,400)))
console.log(getAge('1994-06-14'));
    // Save the Data in database 
    const data = await UserModel.create(validData)

    // Send Successfully Response 
    res.status(201).json({
        status : true , data : data
    })
})

export default registerUser
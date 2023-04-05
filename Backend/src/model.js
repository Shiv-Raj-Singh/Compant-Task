import {Schema , model} from "mongoose";

const user = new Schema(
    {
        fname: String ,
        lname: String ,
        email: {
          type: String,
          required: true,
          unique: true,
        },
        country: String ,
        state: String ,
        city: String ,
        gender: {
            type : String , enum : ['Male' , 'Female' , 'Others']
        } ,
        DOB: Date ,
        age : Number
    }
)

const userModel = new model('User-Register' , user)
export default userModel
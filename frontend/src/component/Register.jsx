import React, { useState , useEffect } from 'react'
// import csc from 'country-state-city'
import {Country , State , City} from "country-state-city"
import './User.css'
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const c = Country.getAllCountries()
const allCountry = [...c]

const dummyUser1 = {fname : '' ,lname : '' , email: '' , gender : '' , DOB : '' , age : ''}

const dummyUser2 =  { country : null , state:null , city : null }


const Register = () => {
    const Nav = useNavigate()

    
    const [user1, setUser1] = useState(dummyUser1);
    const [user2, setUser2] = useState(dummyUser2);
    const [country, setCountry] = useState(c);
    const [state, setSate] = useState([]);
    const [city, setCity] = useState([]);
    const [cCode, setCode] = useState(null);

    let getAllState = null
    if(state.length!==0){
        getAllState = [...state]
    }

    const handleOnChange = (e)=>{
        // console.log(e);
        setUser1({
            ...user1 , 
            [e.target.name] : e.target.value
        })
    }

    const handleCountry = async (e)=>{
        await setUser2({ 
            ...user2 ,
            [e.target.name] : e.target.value
        })
    }
    

    
    useEffect(()=>{
        if(user2.country){
            const countryCode = allCountry.find(c=>c.name == user2.country)
            setCode(countryCode.isoCode)
            setSate(State.getStatesOfCountry(`${countryCode.isoCode}`))
        }
        
    } , [user2.country])
    
    const handleState = async (e)=>{
        await setUser2({ ...user2 ,
            [e.target.name] : e.target.value
        })
    }

    useEffect(()=>{
        if(user2.state && getAllState){
            const allState = getAllState.find(c=>c.name == user2.state)
            console.log(allState.isoCode , cCode);
            setCity(City.getCitiesOfState(cCode, allState.isoCode))
        }

    } , [user2.state])

    const handleCity = async (e)=>{
        await setUser2({ ...user2 ,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async  (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/register" , {...user1 , ...user2})
            console.log(response);
            const data = await response.data
            console.log(response);
            data.status && Nav('/profile' , {state : data})

            data? toast.success("Submit-Successfully !" ,{theme : 'green', position: "top-center"}) : alert(data.msg) 
            
        } catch (err) {
            err.response ? toast.error(err.response.data.message ,{theme : 'dark', position: "top-center"}) :toast.error(err.message ,{position: "top-center"})
            console.log(err);
            // setUser(dummyUser)
        }
    
    }

    console.log(user2);
    return (
        <>
          
            <div className="mt-1 pt-1">
          <div className="JoinContainer">

             <form className="container mt-2 customForm pt-1" id='customForm' onSubmit={handleSubmit}>
                    {/* <h1 className='hding'>Register Your Account </h1> */}
                    <div className="mb-2 mt-4 ">
                        <input type="text" value={user1.fname} className="form-control input"required placeholder='Enter Your First Name' name="fname" onChange={handleOnChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-2 ">
                        <input type="text" value={user1.lname} className="form-control"required placeholder='Enter Your Last Name' name="lname" onChange={handleOnChange}id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-2 ">
                        <input type="email" value={user1.email} className="form-control" required placeholder='Enter Your Email' name="email" onChange={handleOnChange}id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div className="mb-2 mt-1">
                    <label htmlFor="gender" className='mt3 mx-3' >Choose Your Gender- </label> <br />
                    <label htmlFor="gender" className='mt3 mr-2' >Male</label> 
                    <input className='mx-2'onChange={handleOnChange} type="radio" value="Male" name="gender"/> 
                    <label htmlFor="gender" className='mt3 mr-2' >Female</label>
                    <input className='mx-2' onChange={handleOnChange} type="radio" value="Female" name="gender" />
                    <label htmlFor="gender" className='mx3 mr-2' > Others  </label>
                    <input className='mx-2' onChange={handleOnChange} type="radio" value="Other" name="gender" />
                    </div>

                    <div className="mb-2 ">
                        <label className='mx-3' htmlFor="DOB">Choose Your Date-of-Birth </label>
                        <input type="date" value={user1.DOB} className="form-control" required name="DOB" onChange={handleOnChange}id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div className="mb-2 ">
                        <input type="tel" value={user1.age} className="form-control" required placeholder='Enter Your Age' name="age" onChange={handleOnChange}id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                  
                  
                <select className="form-select my-2" aria-label="Choose Your Country" name='country' value={user2.country} onChange={handleCountry}>
                    <option selected > Select Your Country </option>
                    {
                        country.map((value , index)=>{
                            return  <option key={index} value={value.name} > {value.name} </option>
                        })
                    }

                </select>
                <select className="form-select my-2" name='state' value={user2.state} onChange={handleState}>  
                    <option selected > Select Your State  </option>
                    {
                        state.map((value , index)=>{
                            return  <option key={index} value={value.name} > {value.name} </option>
                        })
                    }

                </select>
                <select className="form-select my-2" aria-label="Choose Your City" name='city' value={user2.city} onChange={handleCity}  >
                    <option selected > Select Your City  </option>
                    {
                        city.map((value , index)=>{
                            return  <option key={index} value={value.name} > {value.name} </option>
                        })
                    }

                </select>


                <button type="submit" className="btn btn-primary" id='btn1' >Submit</button>
            </form>
            </div>
        <ToastContainer/>
        </div>
                    
        </>
                      );
}

export default Register
// export { user }

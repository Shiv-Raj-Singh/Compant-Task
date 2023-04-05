
import { useLocation } from 'react-router-dom'
import './User.css'


export default function Profile(){
    const Location = useLocation()
    const data = Location.state.data

    console.log(data);
    return (
        <>
        <div className="JoinContainer">
        <div className="profile">

            <p>Name - { data.fname} { data.lname} </p>
            <p>E-mail - {data.email} </p>
            <p>Age  {data.age}</p>
            <p> Address  <br />
                <span className='ml-5 mt-3' > Country -  {data.country} </span> <br />
                <span className='ml-5'  > State  -  {data.state} </span> <br />
                <span className='ml-5'> City -  {data.city} </span>
            </p>
            <p>DOB  -  {data.DOB}</p>
            <p>Gender -  {data.gender} </p>

        </div>
        
        </div>
        
        </>
    )

}
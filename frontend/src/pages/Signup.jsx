import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'

const Signup = () => {
    const navigate = useNavigate()
    const [signUpInfo, setSignUpInfo] = useState(
        {
            name:'',
            email:'',
            password:''
    }
    )
const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name,value);
    const copysignUpInfo = {...signUpInfo};
   copysignUpInfo[name] = value;
   setSignUpInfo(copysignUpInfo);
}
 console.log('loginInfo--', signUpInfo);

 const handleSignup = async (e) => {
e.preventDefault();
const {name, password,email} = signUpInfo;
if(!name || !password || !email) {
    return handleError('name,email,password are required')
}

try {
    const url = "http://localhost:8080/auth/signup";

const response = await fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(signUpInfo)
    
});
const result = await response.json();
const {success, message,error} = result;
if(success){
    handleSuccess(message);
    setTimeout(()=>{
        navigate('/login')
    }, 2000)
}else if(error){
    const details = error.details[0].message;
    handleError(details);
}else if(!success){
    handleError(message);
}
    console.log(result);

} catch (error) {
    handleError(error);
}


 }


  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" 
                onChange={handleChange}
                name='name'
                autoFocus
                placeholder='Enter your name...'
                value={signUpInfo.name}
                />
            </div>
            <div >
                <label htmlFor="email">Email</label>
                <input type="email" 
                onChange={handleChange}
                name='email'
                autoFocus
                placeholder='Enter your Email...'
                value={signUpInfo.email}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" 
                onChange={handleChange}
                name='password'
                value={signUpInfo.password}
                
                placeholder='Enter your Password...'
                />
            </div>
            <button  >Submit</button>
                <span>Already have an account?
                    <Link to="/login"> Login</Link>
                </span>
        </form>
        <ToastContainer /> 
    </div>
  )
}

export default Signup
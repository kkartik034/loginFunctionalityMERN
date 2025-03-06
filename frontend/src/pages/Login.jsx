import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util'

const Login = () => {
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState(
        {
           
            email:'',
            password:''
    }
    )
const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name,value);
    const copyLoginInfo = {...loginInfo};
   copyLoginInfo[name] = value;
   setLoginInfo(copyLoginInfo);
}
 console.log('loginInfo--', loginInfo);

 const handleLogin = async (e) => {
e.preventDefault();
const { password,email} = loginInfo;
if(  !password || !email) {
    return handleError('name,email,password are required')
}

try {
    const url = 'https://login-functionality-mern-api.vercel.app//auth/login';

const response = await fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
    
});
const result = await response.json();
const {success, message,jwtToken,name, error} = result;
if(success){
    handleSuccess(message);
    localStorage.setItem('token',jwtToken);
    localStorage.setItem('loggedInUser',name);
    setTimeout(()=>{
        navigate('/home')
    }, 1000)
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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            
            <div >
                <label htmlFor="email">Email</label>
                <input type="email" 
                onChange={handleChange}
                name='email'
                autoFocus
                placeholder='Enter your Email...'
                value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" 
                onChange={handleChange}
                name='password'
                value={loginInfo.password}
                
                placeholder='Enter your Password...'
                />
            </div>
            <button  >Submit</button>
                <span>Does't have account?
                    <Link to="/signup"> Signup</Link>
                </span>
        </form>
        <ToastContainer /> 
    </div>
  )
}

export default Login

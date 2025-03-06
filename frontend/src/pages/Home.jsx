import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser,setLoggedInUser] = useState('')
  const navigate = useNavigate();
  const [product, setProduct]= useState([]);
useEffect(() => {
  setLoggedInUser(localStorage.getItem('loggedInUser'))
},[])


const fetchProducts = async () => {
  try {
      const url = 'https://login-functionality-mern-api.vercel.app//products';
      const headers = {
          headers: {
              'Authorization': localStorage.getItem('token')
          }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProduct(result);
  } catch (err) {
      handleError(err);
  }
}
useEffect(()=>{
  fetchProducts()
}, [])

const handleLogOut = (e) =>{
localStorage.removeItem('token');
localStorage.removeItem('loggedInUser');
handleSuccess('User logged out');
setTimeout(()=>{
navigate('/login');
}, 1000)
}
  return (
    <>

    <div>
      <h1>vir</h1>
    </div>
    <div>{loggedInUser}</div>
    <button onClick={handleLogOut} >Logout</button>
<div>
  {
     product.map((item,index) =>{
      return(
        <ul key={index}>
        <span>{item.name} : {item.price}</span>
            </ul>
      )
     
    })
  }
</div>

    <ToastContainer />
    </>
  )

}

export default Home

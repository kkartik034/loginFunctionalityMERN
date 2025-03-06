// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route,Routes ,Navigate  } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useState } from 'react'
import RefreshHandler from './RefreshHandler'

function App() {
  // const [count, setCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const PrivateRoute = ({element}) => {
  return isAuthenticated ? element : <Navigate to='/login' />
}



  return (
    <> 
 {/* <h1>project is running</h1> */}
<RefreshHandler setIsAuthenticated={setIsAuthenticated} />
<Routes>
  <Route path= '/' element={<Navigate to="/login" />}  />
<Route path='/home'  element={<PrivateRoute element={<Home />}/>}/>
  <Route path='/login'  element={<Login />}/>
  <Route path='/signup'  element={<Signup />}/>
  
  
</Routes>


    </>
  )
}

export default App

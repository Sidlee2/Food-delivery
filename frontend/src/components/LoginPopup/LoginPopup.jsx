import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/food del assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState,setCurrState]=useState("Login")
  const [data,setData] = useState({ //here we'll store the name,email and pw of the user
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({
      ...data,
      [name]:value
    }))
  }

  const onLogin = async (event) => {
    event.preventDefault(); 

    //now we'll create the logic to call the APIs
    let newUrl = url;
    if (currState==="Login") {
      newUrl += "/api/user/login"
    }
    else
    {
      newUrl +="/api/user/register"
    }
    
    const response = await axios.post(newUrl,data);//here we'll call the API

    if(response.data.success)
    {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token); //here we've saved the data in the local storage
      setShowLogin(false); //i.e after successfully logging in,we'll use this setShowLogin functiom to hide the logn page
    }
    else
    {
      alert(response.data.message)
    }

  }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
            <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, you agree to our Terms of Use and Privacy Policy.</p>
        </div>
        {currState==="Login"?<p>Start by creating a new account! <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p> : <p>Have an existing account? ,<span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup

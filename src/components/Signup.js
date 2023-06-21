import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:"",})
  const navigate=useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password,cpassword}=credentials

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name,email,password})
    })
    const json=await response.json()
    console.log(json)
    if(json.status=="success"){
        //save the token into the local storage
        localStorage.setItem('token',json.token)
        navigate("/")
        props.showAlert("Account created successfully","success")


    }
    else{
        props.showAlert("Invalid credentials","danger")
    }
}

const onChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (
    <div className='container mt-3'>
        <h2>Create Account</h2>
     <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={onChange} type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input onChange={onChange} type="password" className="form-control" name="cpassword" id="cpassword" />
                </div>
               
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
    </div>
  )
}

export default Signup

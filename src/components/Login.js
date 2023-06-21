import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""})
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password})
        })
        const json=await response.json()
        console.log(json)
        if(json.status=="success"){
            //save the token into the local storage
            localStorage.setItem('token',json.token)
            navigate("/")
            props.showAlert("Loged in successfully","success")


        }
        else{
            props.showAlert("Invalid credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-3'>
            <h2>Login to Continue with iNotebook</h2>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" name="password" id="password" />
                </div>
               
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login

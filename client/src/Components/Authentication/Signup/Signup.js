import React, {  useContext, useState } from 'react'
import './Signup.css'
import {  useNavigate } from 'react-router-dom'
import UserContext from '../../UserContext/UserContext';

function Signup() {

let navigate = useNavigate();
let userdata = useContext(UserContext)
let[email,setemail] = useState("")
let[username,setusername] = useState("")
let[password,setpassword] = useState("")
let[vault,setvault] = useState([])


//Singup Button action
let SignupUser = async(e)=>{
  e.preventDefault()
    
    await fetch('http://localhost:9000/user/signup', {
        method: "POST",
        body: JSON.stringify({
            email,
            username,
            password,
            vault
           
        }),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(res => {
            return res.json();
        }).then((data) => {
           
          userdata.setuserlist(data)
        
          userdata.setisUserloggedIn(true)

          if(data.message ==="user created successfully"){
            alert("user created successfully");
            navigate("/")
          }else{
            alert("please login")
          }
          
        })

}

let backbutton=()=>{
  navigate("/")
}

  
  return (
    <div className='Signup_Container'>
        <div className='row'>
        <div className="card mx-auto shadow-lg p-3 mb-5 bg-white rounded border-0">
  <div className="card-body">
  <button type="button" className='btn btn-outline-dark border-0' onClick={backbutton}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
    <h2 style={{textAlign:"center"}}>REGISTRATION FORM</h2>
  <form style={{margin:"3px"}}>
  <div className="form-group">
    <label for="email">Email Address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e)=>setemail(e.target.value)}/>
    
  </div>
  <div className="form-group">
    <label for="fullname">Username</label>
    <input type="name" className="form-control" id="fullname" aria-describedby="emailHelp" onChange={(e)=>setusername(e.target.value)}/>
    
  </div>

  
  <div class="form-group">
    <label for="password">Master Password</label>
    <input type="password" class="form-control" id="password" onChange={(e)=>setpassword(e.target.value)}/>
  </div>
  
  
  <button type="submit" class="btn btn-primary" onClick={SignupUser}>Signup</button>
</form>


  </div>
</div>
        </div>
     
    </div>
  )
}

export default Signup

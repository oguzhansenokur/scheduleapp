import React, { useState } from 'react'
import './Login.css'
import PropTypes from 'prop-types';
import {Jumbotron} from 'reactstrap'



export default function Login(props) {
    



    return (
      <Jumbotron>
       
      <div className=' flex-column container bg-light col-lg-6'>
      <h1 className='text-center'>Login Page</h1>
      
      <form onSubmit={props.onSubmit} className='p-5' >
      <div className="form-group ">
        <label for="exampleInputEmail1">Username</label>
        <input type="text" className="form-control"  placeholder="Your Username" onChange={props.username} />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" className="form-control"  placeholder="Password"  onChange={props.password}  />
      </div>
    
    <div className='text-center mt-4'>  <button onClick={props.OnClick} className='btn btn-primary ' >Login</button></div>

                <div className='text-danger text-center'><p>{props.message}</p> </div>
    </form>
  
</div>
</Jumbotron>  

       
    )
}


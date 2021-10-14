import React from 'react'

export default function Createrequest(props) {
    return (
        <div className='col-lg-6' >
          <form onSubmit={props.onSubmit} >
          <input type='text' placeholder='Enter Your Request' onChange={props.onChange}  className='form-control' />
          <div className='text-center'>
          <button onClick={props.onClick} className='btn btn-success mt-4'>Send Job</button>
          </div>
          </form>
        </div>
    )
}

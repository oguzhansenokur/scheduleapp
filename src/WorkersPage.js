import React from 'react'
import {Col} from 'reactstrap'
import Createrequest from './components/Createrequest'
import Schedule from './components/Schedule'
export default function WorkersPage() {
    return (
            <div className='container'>
            
            <Col>
               <div className='row h-100 '>
                   
                   <div className='h-25 d-inline-block'>
                       <Schedule/>
                       </div>     
                       <div className='h-25 d-inline-block'>
                       <Createrequest/>
                       </div>       
                           
               </div>
               </Col>
               
               
               
        </div>
    )
}

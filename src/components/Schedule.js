import React, { useState } from 'react'
import '../App.css'

export default function Schedule(props) {

 const [myData,setMyData]=useState(props.data);
        return (
        <div className='col-lg-8 h-25 d-inline-block'>
            <table className='table table-striped header-fixed'>
                <thead>
                    <tr>
                    <th scope='col'>Job Name</th>
                    <th scope='col'>Worker</th>
                    <th scope='col'>Past Due</th>
                    <th scope='col'>Job Unique ID</th>
                        </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{props.approved_job_name}</td>
                            <td>{props.approved_job_worker}</td>
                            <td>{props.date}</td>
                            <td>{props.approved_job_unique_id}</td>
                        </tr>
                </tbody>
                </table>
                </div>
    )
}

import React, { useState, useEffect } from 'react'

export default function Jobrequests(props) {
    const [getrequests, setGetRequests] = useState(props.data);
    const [getButton, setGetButton] = useState('');
    const [reqUniqueID, setReqUniqueID] = useState('');
    const [reqResponse, setReqResponse] = useState();
   
    function accept(jobreqid) {
       
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log('id',jobreqid);
        var raw = JSON.stringify({
            "requestJobUniquesID":
            jobreqid        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost/scheduleapp/api/schedule/admin/response/accept", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error)
            );
        window.location.reload(true);
    }
    function decline(jobreqid) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({"requestJobUniquesID":
        jobreqid        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch("http://localhost/scheduleapp/api/schedule/admin/response/decline", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            window.location.reload(true);
    }
    return (
        <div className='col-lg-8 h-25 d-inline-block'>
            <table className='table table-striped header-fixed'>
                <thead>
                    <tr>
                        <th scope='col'>Job Name</th>
                        <th scope='col'>Requester</th>
                        <th scope='col'>Requested Date</th>
                        <th scope='col'>Job Unique ID</th>
                     </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>{props.data.request_job_name}</td>
                        <td>{props.data.request_job_worker_uname}</td>
                        <td>{props.data.request_job_current_date}</td>
                        <td>{props.data.request_job_worker_uname}</td>
                        <button   onClick={()=>accept(props.data.request_job_unique_id)} className='btn btn-success btn-sm'>Accept</button><button className='btn btn-danger btn-sm' key={props.request_job_unique_id} onClick={()=>decline(props.data.request_job_unique_id)} >Decline</button>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

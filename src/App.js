import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Schedule from './components/Schedule';
import Createrequest from './components/Createrequest';
import Jobrequests from './components/Jobrequests';

function getLocalObject(y) {
  var x;
  x = localStorage.getItem(y);
  return JSON.parse(x);
}
const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  });
};
function App() {
  const [username, setUsername] = useState('');
  const [requestedJobName, setRequestedJobName] = useState('');
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('');
  const [allJobs, setAllJobs] = useState([]);


  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };



    fetch("http://localhost/scheduleapp/api/schedule/all", requestOptions)
      .then(response => response.text())
      .then(result => {
        setAllJobs(JSON.parse(result))
        console.log('rs', result, 'ls', allJobs)
      })
      .catch(error => console.log('error', error));

  }, [])
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost/scheduleapp/api/schedule/admin/requests", requestOptions)
      .then(response => response.text())
      .then(result => { setRequests(JSON.parse(result)) })
      .catch(error => console.log('error', error));

  }, [])

  function exit() {
    window.localStorage.removeItem('Logged')
    clearCacheData();
    window.location.reload(true);
    
  }

  const login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    var raw = JSON.stringify({ username, password });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost/scheduleapp/api/personals/login", requestOptions)
      .then(response => response.text())
      .then(data => {
        localStorage.setItem('Logged', data);
      })
      .catch(error => console.log('error'));
    window.location.reload();
  }

  if (!getLocalObject('Logged')) {
    return (<div> <Login onSubmit={(e) => e.preventDefault(e)} username={(e) => setUsername(e.target.value)} password={(e) => setPassword(e.target.value)} OnClick={() => login()} /></div>
    )
  }
  else {
    if (getLocalObject('Logged').is_admin == 1) {
      return (
           <div>
          {allJobs.map(item => {

            return (<Schedule approved_job_name={item.approved_job_name} approved_job_unique_id={item.approved_job_unique_id} approved_job_worker={item.approved_job_worker} date={item.date} />
             )})
             }
          <Jobrequests data={requests} />
          <button onClick={exit} className='btn btn-danger'>LogOut</button>
        </div>
      );

    }
    else {

      function sendRequest() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "requestedJobName": requestedJobName,
          "uniquejobid": requestedJobName + Date.now(),
          "username": getLocalObject('Logged').username
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost/scheduleapp/api/schedule/worker/addrequest", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          window.location.reload();
      }
      return (
          <div className='ms-4 mt-4'>
          <Createrequest onSubmit={(e) => e.preventDefault()} onChange={(e) => setRequestedJobName(e.target.value)} onClick={sendRequest} />
          {allJobs.map(item => {
            return (
              <Schedule approved_job_name={item.approved_job_name} approved_job_unique_id={item.approved_job_unique_id} approved_job_worker={item.approved_job_worker} date={item.date} />
              )
              })}
            <button onClick={exit} className='btn btn-danger'>LogOut</button>
        </div>
      );
    }
    }
    }

export default App;

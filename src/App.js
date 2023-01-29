import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';

function App() {
  const [students, setStudents] = useState([]);
  const [checkinTime, setCheckinTime] = useState({});
  const [checkoutTime, setCheckoutTime] = useState({});

  useEffect(() => {
    setStudents([
      //Some Defaults Studens
      { rn: 1, name: 'Dhiraj Mokal' },
      { rn: 2, name: 'Aniket Kolhe' },
    ]);
  }, []);

  const checkIn = (rn) => {
    const currentTime = new Date();
    setCheckinTime({ ...checkinTime, [rn]: currentTime });
  }

  const checkOut = (rn) => {
    const currentTime = new Date();
    setCheckoutTime({ ...checkoutTime, [rn]: currentTime });
  }

  const [newStudent, setNewStudent] = useState({ rn: '', name: '' });

  const handleChange = (event) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    if (newStudent.rn > students.length) {
      event.preventDefault();
      setStudents([...students, newStudent]);
    } else {
      alert(`Please Enter Roll No More Than ${students.length}`);
    }
  };

  return (
    <div className="App container">
      <h2 className='text-center text-success mt-4 mb-3'>Student Attendence</h2>
      <form onSubmit={handleSubmit} className='mx-auto mb-3' style={{ maxWidth: '30vw' }}>
        <input className='form-control my-2' type="number" placeholder={`Enter Roll Number More Than ${students.length}`} name="rn" value={newStudent.rn} onChange={handleChange} />
        <input className='form-control my-2' type="text" placeholder='Enter Student Name' name="name" value={newStudent.name} onChange={handleChange} />
        <button className='btn btn-outline-primary mt-2 me-2' type="submit">Submit</button>
      </form>

      <h5 className='text-center'>Present Students: <span className='text-danger'>{Object.keys(checkinTime).length}</span></h5>
      {students.map((student) => (
        <div className='card my-3' style={{ boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)' }} key={student.rn}>
          <div className='card-body'>
            <h4 className='card-title'>Name: <span className='text-success'>{student.name}</span></h4>
            <hr />
            <h5 className='card-text'>Roll Number: {student.rn}</h5>
            <div className="d-flex">
              <p className='me-1 text-secondary'><span className='text-primary'>Checkin Time: </span>{checkinTime[student.rn] ? moment(new Date(checkinTime[student.rn])).format('MMMM Do YYYY, h:mm a') : 'Not checked in'}</p>
              <p className='ms-1 text-secondary'><span className='text-primary'>Checkout Time: </span>{checkoutTime[student.rn] ? moment(new Date(checkoutTime[student.rn])).format('MMMM Do YYYY, h:mm a') : 'Not checked out'}</p>
            </div>
            <hr />
            <button className='btn btn-outline-success me-2' onClick={() => checkIn(student.rn)} disabled={checkinTime[student.rn]}>Check In</button>
            <button className='btn btn-outline-danger' onClick={() => checkOut(student.rn)} disabled={!checkinTime[student.rn] || checkoutTime[student.rn]}>Check Out</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

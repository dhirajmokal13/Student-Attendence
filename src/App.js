import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [checkinTime, setCheckinTime] = useState({});
  const [checkoutTime, setCheckoutTime] = useState({});

  useEffect(() => {
    setStudents([
      //Some Defaults Studens
      { rn: 1, name: 'Dhiraj Mokal' },
      { rn: 2, name: 'Aniket Kolhe' },
      { rn: 3, name: 'Sanket Gaikwad' },

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
    event.preventDefault();
    setStudents([...students, newStudent]);
  };

  return (
    <div className="App container">
      <h2 className='text-center text-success mt-4 mb-3'>Student Attendence</h2>
      <form onSubmit={handleSubmit}>
        <input className='form-control my-2' type="number" placeholder={`Enter Roll Number Greater Than ${students.length}`} name="rn" value={newStudent.rn} onChange={handleChange} />
        <input className='form-control my-2' type="text" placeholder='Enter Roll Number' name="name" value={newStudent.name} onChange={handleChange} />
        <button className='btn btn-outline-primary mt-2 me-2' type="submit">Submit</button>
      </form>

      <h5 className='text-center'>Present Students: <span className='text-danger'>{Object.keys(checkinTime).length}</span></h5>
      {students.map((student) => (
        <div className='card my-3' key={student.rn}>
          <div className='card-body'>
            <h4 className='card-title'>Name: <span className='text-success'>{student.name}</span></h4>
            <h5 className='card-text'>Roll Number: {student.rn}</h5>
            <div className="d-flex">
              <p className='me-1'><span className='text-primary'>Checkin Time: </span>{checkinTime[student.rn] ? checkinTime[student.rn].toString() : 'Not checked in'}</p>
              <p className='ms-1'><span className='text-primary'>Checkout Time: </span>{checkoutTime[student.rn] ? checkoutTime[student.rn].toString() : 'Not checked out'}</p>
            </div>
            <button className='btn btn-outline-primary me-2' onClick={() => checkIn(student.rn)} disabled={checkinTime[student.rn]}>Check In</button>
            <button className='btn btn-outline-primary' onClick={() => checkOut(student.rn)} disabled={!checkinTime[student.rn] || checkoutTime[student.rn]}>Check Out</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

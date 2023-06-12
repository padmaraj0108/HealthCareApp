import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GrAddCircle } from "react-icons/gr";




const BookAppointment = () => {

    const [doctors, setDoctor] = useState([])
    const [state, setstate] = useState({data:""})

  // hook used to navigate
  const navigate = useNavigate()

  // this hooks is called when the value(s) are changed
  // first param: callback function which will be called
  // second param:
  // - list of values which when changed, the callback function gets called
  // - empty array as a second param means the callback gets calld when the component
  //   get loaded successfully
  useEffect(() => {

    if (!sessionStorage['token']) {
      navigate('/signin')
    } else {
      // load all the homes created by the user
      getDoctors();
    }
  }, [])

  const getDoctors = () => {

    axios.get('http://localhost:8080/user/showalldoctors', {
      headers: { 'Authorization': 'Bearer' + sessionStorage['token'] },
    })
      .then((response) => {

        const result = response.data

        if (response['status'] === 200) {
          console.log(result)
          // set the homes to the state member
          setDoctor(result)
        } else {
          toast.error(result['error'])
        }
      })
  };

  const addAppointmentToUser=(id)=>{
      console.log(id)
      navigate('/doctorappointment', {state : {pid : id }}) 
 
  }



  return (
    <div className="container">
      <div className="py-4">
        <h2>Book Appointment</h2>
        <Button onClick={() => { navigate("/userhome") }}>Back To Home</Button>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Hospital Name</th>
              <th scope="col">Desease Name</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{doctor.firstName}</td>
                <td>{doctor.last_name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.hospital_name}</td>
                <td>{doctor.desease_name}</td>
                
                <td>
                  <Button className="primary" onClick={()=>{addAppointmentToUser(doctor.id)}} ><GrAddCircle /></Button>
                </td>
                <td>
    
                  <span>{""}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookAppointment ;

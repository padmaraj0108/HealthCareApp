import React from 'react'
import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GrAddCircle } from "react-icons/gr";
import { AiFillBackward } from "react-icons/ai";
import {AiFillDelete,AiFillEye} from "react-icons/ai";


const ManageDoctors = () => {
  const [doctors, setDoctor] = useState([])
  const [state, setstate] = useState({data:""})

  // hook used to navigate
  const navigate = useNavigate()

  useEffect(() => {

    if (!sessionStorage['token']) {
      navigate('/signin')
    } else {
      // load all the homes created by the user
      getDoctors();
    }
  }, [])

  const getDoctors = () => {
    debugger;
    axios.get('http://localhost:8080/admin/showalldoctors', {
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

  const deleteDoctor=(id)=>{

    //http://localhost:8080/admin/delete/2
    axios.delete('http://localhost:8080/admin/delete/' +id, {
      headers: { 'Authorization': 'Bearer' + sessionStorage['token'] },
    })
      .then((response) => {
debugger
        const result = response.data

        if (response['status'] === 200) {
          console.log(result)
          debugger
          toast.success(response.data.message);
          
          
          getDoctors();
         
        } else {
          toast.error(result['error'])
        }
      })
  }

  return (
    // <div className="image" style={{ backgroundImage: `url(${image1})` }}>
    <div className="container">
      
      <div className="py-4">
        <h2>Manage Doctors</h2>
        <Button onClick={() => { navigate("/adminhome") }}><AiFillBackward/>Back To Home</Button>
        <table className="table border black">
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
                 <Button className="primary" onClick={()=>{deleteDoctor(doctor.id)}} > Delete<AiFillDelete/></Button>
                </td>
                <td>
                  {/* <Link className="btn btn-primary mr-2" to={`/users/${policy.id}`}>
                    View<AiFillEye/>
                  </Link> */}
                  <span>{""}</span>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    //</div>
  )
}

export default ManageDoctors 

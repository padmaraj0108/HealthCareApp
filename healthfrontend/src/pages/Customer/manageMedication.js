import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GrAddCircle } from "react-icons/gr";




const ManageMedications = () => {

  const [Medications, setMedication] = useState([])
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
      getMedications();
    }
  }, [])

  const getMedications = () => {

    axios.get('http://localhost:8080/user/showmedications/'+ sessionStorage['id'], {
      headers: { 'Authorization': 'Bearer' + sessionStorage['token'] },
    })
      .then((response) => {

        const result = response.data

        if (response['status'] === 200) {
          console.log(result)
          // set the homes to the state member
          setMedication(result)
        } else {
          toast.error(result['error'])
        }
      })
  };

  const deletemedication=(id)=>{

    //http://localhost:8080/admin/delete/2
    axios.delete('http://localhost:8080/user/deletemedication/' +id, {
      headers: { 'Authorization': 'Bearer' + sessionStorage['token'] },
    })
      .then((response) => {
debugger
        const result = response.data

        if (response['status'] === 200) {
          console.log(result)
          debugger
          toast.success(response.data.message);
          
          
          getMedications();
         
        } else {
          toast.error(result['error'])
        }
      })
  }
 
  return (
    <div className="container">
      <div className="py-4">
        <h2>Manage Medications</h2>
        <Button onClick={() => { navigate("/userhome") }}>Back To Home</Button>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Medi ID</th>
              <th scope="col">Medi Name</th>
              <th scope="col">Medi Dosage</th>
              <th scope="col">Medi Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Medications.map((medication, index) => (
              <tr>

                <th scope="row">{index + 1}</th>
                <td>{medication.id}</td>
                <td>{medication.name}</td>
                <td>{medication.dosage}</td>
                <td>{medication.frequency}</td>
                <td>
                 <Button className="primary" onClick={()=>{deletemedication(medication.id)}} > Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedications;

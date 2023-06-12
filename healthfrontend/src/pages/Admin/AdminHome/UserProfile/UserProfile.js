import React, { useState, useEffect } from "react";
import "./UserProfile.css"
import { Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AiFillBackward } from "react-icons/ai";
import { AiOutlinePlusCircle,AiFillProfile} from "react-icons/ai";



const AdminProfile = () => {
  const navigate = useNavigate();  
  let val1 = 1
  let val2 = 0
  const [city, setCity] = useState(sessionStorage['city'])
  if(city === 'null')
  {
        val1 = 0;
        val2 = 1;
  }

  const pass =()=>{
      if(sessionStorage['role'] == 'USER')
      {
          navigate('/userhome')
      }
      else{
          navigate('/adminhome')
      }
  }

  

  return (

    <div className="container">
      <div className="py-4">
        <h2>Profile</h2>
        <Button onClick={pass}><AiFillBackward/>Back To Home</Button>
        <table className="table border shadow">
        
          <tbody  style={{textAlign:"center"}}>
              <tr>
                  <td colSpan={2}><h3>Personal Details <AiFillProfile/></h3></td>
              </tr>
              <tr>
                  <td><b>First Name</b></td>
                  <td>{sessionStorage['username']}</td>
              </tr>
              <tr>
                  <td><b>Last Name</b></td>
                  <td>{sessionStorage['last_name']}</td>
              </tr>
              <tr>
                  <td><b>Contact Number</b></td>
                  <td>{sessionStorage['contact_no']}</td>
              </tr>
              
              <tr>
                  <td><b>Email</b></td>
                  <td>{sessionStorage['email']}</td>
              </tr>
          </tbody>
        </table>
        
      </div>
    </div>
//    </div>
  );
};
export default AdminProfile;

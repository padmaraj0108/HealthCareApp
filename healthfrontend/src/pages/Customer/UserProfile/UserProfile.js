import React, { useState, useEffect } from "react";
import "./UserProfile.css"
import { Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AiFillBackward } from "react-icons/ai";
import { AiOutlinePlusCircle,AiFillProfile} from "react-icons/ai";



const UserProfile = () => {
    debugger
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
//<div className="image" style={{ backgroundImage: `url(${image1})` }}>
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
        <div>
        <Button onClick={() => { navigate("/addaddress") }} style={{opacity:val2}}>Add Address<AiOutlinePlusCircle /></Button>
        </div>
        <center>
        <table className="table border shadow" style={{opacity:val1}}>
          <tbody  style={{textAlign:"center"}}>
              <tr>
                  <td colSpan={2}><h3>Address Details</h3></td>
              </tr>
              <tr>
                  <td><b>City</b></td>
                  <td>{sessionStorage['city']}</td>
              </tr>
              <tr>
                  <td><b>Pin-Code</b></td>
                  <td>{sessionStorage['pincode']}</td>
              </tr>
              <tr>
                  <td><b>Street</b></td>
                  <td>{sessionStorage['street']}</td>
              </tr>
              <tr>
                  <td><b>State</b></td>
                  <td>{sessionStorage['state']}</td>
              </tr>
          </tbody>
        </table>
        </center>
      </div>
    </div>
//    </div>
  );
};
export default UserProfile;

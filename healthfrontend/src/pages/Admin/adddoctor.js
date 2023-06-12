import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Button, Toast } from "react-bootstrap";
import { AiFillBackward} from "react-icons/ai";

import { AiOutlinePlusCircle } from "react-icons/ai";
//import image1 from "../../../../../../healthfrontend/src/assets/images/image1.jpg"

const AddDoctor = () => {

  const [firstName, setfirstName] = useState('')
  const [last_name, setlast_name] = useState('')
  const [email, setemail] = useState('')
  const [hospital_name, sethospital_name] = useState('')
  const [desease_name, setdesease_name] = useState('')

  const navigate = useNavigate()

  const addDoctor = () => {
    if (firstName.length == 0) {
      toast.warning('Please enter firstName')
    } else if (last_name.length == 0) {
      toast.warning('Please enter lastName')
    } else if (email.length == 0) {
      toast.warning('Please enter email')
    } else if (hospital_name.length == 0) {
      toast.warning('Please enter hospitalname')
    }  else if (desease_name == 0) {
      toast.warning('Please enter deseaseName')
    } else {
      const body = {
        firstName,
        last_name,
        email,
        hospital_name,
        desease_name
        
      }



      axios.post('http://localhost:8080/admin/adddoctor', body, {
        headers: { 'Authorization': 'Bearer' + sessionStorage['token'] }
      }).then((response) => {
        const result = response.data

        debugger
        if (response.status === 202) {
          debugger
          toast.success('Successfully added new Doctor')

          // navigate to the adminHome page
          navigate('/adminhome')
        } else {

          toast.error(result['error'])
        }

      })
    }

  }



  return (
   // <div className="image" style={{ backgroundImage: `url(${image1})` }}>
  <div>
    <center> <h1 className="title">Add Doctor<AiOutlinePlusCircle /></h1></center>

    <div style={styles.container}>

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <div className="mb-3">
              <Button onClick={() => { navigate("/adminhome") }}><AiFillBackward/>Back To Home</Button>
              <br></br><br></br>
              <label htmlFor="" className="label-control">
                first Name
              </label>
              <input
                onChange={(e) => {
                    setfirstName(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Last Name
              </label>
              <input
                onChange={(e) => {
                    setlast_name(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Email
              </label>
              <input
                onChange={(e) => {
                    setemail(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Hospital Name
              </label>
              <input
                onChange={(e) => {
                    sethospital_name(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Desease Name
              </label>
              <input
                onChange={(e) => {
                    setdesease_name(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            
            <br></br><br></br>
            <div className="mb-3">

              <button onClick={addDoctor} className="btn btn-primary">
                <AiOutlinePlusCircle />
                Add Doctor
              </button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  </div>
  //</div>
  )
}

const styles = {
  container: {
    width: 450,
    height: 300,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    margin: 'auto',
    borderColor: '#db0f62',
    borderRadius: 40,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
    backgroundcolor:'#9c9598'
  },
  
}
export default AddDoctor
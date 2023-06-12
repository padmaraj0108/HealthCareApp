import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Button, Toast } from "react-bootstrap";
import { AiFillBackward} from "react-icons/ai";

import { AiOutlinePlusCircle } from "react-icons/ai";


const AddMedication = () => {

  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setfrequency] = useState('')
  

  const navigate = useNavigate()

  const addMedication = () => {
    if (name.length == 0) {
      toast.warning('Please enter Medication Name')
    } else if (dosage == 0) {
      toast.warning('Please enter Dosage')
    } else if (frequency.length == 0) {
      toast.warning('Please enter frequency')
    }  else {
      const body = {
        name,
        dosage,
        frequency
        
      }



      axios.post('http://localhost:8080/user/addmedication/'+sessionStorage['id'], body, {
        headers: { 'Authorization': 'Bearer' + sessionStorage['token'] }
      }).then((response) => {
        const result = response.data

        debugger
        if (response.status === 202) {
          debugger
          toast.success('Successfully added new Medication')

          // navigate to the adminHome page
          navigate('/userhome')
        } else {

          toast.error(result['error'])
        }

      })
    }

  }



  return (
   // <div className="image" style={{ backgroundImage: `url(${image1})` }}>
  <div>
    <center> <h1 className="title">Add Medication<AiOutlinePlusCircle /></h1></center>

    <div style={styles.container}>

      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <div className="mb-3">
              <Button onClick={() => { navigate("/userhome") }}><AiFillBackward/>Back To Home</Button>
              <br></br><br></br>
              <label htmlFor="" className="label-control">
                Medication Name
              </label>
              <input
                onChange={(e) => {
                    setName(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Medication Dosage
              </label>
              <input
                onChange={(e) => {
                    setDosage(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Frequency
              </label>
              <input
                onChange={(e) => {
                    setfrequency(e.target.value)
                }}
                type="text"
                className="form-control"
              />
            </div>

            
            <div className="mb-3">

              <button onClick={addMedication} className="btn btn-primary">
                <AiOutlinePlusCircle />
                Add Medication
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
    height: 200,
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
export default AddMedication
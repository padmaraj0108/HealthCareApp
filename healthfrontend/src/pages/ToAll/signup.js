import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogin ,AiOutlineCheckCircle } from "react-icons/ai";
import image1 from "../../../src/assets/images/image1.jpg"

import "./signup.css";

const Signup = () => {
  
  // get user inputs
  const [firstName, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [date, setDOB] = useState('')
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState('')
  const [contact_no, setPhone] = useState('')
  const [userRole, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isOlderThan65, setIsOlderThan65] = useState(false);
  function calculateAge(date) {
    const dob = new Date(date);
    const ageDiff = Date.now() - dob.getTime();
    const age = new Date(ageDiff).getUTCFullYear() - 1970;
    setIsOlderThan65(age > 65);
  }
  // this function is used to navigate from one component to another programmatically
  // userNavigate() returns a function reference
  const navigate = useNavigate()
  function onChangeValue(event) {
    setGender(event.target.value);
    console.log(event.target.value);
  }

  function handleSelectChange(event) {
    debugger
    setRole(event.target.value);
}
 
  const signup = () => {
    calculateAge(date);
    // check if user has really entered any value
    if (firstName.length === 0) {
      toast.error('please enter first name')
    } else if (last_name.length === 0) {
      toast.error('please enter last name')
    }  else if (date.length === 0) {
      toast.error('please enter DOB')
    } 
    
    else if (gender.length === 0) {
      toast.error('please enter Gender')
    }  else if (email.length === 0) {
      toast.error('please enter email')
    } else if (contact_no.length === 0) {
      toast.error('please enter phone number')
    }  else if (userRole.length === 0) {
      toast.error('please enter role')
    } else if (password.length === 0) {
      toast.error('please enter password')
    } else if (confirmPassword.length === 0) {
      toast.error('please confirm password')
    } else if (password !== confirmPassword) {
      toast.error('password does not match')
    } 
       else if (!isOlderThan65) {
        toast.error('You must be 65 years or older to sign up.');
      }
    else {
      // make the API call to check if user exists
      // const bcrptPass= window.atob(password)
      //console.log("date from form"+date);
      axios
        .post(config.serverURL + '/home/register', {
          firstName,
          last_name,
          date,
          gender,
          email,
          userRole,
          password,
          contact_no,
        })
        .then((response) => {
          // get the data returned by server
          debugger;
          const result = response.data
          // check if user's authentication is successfull
          if (response.data.success === 'false') {
            toast.error('invalid email or password')
          } else {
            toast.success('successfully registered a new user')

            // navigate to the singin page
            navigate('/signin')
          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }

  return (
    <div className="image" style={{ backgroundImage: `url(${image1})`,marginTop: 0 }}>
      <h3> Register here...<AiOutlineCheckCircle/></h3>
    <div style={{ marginTop: 3 }}>
      <div style={styles.container}>
        <div className='mb-3'>
          <label>First Name</label>
          <input
            onChange={(event) => {
              setFirstName(event.target.value)
            }}
            className='form-control'
            type='text'
          />
        </div>

        <div className='mb-3'>
          <label>Last Name</label>
          <input
            onChange={(event) => {
              setLastName(event.target.value)
            }}
            className='form-control'
            type='text'
          />
        </div>

        <div className='mb-3'>
          <label>Date Of Birth</label>
          <input
            onChange={(event) => {
              setDOB(event.target.value)
            }}
            className='form-control'
            type='date'
          />
        </div>
            <div> <label>Gender</label></div>
        <div onChange={onChangeValue}>
      <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male 
      <input type="radio" value="Female" name="gender" checked={gender === "Female"}/> Female
      <input type="radio" value="Other" name="gender" checked={gender === "Other"} /> Other
    </div>
    <br></br>
        <div className='mb-3'>
          <label>Email</label>
          <input
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            className='form-control'
            type='email'
          />
        </div>
        <div className='mb-3'>
          <label>Phone Number</label>
          <input
            onChange={(event) => {
              setPhone(event.target.value)
            }}
            className='form-control'
            type='number'
          />
        </div>

        <div className='mb-3'>
          <label>Role</label> <span>{"    "} </span>

          <select value={userRole} onChange={handleSelectChange}> //set value here
          <option value="-1">SELECT</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            
        </select>
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            className='form-control'
            type='password'
          />
        </div>

        <div className='mb-3'>
          <label>Confirm Password</label>
          <input
            onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}
            className='form-control'
            type='password'
          />
        </div>

        <div className='mb-3' style={{ marginTop: 40 }}>
          <div>
            Already have an account? <Link to='/signin'><AiOutlineLogin/>Signin here</Link>
          </div>
          <button onClick={signup} style={styles.signinButton}>
          <AiOutlineLogin/> Signup
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

const styles = {
  container: {
    width: 500,
    height: 450,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#db0f62',
    borderRadius: 40,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
    borderRadius: 20,
  },
}

export default Signup

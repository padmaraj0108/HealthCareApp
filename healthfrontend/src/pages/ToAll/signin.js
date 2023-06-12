import { useState } from 'react'
import { json, Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


// use the dispatch to update the redux store about the signin state
import { useDispatch } from 'react-redux'
import { signin } from '../../slices/authSlice'
import "./signup.css";

const Signin = () => {
  // get user inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the dispatcher
  const dispatch = useDispatch()

  // get the navigate function reference
  const navigate = useNavigate()

  const signinUser = () => {
    // check if user has really entered any value
    if (email.length === 0) {
      toast.error('please enter email')
    } else if (password.length === 0) {
      toast.error('please enter password')
    } else {
      // make the API call to check if user exists
      axios
        .post(config.serverURL + '/authenticate', {   //http://localhost:8080/authenticate
          email,
          password,
        })
        .then((response) => {
          debugger
          console.log(response.data)
          // get the data returned by server

          const result = response

          // check if user's authentication is successfull
          if (result['status'] != 200) {
            toast.error('invalid email or password')
          } else {
            // get the logged in user's info
            const user = result['data']
            debugger
            // send the action
            dispatch(signin(user))

            toast.success('welcome to Health Care App')
            if (user.role === 'USER')
              navigate('/userhome')
            else
              navigate('/adminhome')
          }
        })
        .catch((error) => {
          debugger
          setEmail("")
          setPassword("")
          toast.error('Wrong Credentials...')

          console.log('error')
          console.log(error)
        })
    }
  }

  return (
    <div >
      <h3> <b>Singin here...</b></h3>
      <div style={{ marginTop: 3 }}>
        <div style={styles.container}>
          <div className='mb-3'>
            <label>Email</label>
            <input id="email" value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              className='form-control'
              type='email'
            />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input id="password" value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              className='form-control'
              type='password'
            />
          </div>
          <div className='mb-3' style={{ marginTop: 40 }}>
            <div>
              Dont have an account? <Link to='/signup'>Signup here</Link>
            </div>
            <button onClick={signinUser} style={styles.signinButton}>
              Signin
          </button>
          </div>
        </div>
      </div>
      
      <h3> <b>Health Care App</b></h3>
    </div>
  )
}

const styles = {
  container: {
    width: 400,
    height: 200,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 10,
    margin: 'auto',
    borderColor: '#db0f62',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
    backgroundcolor:"#e0cce0",
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#db0f62',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}

export default Signin
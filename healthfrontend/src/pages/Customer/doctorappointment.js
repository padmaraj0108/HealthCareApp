
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BookAppointment from './bookappointment'

const DoctorAppointment = () => {
    // get user inputs

    const props = useLocation();
    console.log(props.state.pid)

    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('')
    
    // this function is used to navigate from one component to another programmatically
    // userNavigate() returns a function reference
    const navigate = useNavigate()

    const signup = () => {
        // check if user has really entered any value
        if (description.length === 0) {
            toast.error('please enter Description')
        } else if (dateTime.length === 0) {
            toast.error('please enter date')
        } 
         else {
            
            axios.post('http://localhost:8080/user/bookappointment/' + sessionStorage['id'] + '/' + props.state.pid, {
                description,
                dateTime,
            }, {
                headers: { 'Authorization': 'Bearer' + sessionStorage['token'] }
            })
                .then((response) => {
                    debugger
                    const result = response.data

                    if (response.data.success==='true') {

                        console.log(result)
                        // set the homes to the state member
                        toast.success(response.data.message);
                        navigate('/userhome');
                    } else {
                        toast.error(response.data.message)
                        navigate('/userhome');
                    }
                })


        }
    }

    return (

        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <td colSpan={2}> <center><h1>Add Appointment Details  {props.state.pid}</h1></center> </td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <div style={{ marginTop: 50 }}>
                                <div style={styles.container}>
                                    <div className='mb-3'>
                                        <label>Description</label>
                                        <input
                                            onChange={(event) => {
                                                setDescription(event.target.value)
                                            }}
                                            className='form-control'
                                            type='text'
                                        />
                                    </div>

                                    <div className='mb-3'>
                                        <label>Appointment Date and Time</label>
                                        <input
                                            onChange={(event) => {
                                                setDateTime(event.target.value)
                                            }}
                                            className='form-control'
                                            type='datetime-local'
                                        />
                                    </div>
                                    <div className='mb-3' style={{ marginTop: 40 }}>

                                    <button onClick={signup} style={styles.signinButton}>
                                            Add Appointment
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </td>
  
                    </tr>
                </tbody>
            </table>
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
        bottom: 0,
        margin: 'auto',
        borderColor: '#db0f62',
        borderRadius: 10,
        broderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    container2: {
        width: 400,
        height: 450,
        padding: 20,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        borderColor: '#db0f62',
        borderRadius: 10,
        broderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '1px 1px 20px 5px #C9C9C9',
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

export default DoctorAppointment
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddAddress = () => {

    // get user inputs
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPin] = useState('')
    const [street, setStreet] = useState('')
    

    // this function is used to navigate from one component to another programmatically
    // userNavigate() returns a function reference
    const navigate = useNavigate()


    const addAddress = () => {
debugger
        // check if user has really entered any value
        if (city.length === 0) {
            toast.error('please enter city name')
        } else if (state.length === 0) {
            toast.error('please enter state name')
        } else if (pincode.length === 0) {
            toast.error('please enter pincode')
        } else if (street.length === 0) {
            toast.error('please enter street')
        } 
         else {
            // make the API call to check if user exists
            sessionStorage.setItem('city',city)
            sessionStorage.setItem('state',state)
            sessionStorage.setItem('pincode',pincode)
            sessionStorage.setItem('street',street)
            

            //http://localhost:8080/user/addAddress/1
            axios
                .post('http://localhost:8080/user/addAddress/' + sessionStorage['id'], {
                    city,
                    state,
                    pincode,
                    street,
                }, {
                    headers: { 'Authorization': 'Bearer' + sessionStorage['token'] }
                })
                .then((response) => {
                    // get the data returned by server
                    debugger;
                    const result = response.data
                    // check if user's authentication is successfull
                    if (result.success === 'false') {
                        toast.error(result.message)
                    } else {
                        toast.success(result.message)

                        // navigate to the singin page
                        navigate('/userProfile')
                    }
                })
                .catch((error) => {
                    console.log('error')
                    console.log(error)
                })
        }
    }

    return (
        <div style={{ marginTop: 30 }}>
            <center><h2>Add Address</h2></center>
            <div style={styles.container}>
                <div className='mb-3'>
                    <label>City</label>
                    <input
                        onChange={(event) => {
                            setCity(event.target.value)
                        }}
                        className='form-control'
                        type='text'
                    />
                </div>

                <div className='mb-3'>
                    <label>State</label>
                    <input
                        onChange={(event) => {
                            setState(event.target.value)
                        }}
                        className='form-control'
                        type='text'
                    />
                </div>

                <div className='mb-3'>
                    <label>Pin-Code</label>
                    <input
                        onChange={(event) => {
                            setPin(event.target.value)
                        }}
                        className='form-control'
                        type='text'
                    />
                </div>

                <div className='mb-3'>
                    <label>Street</label>
                    <input
                        onChange={(event) => {
                            setStreet(event.target.value)
                        }}
                        className='form-control'
                        type='text'
                    />
                </div>

        
                <div className='mb-3' style={{ marginTop: 40 }}>

                    <button onClick={addAddress} style={styles.signinButton}>
                        Add Address
          </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: 400,
        height: 550,
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

export default AddAddress
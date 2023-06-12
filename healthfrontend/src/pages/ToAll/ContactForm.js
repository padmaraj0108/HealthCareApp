import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const navigate=useNavigate();
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    toast.success("Thank you for your valuable feedback..")
    navigate('/'); 
   
    
  }
  return (
    
    <div >
<center>
<h2 className="mb-2">Contact Us...<FaTelegramPlane/></h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className="form-control" id="message" required />
        </div>
        <button className="btn btn-danger" type="submit">
          {formStatus}
        </button>
      </form>

      <h2 style={{marginLeft:80}}><b>HEALTH CARE APP</b></h2>
</center>
    </div>
    
  )
}
export default ContactForm
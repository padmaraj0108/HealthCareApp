
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MainPage from './pages/ToAll/mainpage';
import About from './pages/ToAll/about';
import Navbar from './Component/Navbar';
import ContactForm from './pages/ToAll/ContactForm';
import Signin from './pages/ToAll/signin';
import Signup from './pages/ToAll/signup';
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import AdminHome from "../src/pages/Admin/AdminHome/index"
import AllDoctors from './pages/Admin/AdminHome/alldoctors';
import AddDoctor from './pages/Admin/adddoctor';
import UserProfile from './pages/Customer/UserProfile/UserProfile';
import AdminProfile from './pages/Admin/AdminHome/UserProfile/UserProfile';
import CustomerHome from './pages/Customer/CustHome';
import AddAddress from './pages/Customer/AddAddress/addAddress';
import BookAppointment from './pages/Customer/bookappointment';
import DoctorAppointment from './pages/Customer/doctorappointment';
import ShowAllAppointments from './pages/Customer/showallappointments';
import ManageAllAppointments from './pages/Customer/manageappointments';
import AddMedication from './pages/Customer/CustHome/addmedication';
import ShowMedications from './pages/Customer/CustHome/showallmedications';
import ManageMedications from './pages/Customer/manageMedication';
import ManageDoctors from './pages/Admin/managedoctors';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<ContactForm />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />

      <Route path='/adminhome' element={<AdminHome />} />
      <Route path='/showalldoctors' element={<AllDoctors/>} />
      <Route path='/adddoctor' element={<AddDoctor/>} />
      <Route path='/UserProfile' element={<UserProfile/>} />
      <Route path='/adminprofile' element={<AdminProfile/>} />

      <Route path='/userhome' element={<CustomerHome />} />
      <Route path='/addaddress' element={<AddAddress />}  />
      <Route path='/bookappointment' element={<BookAppointment />}  />
      <Route path='/doctorappointment' element={<DoctorAppointment />}  />
      <Route path='/showappointment' element={<ShowAllAppointments />}  />
      <Route path='/manageappointment' element={<ManageAllAppointments />}  />
      <Route path='/addmedication' element={<AddMedication />}  />
      <Route path='/showmedication' element={<ShowMedications />}  />
      <Route path='/managemedication' element={<ManageMedications />}  />
      <Route path='/managedoctors' element={<ManageDoctors  />}  />
      
    
      </Routes>
     
      {/* this contai ner is used to show toast messages */}
      <ToastContainer
  position='top-center'
  autoClose={1000}
  style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
/>
      
    </Router>
  );
}

export default App;

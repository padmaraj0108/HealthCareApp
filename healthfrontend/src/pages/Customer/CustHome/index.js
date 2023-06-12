
import './index.css'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import image1 from "../../../../../healthfrontend/src/assets/images/image1.jpg"

import { useNavigate } from "react-router";


const CustomerHome = () => {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  const { username, last_name } = sessionStorage;
  let uppercasetext = username.toUpperCase() + ' ' + last_name.toUpperCase();


  const userpage = () => {
    navigate('/userhome')
  }

  const bookappointment = () => {
    navigate('/bookappointment')
  }

  const showallappointments = () => {
    navigate('/showappointment')
  }

  const manageappointments = () => {
    navigate("/manageappointment");
  }

  const addmedication = () => {
    navigate("/addmedication");
  }

  const showmedication = () => {
    navigate("/showmedication");
  }

  const managemedication = () => {
    navigate("/managemedication");
  }

  const userprofile = () => {
    navigate('/userprofile');
  }

  
  return (
    <div className="image" style={{ backgroundImage: `url(${image1})` }}>
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>

        <Sidebar style={{ height: "100vh" }}>
          <Menu>
            <MenuItem
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "initial" }}
            >
              {" "}
              <h4>User Home</h4>
            </MenuItem>
            <button class="button-solid" onClick={userpage}>
              <MenuItem > Home</MenuItem>
            </button>

            <button class="button-solid" onClick={bookappointment}>
              <MenuItem >Book Appointment</MenuItem>
            </button>

            <button class="button-solid" onClick={showallappointments}>
              <MenuItem >Show Appointments</MenuItem>
            </button>

            <button class="button-solid" onClick={manageappointments }>
              <MenuItem >Manage Appointments</MenuItem>
            </button>


            <button class="button-solid" onClick={addmedication}>
              <MenuItem >Add Medication</MenuItem>
            </button>

            <button class="button-solid" onClick={showmedication}>
              <MenuItem >Show Medications</MenuItem>
            </button>


            <button class="button-solid" onClick={managemedication}>
              <MenuItem >Manage Medication</MenuItem>
            </button>

            <button class="button-solid" onClick={userprofile}>
                <MenuItem >Profile</MenuItem>
              </button>

          </Menu>


        </Sidebar>
        <main>

        </main>
      </div>
    </div>
  );
};

export default CustomerHome;

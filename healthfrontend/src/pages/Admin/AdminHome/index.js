
import './index.css'
import image1 from "../../../../../healthfrontend/src/assets/images/image1.jpg"
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import { useNavigate } from "react-router";


const AdminHome = () => {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  const { username, last_name } = sessionStorage;
  let uppercasetext = username.toUpperCase() + ' ' + last_name.toUpperCase();

  
  const adminpage = () => {
    navigate('/adminhome')
  }

  const managedoctors= () => {
    navigate('/managedoctors')
  }

  const showalldoctor = () => {
    navigate("/showalldoctors");
  }

  const adddoctor = () => {
    navigate('/adddoctor');
  }
  const userprofile = () => {
    navigate('/adminprofile');
  }



  return (
    <div className="container">
      <div className="image" style={{ backgroundImage: `url(${image1})` }}>
        <div id="app" style={({ height: "100%" }, { display: "flex" })}>

          <Sidebar style={{ height: "100vh" }}>
            <Menu>
              <MenuItem
                
                onClick={() => {
                  collapseSidebar();
                }}
                style={{ textAlign: "center" }}
              >
                {" "}
                <h2>AdminHome</h2>
              </MenuItem>
              <button class="button-solid" onClick={adminpage}>
                <MenuItem>Admin Home</MenuItem>
              </button>

              <button class="button-solid" onClick={managedoctors}>
                <MenuItem >Manage Doctor</MenuItem>
              </button>

              <button class="button-solid" onClick={showalldoctor}>
                <MenuItem >ShowAllDoctors</MenuItem>
              </button>

              <button class="button-solid" onClick={adddoctor}>
                <MenuItem >Add Doctor</MenuItem>
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

    </div>
  );
};

export default AdminHome;

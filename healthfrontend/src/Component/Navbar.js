import React from 'react';
import '../../../healthfrontend/src/Component/Navbar.css';
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from "react";
import { useDetectOutsideClick } from "../useDetectOutsideClick.js";
// for getting the current state of signin status
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../slices/authSlice'
import { VscAccount } from 'react-icons/vsc';
function Navbar() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { username, last_name } = sessionStorage;
  let uppercasetext = username
  const onClick = () => setIsActive(!isActive);
  // get the current status
  const signinStatus = useSelector((state) => state.authSlice.status)

  // get the dispatcher
  const dispatch = useDispatch()

  // used to navigate
  const navigate = useNavigate()

  return (
    
    <nav style={{ backgroundColor: 'skyblue'}}
    
    className='navbar navbar-expand-lg navbar-dark'> 
    
    <div className="container-fluid">
    
    <ul className="navbar"style={{ display: 'flex', gap: '10px', marginRight: 'auto' }}>
      {!signinStatus && (
              <Link
                className='nav-link active'
                aria-current='page'
                to='/'>
                Home
              </Link>
            )}

        {signinStatus &&(sessionStorage["role"]==="USER") &&  (
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/userhome' >
                  Home
                </Link>
              </li>
            )}

        {signinStatus && (sessionStorage["role"]==="ADMIN") && (
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/adminhome' >
                  Home
                </Link>
              </li>
            )}
        
            
      
        <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/about'>
                About Us
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/contact'>
                Contact Us
              </Link>
            </li>
        
      </ul>


      <ul className="navbar"style={{ display: 'flex', gap: '15px', marginLeft: '600%' ,marginTop:"-20%"}}>
          {signinStatus && (
              <li className='nav-item'>
               <h6 style={{color:'aqua' , marginTop:13, marginRight:15 }}  > WELCOME {uppercasetext}</h6>
              </li>
            )}
            {signinStatus && (
              <li className='nav-item'>
                <div className="menu-container" >
                  <Link onClick={onClick} className="nav-link active" aria-current='page'>
                    <VscAccount style={{width:24, height:24}} ></VscAccount>
                  </Link>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      <li>
                        <Link to="/UserProfile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/UserPolicy">Policy</Link>
                      </li>
                      <li>
                        <Link to={"/"} onClick={()=>{
                          dispatch(signout());
                        }}>Sign Out</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </li>
            )}
            
            <li className='nav-item'>
              {/* if user is not signed then render signin link */}
              {!signinStatus && (
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/signin'>
                  Signin
                </Link>
              )}
            </li>

          </ul>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2'
// import './RegistrationForm.css';
// import fbg from '../assests/form bg/undraw_Mobile_application_mr4r.png'
// import fb from '../assests/icons/facebook.png'
// import ins from '../assests/icons/instagram.png'
// import yt from '../assests/icons/youtube.png'
// import ln from '../assests/icons/linkedin.png'
// import gm from '../assests/icons/gmail.png'
import { AuthContext } from './Context/AuthProvider/AuthProvider';
import axios from 'axios';
// import wave from '../assests/login form/log.svg'
const LoginForm = () => {
  const { createUser, loading, updateUser, user } = useContext(AuthContext)


  const [signUpError, setSignUpError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [imageURL, setImageURL] = useState(null)

  const handleRegister = (event) => {

    event.preventDefault();
    const form = event.target;
    const organizationName = form.Organization_Name.value;
    console.log(organizationName)
    const email = form.email.value;
    // console.log(email)
    const phone = form.contactNumber.value;
    // console.log(email)
    const password = form.password.value;
    const address = form.address.value;
    const image = imageURL;
    console.log(image)
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (loading) {
          return;
        }
        const userInfo = {
          organizationName,
          phone,
          address,
          password,
          email,
          image
        };
        updateUser(userInfo).then(() => {
          saveUser(email, organizationName, phone, password, address, image);
          // navigate(from, { replace: true });
        });

      })
      .catch((error) => console.error(error));
  };

  const saveUser = (email, organizationName, phone, password, address, image) => {
    const user = { email, organizationName, phone, password, address, image };
    fetch("http://localhost:9000/users", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCreatedUserEmail(email);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const alert = () => {
    Swal.fire('Registration Completed')
  }
  const handleImageUpload = event => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key', '68ff9082aa166953b8cd94b99c87d9cf');
    imageData.append('image', event.target.files[0])

    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url)
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <section>
      <div className="fixed-top">
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark">
              <a className="navbar-brand" href="#home">FoodGenix</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="/donateNow"> Donate Now <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="/registration"> Register <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" href="/registeredOrganizations"> Organizations <span className="sr-only">(current)</span></a>
                  </li>
                  {/* <li className="nav-item">
                      <a className="nav-link" href="#mission-id">Miss</a>
                    </li> */}
                  <li className="nav-item">
                    <a className="nav-link" href="#about">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className="cont-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <p>Contact No : <a href="tel: +9198659****59">+880- 130311311</a></p>
              </div>
              <div className="col-lg-6">
                {/* <div className="social">
                  <a href="#"><img src={fb} alt="facebook" /></a>
                  <a href="#"><img src={ins} alt="inatagram" /></a>
                  <a href="#"><img src={yt} alt="youtube" /></a>
                  <a href="#"><img src={ln} alt="linkedin" /></a>
                  <a href="#"><img src={gm} alt="gmail" /></a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  {/* <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> */}
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {/* <img src={fbg} className="image" /> */}
                </div>
              </div>
            </div>
            <form className="col-lg-6" onSubmit={handleRegister}>
              <div className="card2 card border-0 px-4 py-5">
                {/* <div className="row mb-4 px-3">
                  <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                  <div className="facebook text-center mr-3"><div className="fa fa-facebook" /></div>
                  <div className="twitter text-center mr-3"><div className="fa fa-twitter" /></div>
                  <div className="linkedin text-center mr-3"><div className="fa fa-linkedin" /></div>
                </div> */}
                <div className="row px-3 mb-4">
                  <div className="line" />
                  {/* <small className="or text-center">Or</small> */}
                  <div className="line" />
                </div>
                <div className="row px-3">
                  <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                  <input className="mb-4" type="text" name="email" placeholder="Enter a valid email address" />
                </div>
                <div className="row px-3">
                  <label className="mb-1"><h6 className="mb-0 text-sm">Organization Name</h6></label>
                  <input type="text" name="Organization_Name" placeholder="Organization Name" />
                </div>
                <div className="row px-3">
                  <label className="mb-1"><h6 className="mb-0 text-sm">Contact No</h6></label>
                  <input type="text" name="contactNumber" placeholder="cell number" />
                </div>
                <div className="row px-3">
                  <label className="mb-1"><h6 className="mb-0 text-sm">Address</h6></label>
                  <input type="text" name="address" placeholder="Address" />
                </div>
                <div className="row px-3">
                  <label className="mb-1"><h6 className="mb-0 text-sm">Password</h6></label>
                  <input type="text" name="password" placeholder="Address" />
                </div>
                <div className="row px-3" onChange={handleImageUpload}>
                  <label className="mb-1"><h6 className="mb-0 text-sm">Image</h6></label>
                  <input type="file" name="organization_Image" placeholder="upload" />
                </div>
                {/* <div className="row px-3 mb-4">
                  <div className="custom-control custom-checkbox custom-control-inline">
                    <input id="chk1" type="checkbox" name="chk" className="custom-control-input" /> 
                    <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label>
                  </div>
                  <a href="#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                </div> */}
                <div className="row mb-3 px-3">
                  <button onClick={alert} type="submit" className="btn btn-blue text-center">Register</button>
                </div>
                <div className="row mb-4 px-3">
                  {/* <small className="font-weight-bold">Don't have an account? <a className="text-danger ">Register</a></small> */}
                </div>
              </div>
            </form>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              <small className="ml-4 ml-sm-5 mb-2">Copyright © 2019. All rights reserved.</small>
              <div className="social-contact ml-4 ml-sm-auto">
                {/* <span className="fa fa-facebook mr-4 text-sm" />
                <span className="fa fa-google-plus mr-4 text-sm" />
                <span className="fa fa-linkedin mr-4 text-sm" />
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

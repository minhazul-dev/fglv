/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

import { Alert, Container, Form, InputGroup, Table } from 'react-bootstrap';



const Volunteer = () => {

  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("https://foodgenix01.onrender.com/addVolunteer")
      .then((response) => response.json())
      .then((data) => {
        setVolunteers(data);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      search.trim() === '' ||
      (volunteer.volunteer_area && volunteer.volunteer_area.toLowerCase().includes(search.toLowerCase()))
    );
  });
  return (
    <div>
      <div className="container-scroller">
        {/* partial:../../partials/_navbar.html */}
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo me-5" href="../../index.html"><img src="../../images/logo.svg" className="me-2" alt="logo" /></a>
            <a className="navbar-brand brand-logo-mini" href="../../index.html"><img src="../../images/logo-mini.svg" alt="logo" /></a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
              <span className="ti-view-list" />
            </button>
            <ul className="navbar-nav mr-lg-2">
              <li className="nav-item nav-search d-none d-lg-block">
                <div className="input-group">
                  <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                    <span className="input-group-text" id="search">
                      <i className="ti-search" />
                    </span>
                  </div>
                  <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
                </div>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item dropdown me-1">
                <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-bs-toggle="dropdown">
                  <i className="ti-email mx-0" />
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
                  <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <img src="../../images/faces/face4.jpg" alt="image" className="profile-pic" />
                    </div>
                    <div className="item-content flex-grow">
                      <h6 className="ellipsis font-weight-normal">David Grey
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        The meeting is cancelled
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <img src="../../images/faces/face2.jpg" alt="image" className="profile-pic" />
                    </div>
                    <div className="item-content flex-grow">
                      <h6 className="ellipsis font-weight-normal">Tim Cook
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        New product launch
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <img src="../../images/faces/face3.jpg" alt="image" className="profile-pic" />
                    </div>
                    <div className="item-content flex-grow">
                      <h6 className="ellipsis font-weight-normal"> Johnson
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        Upcoming board meeting
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                  <i className="ti-bell mx-0" />
                  <span className="count" />
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
                  <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <div className="item-icon bg-success">
                        <i className="ti-info-alt mx-0" />
                      </div>
                    </div>
                    <div className="item-content">
                      <h6 className="font-weight-normal">Application Error</h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        Just now
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <div className="item-icon bg-warning">
                        <i className="ti-settings mx-0" />
                      </div>
                    </div>
                    <div className="item-content">
                      <h6 className="font-weight-normal">Settings</h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        Private message
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <div className="item-icon bg-info">
                        <i className="ti-user mx-0" />
                      </div>
                    </div>
                    <div className="item-content">
                      <h6 className="font-weight-normal">New user registration</h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        2 days ago
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                  <img src="../../images/faces/face28.jpg" alt="profile" />
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                  <a className="dropdown-item">
                    <i className="ti-settings text-primary" />
                    Settings
                  </a>
                  <a className="dropdown-item">
                    <i className="ti-power-off text-primary" />
                    Logout
                  </a>
                </div>
              </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span className="ti-view-list" />
            </button>
          </div>
        </nav>
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:../../partials/_sidebar.html */}
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="../../index.html">
                  <i className="ti-shield menu-icon" />
                  <span className="menu-title">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">

                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/buttons.html">Buttons</a></li>
                    <li className="nav-item"> <a className="nav-link" href="../../pages/ui-features/typography.html">Typography</a></li>
                  </ul>
                </div>
              </li>



            </ul>
          </nav>
          {/* partial */}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">

                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Volunteer Details</h4>
                      <p className="card-description">
                        <code>Volunteers who registered</code>
                      </p>
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>
                                UserId
                              </th>
                              <th>
                                First name
                              </th>
                              <th>
                                Area
                              </th>
                              <th>
                                Mobile No
                              </th>
                              <th>
                                User message
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              volunteers.map((user) => (
                                <tr>
                                  <td className="py-1">
                                    <p>{user._id}</p>
                                  </td>
                                  <td>
                                    {user.volunteer_name
                                    }
                                  </td>
                                  <td>
                                    <td>
                                      {user.volunteer_area}
                                    </td>
                                  </td>
                                  <td>
                                    {user.volunteer_phone}
                                  </td>
                                  <td>
                                    {user.volunteer_message}
                                  </td>
                                </tr>
                              ))
                            }


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 grid-margin stretch-card">

                </div>
                <div className="col-lg-12 stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-body">

                      </div>
                    </div>
                    <div className="card-body">

                      <h2 className="card-title">Assign Table</h2>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control  text-white"
                          placeholder="Search by Area"
                          value={search}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <div className="table-responsive pt-3">
                        {filteredVolunteers.length === 0 ? (
                          <Alert variant="danger">No data matches your search.</Alert>
                        ) : (
                          <table className="table table-bordered">
                            <thead>
                              <tr className="table-warning">
                                <th>_ID</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Area</th>
                                <th>Assign now</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredVolunteers.map((volunteer) => (
                                <tr key={volunteer.volunteer_name} className='table-info'>
                                  <td>{volunteer._id}</td>
                                  <td>{volunteer.volunteer_name}</td>
                                  <td>{volunteer.volunteer_phone}</td>
                                  <td>{volunteer.volunteer_area}</td>
                                  <td>
                                    <a href="#" className="btn btn-primary assign-btn" data-id={volunteer._id}>
                                      Assign Now
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* partial */}
          </div>
          {/* main-panel ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>


    </div >
  );
};

export default Volunteer;

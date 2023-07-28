import React, { useEffect } from 'react';
import "./css/style.css"
import "./css/maps/style.css.map"
import "./css/maps/style.css.map"
import "./fonts/Roboto/Roboto-Black.eot"
import "./fonts/Roboto/Roboto-Black.ttf"
import "./fonts/Roboto/Roboto-Black.woff"
import "./fonts/Roboto/Roboto-Black.woff2"
import face4 from "./images/faces/face28.jpg"
import logo from "./images/logo.svg"
import logomini from "./images/logo-mini.svg"
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import MapAdmin from './map/MapAdmin';

const Admin = () => {

    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {
        fetch("https://foodgenix01.onrender.com/users")
            .then((response) => response.json())
            .then(data => {
                setOrganizations(data)

            })
    }, [])
    // volunteers
    const [volunteers, setvolunteers] = useState([]);
    useEffect(() => {
        fetch("https://foodgenix01.onrender.com/addVolunteer")
            .then((response) => response.json())
            .then(data => {
                setvolunteers(data)

            })
    }, [])

    //paymentdetails

    const url = "https://foodgenix01.onrender.com/addPayment";
    const [paymentData, setpaymentData] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setpaymentData(data);
            console.timeLog(data);
        };
        getData()
    }, []);
    useEffect(() => {
        const total = paymentData.reduce((acc, row) => acc + row.amount, 0);
        setTotalSum(total)
    }, [paymentData]);

    // let tableList = paymentData.map((row) => (
    //     <Table

    //         amount={row.amount}
    //     />
    // ));
    return (

        <div>

            <div className="container-scroller">
                <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

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

                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">

                                </div>
                            </li>

                            <li className="nav-item nav-profile dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                                    <img src={face4} alt="profile" />
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
                    {/* partial:partials/_sidebar.html */}
                    <nav className="sidebar sidebar-offcanvas" id="sidebar">
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">
                                    <i className="ti-shield menu-icon" />
                                    <span className="menu-title">Dashboard</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/adminVolunteer">
                                    <i className="ti-view-list-alt menu-icon" />
                                    <span className="menu-title">Volunteers</span>
                                </a>
                            </li>

                        </ul>
                    </nav>
                    {/* partial */}
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4 className="font-weight-bold mb-0">FoodGenix Dashboard</h4>
                                        </div>
                                        <div>
                                            <button type="button" className="btn btn-primary btn-icon-text btn-rounded">
                                                <i className="ti-clipboard btn-icon-prepend" />Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-title text-md-center text-xl-left">Total Registered</p>
                                            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                                <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{organizations.length}</h3>
                                                {/* <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{totalSum} Eur</h3> */}
                                                <i className="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" />
                                            </div>
                                            <p className="mb-0 mt-2 text-danger">0.12% <span className="text-black ms-1"><small>(30 days)</small></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-title text-md-center text-xl-left">Total Donation</p>
                                            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                                <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{totalSum} $</h3>
                                                <i className="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0" />
                                            </div>
                                            <p className="mb-0 mt-2 text-danger">0.47% <span className="text-black ms-1"><small>(30 days)</small></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-title text-md-center text-xl-left">Organization Details</p>
                                            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                                <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">1900 Total</h3>
                                                <i className="ti-agenda icon-md text-muted mb-0 mb-md-3 mb-xl-0" />
                                            </div>
                                            <p className="mb-0 mt-2 text-success">64.00%<span className="text-black ms-1"><small>(30 days)</small></span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-title text-md-center text-xl-left">Volunteers</p>
                                            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                                <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{volunteers.length}</h3>
                                                <i className="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0" />
                                            </div>
                                            <p className="mb-0 mt-2 text-success">23.00%<span className="text-black ms-1"><small>(30 days)</small></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 grid-margin stretch-card">

                                    <MapAdmin />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-title mb-0">Donation Details</p>
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Donar</th>
                                                            <th>Amount</th>
                                                            <th>Transaction Id</th>
                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paymentData.map((user) => (
                                                            <tr>
                                                                <td>{user.name}---{user.category}</td>
                                                                {/* <td>{user.name || .category}</td> */}
                                                                <td>{user.amount}</td>
                                                                <td className="text-danger"> {user._id} <i className="ti-arrow-down" /></td>
                                                                <td><label className="badge badge-danger">{user.date}</label></td>
                                                            </tr>
                                                        ))}


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Organization Info</h4>
                                            <div className="list-wrapper pt-2">
                                                <ul className="d-flex flex-column-reverse todo-list todo-list-custom">

                                                    {organizations.map((user) => (
                                                        <li>
                                                            <div className="form-check form-check-flat">
                                                                <label className="form-check-label">
                                                                    <input className="checkbox" type="checkbox" />
                                                                    {user.organizationName
                                                                    }
                                                                </label>
                                                            </div>
                                                            <i className="remove ti-trash" />
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div >
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card position-relative">
                                        <div className="card-body">
                                            {/* <p className="card-title">Detailed Reports</p> */}
                                            <div className="row">

                                                <div className="col-md-12 col-xl-9">
                                                    <div className="row">
                                                        <div className="col-md-6 mt-3 col-xl-5">
                                                            <canvas id="north-america-chart" />
                                                            <div id="north-america-legend" />
                                                        </div>
                                                        <div className="col-md-6 col-xl-7">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        {/* content-wrapper ends */}
                        {/* partial:partials/_footer.html */}
                        <footer className="footer">
                            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="https://www.bootstrapdash.com/" target="_blank">FoodGenix </a>2022</span>
                                {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Only the best <a href="https://www.bootstrapdash.com/" target="_blank"> Bootstrap dashboard </a> templates</span> */}
                            </div>
                        </footer>
                        {/* partial */}
                    </div >
                    {/* main-panel ends */}
                </div >
                {/* page-body-wrapper ends */}
            </div >
        </div >
    );
};

export default Admin;
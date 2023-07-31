import React, { useEffect } from 'react';
import "./style.css"
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
        fetch("http://localhost:9000/users")
            .then((response) => response.json())
            .then(data => {
                setOrganizations(data)

            })
    }, [])
    // volunteers
    const [volunteers, setvolunteers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/addVolunteer")
            .then((response) => response.json())
            .then(data => {
                setvolunteers(data)

            })
    }, [])

    //paymentdetails

    const url = "http://localhost:9000/addPayment";
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
                    {/* <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <a className="navbar-brand brand-logo me-5" href="index.html"><img src={logo} className="me-2" alt="logo" /></a>
                        <a className="navbar-brand brand-logo-mini" href="index.html"><img src={logomini} alt="logo" /></a>
                    </div> */}
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
                            {/* <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                                    <i className="ti-palette menu-icon" />
                                    <span className="menu-title">UI Elements</span>
                                    <i className="menu-arrow" />
                                </a>
                                <div className="collapse" id="ui-basic">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                                    </ul>
                                </div>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="pages/forms/basic_elements.html">
                                    <i className="ti-layout-list-post menu-icon" />
                                    <span className="menu-title">Form elements</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages/charts/chartjs.html">
                                    <i className="ti-pie-chart menu-icon" />
                                    <span className="menu-title">Charts</span>
                                </a>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="/Volunteer">
                                    <i className="ti-view-list-alt menu-icon" />
                                    <span className="menu-title">Volunteers</span>
                                </a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="pages/icons/themify.html">
                                    <i className="ti-star menu-icon" />
                                    <span className="menu-title">Icons</span>
                                </a>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                                    <i className="ti-user menu-icon" />
                                    <span className="menu-title">User Pages</span>
                                    <i className="menu-arrow" />
                                </a>
                                <div className="collapse" id="auth">
                                    <ul className="nav flex-column sub-menu">
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
                                        <li className="nav-item"> <a className="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
                                    </ul>
                                </div>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="documentation/documentation.html">
                                    <i className="ti-write menu-icon" />
                                    <span className="menu-title">Documentation</span>
                                </a>
                            </li> */}
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
                                    {/* <div className="card">
                                        <div className="card-body">
                                            <p className="card-title">Sales details</p>
                                            <p className="text-muted font-weight-light">Received overcame oh sensible so at an. Formed do change merely to county it. Am separate contempt domestic to to oh. On relation my so addition branched.</p>
                                            <div id="sales-legend" className="chartjs-legend mt-4 mb-2" />
                                            <canvas id="sales-chart" />
                                        </div>
                                        <div className="card border-right-0 border-left-0 border-bottom-0">
                                            <div className="d-flex justify-content-center justify-content-md-end">
                                                <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                                                    <button className="btn btn-lg btn-outline-light dropdown-toggle rounded-0 border-top-0 border-bottom-0" type="button" id="dropdownMenuDate2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                        Today
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                                                        <a className="dropdown-item" href="#">January - March</a>
                                                        <a className="dropdown-item" href="#">March - June</a>
                                                        <a className="dropdown-item" href="#">June - August</a>
                                                        <a className="dropdown-item" href="#">August - November</a>
                                                    </div>
                                                </div>
                                                <button className="btn btn-lg btn-outline-light text-primary rounded-0 border-0 d-none d-md-block" type="button"> View all </button>
                                            </div>
                                        </div>
                                    </div> */}
                                    <MapAdmin />
                                    {/* </div>
                                <div className="col-md-6 grid-margin stretch-card">
                                    <div className="card border-bottom-0">
                                        <div className="card-body pb-0">
                                            <p className="card-title">Purchases</p>
                                            <p className="text-muted font-weight-light">The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review</p>
                                            <div className="d-flex flex-wrap mb-5">
                                                <div className="me-5 mt-3">
                                                    <p className="text-muted">Status</p>
                                                    <h3>362</h3>
                                                </div>
                                                <div className="me-5 mt-3">
                                                    <p className="text-muted">New users</p>
                                                    <h3>187</h3>
                                                </div>
                                                <div className="me-5 mt-3">
                                                    <p className="text-muted">Chats</p>
                                                    <h3>524</h3>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="text-muted">Feedbacks</p>
                                                    <h3>509</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <canvas id="order-chart" className="w-100" />

                                    // </div>*/}
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

                                                        {/* <tr>
                                                            <td>Messsy</td>
                                                            <td>Flash</td>
                                                            <td className="text-danger"> 21.06% <i className="ti-arrow-down" /></td>
                                                            <td><label className="badge badge-warning">In progress</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td>John</td>
                                                            <td>Premier</td>
                                                            <td className="text-danger"> 35.00% <i className="ti-arrow-down" /></td>
                                                            <td><label className="badge badge-info">Fixed</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Peter</td>
                                                            <td>After effects</td>
                                                            <td className="text-success"> 82.00% <i className="ti-arrow-up" /></td>
                                                            <td><label className="badge badge-success">Completed</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Dave</td>
                                                            <td>53275535</td>
                                                            <td className="text-success"> 98.05% <i className="ti-arrow-up" /></td>
                                                            <td><label className="badge badge-warning">In progress</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Messsy</td>
                                                            <td>Flash</td>
                                                            <td className="text-danger"> 21.06% <i className="ti-arrow-down" /></td>
                                                            <td><label className="badge badge-info">Fixed</label></td>
                                                        </tr> */}
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
                                                {/* <div className="col-md-12 col-xl-3 d-flex flex-column justify-content-center">
                                                    <div className="ml-xl-4">
                                                        <h1>33500</h1>
                                                        <h3 className="font-weight-light mb-xl-4">Sales</h3>
                                                        <p className="text-muted mb-2 mb-xl-0">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-12 col-xl-9">
                                                    <div className="row">
                                                        <div className="col-md-6 mt-3 col-xl-5">
                                                            <canvas id="north-america-chart" />
                                                            <div id="north-america-legend" />
                                                        </div>
                                                        <div className="col-md-6 col-xl-7">
                                                            {/* <div className="table-responsive mb-3 mb-md-0">
                                                                <table className="table table-borderless report-table">
                                                                    <tbody><tr>
                                                                        <td className="text-muted">Illinois</td>
                                                                        <td className="w-100 px-0">
                                                                            <div className="progress progress-md mx-4">
                                                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
                                                                            </div>
                                                                        </td>
                                                                        <td><h5 className="font-weight-bold mb-0">524</h5></td>
                                                                    </tr>
                                                                        <tr>
                                                                            <td className="text-muted">Washington</td>
                                                                            <td className="w-100 px-0">
                                                                                <div className="progress progress-md mx-4">
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </td>
                                                                            <td><h5 className="font-weight-bold mb-0">722</h5></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-muted">Mississippi</td>
                                                                            <td className="w-100 px-0">
                                                                                <div className="progress progress-md mx-4">
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '95%' }} aria-valuenow={95} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </td>
                                                                            <td><h5 className="font-weight-bold mb-0">173</h5></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-muted">California</td>
                                                                            <td className="w-100 px-0">
                                                                                <div className="progress progress-md mx-4">
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </td>
                                                                            <td><h5 className="font-weight-bold mb-0">945</h5></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-muted">Maryland</td>
                                                                            <td className="w-100 px-0">
                                                                                <div className="progress progress-md mx-4">
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '40%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </td>
                                                                            <td><h5 className="font-weight-bold mb-0">553</h5></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text-muted">Alaska</td>
                                                                            <td className="w-100 px-0">
                                                                                <div className="progress progress-md mx-4">
                                                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                                                                </div>
                                                                            </td>
                                                                            <td><h5 className="font-weight-bold mb-0">912</h5></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                            </div> */}
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
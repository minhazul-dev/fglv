import React, { useEffect, useState } from 'react';

const RegisteredOrg = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://foodgenix01.onrender.com/users")
            .then(res => res.json())
            .then(data => setUsers(data))
        // .then(data => console.log(data))

    }, [])
    return (
        <section className="section-padding" id="section_3">
            <header className="site-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 d-flex flex-wrap">
                            <p className="d-flex me-4 mb-0">
                                <i className="bi-geo-alt me-2" />
                                20, 0150 Dhaka, Bangladesh
                            </p>
                            <p className="d-flex mb-0">
                                <i className="bi-envelope me-2" />
                                <a href="mailto:info@company.com">
                                    foodgenix6@gmail.com
                                </a>
                            </p>
                        </div>
                        <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
                            <ul className="social-icon">
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-twitter" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-facebook" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-instagram" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-youtube" />
                                </li>
                                <li className="social-icon-item">
                                    <a href="#" className="social-icon-link bi-whatsapp" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <nav className="navbar navbar-expand-lg bg-light shadow-lg">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img src="images/logo.png" className="logo img-fluid" alt="Kind Heart Charity" />
                        <span>
                            FoodGenix
                            <small>Leftover food management and donation</small>
                        </span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link " href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="#section_2">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="#section_3">Causes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="#section_4">Volunteer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/registration">Registration</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/registeredOrg">Registered organizations</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="#section_6">Contact</a>
                            </li>
                            <li className="nav-item ms-3">
                                <a className="nav-link custom-btn custom-border-btn btn" href="/liveDonation">Live Donate</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12 text-center mb-4">
                        <h2>Registered Organizations</h2>
                    </div>
                    {
                        users.map((user) => (


                            <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                                <div className="custom-block-wrap">
                                    <img src={user.image} />
                                    <div className="custom-block">
                                        <div className="custom-block-body">
                                            <h5 className="mb-3">{user.org_name
                                            }</h5>
                                            <p>{user.org_address}</p>

                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0">
                                                    <strong>Phone :</strong>
                                                    {user.org_phone}
                                                </p>
                                            </div>
                                        </div>
                                        <a href="/mu" className="custom-btn btn">Contact now</a>
                                    </div>
                                </div>
                            </div>




                        ))
                    }
                </div>

            </div>
        </section>
    );
};

export default RegisteredOrg;
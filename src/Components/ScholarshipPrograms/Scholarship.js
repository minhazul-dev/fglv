import React, { useState } from 'react';
import axios from 'axios';

const Scholarship = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [donation, setDonation] = useState({
        apply_name: '',
        apply_email: '',
        donation_phone: '',
        apply_area: '',
        apply_education: '',
        apply_applyFor: '',
        image: null,
    });

    const handleImageUpload = async (e) => {
        const imageData = new FormData();
        imageData.append('key', '68ff9082aa166953b8cd94b99c87d9cf');
        imageData.append('image', e.target.files[0]);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', imageData);
            setDonation((prevDonation) => ({
                ...prevDonation,
                image: response.data.data.display_url, // Save the image URL in the state
            }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonation((prevDonation) => ({
            ...prevDonation,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://foodgenix01.onrender.com/scholarshipProgram', donation);
            console.log('Donation data saved successfully!');
            setSuccessMessage('Thank you for your Application! Our Team will Contact With You Soon.');
            setErrorMessage(''); // Reset error message if any
            // Reset the form after successful submission
            setDonation({
                apply_name: '',
                apply_email: '',
                donation_phone: '',
                apply_area: '0',
                apply_education: '',
                apply_applyFor: '',
                image: null,
            });
        } catch (error) {
            console.error('Error saving donation data:', error);
            setErrorMessage('An error occurred while saving your donation data. Please try again later.');
            setSuccessMessage(''); // Reset success message if any
        }
    };

    return (
        <div>
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
                        <img src="images/logo.png" className="logo img-fluid" alt="" />
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
                                <a className="nav-link click-scroll" href="index.html#section_1">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_2">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_3">Causes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_4">Volunteer</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link click-scroll dropdown-toggle" href="index.html#section_5" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">News</a>
                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                    <li><a className="dropdown-item" href="news.html">News Listing</a></li>
                                    <li><a className="dropdown-item" href="news-detail.html">News Detail</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link click-scroll" href="index.html#section_6">Contact</a>
                            </li>
                            <li className="nav-item ms-3">
                                <a className="nav-link custom-btn custom-border-btn btn" href="donate.html">Donate</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <section className="donate-section">
                    <div className="section-overlay" />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12 mx-auto">
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form className="custom-form donate-form" onSubmit={handleSubmit} role="form">
                                    <h3 className="mb-4">Appply for a scholarship</h3>
                                    <div className="row">
                                        <div className="col-lg-12 col-12">
                                            <h5 className="mt-1">Information</h5>
                                        </div>
                                        <div className="col-lg-6 col-12 mt-2">

                                            <input type="text" id="apply_name" name="apply_name" className="form-control" placeholder="Name" value={donation.apply_name} onChange={handleChange} required />
                                        </div>
                                        <div className="col-lg-6 col-12 mt-2">
                                            <input type="text" id="apply_email" name="apply_email" className="form-control" placeholder="Email" value={donation.apply_email} onChange={handleChange} required />
                                        </div>
                                        <div className="col-lg-6 col-12 mt-2">
                                            <input type="text" id="donation_phone" name="donation_phone" className="form-control" placeholder="Phone" value={donation.donation_phone} onChange={handleChange} required />
                                        </div>
                                        <div className="col-lg-6 col-12 mt-2">
                                            <input type="text" id="apply_area" name="apply_area" className="form-control" placeholder="Address" value={donation.apply_area} onChange={handleChange} required />
                                        </div>
                                        <div className="col-lg-6 col-12 mt-2">
                                            <input type="text" id="pickup_date" name="pickup_date" className="form-control" placeholder="Last Education Qualification" value={donation.pickup_date} onChange={handleChange} required />
                                        </div>
                                        <div className="col-lg-6 col-12 mt-2">
                                            <input type="text" id="apply_applyFor" name="apply_applyFor" className="form-control" placeholder="Applying For? " value={donation.apply_applyFor} onChange={handleChange} required />
                                        </div>
                                        {/* <div className="col-lg-6 col-12 mt-2">
                                            <input type="file" id="image" name="image" accept="/image" className=" form-control" placeholder="PickUp time" onChange={handleImageUpload} required />
                                        </div> */}
                                        <div className="col-lg-12 col-12 mt-2">
                                            <button type="submit" className="form-control mt-4">Submit Information</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-12 mb-4">
                            <img src="images/logo.png" className="logo img-fluid" alt="" />
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-4">
                            <h5 className="site-footer-title mb-3">Quick Links</h5>
                            <ul className="footer-menu">
                                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Our Story</a></li>
                                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Newsroom</a></li>
                                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Causes</a></li>
                                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Become a volunteer</a></li>
                                <li className="footer-menu-item"><a href="#" className="footer-menu-link">Partner with us</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mx-auto">
                            <h5 className="site-footer-title mb-3">Contact Infomation</h5>
                            <p className="text-white d-flex mb-2">
                                <i className="bi-telephone me-2" />
                                <a href="tel: 120-240-9600" className="site-footer-link">
                                    120-240-9600
                                </a>
                            </p>
                            <p className="text-white d-flex">
                                <i className="bi-envelope me-2" />
                                <a href="mailto:info@yourgmail.com" className="site-footer-link">
                                    foodgenix6@gmail.com
                                </a>
                            </p>
                            <p className="text-white d-flex mt-3">
                                <i className="bi-geo-alt me-2" />
                                20, 0150 Dhaka, Bangladesh
                            </p>
                            <a href="#" className="custom-btn btn mt-3">Get Direction</a>
                        </div>
                    </div>
                </div>
                <div className="site-footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7 col-12">
                                <p className="copyright-text mb-0">Copyright © 2021 <a href="#">Leftover food management and donation</a> FoodGenix
                                </p>
                            </div>
                            <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
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
                                        <a href="#" className="social-icon-link bi-linkedin" />
                                    </li>
                                    <li className="social-icon-item">
                                        <a href="https://youtube.com/templatemo" className="social-icon-link bi-youtube" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Scholarship;
import React, { useState } from 'react';
import axios from 'axios';
const GetInTouchForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [getInTouchmsg, setgetInTouchmsg] = useState({
        user_Fname: '',
        user_Lname: '',
        user_email: '',
        user_message: '',


    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setgetInTouchmsg((prevDonation) => ({
            ...prevDonation,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:9000/getInTouch', getInTouchmsg);
            console.log('Donation data saved successfully!');
            setSuccessMessage('Message sent! Our Team will Contact With You Soon.');
            setErrorMessage(''); // Reset error message if any
            // Reset the form after successful submission
            setgetInTouchmsg({
                user_Fname: '',
                user_Lname: '',
                user_email: '',
                user_message: '',
            });
        } catch (error) {
            console.error('Error saving donation data:', error);
            setErrorMessage('An error occurred while saving your data. Please try again later.');
            setSuccessMessage(''); // Reset success message if any
        }
    };
    return (
        <section className="contact-section section-padding" id="section_6">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-12 ms-auto mb-5 mb-lg-0">
                        <div className="contact-info-wrap">
                            <h2>Get in touch</h2>
                            <div className="contact-image-wrap d-flex flex-wrap">
                                <img src="images/avatar/pretty-blonde-woman-wearing-white-t-shirt.jpg" className="img-fluid avatar-image" alt="" />
                                <div className="d-flex flex-column justify-content-center ms-3">
                                    <p className="mb-0">Admin-HR</p>
                                    <p className="mb-0"><strong>HR &amp; Office Manager</strong></p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <h5 className="mb-3">Contact Infomation</h5>
                                <p className="d-flex mb-2">
                                    <i className="bi-geo-alt me-2" />
                                    20, 0150 Dhaka, Bangladesh
                                </p>
                                <p className="d-flex mb-2">
                                    <i className="bi-telephone me-2" />
                                    <a href="tel: 120-240-9600">
                                        120-240-9600
                                    </a>
                                </p>
                                <p className="d-flex">
                                    <i className="bi-envelope me-2" />
                                    <a href="mailto:info@yourgmail.com">
                                        hr_info_foodgenix6@gmail.com
                                    </a>
                                </p>
                                <a href="#" className="custom-btn btn mt-3">Get Direction</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-12 mx-auto">
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form className="custom-form contact-form" onSubmit={handleSubmit}>
                            <h2>Contact form</h2>
                            <p className="mb-4">Or, you can just send an email:
                                <a href="#">foodgenix6@gmail.com</a>
                            </p>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" name="user_Fname" id="user_Fname" className="form-control" placeholder="first name" required value={getInTouchmsg.user_Fname} onChange={handleChange} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" name="user_Lname" id="user_Lname" className="form-control" placeholder="last name" required value={getInTouchmsg.user_Lname} onChange={handleChange} />
                                </div>
                            </div>
                            <input type="email" name="user_email" id="user_email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Jackdoe@gmail.com" required value={getInTouchmsg.user_email} onChange={handleChange} />
                            <textarea
                                name="user_message"
                                rows={3}
                                className="form-control"
                                id="user_message"
                                placeholder="How can we help you?"
                                value={getInTouchmsg.user_message} onChange={handleChange}
                            />
                            <button type="submit" className="form-control">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouchForm;
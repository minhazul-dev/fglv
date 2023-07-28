import React, { useState } from 'react';
import axios from 'axios';

const VolunteerForm = () => {
    const [volunteer, setVolunteer] = useState({
        volunteer_name: '',
        volunteer_email: '',
        volunteer_area: '',
        volunteer_phone: '',
        volunteer_cv: '',
        volunteer_message: '',


    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVolunteer((prevDonation) => ({
            ...prevDonation,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await axios.post('http://localhost:9000/addVolunteer', volunteer);
            console.log('Donation data saved successfully!');
            setSuccessMessage('Applied successfully! Our Team will Contact With You Soon.');
            setErrorMessage(''); // Reset error message if any
            // Reset the form after successful submission
            setVolunteer({
                volunteer_name: '',
                volunteer_email: '',
                volunteer_area: '',
                volunteer_phone: '',
                volunteer_cv: '',
                volunteer_message: '',
            });
        } catch (error) {
            console.error('Error saving donation data:', error);
            setErrorMessage('An error occurred while saving your data. Please try again later.');
            setSuccessMessage(''); // Reset success message if any
        }
    };
    return (
        <section className="volunteer-section section-padding" id="section_4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <h2 className="text-white mb-4">Volunteer</h2>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form className="custom-form volunteer-form mb-5 mb-lg-0" onSubmit={handleSubmit}>
                            <h3 className="mb-4">Become a volunteer today</h3>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <input type="text" name="volunteer_name" id="volunteer_name" className="form-control" placeholder="Name" value={volunteer.volunteer_name} onChange={handleChange} required />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <input type="email" name="volunteer_email" id="volunteer_email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email" value={volunteer.volunteer_email} onChange={handleChange} required />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <input type="text" name="volunteer_area" id="volunteer_area" className="form-control" placeholder="Area" value={volunteer.volunteer_area} onChange={handleChange} required />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <input type="text" name="volunteer_phone" id="volunteer_phone" className="form-control" placeholder="Mobile no" value={volunteer.volunteer_phone} onChange={handleChange} required />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="input-group input-group-file">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="cv"
                                            name="cv"
                                            value={volunteer.volunteer_cv} onChange={handleChange}
                                        />
                                        <label className="input-group-text" htmlFor="inputGroupFile02">
                                            Upload your CV
                                        </label>
                                        <i className="bi-cloud-arrow-up ms-auto" />
                                    </div>
                                </div>
                            </div>
                            <textarea
                                name="volunteer_message"
                                rows={3}
                                className="form-control"
                                id="volunteer_message"
                                placeholder="Comment (Optional)"
                                value={volunteer.volunteer_message} onChange={handleChange}
                            />

                            <button type="submit" className="form-control">Submit</button>
                        </form>
                    </div>
                    <div className="col-lg-6 col-12">
                        <img src="images/smiling-casual-woman-dressed-volunteer-t-shirt-with-badge.jpg" className="volunteer-image img-fluid" alt="" />
                        <div className="custom-block-body text-center">
                            <h4 className="text-white mt-lg-3 mb-lg-3">About Volunteering</h4>
                            <p className="text-white">Lorem Ipsum dolor sit amet, consectetur adipsicing kengan omeg kohm tokito Professional charity theme based</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default VolunteerForm;
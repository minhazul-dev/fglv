import React, { useEffect, useState } from 'react';

const RegisteredOrg = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/users")
            .then(res => res.json())
            .then(data => setUsers(data))
        // .then(data => console.log(data))

    }, [])
    return (
        <section className="section-padding" id="section_3">
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
                                            <h5 className="mb-3">{user.organizationName}</h5>
                                            <p>{user.address}</p>
                                            {/* <div className="progress mt-4">
                                                <div className="progress-bar w-75" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                            </div> */}
                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0">
                                                    <strong>Phone :</strong>
                                                    {user.phone}
                                                </p>
                                                {/* <p className="ms-auto mb-0">
                                                    <strong>Goal: </strong>
                                                    Books/stationer: 700 students

                                                </p> */}
                                            </div>
                                        </div>
                                        <a href="/mu" className="custom-btn btn">Contact now</a>
                                    </div>
                                </div>
                            </div>




                        ))
                    }

                    {/* <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                        <div className="custom-block-wrap">
                            <img src="images/causes/poor-child-landfill-looks-forward-with-hope.jpg" className="custom-block-image img-fluid" alt="" />
                            <div className="custom-block">
                                <div className="custom-block-body">
                                    <h5 className="mb-3">Clothes Donation</h5>
                                    <p>Sed leo nisl, posuere at molestie ac, suscipit auctor mauris. Etiam quis metus tempor</p>
                                    <div className="progress mt-4">
                                        <div className="progress-bar w-50" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                    <div className="d-flex align-items-center my-2">
                                        <p className="mb-0">
                                            <strong>Donors: </strong>
                                            6
                                        </p>
                                        <p className="ms-auto mb-0">
                                            <strong>Goal: </strong>
                                            Clothes for 5000 people
                                        </p>
                                    </div>
                                </div>
                                <a href="/clothesdonation" className="custom-btn btn">Donate now</a>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-lg-4 col-md-6 col-12">
                        <div className="custom-block-wrap">
                            <img src="images/causes/african-woman-pouring-water-recipient-outdoors.jpg" className="custom-block-image img-fluid" alt="" />
                            <div className="custom-block">
                                <div className="custom-block-body">
                                    <h5 className="mb-3">Supply drinking water</h5>
                                    <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus</p>
                                    <div className="progress mt-4">
                                        <div className="progress-bar w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                    <div className="d-flex align-items-center my-2">
                                        <p className="mb-0">
                                            <strong>Raised:</strong>
                                            $84,600
                                        </p>
                                        <p className="ms-auto mb-0">
                                            <strong>Goal:</strong>
                                            $100,000
                                        </p>
                                    </div>
                                </div>
                                <a href="donate.html" className="custom-btn btn">Donate now</a>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
        </section>
    );
};

export default RegisteredOrg;
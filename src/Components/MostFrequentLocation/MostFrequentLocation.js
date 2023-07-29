import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MostFrequentVolunteerArea = () => {
    const [mostFrequentArea, setMostFrequentArea] = useState(null);

    useEffect(() => {
        const fetchMostFrequentArea = async () => {
            try {
                const response = await axios.get('https://foodgenix01.onrender.com/most-frequent-donation-area');
                if (response.data && response.data._id) {
                    setMostFrequentArea(response.data._id);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMostFrequentArea();
    }, []);

    return (
        <div>
            <button type="button" className="btn btn-primary m-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show Most Frequent donation Area
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Most Frequent donation area Area
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {mostFrequentArea ? (
                                <p>Area: {mostFrequentArea}</p>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostFrequentVolunteerArea;
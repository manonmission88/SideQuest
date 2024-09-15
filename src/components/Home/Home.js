import React, { useState } from 'react';
import Info from '../Info/Info';
import './Home.css';
import MapLogo from './assests/map.png';

const Home = () => {
    const [formData, setFormData] = useState({
        From: '',
        Destination: '',
        'Who are you traveling with?': 'Solo',
        'What are your vibes today?': '',
        'Preferred Duration': '',
        Budget: ''
    });

    const [responseMessage, setResponseMessage] = useState(''); // Placeholder for response

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure all required fields are filled
        const { From, Destination, 'Who are you traveling with?': who, 'What are your vibes today?': vibes, 'Preferred Duration': duration, Budget } = formData;

        if (!From || !Destination || !who || !vibes || !duration || !Budget) {
            alert('Please fill in all the fields.');
            return;
        }

        // Placeholder response message after form submission
        setResponseMessage('This is where the AI suggested locations or activities will appear based on your input.');
        alert('Form submitted successfully.');
    };

    return (
        <div className="container">
            <div className="form-and-response">
                {/* Travel Form */}
                <div className="home-container">
                    <div className="map-logo-container">
                        <img src={MapLogo} alt="Map Logo" className="map-logo" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* From and Destination in the same box */}
                        <div className="form-row">
                            <div className="double-field">
                                <Info
                                    title="From"
                                    type="text"
                                    value={formData.From}
                                    onChange={(value) => handleChange('From', value)}
                                    className="form-field"
                                    required={true}  // Making this field required
                                />
                                <h3>-</h3>
                                <Info
                                    title="Destination"
                                    type="text"
                                    value={formData.Destination}
                                    onChange={(value) => handleChange('Destination', value)}
                                    className="form-field"
                                    required={true}  // Making this field required
                                />
                            </div>
                        </div>
                        <Info
                            className="info info-select"
                            title="Who are you traveling with?"
                            type="select"
                            value={formData['Who are you traveling with?']}
                            onChange={(value) => handleChange('Who are you traveling with?', value)}
                            options={['Solo', 'Friends', 'Family', 'Spouse', 'Colleagues']}
                            required={true}  // Making this field required
                        />
                        <Info
                            className="info info-text"
                            title="What are your vibes today?"
                            type="text"
                            value={formData['What are your vibes today?']}
                            onChange={(value) => handleChange('What are your vibes today?', value)}
                            required={true}  // Making this field required
                        />
                        <Info
                            className="info info-number"
                            title="Preferred Duration"
                            type="number"
                            value={formData['Preferred Duration']}
                            onChange={(value) => handleChange('Preferred Duration', value)}
                            required={true}  // Making this field required
                        />
                        <Info
                            className="info info-budget"
                            title="Budget"
                            type="text"
                            value={formData.Budget}
                            onChange={(value) => handleChange('Budget', value)}
                            required={true}  // Making this field required
                        />

                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>

                {/* Response Box */}
                <div className="response-box">
                    <h3>Suggested Locations</h3>
                    <p>{responseMessage || 'Your suggestions will appear here after form submission.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import Info from '../Info/Info';
import './Home.css';
import DoubleArrow from './assests/doublearrow.png';


const Home = () => {
    const [formData, setFormData] = useState({
        From: '',
        Destination: '',
        'Who are you traveling with?': 'Solo',
        'What are your vibes today?': '',
        'Preferred Duration': '',
        Budget: ''
    });

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // TODO : store the submitted data to be able to create the prompt 
        alert('Form submitted successfully.');
    };

    return (
        <div className="home-container">
            <h2>Travel Form</h2>
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
                        />
                        <img src={DoubleArrow} alt="Double Arrow" className="double-arrow-img" />
                        <Info
                            title="Destination"
                            type="text"
                            value={formData.Destination}
                            onChange={(value) => handleChange('Destination', value)}
                            className="form-field"
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
                />
                <Info
                    className="info info-text"
                    title="What are your vibes today?"
                    type="text"
                    value={formData['What are your vibes today?']}
                    onChange={(value) => handleChange('What are your vibes today?', value)}
                />
                <Info
                    className="info info-number"
                    title="Preferred Duration"
                    type="number"
                    value={formData['Preferred Duration']}
                    onChange={(value) => handleChange('Preferred Duration', value)}
                />
                <Info
                    className="info info-budget"
                    title="Budget"
                    type="text"
                    value={formData.Budget}
                    onChange={(value) => handleChange('Budget', value)}
                />

                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Home;

import React, { useState, useEffect, useRef } from 'react';
import Info from '../Info/Info';
import axios from 'axios';
import './Home.css';
import MapLogo from './assests/map.png';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



const Home = () => {
    const [formData, setFormData] = useState({
        From: '',
        Destination: '',
        'Who are you traveling with?': 'Solo',
        'What are your vibes today?': '',
        'Preferred Duration': '',
        DurationUnit: 'Minutes', // Default unit
        Budget: '',
    });

    const fromRef = useRef(null);
    const destinationRef = useRef(null);

    // Initialize Google Maps Autocomplete once the component mounts
    useEffect(() => {
        const initAutocomplete = () => {
            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromRef.current);
            const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationRef.current);

            fromAutocomplete.addListener('place_changed', () => {
                const place = fromAutocomplete.getPlace();
                if (place && place.formatted_address) {
                    handleChange('From', place.formatted_address);
                }
            });

            destinationAutocomplete.addListener('place_changed', () => {
                const place = destinationAutocomplete.getPlace();
                if (place && place.formatted_address) {
                    handleChange('Destination', place.formatted_address);
                }
            });
        };

        if (window.google && window.google.maps) {
            initAutocomplete();
        } else {
            window.initAutocomplete = initAutocomplete;
        }
    }, []);

    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [locations, setLocations] = useState([]); // Initialize as an empty array

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    // Convert duration based on unit (minutes, hours, days, etc.)
    const convertToMinutes = (duration, unit) => {
        switch (unit) {
            case 'Hours':
                return duration * 60; // 1 hour = 60 minutes
            case 'Days':
                return duration * 24 * 60; // 1 day = 1440 minutes
            case 'Weeks':
                return duration * 7 * 24 * 60; // 1 week = 10080 minutes
            case 'Months':
                return duration * 30 * 24 * 60; // 1 month = 43200 minutes (assuming 30 days)
            default:
                return duration; // Already in minutes
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { From, Destination, 'Who are you traveling with?': who, 'What are your vibes today?': vibes, 'Preferred Duration': duration, DurationUnit, Budget } = formData;

        if (!From || !Destination || !who || !vibes || !duration || !Budget) {
            alert('Please fill in all the fields.');
            return;
        }

        // Convert the duration to minutes
        const durationInMinutes = convertToMinutes(Number(duration), DurationUnit);

        // TODO : replace the api url 
        const apiUrl = 'http://localhost:8000/search_getaways'; // Replace with your backend URL
        const params = new URLSearchParams({
            from_destination: From,
            to_destination: Destination,
            vibes: vibes,
            duration: durationInMinutes,
            budget: Budget,
            travel_companion: who,
        }).toString();

        // Set loading to true before sending the request
        setLoading(true);
        setResponseMessage(''); // Clear the previous response

        try {
            // Send data to the backend
            const response = await axios.get(`${apiUrl}?${params}`);
            const fetchedLocations = response.data || []; // Default to empty array if undefined
            setResponseMessage(JSON.stringify(response.data, null, 2));
            setLocations(Array.isArray(fetchedLocations) ? fetchedLocations : []); // Ensure it's an array
        } catch (error) {
            console.error('Error submitting the form', error);
            alert('There was an error submitting the form. Please try again later.');
        } finally {
            setLoading(false); // Set loading to false after receiving the response or error
        }
    };

    return (
        <div className="container">
            <div className='title'>
                <h3>SideQuest</h3>
            </div>
            <div className="form-and-response">
                <div className="home-container">
                    <img src={MapLogo} alt="Map Logo" className="map-logo" />
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="double-field">
                                <input
                                    ref={fromRef}
                                    placeholder="From"
                                    className="form-field"
                                    required
                                />
                                <h3>-</h3>
                                <input
                                    ref={destinationRef}
                                    placeholder="Destination"
                                    className="form-field"
                                    required
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
                            required={true}
                        />
                        <Info
                            className="info info-text"
                            title="What are your vibes today?"
                            type="text"
                            value={formData['What are your vibes today?']}
                            onChange={(value) => handleChange('What are your vibes today?', value)}
                            required={true}
                        />
                        <div className="duration-container">
                            <div className="duration-input">
                                <label>Preferred Duration</label>
                                <input
                                    type="number"
                                    value={formData['Preferred Duration']}
                                    onChange={(e) => handleChange('Preferred Duration', e.target.value)}
                                    placeholder="Enter duration"
                                    className="form-field"
                                    required
                                />
                            </div>
                            <div className="duration-unit">
                                <label>Unit</label>
                                <select
                                    value={formData.DurationUnit}
                                    onChange={(e) => handleChange('DurationUnit', e.target.value)}
                                    className="form-field"
                                    required
                                >
                                    <option value="Minutes">Minutes</option>
                                    <option value="Hours">Hours</option>
                                    <option value="Days">Days</option>
                                    <option value="Weeks">Weeks</option>
                                    <option value="Months">Months</option>
                                </select>
                            </div>
                        </div>
                        <Info
                            className="info info-budget"
                            title="Budget"
                            type="text"
                            value={formData.Budget}
                            onChange={(value) => handleChange('Budget', value)}
                            required={true}
                        />
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                </div>

                <div className="response-box">
                    <h3>Suggested Locations</h3>
                    {loading ? <p>Loading suggestions, please wait...</p> : (
                        <>
                            <pre>{responseMessage || 'Your suggestions will appear here after form submission.'}</pre>
                            {locations.length > 0 && (
                                <MapContainer center={[locations[0].latitude, locations[0].longitude]} zoom={12} style={{ height: '600px', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {locations.map((location, index) => (
                                        <React.Fragment key={index}>
                                            <Marker position={[location.latitude, location.longitude]}>
                                                <Popup>{location.name}</Popup>
                                            </Marker>
                                            <Circle
                                                center={[location.latitude, location.longitude]}
                                                radius={500} // Radius in meters
                                                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
                                            />
                                        </React.Fragment>
                                    ))}
                                </MapContainer>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;

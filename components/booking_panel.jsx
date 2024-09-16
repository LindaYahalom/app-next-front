import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlane } from 'react-icons/fa';
import axios from 'axios';

// Hero Section
const HeroSection = styled.section`
  width: 100%;
  height: 45vh;
  background-image: url('/path/to/your/background.jpg'); /* Add your background image */
  background-size: cover;
  background-position: center;
  position: relative;
`;

// Overlay
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(40, 62, 81, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Hero Text
const HeroText = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-align: center;
`;

// Search Bar
const SearchBar = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
`;

// Input Fields
const InputField = styled.input`
  border: none;
  margin-right: 1rem;
  padding: 0.5rem;
  flex: 1;
`;

// Select Field
const SelectField = styled.select`
  border: none;
  margin-right: 1rem;
  padding: 0.5rem;
  flex: 1;
`;

// Search Button
const SearchButton = styled.button`
  background: #4b79a1;
  color: #fff;
  border: none;
  padding: 0 1.5rem;
  border-radius: 5px;
  cursor: pointer;
`;

// Ticket-style Confirmation Popup
const ConfirmationPopup = styled.div`
  position: fixed;
  background-color: white;
  padding: 2rem;
  border: 2px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top: 15%;
  left: 50%;
  transform: translate(-50%, -15%);
  z-index: 999;
  width: 400px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

// Ticket Heading
const TicketHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

// Ticket Details
const TicketDetails = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  border-top: 2px dashed #ddd;
  border-bottom: 2px dashed #ddd;
  padding: 1rem 0;
`;

const Detail = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;

// Close Button
const CloseButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const BookingPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    passengers: 1
  });
  
  const [confirmation, setConfirmation] = useState(null);
  const [destinationsList, setDestinationsList] = useState([]);

  // Fetch destinations from the back-end
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinations');
        setDestinationsList(response.data);  // Set the list of destinations
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/book', formData);
      setConfirmation(response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleClose = () => {
    setConfirmation(null);
  };

  return (
    <HeroSection>
      <Overlay>
        <HeroText>Discover Your Next Adventure</HeroText>
        <SearchBar>
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Dynamic Select Field for Destination */}
          <SelectField
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option value="">Select a destination</option>
            {destinationsList.map((dest) => (
              <option key={dest.name} value={dest.name}>
                {dest.name}
              </option>
            ))}
          </SelectField>
          <InputField
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <InputField
            type="date"
            name="endDate"
            placeholder="End Date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <InputField
            type="number"
            name="passengers"
            placeholder="Passengers"
            min="1"
            value={formData.passengers}
            onChange={handleChange}
            style={{width: '4rem'}}
          />
          <SearchButton onClick={handleSubmit}>
            <FaPlane />
          </SearchButton>
        </SearchBar>

        {confirmation && (
          <ConfirmationPopup>
            <TicketHeading>Booking Confirmation</TicketHeading>
            <TicketDetails>
              <Detail><strong>Name:</strong> {confirmation.name}</Detail>
              <Detail><strong>Destination:</strong> {confirmation.destination}</Detail>
              <Detail><strong>Start Date:</strong> {confirmation.startDate}</Detail>
              <Detail><strong>End Date:</strong> {confirmation.endDate}</Detail>
              <Detail><strong>Passengers:</strong> {confirmation.passengers}</Detail>
            </TicketDetails>
            <CloseButton onClick={handleClose}>Close</CloseButton>
          </ConfirmationPopup>
        )}
      </Overlay>
    </HeroSection>
  );
};

export default BookingPanel;

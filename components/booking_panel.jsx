import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlane } from 'react-icons/fa';
import axios from 'axios';


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

// Background animation keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Hero Section with animated gradient background
const HeroSection = styled.section`
  width: 100%;
  height: 45vh;
  background: linear-gradient(45deg, #4b79a1, #283e51, #4b79a1);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  position: relative;
  overflow: hidden;
`;

// Overlay with pulsating glow effect
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(40, 62, 81, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 10%, transparent 70%);
    opacity: 0.5;
    animation: pulsate 2s infinite;
    pointer-events: none;
  }

  @keyframes pulsate {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

// Hero Text
const HeroText = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-align: center;
  z-index: 1;
`;

// Search Bar
const SearchBar = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
`;

// Input Fields and other elements remain the same
const InputField = styled.input`
  border: none;
  margin-right: 1rem;
  padding: 0.5rem;
  flex: 1;
`;

const SelectField = styled.select`
  border: none;
  margin-right: 1rem;
  padding: 0.5rem;
  flex: 1;
`;

const SearchButton = styled.button`
  background: #4b79a1;
  color: #fff;
  border: none;
  padding: 0 1.5rem;
  border-radius: 5px;
  cursor: pointer;
`;

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
// Remaining code logic stays the same

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
  const audioRef = useRef(null);

  // This will play the audio when confirmation is shown
  useEffect(() => {
    if (confirmation && audioRef.current) {
      audioRef.current.play();
    }
  }, [confirmation]);



  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinations');
        setDestinationsList(response.data);
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
        <HeroText>Just Kidding Airways</HeroText>
        <SearchBar>
          <InputField
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
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
            style={{ width: '4rem' }}
          />
          <SearchButton onClick={handleSubmit}>
            <FaPlane />
          </SearchButton>
        </SearchBar>

        {confirmation && (
          <ConfirmationPopup>
            <TicketHeading>Booking success! Time to do a happy dance (we won’t judge)!</TicketHeading>
            <TicketDetails>
              <Detail><strong>Name:</strong> {confirmation.name}</Detail>
              <Detail><strong>Destination:</strong> {confirmation.destination}</Detail>
              <Detail><strong>Start Date:</strong> {confirmation.startDate}</Detail>
              <Detail><strong>End Date:</strong> {confirmation.endDate}</Detail>
              <Detail><strong>Passengers:</strong> {confirmation.passengers}</Detail>
            </TicketDetails>
            <CloseButton onClick={handleClose}>Close</CloseButton>

            {/* Audio element */}
            <audio ref={audioRef}>
              <source src="\static\sounds\claps.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </ConfirmationPopup>
        )}
      </Overlay>
    </HeroSection>
  );
};

export default BookingPanel;

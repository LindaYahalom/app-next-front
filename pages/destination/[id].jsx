"use client"; // If you're using Next.js 13 with the app directory

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Import components and styles
import NavBarApp from '../../components/nav_bar';
import BookingPanel from '../../components/booking_panel';
import { GlobalStyle, Wrapper } from '../../components/global_style';
import styled from 'styled-components';

// Import icons
import { FaCloudSun, FaCalendarAlt } from 'react-icons/fa';

// Styled Components
const Header = styled.header`
  position: relative;
  width: 100%;
  height: 45vh;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 62, 81, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DestinationTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #283e51;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const GalleryImage = styled.img`
  width: calc(33.333% - 1rem);
  height: 200px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: calc(50% - 1rem);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const EventsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const BookingOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookingButton = styled.button`
  background: linear-gradient(90deg, #4b79a1, #283e51);
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
`;

const Footer = styled.footer`
  background: #283e51;
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal Content
const ModalContent = styled.div`
  background: #fff;
  padding: 0.5rem;
  border-radius: 10px;
  max-width: 900px;
  width: 90%;
  position: relative;
`;

// Close Button
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const DestinationDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [destination, setDestination] = useState(null);
  const [isBookingModalVisible, setBookingModalVisible] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/destination/${id}`);
          setDestination(response.data);
        } catch (error) {
          console.error('Error fetching destination:', error);
        }
      }
    };

    fetchDestination();
  }, [id]);

  if (!destination) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <NavBarApp />

      <Header image={`http://localhost:5000${destination.bannerImage}`}>
        <HeaderOverlay>
          <DestinationTitle>{destination.name}</DestinationTitle>
        </HeaderOverlay>
      </Header>

      <MainContent>
        {/* Description Section */}
        <Section>
          <SectionTitle>About {destination.name}</SectionTitle>
          <Description>{destination.description}</Description>
        </Section>

        {/* Image Gallery */}
        <Section>
          <SectionTitle>Gallery</SectionTitle>
          <ImageGallery>
            {destination.galleryImages && destination.galleryImages.length > 0 ? (
              destination.galleryImages.map((image, index) => (
                <GalleryImage
                  key={index}
                  src={`http://localhost:5000${image}`}
                  alt={`${destination.name} image ${index + 1}`}
                />
              ))
            ) : (
              <p>No images available for this destination.</p>
            )}
          </ImageGallery>
        </Section>

        {/* Weather Information */}
        <Section>
          <SectionTitle>
            <FaCloudSun /> Current Weather
          </SectionTitle>
          <WeatherInfo>
            <p>25°C, Sunny</p>
          </WeatherInfo>
        </Section>

        {/* Events and Activities */}
        <Section>
          <SectionTitle>
            <FaCalendarAlt /> Upcoming Events
          </SectionTitle>
          <EventsList>
            {destination.events.map((event, index) => (
              <EventItem key={index}>
                <p>
                  <strong>{event.name}</strong> - {event.date}
                </p>
              </EventItem>
            ))}
          </EventsList>
        </Section>

        {/* Booking Options */}
        <Section>
          <SectionTitle>Book Your Trip</SectionTitle>
          <BookingOptions>
            <BookingButton onClick={() => setBookingModalVisible(true)}>
              Book Flights
            </BookingButton>
          </BookingOptions>
        </Section>
      </MainContent>

      {/* Booking Modal */}
      {isBookingModalVisible && (
        <ModalOverlay onClick={() => setBookingModalVisible(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setBookingModalVisible(false)}>&times;</CloseButton>
            <BookingPanel />
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Footer */}
      <Footer>
        <p>© 2023 Your Company Name</p>
        <p>Contact us: email@example.com | Phone: (123) 456-7890</p>
      </Footer>
    </Wrapper>
  );
};

export default DestinationDetails;

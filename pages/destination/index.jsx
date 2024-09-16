import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import BookingPanel from "../../components/booking_panel";
import NavBarApp from "../../components/nav_bar";
import { GlobalStyle, Wrapper } from "../../components/global_style";
import axios from 'axios';

// Styled Components
const WrapperPadding = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #283e51;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #4b79a1;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const DestinationCard = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  background: linear-gradient(0deg, rgba(40, 62, 81, 0.8), transparent);
  width: 100%;
  padding: 1rem;
  color: #fff;
`;

const DestinationName = styled.h2`
  margin: 0;
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const Destination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinations'); // Ensure the back-end is running at this URL
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <Wrapper>
        <GlobalStyle />
        <NavBarApp />
        <BookingPanel />
        <WrapperPadding>
          <Header>
            <Title>Explore Our Destinations</Title>
            <Subtitle>Discover your next adventure with us</Subtitle>
          </Header>
          <Gallery>
            {destinations.map((destination) => (
              <DestinationCard key={destination.id}>
                <Link href={`/destination/${destination.id}`} passHref legacyBehavior>
                  <a style={{ display: 'block', height: '100%', position: 'relative' }}>
                    {/* Use full URL for the image */}
                    <Image
                      src={`http://localhost:5000${destination.image}`} // Full path for Flask-served images
                      alt={destination.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <Overlay>
                      <DestinationName>{destination.name}</DestinationName>
                      <Description>{destination.teaser}</Description>
                    </Overlay>
                  </a>
                </Link>
              </DestinationCard>
            ))}
          </Gallery>
        </WrapperPadding>
      </Wrapper>
    </div>
  );
};

export default Destination;

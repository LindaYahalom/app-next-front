// pages/index.jsx

"use client"; // Must be at the top

import React, { useState } from 'react';
import Link from 'next/link';
import BookingPanel from "../components/booking_panel";
import Image from 'next/image';
import styled from 'styled-components';
import NavBarApp from "../components/nav_bar";
import { GlobalStyle, Wrapper } from "../components/global_style";

// Sections
const Section = styled.section`
  width: 100%;
  padding: 2rem 2rem;
  background: ${(props) => (props.grey ? '#f9f9f9' : '#fff')};
`;

// Section Title
const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #283e51;
`;

// Form Container
const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Form
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Form Input
const FormInput = styled.input`
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Form Button
const FormButton = styled.button`
  background: linear-gradient(90deg, #4b79a1, #283e51);
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  align-self: center;
  width: 50%;
`;

// Message Display
const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

const HomePage = () => {
  // State variables to manage form data
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <NavBarApp />

      <BookingPanel />

      {/* Subscription Section */}
      <Section>
        <SectionTitle>
          Give your inbox a reason to smile :) <br /> Sign up for our newsletter today!
        </SectionTitle>
        <FormContainer>
          <Form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <FormInput
              type="number"
              name="budget"
              placeholder="Budget"
              required
              value={formData.budget}
              onChange={handleInputChange}
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormButton type="submit">Sign Up Now</FormButton>
          </Form>
          {message && <Message error={message.includes('error') || message.includes('Invalid')}>{message}</Message>}
        </FormContainer>
      </Section>

      {/* Footer */}
      <Section>
        <p style={{ textAlign: 'center' }}>© Just Kidding Airways</p>
      </Section>
    </Wrapper>
  );
};

export default HomePage;

import React from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaRegFrown } from 'react-icons/fa';
import NavBarApp from "../../components/nav_bar";

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #283e51;
  margin-bottom: 2rem;
  text-align: center;
`;

const MessageContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const FunMessage = styled.p`
  font-size: 1.5rem;
  color: #4b79a1;
  margin: 1rem 0;
  line-height: 1.5;
`;

const Icon = styled.span`
  font-size: 3rem;
  color: #ff6347;
  margin-bottom: 1rem;
`;

const FooterMessage = styled.p`
  font-size: 1rem;
  color: #283e51;
  margin-top: 1rem;
`;

const FakeContact = () => {
  return (
    <Wrapper>
        <NavBarApp />
      <Heading>Oops, We Lied! <FaRegFrown /></Heading>
      <MessageContainer>
        <Icon>
          <FaPaperPlane />
        </Icon>
        <FunMessage>
          We're really not interested in contacting you back! <br />
          Just kidding... or are we? 🤔
        </FunMessage>
        <FunMessage>
          Feel free to stare at this page for as long as you want, though! <br />
        </FunMessage>
        <FooterMessage>
          Thanks for visiting, but don't hold your breath for a reply! 😂
        </FooterMessage>
      </MessageContainer>
    </Wrapper>
  );
};

export default FakeContact;

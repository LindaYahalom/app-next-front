import styled, { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #f3f3f3;
  }
`;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export {GlobalStyle, Wrapper};
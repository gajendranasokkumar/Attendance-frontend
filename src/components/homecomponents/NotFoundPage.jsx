import React, { useEffect, useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const twinkle = keyframes`
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.5; transform: scale(1); }
`;

const meteorShower = keyframes`
  0% { transform: translateX(300%) translateY(-300%); }
  100% { transform: translateX(-100%) translateY(100%); }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  font-family: 'Arial', sans-serif;
  color: white;
  overflow: hidden;
  position: relative;
`;

const Star = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: ${twinkle} ${props => props.duration || '3s'} ease-in-out infinite;
  width: ${props => props.size || '2px'};
  height: ${props => props.size || '2px'};
  top: ${props => props.top};
  left: ${props => props.left};
`;

const Meteor = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  box-shadow: 0 0 10px 2px white;
  animation: ${meteorShower} ${props => props.duration || '2s'} linear infinite;
  top: ${props => props.top};
  left: ${props => props.left};
`;

const Planet = styled.div`
  position: absolute;
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  border-radius: 50%;
  background-color: ${props => props.color || '#ff6b6b'};
  box-shadow: 0 0 20px ${props => props.color || '#ff6b6b'};
  animation: ${float} ${props => props.floatDuration || '6s'} ease-in-out infinite,
             ${spin} ${props => props.spinDuration || '20s'} linear infinite;
  top: ${props => props.top};
  left: ${props => props.left};
`;

const Title = styled.h1`
  font-size: 150px;
  margin: 0;
  text-shadow:  0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0ff, 0 0 70px #0ff, 0 0 80px #0ff, 0 0 100px #0ff, 0 0 150px #0ff;
  animation: ${float} 4s ease-in-out infinite;
`;

const Message = styled.p`
  font-size: 24px;
  text-align: center;
  max-width: 600px;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.4s;
    z-index: -1;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
  }
`;

const NotFoundPage = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(newStars);

    const newMeteors = Array.from({ length: 5 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 2 + 1}s`,
    }));
    setMeteors(newMeteors);
  }, []);

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
        {meteors.map((meteor, index) => (
          <Meteor key={index} {...meteor} />
        ))}
        <Planet size="100px" color="#ff9ff3" top="10%" left="10%" floatDuration="7s" spinDuration="25s" />
        <Planet size="60px" color="#54a0ff" top="70%" left="80%" floatDuration="5s" spinDuration="15s" />
        <Planet size="40px" color="#5f27cd" top="30%" left="70%" floatDuration="8s" spinDuration="20s" />
        <Title>404</Title>
        <Message>
          Oops! You've drifted into an unknown galaxy. Don't panic! Even the best space explorers get lost sometimes.
        </Message>
        <Button onClick={() => window.history.back()}>
          Return to Home Planet
        </Button>
      </PageWrapper>
    </>
  );
};

export default NotFoundPage;
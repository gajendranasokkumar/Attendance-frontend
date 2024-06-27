import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({otp, setOtp}) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp(prevOtp => {
      const newOtp = [...prevOtp];
      newOtp[index] = element.value;
      return newOtp;
    });

    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const pastedOtp = pastedData.split('').map(char => isNaN(char) ? '' : char);
    
    setOtp(prevOtp => {
      const newOtp = [...pastedOtp, ...Array(6 - pastedOtp.length).fill('')];
      return newOtp;
    });

    const focusIndex = Math.min(pastedOtp.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  return (
    <div className="otp-container">
        <span className='font-semibold text-inputBorder'>Enter the OTP : </span>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(input) => (inputRefs.current[index] = input)}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          onPaste={handlePaste}
          className="otp-input"
        />
      ))}
    </div>
  );
}

export default OTPInput;
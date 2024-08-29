import React, { useState } from 'react';
import Logo from "../components/assets/logo.png";

const Header = ({ onGenerateCode, onPreview }) => {
  const [prompt, setPrompt] = useState('');

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    onGenerateCode(prompt);
  };

  return (
    <header>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="inputContainer">
        <input
          type="text"
          id="prompt-input"
          placeholder='Build a pawsome website'
          value={prompt}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Purr-duce</button>
      </div>
      <div className="controllers">
        <button onClick={onPreview}>Preview</button>
        <button>Download</button>
      </div>
    </header>
  );
};

export default Header;
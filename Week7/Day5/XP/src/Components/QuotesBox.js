import React, { useState } from 'react';
import {quotes} from './quotes';

export function QuoteBox() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [usedQuotes, setUsedQuotes] = useState([0]);
  const [colors, setColors] = useState({
    bgColor: '#f8f9fa',
    textColor: '#343a40',
    buttonColor: '#007bff'
  });

  // Function to get a random quote
  const getRandomQuote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (usedQuotes.includes(randomIndex) && usedQuotes.length < quotes.length);
    
    if (usedQuotes.length >= quotes.length) {
      setUsedQuotes([randomIndex]);
    } else {
      setUsedQuotes([...usedQuotes, randomIndex]);
    }
    
    return quotes[randomIndex];
  };

  // Function to get random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Handle button click
  const handleNewQuote = () => {
    setCurrentQuote(getRandomQuote());
    setColors({
      bgColor: getRandomColor(),
      textColor: getRandomColor(),
      buttonColor: getRandomColor()
    });
  };

  return (
    <div id="quote-box" style={{ backgroundColor: colors.bgColor }}>
      <h1 id="text" style={{ color: colors.textColor }}>{currentQuote.quote}</h1>
      <p id="author" style={{ color: colors.textColor }}>- {currentQuote.author}</p>
      <button 
        id="new-quote" 
        onClick={handleNewQuote}
        style={{ backgroundColor: colors.buttonColor }}
      >
        New Quote
      </button>
    </div>
  );
}


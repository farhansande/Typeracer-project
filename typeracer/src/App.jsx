import React, {useState, useEffect} from 'react';
import './App.css';

const temp_quote = ["This is a test", "Life is not a test", "Life is life"];



function App() {
  const [quote, setQuote] = useState(temp_quote[0]); // Use state - watch if value changes update UI
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWPM] = useState(0);

  const handleChange = (e) => { // Grab the current string from the HTML input field
    const val = e.target.value;

    if (!startTime){ // If start time null, this is first letter
      setStartTime(Date.now());
    }
    if (quote.startsWith(val)){
      setUserInput(val); // Since use-state, it will trigger re-render
    }

    if (val.length > 5){
      const now = Date.now();
      const mins = (now - startTime)/60000;
      const words = val.length/5;
      setWPM(Math.round(words/mins))

    }

    if(val === quote){
      calculateFinalScore();
    }
  };

  const calculateFinalScore = () => {
    const end = Date.now();
    const durationInMinutes = (end - startTime) / 60000;
    const wordCount = quote.length / 5; // avg word is 5 characters
    
    setWPM(Math.round(wordCount/durationInMinutes));
  };

  return (
    <div className="App">
      <h1>TypeRacer</h1>
      
      <div className="quote-display">
        {quote.split('').map((char, index) => {
          let color = "gray";

          if (index < userInput.length) {
            color = char === userInput[index] ? "green" : "red";
          }

          return <span key={index} style={{ color, fontSize: '24px' }}>{char}</span>;
        })}
      </div>

      <input 
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
        style={{ marginTop: '20px', width: '100%', padding: '10px' }}
      />

      {wpm > 0 && <h2> WPM: {wpm}</h2>}      
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
  );
}

export default App;

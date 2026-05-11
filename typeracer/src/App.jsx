import React, { useState } from 'react';
import './App.css';

const temp_quote = [
  "Det var en gång en liten kille som hette Karl Lejon, men han kallades för Skorpan.",
  "Han hade en bror som hette Jonatan som var modig och stark som en sagoprins.",
  "Jonatan lovade Skorpan att de en dag skulle ses i Nangijala, landet bortom stjärnorna.",
  "I Nangijala råder lägereldarnas och sagornas tid och allt är vackert och äventyrligt.",
  "Där finns inga sorger, bara vänskap som sträcker sig genom de djupaste dalarna.",
  "Det var en gång en pojke som var fjorton år gammal, lång och gänglig och linnhårig.",
  "En söndagsmorgon hände det sig att han fångade en tomte när föräldrarna var i kyrkan.",
  "För att bli fri igen förtrollade tomten pojken så att han blev liten som en tumme.",
  "Plötsligt förstod han vad djuren sa när han flög på ryggen på en tamgås mot Lappland.",
  "Hela Sverige bredde ut sig under honom som en stor, rutig vävnad av skogar och sjöar.",
  "Världen var alldeles vit och tyst, och det fanns ingenting som liknade sommaren längre.",
  "Mumintrollet hade vaknat ur sin vintersömn alldeles för tidigt i ett hus som sov.",
  "Snön låg djup mot fönstren och isen täckte havet så långt ögat kunde nå.",
  "Han upptäckte att vintern hade sin egen skönhet med varelser som bara levde i mörkret.",
  "Det som verkar skrämmande i början kan visa sig vara det mest fantastiska äventyret.",
  "Ove är den sortens man som pekar på folk han inte gillar som om de vore inbrottstjuvar.",
  "Han kontrollerar att ingen parkerar fel eller slänger sopor i fel behållare i grannskapet.",
  "För Ove handlar livet om principer och om att göra rätt för sig i alla lägen.",
  "Under den vresiga ytan finns en berättelse om sorg och en kärlek som aldrig dör.",
  "En envis gammal man kan förändra en hel värld bara genom att fortsätta vara sig själv.",
  "Begreppet fika är mer än bara en kaffepaus; det är en djupt rotad social institution.",
  "Att fika innebär att man tar sig tid att sitta ner och prata medan man njuter av kaffe.",
  "Det spelar ingen roll om man är på jobbet eller hemma; fikan är stunden då stressen rinner av.",
  "I Sverige ser vi detta som en nödvändig del av dagen för att bibehålla god hälsa.",
  "Det är ofta under en fika som de mest kreativa idéerna föds och svåra problem blir lösta."
];

function App() {
  const [quote, setQuote] = useState(() => temp_quote[Math.floor(Math.random() * temp_quote.length)]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWPM] = useState(0);

  const handleReset = () => {
    const newQuote = temp_quote[Math.floor(Math.random() * temp_quote.length)];
    setQuote(newQuote);
    setUserInput('');
    setStartTime(null);
    setWPM(0);
  };

  const handleChange = (e) => {
    const val = e.target.value;

    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }

    if (quote.startsWith(val)) {
      setUserInput(val);

      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 60000;
        if (timeElapsed > 0.001) {
          setWPM(Math.round((val.length / 5) / timeElapsed));
        }
      }
    }

    if (val === quote) {
      const end = Date.now();
      const duration = (end - startTime) / 60000;
      setWPM(Math.round((quote.length / 5) / duration));
    }
  };

  // Listen for 'Enter' key specifically when the race is finished
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput === quote) {
      handleReset();
    }
  };

  return (
    <div className="App">
      <h1>TypeRacer</h1>
      
      <div className="quote-display">
        {quote.split('').map((char, index) => {
          let className = "char-upcoming";
          if (index < userInput.length) className = "char-correct";
          else if (index === userInput.length) className = "char-current";

          return <span key={index} className={className}>{char}</span>;
        })}
      </div>

      <input 
        type="text"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Trigger reset on Enter
        autoComplete="off"
        spellCheck="false"
        placeholder={userInput === quote ? "Press Enter to Restart..." : "Start typing..."}
        autoFocus
      />

      {wpm > 0 && <div className="stats">WPM: {wpm}</div>}
      
      {/* Visual hint for the user */}
      {userInput === quote && <p className="hint">Press <span>Enter</span> for next quote</p>}
      
      <button onClick={handleReset} style={{ marginTop: '20px' }}>Restart</button>
    </div>
  );
}

export default App;
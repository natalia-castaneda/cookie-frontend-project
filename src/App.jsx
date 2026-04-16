import { useState } from 'react'
import './App.css'
//Check if cookies are enabled in the browser
console.log(navigator.cookieEnabled);

function App() {
  const [value, setValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  const handleValueChange = (event) => {
      setValue(event.target.value)
  };
  const saveHandler = () => {
        console.log(value),
        setSavedValue(value),
      console.log(savedValue);
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expiryDate, setEspiryDate] = useState(new Date(currentDate.getTime() + 24 *60 * 60 * 1000)) 
  const isActive = currentDate < expiryDate;

// const dataToStore = {
//   value: savedValue,
//   savedTime: currentDate.toLocaleString(),
//   expiryTime: expiryDate.toLocaleString(),
// }
// document.cookie = "dataToStore=" + JSON.stringify(dataToStore) + "; expires=" + expiryDate.toUTCString() + "; path=/";
function setCookie(name, value, daysToLive) {

        value: savedValue,
        savedTime: currentDate.toLocaleString(),
        expiryTime: expiryDate.toLocaleString(),

};
  return (
    <div className="app">

      {/* 🔹 Navbar */}
      <header className="navbar">
        <h1>Cookie Project</h1>
        <h2>Welcome</h2>
        <p> Value Storage</p>
  
      </header><br></br>

      <section id="valueStorage">
        <div className="card">
              <label>Enter a value to store below </label><br></br>
              <input type="text" id="value" name="value" onChange={handleValueChange}></input>
              <button type="button" onClick={saveHandler}>Save Value</button>

        </div>
      </section><br></br>

      {/* 🔹 Features Section */}
      <section id="features" className="features">
        <h2></h2>
        <div className="feature-list">
          
          <div className="card">
            <label>Status: </label>
            <div>{isActive ? 'Active' : 'Expired'}</div>
   
          </div>
          <div className="card">
            <label>Stored Value: </label>
            <div>{savedValue}</div>

  
          </div>
          <div className="card">
            <label>Saved Time: </label>
            <div>{currentDate.toLocaleString()}</div>

          </div>
          <div className="card">
            <label>Expiry time: </label>
            <div>{expiryDate.toLocaleString()}</div>

          </div>
        </div>
        
      </section>

      {/* 🔹 Footer */}
      <footer className="footer">
        <p></p>
      </footer>

    </div>
  );
}

export default App

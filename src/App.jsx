import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">

      {/* 🔹 Navbar */}
      <header className="navbar">
        <h1>Cookie Project</h1>
        <h2>Welcome</h2>
        <p> Value Storage</p>
  
      </header><br></br>

      {/* 🔹 Hero Section */}
      {/* <section id="home" className="hero">
        <h2>Welcome</h2>
        <p> Value Storage</p>

      </section> */}
      <section id="valueStorage">
        <div className="card">
              <label>Enter a value to store below </label><br></br>
              <input type="text" id="value" name="value"></input>
              <button type="button" onChange="saveHandler">Save Value</button>

        </div>
      </section><br></br>

      {/* 🔹 Features Section */}
      <section id="features" className="features">
        <h2></h2>
        <div className="feature-list">
          
          <div className="card">
            <label>Status: </label>
   
          </div>
          <div className="card">
            <label>Stored Value: </label>
  
          </div>
          <div className="card">
            <label>Saved Time: </label>

          </div>
          <div className="card">
            <label>Expiry time: </label>

          </div>
        </div>
        
      </section>

      {/* 🔹 About Section
      <section id="about" className="about">
        <h2>About</h2>
        <p>
          Enter a value ans store it for 24h
        </p>
      </section>

      {/* 🔹 Contact Section */}
      {/* <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>Email: example@email.com</p>
      </section>  */}

      {/* 🔹 Footer */}
      <footer className="footer">
        <p></p>
      </footer>

    </div>
  );
}

export default App

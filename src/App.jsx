import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const COOKIE_NAME = "storedValueCookie";

  const [value, setValue] = useState("");
  const [storedData, setStoredData] = useState(null);
  const [status, setStatus] = useState("No value stored");
  const [message, setMessage] = useState("");

  function setCookie(name, data, hours) {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      JSON.stringify(data)
    )}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");

      if (cookieName === name) {
        try {
          return JSON.parse(decodeURIComponent(cookieValue));
        } catch {
          return null;
        }
      }
    }

    return null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  function checkCookieStatus() {
    const data = getCookie(COOKIE_NAME);

    if (!data) {
      setStoredData(null);
      setStatus("No value stored");
      return;
    }

    const now = Date.now();

    if (now >= data.expiryTime) {
      deleteCookie(COOKIE_NAME);
      setStoredData(null);
      setStatus("Expired");
      setMessage("The cookie has expired and was removed.");
    } else {
      setStoredData(data);
      setStatus("Active");
    }
  }

  useEffect(() => {
    checkCookieStatus();

    const interval = setInterval(() => {
      checkCookieStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function saveHandler() {
    if (!value.trim()) {
      setMessage("Please enter a value.");
      return;
    }

    const savedTime = Date.now();
    const expiryTime = savedTime + 24 * 60 * 60 * 1000;

    const dataToStore = {
      value: value,
      savedTime: savedTime,
      expiryTime: expiryTime,
    };

    setCookie(COOKIE_NAME, dataToStore, 24);
    setStoredData(dataToStore);
    setStatus("Active");
    setMessage("Value saved successfully.");
    setValue("");
  }

  function simulateExpiry() {
    deleteCookie(COOKIE_NAME);
    setStoredData(null);
    setStatus("Expired");
    setMessage("Expiry simulated. Cookie removed.");
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>Cookie Project</h1>
        <h2>Welcome</h2>
        <p>Value Storage</p>
      </header>

      <section id="valueStorage">
        <div className="card">
          <label>Enter a value to store below</label>
          <br />
          <br />

          <input
            type="text"
            id="value"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="button" onClick={saveHandler}>
            Save Value
          </button>

          <button type="button" onClick={simulateExpiry} style={{ marginLeft: "10px" }}>
            Simulate Expiry
          </button>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Status Information</h2>

        {message && <p>{message}</p>}

        <div className="feature-list">
          <div className="card">
            <label>Status:</label>
            <div>{status}</div>
          </div>

          <div className="card">
            <label>Stored Value:</label>
            <div>{storedData ? storedData.value : "No value stored"}</div>
          </div>

          <div className="card">
            <label>Saved Time:</label>
            <div>
              {storedData
                ? new Date(storedData.savedTime).toLocaleString()
                : "-"}
            </div>
          </div>

          <div className="card">
            <label>Expiry Time:</label>
            <div>
              {storedData
                ? new Date(storedData.expiryTime).toLocaleString()
                : "-"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
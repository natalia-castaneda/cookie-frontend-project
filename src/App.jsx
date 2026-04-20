import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const COOKIE_NAME = "storedValuesCookie";

  const [value, setValue] = useState("");
  const [storedItems, setStoredItems] = useState([]);
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

    if (!data || data.length === 0) {
      setStoredItems([]);
      setStatus("No value stored");
      return;
    }

    const now = Date.now();

    const validItems = data.filter((item) => now < item.expiryTime);
    const expiredItems = data.filter((item) => now >= item.expiryTime);

    if (expiredItems.length > 0) {
      if (validItems.length > 0) {
        setCookie(COOKIE_NAME, validItems, 24);
        setMessage("Some expired values were removed automatically.");
        setStatus("Active");
      } else {
        deleteCookie(COOKIE_NAME);
        setMessage("All stored values expired and were removed.");
        setStatus("Expired");
      }
    } else {
      setStatus("Active");
    }

    setStoredItems(validItems);
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

    const currentItems = getCookie(COOKIE_NAME) || [];
    const savedTime = Date.now();
    const expiryTime = savedTime + 24 * 60 * 60 * 1000;

    const newItem = {
      id: savedTime,
      value: value.trim(),
      savedTime,
      expiryTime,
    };

    const updatedItems = [...currentItems, newItem];

    setCookie(COOKIE_NAME, updatedItems, 24);
    setStoredItems(updatedItems);
    setStatus("Active");
    setMessage("Value saved successfully.");
    setValue("");
  }

  function simulateExpiry() {
  const data = getCookie(COOKIE_NAME);

  if (!data || data.length === 0) {
    setMessage("No values to expire.");
    return;
  }

  // force all items to be expired
  const expiredItems = data.map((item) => ({
    ...item,
    expiryTime: Date.now() - 1000, // 1 second in the past
  }));

  setCookie(COOKIE_NAME, expiredItems, 24);
  setMessage("Expiry simulated. Items will now be marked as expired.");
}

  function deleteOneItem(id) {
    const updatedItems = storedItems.filter((item) => item.id !== id);

    if (updatedItems.length === 0) {
      deleteCookie(COOKIE_NAME);
      setStoredItems([]);
      setStatus("No value stored");
      setMessage("All stored values removed.");
    } else {
      setCookie(COOKIE_NAME, updatedItems, 24);
      setStoredItems(updatedItems);
      setStatus("Active");
      setMessage("Value removed successfully.");
    }
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

          <button
            type="button"
            onClick={simulateExpiry}
            style={{ marginLeft: "10px" }}
          >
            Simulate Expiry
          </button>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Status Information</h2>

        {message && <p>{message}</p>}

        <div className="card">
          <label>Status:</label>
          <div>{status}</div>
        </div>

        <div className="card">
          <label>Total Stored Values:</label>
          <div>{storedItems.length}</div>
        </div>

        {storedItems.length === 0 ? (
          <div className="card">
            <p>No value stored</p>
          </div>
        ) : (
          storedItems.map((item, index) => (
            <div className="card" key={item.id} style={{ marginTop: "20px" }}>
              <h3>Stored Item {index + 1}</h3>

              <p>
                <strong>Value:</strong> {item.value}
              </p>

              <p>
                <strong>Saved Time:</strong>{" "}
                {new Date(item.savedTime).toLocaleString()}
              </p>

              <p>
                <strong>Expiry Time:</strong>{" "}
                {new Date(item.expiryTime).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {Date.now() < item.expiryTime ? "Active" : "Expired"}
              </p>

              <button
                type="button"
                onClick={() => deleteOneItem(item.id)}
                style={{ marginTop: "10px" }}
              >
                Delete This Value
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
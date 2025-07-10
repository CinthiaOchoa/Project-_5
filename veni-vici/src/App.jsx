import { useEffect, useState } from 'react';
import './App.css';

const API_URL =
  'https://api.thecatapi.com/v1/images/search?has_breeds=1&include_breeds=1&limit=1&api_key=live_c9i6Ewaj8gMDqN6QLcoYKxXPWFtGfEym519flmjkihIvJPCR7bdFXogjUP2Hp0pF';

function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]); // Array of {type, value}
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  // Checks if cat matches any banned traits
  const isCatBanned = (cat) => {
    if (!cat.breeds || cat.breeds.length === 0) return false;
    const breed = cat.breeds[0];

    if (banList.some((b) => b.type === 'breed' && b.value === breed.name)) {
      return true;
    }
    if (banList.some((b) => b.type === 'origin' && b.value === breed.origin)) {
      return true;
    }
    if (breed.temperament) {
      const temperamentTraits = breed.temperament.split(',').map(t => t.trim());
      if (banList.some((b) => b.type === 'temperament' && temperamentTraits.includes(b.value))) {
        return true;
      }
    }
    return false;
  };

  const fetchCat = async (retries = 10) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const newCat = data[0];

      if (newCat && Array.isArray(newCat.breeds) && newCat.breeds.length > 0) {
        if (!isCatBanned(newCat)) {
          setCat(newCat);
          setHistory((prev) => [newCat, ...prev]);
        } else if (retries > 0) {
          fetchCat(retries - 1);
        } else {
          setCat(null);
        }
      } else if (retries > 0) {
        fetchCat(retries - 1);
      } else {
        setCat(null);
      }
    } catch (error) {
      console.error("Error fetching cat:", error);
    }
  };

  useEffect(() => {
    fetchCat();

    // Auto hide popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Add a ban entry {type, value} without duplicates
  const handleBan = (type, value) => {
    if (!banList.find((b) => b.type === type && b.value === value)) {
      setBanList([...banList, { type, value }]);
    }
  };

  // Remove ban entry
  const handleUnban = (type, value) => {
    setBanList(banList.filter((b) => !(b.type === type && b.value === value)));
  };

  return (
    <div className="App">
        {/* Popup message */}
        {showPopup && (
    <div className="modal-overlay">
      <div className="popup">
        <p>🐾 Discover cats from Wild Dreams!</p>
        <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
      </div>
    </div>
    )}


      <h1>Veni Vici! 🐾 Discover Random Cats</h1>

      <div className="container">
        {/* Left panel: History */}
        <div className="history-panel">
          <h2>Seen Cats</h2>
          {history.length === 0 && <p>No cats seen yet.</p>}
          <div className="seen-cats-list">
            {history.map((cat, index) => (
              <div key={index} className="history-item">
                <img src={cat.url} alt={cat.breeds[0].name} width={60} />
                <p>{cat.breeds[0].name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center panel: Current cat with characteristics */}
        <div className="cat-panel">
          {cat && cat.breeds && cat.breeds.length > 0 && (
            <div className="cat-card" style={{ position: 'relative' }}>
              {/* Cat name above characteristic boxes */}
              <h3 style={{ textAlign: 'center', marginBottom: '8px' }}>
                {cat.breeds[0].name}
              </h3>

              {/* Characteristic boxes */}
              <div className="characteristics-container">
                {/* Origin */}
                <div
                  className="char-box"
                  onClick={() => handleBan('origin', cat.breeds[0].origin)}
                  title="Ban this origin"
                >
                  Origin: {cat.breeds[0].origin}
                </div>

                {/* Temperament boxes */}
                {cat.breeds[0].temperament
                  .split(',')
                  .map((trait) => trait.trim())
                  .map((trait) => (
                    <div
                      key={trait}
                      className="char-box"
                      onClick={() => handleBan('temperament', trait)}
                      title={`Ban temperament: ${trait}`}
                    >
                      {trait}
                    </div>
                  ))}
              </div>

              <img
                src={cat.url}
                alt={cat.breeds[0].name}
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />

              
            </div>
          )}
          <button onClick={() => fetchCat()}>Discover Another!</button>
        </div>

        {/* Right panel: Ban List */}
        <div className="ban-panel">
          <h2>Banned Traits</h2>
          {banList.length === 0 ? (
            <p>No banned traits.</p>
          ) : (
            <div className="ban-list-boxes">
              {banList.map(({ type, value }, index) => (
                <div
                  key={index}
                  className="ban-box"
                  onClick={() => handleUnban(type, value)}
                  title={`Remove ${type} ban: ${value}`}
                >
                  [{type}] {value} ✕
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

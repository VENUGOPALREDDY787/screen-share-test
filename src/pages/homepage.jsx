import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "../Componets/button";

export default function Home() {
  const navigate = useNavigate();
  const [unsupported, setUnsupported] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (unsupported) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
        setUnsupported(false); 
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [unsupported]);

  const handleStart = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      setUnsupported(true);
      return;
    }
    navigate("/screen-test");
  };
  return (
    <div className="home-container">
      
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-box">🖥</div>
            <span className="logo-text">
              ScreenShare<span className="logo-sub">Pro</span>
            </span>
          </div>

          <Button className="nav-button">Help</Button>
        </div>
      </nav>

      
      <section className="hero">
        <div className="hero-text">
          <h1>Screen Share Test App <br />
           
          </h1>

          <p>
            A minimalist tool for instant screen testing and sharing. No
            plugins, no hassle, just pure performance.
          </p>
        </div>
        {showError && (
          <div className="home-error-message">
            Your browser does not support screen sharing.
          </div>
        )}

        <div className="hero-buttons">
          <Button className="primary-btn" onClick={handleStart}>
            Start Screen Test
          </Button>
          <Button className="secondary-btn">Learn More</Button>
        </div>
      </section>

  
      <section className="features">
        <div className="feature-card">
          <h3>Zero Latency</h3>
          <p>Optimized for high-speed display capture.</p>
        </div>

        <div className="feature-card">
          <h3>4K Support</h3>
          <p>Crystal clear resolution for your presentations.</p>
        </div>

        <div className="feature-card">
          <h3>Privacy First</h3>
          <p>Local processing, no data leaves your browser.</p>
        </div>
      </section>

   
      <footer className="footer">
        <p>© 2026 ScreenShare Pro</p>

        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

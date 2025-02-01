import React from 'react';
import { UserButton } from "@clerk/clerk-react";
import './Homepage.css';

const Homepage = () => {
  const handleQuizClick = (quizNumber) => {
    console.log(`Quiz ${quizNumber} clicked`);
    // Add your quiz logic here
  };

  return (
    <div className="homepage" style={{ 
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      padding: 0,
      margin: 0
    }}>
      <nav className="navbar" style={{ 
        padding: "0.5rem 2rem", 
        background: 'rgba(26, 0, 33, 0.9)',
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        borderBottom: '2px solid #4d004d',
        boxShadow: '0 0 8px #4d004d'
      }}>
        <h2 style={{ 
          margin: 0,
          color: '#fff',
          textShadow: '0 0 8px #b366cc'
        }}>CyberTrain</h2>
        <UserButton />
      </nav>
      
      <div className="content" style={{ 
        paddingTop: "50px",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        margin: 0,
        padding: 0
      }}>
        <div className="left-column" style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px",
          width: "40%",
          height: "100%",
          padding: "0",
          margin: 0
        }}>
          <div className="neon-container" style={{
            borderRadius: "15px",
            height: "calc(50% - 10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0
          }}>
            <h2>Article</h2>
          </div>

          <div className="neon-container" style={{
            borderRadius: "15px",
            height: "calc(50% - 10px)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: 0,
            overflow: "hidden"
          }}>
            <h2 style={{
              position: "absolute",
              top: "20px",
              left: 0,
              right: 0,
              margin: 0,
              zIndex: 2
            }}>Helpline</h2>
            <div className="marquee-container" style={{
              marginTop: "80px",
              height: "calc(100% - 80px)",
              overflow: "hidden",
              position: "relative"
            }}>
              <div className="marquee-content">
                <div className="helpline-item">
                  <p>National Cyber Crime Reporting Portal</p>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    cybercrime.gov.in
                  </a>
                  <p>1930 (Toll-Free)</p>
                </div>
                <div className="helpline-item">
                  <p>Indian Computer Emergency Response Team (CERT-In)</p>
                  <a href="https://www.cert-in.org.in/" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    cert-in.org.in
                  </a>
                  <p>1800-11-4949/+91-11-24368572</p>
                </div>
                <div className="helpline-item">
                  <p>Indian Cyber Crime Coordination Centre (I4C)</p>
                  <a href="https://i4c.mha.gov.in" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    i4c.mha.gov.in
                  </a>
                  <p>011-23438207</p>
                </div>
                <div className="helpline-item">
                  <p>Mumbai Cyber Crime Cell</p>
                  <a href="https://mumbaipolice.gov.in/CyberSafety" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    mumbaipolice.gov.in/CyberSafety
                  </a>
                  <p>0712-2566766</p>
                </div>
                <div className="helpline-item">
                  <p>Delhi Cyber Crime Cell</p>
                  <a href="https://www.delhipolice.nic.in/cyber-crime" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    delhipolice.nic.in/cyber-crime
                  </a>
                  <p>011-23746694</p>
                </div>
                <div className="helpline-item">
                  <p>Hyderabad Cyber Crimes Police Station</p>
                  <a href="https://www.hyderabadpolice.gov.in/CyberCrimes.html" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    hyderabadpolice.gov.in/CyberCrimes
                  </a>
                  <p>1930 (24/7)</p>
                </div>
                {/* Duplicate for smooth loop */}
                <div className="helpline-item">
                  <p>National Cyber Crime Reporting Portal</p>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    cybercrime.gov.in
                  </a>
                  <p>1930 (Toll-Free)</p>
                </div>
                <div className="helpline-item">
                  <p>Indian Computer Emergency Response Team (CERT-In)</p>
                  <a href="https://www.cert-in.org.in/" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    cert-in.org.in
                  </a>
                  <p>1800-11-4949/+91-11-24368572</p>
                </div>
                <div className="helpline-item">
                  <p>Indian Cyber Crime Coordination Centre (I4C)</p>
                  <a href="https://i4c.mha.gov.in" target="_blank" rel="noopener noreferrer" className="helpline-link">
                    i4c.mha.gov.in
                  </a>
                  <p>011-23438207</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="neon-container" style={{
          borderRadius: "15px",
          width: "60%",
          height: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0"
        }}>
          <h2 style={{ marginBottom: "30px" }}>Quiz</h2>
          
          <div className="quiz-buttons" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            width: "100%",
            height: "calc(100% - 70px)",
            padding: "0",
            margin: 0
          }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                className="quiz-button"
                onClick={() => handleQuizClick(num)}
                style={{
                  padding: "20px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "500",
                  borderRadius: "10px",
                  margin: 0
                }}
              >
                Quiz {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

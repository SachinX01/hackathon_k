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
      width: '100%',
      backgroundColor: '#f0f0f0'
    }}>
      <nav className="navbar" style={{ 
        padding: "1rem 2rem", 
        backgroundColor: "#333", 
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000
      }}>
        <h2 style={{ margin: 0 }}>ABC Project</h2>
        <UserButton />
      </nav>
      
      <div className="content" style={{ 
        padding: "90px 20px 20px 20px",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        gap: "20px"
      }}>
        <div className="left-column" style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px",
          width: "350px"
        }}>
          <div className="article-container" style={{
            backgroundColor: "#808080",
            borderRadius: "15px",
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <h2 style={{ 
              color: "white", 
              margin: 0,
              fontSize: "1.8rem"
            }}>Article</h2>
          </div>

          <div className="helpline-container" style={{
            backgroundColor: "#808080",
            borderRadius: "15px",
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <h2 style={{ 
              color: "white", 
              margin: 0,
              fontSize: "1.8rem"
            }}>Helpline</h2>
          </div>
        </div>

        <div className="quiz-container" style={{
          backgroundColor: "#808080",
          borderRadius: "15px",
          width: "500px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h2 style={{ 
            color: "white", 
            margin: "0 0 30px 0",
            fontSize: "1.8rem"
          }}>Quiz</h2>
          
          <div className="quiz-buttons" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            width: "100%",
            padding: "0 20px"
          }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => handleQuizClick(num)}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "20px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  width: "100%",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
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

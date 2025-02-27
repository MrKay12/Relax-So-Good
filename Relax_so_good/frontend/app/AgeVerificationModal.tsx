"use client";

import { useEffect, useState } from "react";

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check localStorage to see if age is already verified
    const ageVerified = localStorage.getItem("ageVerified");
    if (!ageVerified) {
      // If not set, show the modal
      setShowModal(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    setShowModal(false);
  };

  const handleNo = () => {
    // Handle “No” however you like; e.g. redirect to a different site:
    window.location.href = "https://www.google.com";
  };

  if (!showModal) {
    // If the modal shouldn’t be shown, return null so it doesn’t render
    return null;
  }

  // Example bare-bones modal overlay
  return (
    <div 
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
    >
      <div style={{ background: "#fff", padding: "2rem", borderRadius: "8px" }}>
        <h2>Are you 18 or older?</h2>
        <button onClick={handleYes} style={{ marginRight: "1rem" }}>
          Yes
        </button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>
  );
}

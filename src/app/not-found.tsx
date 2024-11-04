"use client";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href = "/";
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <video autoPlay loop muted style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/video/cm33bgun704be3b6zwbspipe1.mp4" type="video/mp4" />
      </video>
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }}>404 Strony nie znaleziono</h1>
        <p style={{ color: 'white', fontSize: '1.2rem' }}>Przekierowanie za {countdown} sekund...</p>
      </div>
    </div>
  );
}
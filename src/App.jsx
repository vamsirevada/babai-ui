
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import './App.css';

// Chat Message Component
const ChatMessage = ({ message, isUser, timestamp }) => (
  <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
    <div className="message-content">
      <p>{message}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  </div>
);

// Chat Input Component
const ChatInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
        className="input-field"
      />
      <button type="submit" className="send-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
        </svg>
      </button>
    </form>
  );
};

// Three.js Background Component
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x25D366,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello! Welcome to bab.ai - your intelligent operating system for construction. How can I help you today?",
      isUser: false,
      timestamp: "10:30 AM"
    }
  ]);

  const chatRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP Hero Animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Animate title text
    gsap.fromTo(".hero-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(".hero-subtitle", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(".cta-button", 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.9, ease: "back.out(1.7)" }
    );
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      gsap.fromTo(chatRef.current, 
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(chatRef.current, 
        { x: "100%", opacity: 0, duration: 0.5, ease: "power2.in" }
      );
    }
  }, [isChatOpen]);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: messages.length + 1,
      message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        message: "I understand you're working on a construction project. Let me help you with that. What specific area would you like assistance with?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="app">
      <ThreeBackground />
      
      <main className="main-content" ref={heroRef}>
        <div className="hero-section">
          <h1 className="hero-title">bab.ai</h1>
          <p className="hero-subtitle">Intelligent Operating System for Construction</p>
          <button 
            className="cta-button"
            onClick={() => setIsChatOpen(true)}
          >
            Start Building Smarter
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Project Management</h3>
            <p>AI-powered project scheduling and resource optimization</p>
          </div>
          <div className="feature-card">
            <h3>Safety Monitoring</h3>
            <p>Real-time safety compliance and risk assessment</p>
          </div>
          <div className="feature-card">
            <h3>Cost Estimation</h3>
            <p>Intelligent cost prediction and budget management</p>
          </div>
        </div>
      </main>

      {/* WhatsApp-style Chat Interface */}
      <div className={`chat-container ${isChatOpen ? 'open' : ''}`} ref={chatRef}>
        <div className="chat-header">
          <div className="chat-info">
            <div className="avatar">
              <div className="avatar-icon">🤖</div>
            </div>
            <div className="contact-info">
              <h3>bab.ai Assistant</h3>
              <span className="status">Online</span>
            </div>
          </div>
          <button 
            className="close-chat"
            onClick={() => setIsChatOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      {isChatOpen && <div className="chat-overlay" onClick={() => setIsChatOpen(false)} />}
    </div>
  );
}

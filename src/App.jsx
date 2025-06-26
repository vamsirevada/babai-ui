
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

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
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello! Welcome to bab.ai - your intelligent operating system for construction. How can I help you today?",
      isUser: false,
      timestamp: "10:30 AM"
    }
  ]);

  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [messageCount, setMessageCount] = useState(1);

  const chatRef = useRef(null);
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const zoomSectionRef = useRef(null);

  const demoMessages = [
    { isUser: true, message: "I need help with project scheduling for a new office building" },
    { isUser: false, message: "I can help you create an optimized schedule. What's the project timeline and key milestones?" },
    { isUser: true, message: "12-month project, foundation starts in March" },
    { isUser: false, message: "Perfect! Based on current weather patterns and resource availability, I recommend starting foundation work in the second week of March. I've created a preliminary schedule with buffer time for weather delays." },
    { isUser: true, message: "What about safety compliance?" },
    { isUser: false, message: "I've integrated OSHA safety requirements into your timeline. All safety inspections are scheduled, and I'll send real-time alerts for any compliance issues." },
    { isUser: true, message: "How about cost estimation?" },
    { isUser: false, message: "Based on current material costs and labor rates in your area, I estimate $2.4M total project cost. I'm monitoring price fluctuations and will alert you to any significant changes." }
  ];

  const generateAutoMessage = () => {
    if (messageCount < demoMessages.length) {
      const newMessage = {
        id: messages.length + 1,
        ...demoMessages[messageCount],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageCount(prev => prev + 1);
    }
  };

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

    // Animate features cards
    gsap.fromTo(".feature-card", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.9, stagger: 0.2, ease: "power2.out" }
    );

    // ScrollTrigger for chat slide-in animation
    ScrollTrigger.create({
      trigger: showcaseRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.fromTo(chatRef.current, 
          { 
            x: "100vw", 
            y: "50vh", 
            scale: 0.7,
            opacity: 0 
          },
          { 
            x: "50vw", 
            y: "50vh", 
            xPercent: -50,
            yPercent: -50,
            scale: 0.9,
            opacity: 1, 
            duration: 1.2, 
            ease: "power3.out",
            onComplete: () => {
              setIsAutoGenerating(true);
            }
          }
        );
      },
      onLeave: () => {
        setIsAutoGenerating(false);
      },
      onEnterBack: () => {
        setIsAutoGenerating(true);
      },
      onLeaveBack: () => {
        gsap.to(chatRef.current, 
          { 
            x: "100vw", 
            y: "50vh", 
            xPercent: 0,
            yPercent: -50,
            scale: 0.7,
            opacity: 0, 
            duration: 0.8, 
            ease: "power2.in" 
          }
        );
        setIsAutoGenerating(false);
      }
    });

    // ScrollTrigger for chat zoom effect
    ScrollTrigger.create({
      trigger: zoomSectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(chatRef.current, {
          scale: 1.1,
          duration: 1,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to(chatRef.current, {
          scale: 0.9,
          duration: 0.8,
          ease: "power2.in"
        });
      },
      onEnterBack: () => {
        gsap.to(chatRef.current, {
          scale: 1.1,
          duration: 1,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(chatRef.current, {
          scale: 0.9,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoGenerating && messageCount < demoMessages.length) {
      interval = setInterval(() => {
        generateAutoMessage();
      }, 2500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoGenerating, messageCount, messages.length]);

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
          <p className="scroll-hint">Scroll down to see our AI assistant in action</p>
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

      <section className="showcase-section" ref={showcaseRef}>
        <div className="showcase-content">
          <h2>Experience Our AI Assistant</h2>
          <p>Watch as our intelligent chat interface demonstrates real-time construction project assistance</p>
          <div className="showcase-features">
            <div className="showcase-item">
              <span className="showcase-icon">🏗️</span>
              <h4>Real-time Project Updates</h4>
            </div>
            <div className="showcase-item">
              <span className="showcase-icon">📊</span>
              <h4>Intelligent Analytics</h4>
            </div>
            <div className="showcase-item">
              <span className="showcase-icon">🤖</span>
              <h4>AI-Powered Insights</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="zoom-section" ref={zoomSectionRef}>
        <div className="zoom-content">
          <h2>Interactive AI Conversations</h2>
          <p>See how our AI handles complex construction queries with intelligent responses and project insights</p>
          <div className="zoom-features">
            <div className="zoom-item">
              <span className="zoom-icon">💬</span>
              <h4>Natural Language Processing</h4>
              <p>Communicate naturally with your AI assistant</p>
            </div>
            <div className="zoom-item">
              <span className="zoom-icon">⚡</span>
              <h4>Instant Responses</h4>
              <p>Get immediate answers to your construction questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp-style Chat Interface */}
      <div className="chat-container" ref={chatRef}>
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
        </div>

        <div className="chat-messages" ref={(el) => {
          if (el && messages.length > 1) {
            el.scrollTop = el.scrollHeight;
          }
        }}>
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
    </div>
  );
}

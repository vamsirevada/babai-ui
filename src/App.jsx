
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

// Enhanced Three.js Background Component
const ThreeBackground = () => {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create multiple particle systems for depth
    const particleGroups = [];
    
    // Main floating particles
    const mainGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 15;
      
      velocities[i] = (Math.random() - 0.5) * 0.002;
      velocities[i + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i + 2] = (Math.random() - 0.5) * 0.002;
    }

    mainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const mainMaterial = new THREE.PointsMaterial({
      color: 0x00d4aa,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const mainParticles = new THREE.Points(mainGeometry, mainMaterial);
    scene.add(mainParticles);
    particleGroups.push({ particles: mainParticles, velocities, speed: 1 });

    // Secondary particle layer
    const secondGeometry = new THREE.BufferGeometry();
    const secondCount = 80;
    const secondPositions = new Float32Array(secondCount * 3);
    const secondVelocities = new Float32Array(secondCount * 3);

    for (let i = 0; i < secondCount * 3; i += 3) {
      secondPositions[i] = (Math.random() - 0.5) * 30;
      secondPositions[i + 1] = (Math.random() - 0.5) * 30;
      secondPositions[i + 2] = (Math.random() - 0.5) * 20;
      
      secondVelocities[i] = (Math.random() - 0.5) * 0.001;
      secondVelocities[i + 1] = (Math.random() - 0.5) * 0.001;
      secondVelocities[i + 2] = (Math.random() - 0.5) * 0.001;
    }

    secondGeometry.setAttribute('position', new THREE.BufferAttribute(secondPositions, 3));
    
    const secondMaterial = new THREE.PointsMaterial({
      color: 0x25D366,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const secondParticles = new THREE.Points(secondGeometry, secondMaterial);
    scene.add(secondParticles);
    particleGroups.push({ particles: secondParticles, velocities: secondVelocities, speed: 0.5 });

    // Add geometric shapes for more 3D depth
    const geometricGroup = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.OctahedronGeometry(0.1, 0);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00bfa5,
        transparent: true,
        opacity: 0.1,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      
      geometricGroup.add(mesh);
    }
    
    scene.add(geometricGroup);

    camera.position.z = 8;

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Scroll interaction
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Enhanced animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate particle groups
      particleGroups.forEach((group, index) => {
        const positions = group.particles.geometry.attributes.position.array;
        const velocities = group.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
          // Smooth floating motion
          positions[i] += velocities[i] * group.speed;
          positions[i + 1] += velocities[i + 1] * group.speed;
          positions[i + 2] += velocities[i + 2] * group.speed;
          
          // Add wave motion
          positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.002;
          positions[i] += Math.cos(time + positions[i + 1] * 0.3) * 0.001;
          
          // Boundary wrapping
          if (Math.abs(positions[i]) > 15) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 15) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
        }
        
        group.particles.geometry.attributes.position.needsUpdate = true;
        
        // Mouse interaction
        group.particles.rotation.x += (mouseRef.current.y * 0.1 - group.particles.rotation.x) * 0.05;
        group.particles.rotation.y += (mouseRef.current.x * 0.1 - group.particles.rotation.y) * 0.05;
      });

      // Animate geometric shapes
      geometricGroup.children.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.002;
        mesh.rotation.y += 0.015 + index * 0.001;
        mesh.position.y += Math.sin(time + index) * 0.001;
      });

      // Camera subtle movement based on scroll and mouse
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
      camera.position.z = 8 + scrollRef.current * 2;

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      mainGeometry.dispose();
      mainMaterial.dispose();
      secondGeometry.dispose();
      secondMaterial.dispose();
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
    // Enhanced GSAP Hero Animation with smoother easing
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 80, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" }
    );

    // Animate title text with enhanced smoothness
    gsap.fromTo(".hero-title", 
      { opacity: 0, y: 50, rotationX: 15 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, delay: 0.4, ease: "power3.out" }
    );

    gsap.fromTo(".hero-subtitle", 
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, delay: 0.7, ease: "power3.out" }
    );

    gsap.fromTo(".scroll-hint", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
    );

    // Animate features cards with staggered entrance
    gsap.fromTo(".feature-card", 
      { opacity: 0, y: 60, rotationY: 15, scale: 0.9 },
      { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 1, delay: 1.2, stagger: 0.15, ease: "power3.out" }
    );

    // Animate navbar with smooth entrance
    gsap.fromTo(".navbar", 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    // ScrollTrigger for chat slide-in animation with enhanced smoothness
    ScrollTrigger.create({
      trigger: showcaseRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.fromTo(chatRef.current, 
          { 
            right: "-450px",
            x: "0%",
            scale: 0.8,
            opacity: 0,
            rotationY: 25,
            filter: "blur(8px)"
          },
          { 
            right: "50%",
            x: "50%",
            scale: 0.9,
            opacity: 1,
            rotationY: 0,
            filter: "blur(0px)",
            duration: 1.5, 
            ease: "power4.out",
            onComplete: () => {
              setIsAutoGenerating(true);
              // Add subtle floating animation
              gsap.to(chatRef.current, {
                y: "+=10",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
              });
            }
          }
        );
      },
      onLeave: () => {
        setIsAutoGenerating(false);
        gsap.killTweensOf(chatRef.current);
      },
      onEnterBack: () => {
        setIsAutoGenerating(true);
        gsap.to(chatRef.current, {
          y: "+=10",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(chatRef.current);
        gsap.to(chatRef.current, 
          { 
            right: "-450px",
            x: "0%",
            scale: 0.8,
            opacity: 0,
            rotationY: -25,
            filter: "blur(8px)",
            duration: 1, 
            ease: "power3.in" 
          }
        );
        setIsAutoGenerating(false);
      }
    });

    // ScrollTrigger for chat zoom effect with enhanced smoothness
    ScrollTrigger.create({
      trigger: zoomSectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.killTweensOf(chatRef.current);
        gsap.to(chatRef.current, {
          scale: 1.25,
          right: "50%",
          x: "50%",
          rotationZ: 1,
          transformPerspective: 1000,
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            // Add subtle pulsing effect during zoom
            gsap.to(chatRef.current, {
              scale: 1.27,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          }
        });
      },
      onLeave: () => {
        gsap.killTweensOf(chatRef.current);
        gsap.to(chatRef.current, {
          scale: 0.9,
          rotationZ: 0,
          duration: 1,
          ease: "power3.in",
          onComplete: () => {
            gsap.to(chatRef.current, {
              y: "+=10",
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          }
        });
      },
      onEnterBack: () => {
        gsap.killTweensOf(chatRef.current);
        gsap.to(chatRef.current, {
          scale: 1.25,
          right: "50%",
          x: "50%",
          rotationZ: 1,
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            gsap.to(chatRef.current, {
              scale: 1.27,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          }
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(chatRef.current);
        gsap.to(chatRef.current, {
          scale: 0.9,
          rotationZ: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(chatRef.current, {
              y: "+=10",
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          }
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
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h1 className="logo-text">bab.ai</h1>
        </div>
      </nav>
      
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

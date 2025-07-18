import { useState, useEffect, useRef } from 'react'

const PhoneModel = () => {
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Add custom CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes messageSlideIn {
        from {
          opacity: 0;
          transform: translateX(-10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      
      @keyframes typingDots {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-10px);
        }
      }
      
      @keyframes slideInFromRight {
        from {
          opacity: 0;
          transform: translateX(100%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      @keyframes phoneSlideIn {
        0% {
          opacity: 0;
          transform: translateX(300px) scale(0.8) rotate(10deg);
        }
        60% {
          opacity: 1;
          transform: translateX(-10px) scale(1.02) rotate(-2deg);
        }
        80% {
          opacity: 1;
          transform: translateX(5px) scale(0.98) rotate(1deg);
        }
        100% {
          opacity: 1;
          transform: translateX(0) scale(1) rotate(0deg);
        }
      }

      .phone-slide-animation {
        animation: phoneSlideIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        opacity: 0;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi',
      time: '9:40 AM',
      type: 'sent',
      hasImage: false,
    },
    {
      id: 2,
      text: 'Hi 👋, Welcome to Bab.ai! How can I assist you today? ',
      time: '9:41 AM',
      type: 'received',
      hasImage: false,
    },
    {
      id: 3,
      text: "What's the site status?",
      time: '9:42 AM',
      type: 'sent',
      hasImage: false,
    },
    {
      id: 4,
      text: "We've laid the foundation concrete, but it's nearly out. How does that look? 🏗️",
      time: '9:43 AM',
      type: 'received',
      hasImage: true,
    },
    {
      id: 5,
      text: 'Good, please order 10 m³ right away',
      time: '9:45 AM',
      type: 'sent',
      hasImage: false,
    },
    {
      id: 6,
      text: `Let me provide you with some vendor recommendations.`,
      time: '9:46 AM',
      type: 'received',
      hasImage: false,
    },
  ])
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showVendors, setShowVendors] = useState(false)
  const [currentTypingMessage, setCurrentTypingMessage] = useState('')
  const [phoneVisible, setPhoneVisible] = useState(false)

  const vendors = [
    {
      name: 'BuildFuture',
      description: 'Supplier known for quick deliveries',
      time: '6:59 AM',
      rating: 4,
    },
    {
      name: 'Sino Traders',
      description: 'Offering structural quantities',
      time: '2:51 AM',
      rating: 3,
    },
    {
      name: 'Flower Construction',
      description: 'Supplier known for excellent quality',
      time: '6:50 AM',
      rating: 5,
    },
  ]

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  // Enhanced animation with typing effect and varied timing
  useEffect(() => {
    let timeoutId

    if (visibleMessages < messages.length) {
      const currentMessage = messages[visibleMessages]
      const isReceived = currentMessage.type === 'received'

      // Show typing indicator for received messages
      if (isReceived) {
        setIsTyping(true)
        setCurrentTypingMessage(currentMessage.text)
      }

      // Dynamic timing based on message length and type
      const baseDelay = isReceived ? 1500 : 800 // Received messages take longer
      const lengthMultiplier = currentMessage.text.length * 30 // 30ms per character
      const randomDelay = Math.random() * 500 + 300 // Random 300-800ms
      const totalDelay = Math.min(
        baseDelay + lengthMultiplier + randomDelay,
        4000
      ) // Max 4 seconds

      timeoutId = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((prev) => prev + 1)
        scrollToBottom()
      }, totalDelay)
    } else if (visibleMessages >= messages.length && !showVendors) {
      // Show vendors after all messages with a slight delay
      timeoutId = setTimeout(() => {
        setShowVendors(true)
        scrollToBottom()
      }, 1200)
    }

    return () => clearTimeout(timeoutId)
  }, [visibleMessages, messages.length, showVendors])

  // Auto-start animation on component mount
  useEffect(() => {
    // Start phone animation immediately
    const phoneAnimationDelay = setTimeout(() => {
      setPhoneVisible(true)
    }, 300) // Start phone animation after 300ms

    // Start message animation after phone animation
    const startDelay = setTimeout(() => {
      if (visibleMessages === 0) {
        setVisibleMessages(1)
      }
    }, 2000) // Start messages after 2 seconds (after phone animation)

    return () => {
      clearTimeout(phoneAnimationDelay)
      clearTimeout(startDelay)
    }
  }, [])

  return (
    <div className="relative lg:min-h-[900px]">
      <div
        className={`relative transform transition-all duration-500 lg:sticky lg:top-16 group ${
          phoneVisible ? 'phone-slide-animation' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
          width: '100%',
          maxWidth: '390px',
          margin: '0 auto',
        }}
      >
        {/* Phone Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-600/30 rounded-[70px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* 3D Phone Model */}
        <div className="relative bg-[#1a1a1a] rounded-[65px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.15)] transform hover:scale-[1.02] transition-all duration-500 ease-out will-change-transform">
          <div className="bg-black rounded-[57px] p-2 shadow-inner">
            <div
              className="bg-[#121212] rounded-[53px] overflow-hidden relative"
              style={{ height: '844px' }}
            >
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-10"></div>

              <div className="h-full flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-500 px-5 py-6 pt-10 flex items-center justify-between shadow-lg">
                  <div className="flex items-center">
                    <button className="text-white/90 mr-3 hover:text-white transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-green-300 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <span className="text-white font-bold text-base">B</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium tracking-wide text-sm">
                        Bab.ai
                      </h3>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                        <p className="text-white/90 text-xs">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-white">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </button>
                    <button className="text-white">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:hidden"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(229,221,213,0.95) 100%),
                      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z' fill='%23f0f0f0' fill-opacity='0.4'/%3E%3C/svg%3E")
                    `,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {Array.isArray(messages) &&
                    messages.slice(0, visibleMessages).map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.type === 'sent'
                            ? 'justify-end'
                            : 'justify-start'
                        } opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <div
                          className={`max-w-[280px] px-3 py-2 rounded-2xl shadow-sm transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] relative ${
                            message.type === 'sent'
                              ? 'bg-green-500/95 text-white border border-green-600/10'
                              : 'bg-white/95 text-gray-800 border border-gray-200/20'
                          }`}
                        >
                          <p
                            className={`text-xs leading-relaxed text-start ${
                              message.hasImage ? '' : 'pr-12'
                            }`}
                          >
                            {message.text}
                          </p>
                          {message.hasImage && (
                            <div className="mt-1.5 w-full h-20 bg-gray-200 rounded-lg overflow-hidden relative">
                              <img
                                src="/foundation.jpg"
                                alt="Construction site foundation"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.nextSibling.style.display = 'flex'
                                }}
                              />
                            </div>
                          )}
                          <p
                            className={`text-[9px] mt-1 text-right ${
                              message.type === 'sent'
                                ? 'text-green-100'
                                : 'text-gray-500'
                            } ${
                              message.hasImage
                                ? ''
                                : 'absolute bottom-1 right-2'
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start animate-[fadeInUp_0.3s_ease-out]">
                      <div className="max-w-[280px] px-3 py-2 rounded-2xl bg-white/95 text-gray-800 border border-gray-200/20 backdrop-blur-sm">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0ms' }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '150ms' }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '300ms' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showVendors && (
                    <div className="animate-[fadeInUp_0.8s_ease-out]">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-3 shadow-sm">
                        <h4 className="font-medium mb-1.5 text-gray-800 flex items-center text-[11px]">
                          <span className="mr-1 text-xs">🎯</span>
                          Recommended Suppliers
                        </h4>
                        <div className="space-y-1.5">
                          {vendors.map((vendor, index) => (
                            <div
                              key={index}
                              className="group flex items-center p-2 bg-white/80 hover:bg-gradient-to-r hover:from-white/90 hover:to-green-50/30 rounded-lg transition-all duration-300 cursor-pointer border border-gray-100/20 backdrop-blur-sm opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                              style={{
                                animationDelay: `${index * 0.2}s`,
                              }}
                            >
                              <div className="w-7 h-7 bg-gradient-to-br from-green-500 via-green-400 to-green-600 rounded-full flex items-center justify-center mr-2 shadow-md group-hover:shadow-lg transition-all duration-300 flex-shrink-0">
                                <span className="text-white text-[9px] font-bold">
                                  {vendor.name[0]}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <div className="flex-1 mr-3 text-left">
                                    <h5 className="font-medium text-[10px] text-gray-800 truncate text-start">
                                      {vendor.name}
                                    </h5>
                                    <p className="text-[9px] text-gray-600 mt-0.5 truncate text-start">
                                      {vendor.description}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end flex-shrink-0">
                                    <div className="flex items-center mb-1">
                                      {[...Array(5)].map((_, i) => (
                                        <span
                                          key={i}
                                          className={`text-[8px] ${
                                            i < vendor.rating
                                              ? 'text-yellow-400'
                                              : 'text-gray-300'
                                          }`}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                    <span className="text-[9px] text-gray-500">
                                      {vendor.time}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="mt-1.5 bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 rounded-full text-[9px] font-medium transition-colors duration-200 hover:scale-105 transform">
                          Get Quotes
                        </button>
                      </div>

                      <div
                        className="bg-white/95 text-gray-800 px-3 py-2 rounded-2xl mr-auto max-w-[260px] opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] transform hover:scale-[1.02] transition-transform duration-200 border border-gray-200/20 backdrop-blur-sm relative"
                        style={{ animationDelay: '1s' }}
                      >
                        <p className="text-xs leading-relaxed pr-12 text-start">
                          You're instantly approved up to ₹85,000. Pay later?
                        </p>
                        <p className="absolute bottom-1 right-2 text-[9px] text-gray-500">
                          9:45 AM
                        </p>
                        <button className="mt-1.5 bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors duration-200">
                          Want to Avail Credit?
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="bg-gradient-to-b from-[#F0F2F5] to-[#E8EEF1] px-4 py-3 flex items-center space-x-3 border-t border-gray-200/50 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]">
                  <button className="text-gray-500 hover:text-green-600 transition-colors p-2 hover:bg-gray-100/50 rounded-full">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  <div className="flex-1 bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100/50 backdrop-blur-sm">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
                      readOnly
                    />
                  </div>
                  <button className="text-gray-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneModel

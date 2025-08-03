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

      .whatsapp-bg {
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23e5ddd5'/%3E%3Cpath d='M50 0c27.6 0 50 22.4 50 50s-22.4 50-50 50S0 77.6 0 50 22.4 0 50 0zM50 94c24.3 0 44-19.7 44-44S74.3 6 50 6 6 25.7 6 50s19.7 44 44 44z' fill='%23d9d9d9' fill-opacity='0.05'/%3E%3C/svg%3E");
        background-color: #e5ddd5;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
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
      text: 'Hi 👋, Welcome to Bab.ai! How can I assist you today?',
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

  // Enhanced animation with typing effect
  useEffect(() => {
    let timeoutId

    if (visibleMessages < messages.length) {
      const currentMessage = messages[visibleMessages]
      const isReceived = currentMessage.type === 'received'

      if (isReceived) {
        setIsTyping(true)
      }

      const baseDelay = isReceived ? 1500 : 800
      const lengthMultiplier = currentMessage.text.length * 30
      const randomDelay = Math.random() * 500 + 300
      const totalDelay = Math.min(
        baseDelay + lengthMultiplier + randomDelay,
        4000
      )

      timeoutId = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((prev) => prev + 1)
        scrollToBottom()
      }, totalDelay)
    } else if (visibleMessages >= messages.length && !showVendors) {
      timeoutId = setTimeout(() => {
        setShowVendors(true)
        scrollToBottom()
      }, 1200)
    }

    return () => clearTimeout(timeoutId)
  }, [visibleMessages, messages.length, showVendors])

  // Auto-start animation
  useEffect(() => {
    const phoneAnimationDelay = setTimeout(() => {
      setPhoneVisible(true)
    }, 300)

    const startDelay = setTimeout(() => {
      if (visibleMessages === 0) {
        setVisibleMessages(1)
      }
    }, 2000)

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
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-600/30 rounded-[50px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* iPhone-like Phone Model */}
        <div className="relative bg-black rounded-[50px] p-2 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 ease-out">
          {/* Screen */}
          <div
            className="bg-white rounded-[42px] overflow-hidden relative"
            style={{ height: '844px' }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20"></div>

            <div className="h-full flex flex-col">
              {/* WhatsApp Header - More Accurate */}
              <div
                className="px-4 py-3 pt-10 flex items-center justify-between shadow-sm"
                style={{ backgroundColor: '#128C7E' }}
              >
                <div className="flex items-center flex-1">
                  <button className="text-white mr-4 p-1">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                  </button>

                  {/* Profile Picture */}
                  <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-medium text-base">Bab.ai</h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      <p className="text-white/90 text-sm">online</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="text-white p-2">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1z" />
                    </svg>
                  </button>
                  <button className="text-white p-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Messages with WhatsApp Background */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 space-y-2 whatsapp-bg"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {messages.slice(0, visibleMessages).map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'sent' ? 'justify-end' : 'justify-start'
                    } opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg shadow-sm relative ${
                        message.type === 'sent'
                          ? 'bg-[#dcf8c6] text-gray-800 rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none'
                      }`}
                      style={{
                        borderRadius:
                          message.type === 'sent'
                            ? '18px 18px 4px 18px'
                            : '18px 18px 18px 4px',
                      }}
                    >
                      <p className="text-sm leading-relaxed mb-1">
                        {message.text}
                      </p>

                      {message.hasImage && (
                        <div className="mt-2 w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src="/foundation.jpg"
                            alt="Construction site"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                        {message.type === 'sent' && (
                          <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.501 0.108955L14 0.59573L8.60042 8L6.41166 5.83835L7.33857 4.56645L8.60042 5.30239L13.501 0.108955ZM9.11925 0L9.61822 0.486775L4.21865 7.89105L0.5 4.23358L1.33033 3.42354L4.21865 5.19343L9.11925 0Z"
                              fill="#3497F9"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-[fadeInUp_0.3s_ease-out]">
                    <div
                      className="bg-white px-3 py-2 rounded-lg shadow-sm"
                      style={{ borderRadius: '18px 18px 18px 4px' }}
                    >
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 150}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vendor Recommendations */}
                {showVendors && (
                  <div className="animate-[fadeInUp_0.8s_ease-out]">
                    <div
                      className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                      style={{ borderRadius: '18px 18px 18px 4px' }}
                    >
                      <h4 className="font-semibold mb-3 text-gray-800 flex items-center text-sm">
                        <span className="mr-2">🎯</span>
                        Recommended Suppliers
                      </h4>

                      <div className="space-y-2">
                        {vendors.map((vendor, index) => (
                          <div
                            key={index}
                            className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 text-white font-bold text-xs">
                              {vendor.name[0]}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm text-gray-800">
                                {vendor.name}
                              </h5>
                              <p className="text-xs text-gray-600">
                                {vendor.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-xs ${
                                      i < vendor.rating
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                {vendor.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                        Get Quotes
                      </button>
                    </div>

                    {/* Credit Offer */}
                    <div
                      className="bg-white px-3 py-2 rounded-lg shadow-sm mt-2 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                      style={{
                        animationDelay: '1s',
                        borderRadius: '18px 18px 18px 4px',
                      }}
                    >
                      <p className="text-sm mb-2">
                        You're instantly approved up to ₹85,000. Pay later?
                      </p>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-xs font-medium transition-colors">
                        Want to Avail Credit?
                      </button>
                      <div className="flex items-center justify-end mt-1">
                        <span className="text-xs text-gray-500">9:47 AM</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input - WhatsApp Style */}
              <div className="bg-[#f0f0f0] px-3 py-2 flex items-center space-x-2 border-t border-gray-200">
                <button className="text-gray-500 p-2">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                </button>

                <div className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-300">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="w-full bg-transparent outline-none text-sm text-gray-700"
                    readOnly
                  />
                </div>

                <button className="text-gray-500 p-2">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneModel

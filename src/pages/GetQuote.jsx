import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiCall } from '../utils/api.js'
import { Button } from '../components/ui/button'
import PrefetchLink from '@/components/PrefetchLink'
import { prefetch } from '@/App'

const GetQuote = () => {
  const [searchParams] = useSearchParams()
  const uuid = searchParams.get('uuid')
  const [orderData, setOrderData] = useState(null)
  const [vendors, setVendors] = useState([])
  const [vendorSelection, setVendorSelection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dummy vendor data
  const dummyVendors = [
    {
      id: 1,
      name: 'BuildMax Construction Supply',
      description: 'Premium cement, steel, and building materials supplier',
      rating: 4.8,
      location: 'Chennai, Tamil Nadu',
      specialties: ['Cement', 'Steel', 'Bricks'],
      deliveryTime: '1-2 days',
      minimumOrder: '₹10,000',
      contact: '+91 9876543210',
      logo: '🏢',
    },
    {
      id: 2,
      name: 'Steel & Cement Depot',
      description:
        'Bulk supplier of construction materials with 20+ years experience',
      rating: 4.6,
      location: 'Bangalore, Karnataka',
      specialties: ['Steel Bars', 'Cement', 'Hardware'],
      deliveryTime: 'Same day',
      minimumOrder: '₹5,000',
      contact: '+91 9876543211',
      logo: '🏗️',
    },
    {
      id: 3,
      name: 'Metro Building Materials',
      description:
        'Complete range of construction materials at competitive prices',
      rating: 4.7,
      location: 'Mumbai, Maharashtra',
      specialties: ['Pipes', 'Electrical', 'Paint'],
      deliveryTime: '2-3 days',
      minimumOrder: '₹15,000',
      contact: '+91 9876543212',
      logo: '🏭',
    },
    {
      id: 4,
      name: 'Quick Build Supplies',
      description: 'Fast delivery construction materials for urgent projects',
      rating: 4.5,
      location: 'Delhi NCR',
      specialties: ['Quick Delivery', 'Emergency Supply', 'All Materials'],
      deliveryTime: '4-6 hours',
      minimumOrder: '₹8,000',
      contact: '+91 9876543213',
      logo: '⚡',
    },
    {
      id: 5,
      name: 'Eco Green Materials',
      description: 'Sustainable and eco-friendly construction materials',
      rating: 4.9,
      location: 'Pune, Maharashtra',
      specialties: ['Eco Materials', 'Green Building', 'Sustainable'],
      deliveryTime: '1-3 days',
      minimumOrder: '₹12,000',
      contact: '+91 9876543214',
      logo: '🌱',
    },
    {
      id: 6,
      name: 'Budget Builder Mart',
      description:
        'Affordable construction materials without compromising quality',
      rating: 4.3,
      location: 'Hyderabad, Telangana',
      specialties: ['Budget Materials', 'Bulk Orders', 'Wholesale'],
      deliveryTime: '2-4 days',
      minimumOrder: '₹3,000',
      contact: '+91 9876543215',
      logo: '💰',
    },
  ]

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        setIsLoading(true)

        const cachedOrderData = localStorage.getItem('orderData')
        if (cachedOrderData) {
          const parsedData = JSON.parse(cachedOrderData)
          setOrderData(parsedData)
          console.log('✅ Loaded order data from cache:', parsedData)
        }

        // Load dummy vendors (simulate API call)
        setTimeout(() => {
          setVendors(dummyVendors)
          console.log('✅ Loaded dummy vendors:', dummyVendors)
        }, 500) // Small delay to simulate API call
      } catch (error) {
        console.error('Error loading order data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrderData()
  }, [uuid])

  const selectVendor = async (vendorId) => {
    try {
      setIsSubmitting(true)
      const selectedVendor = vendors.find((v) => v.id === vendorId)
      // Create API-compliant submission data
      const apiSubmissionData = {
        request_id: uuid,
        project_id: orderData.project_id || crypto.randomUUID(),
        sender_id:
          orderData.sender_id ||
          orderData.customerInfo?.phone?.replace(/\D/g, '') ||
          '918888888888',
        status: 'DRAFT',
        delivery_location:
          orderData.delivery_location ||
          orderData.customerInfo?.address ||
          'Construction Site',
        notes: `${
          orderData.notes || 'Order placed via BAB.AI Dashboard'
        }. Selected vendor: ${selectedVendor.name} (${selectedVendor.contact})`,
        expected_delivery_date:
          orderData.expected_delivery_date ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        user_editable:
          orderData.user_editable !== undefined
            ? orderData.user_editable
            : true,
        items: orderData.items || [],
      }

      console.log('API-compliant submission data:', apiSubmissionData)

      console.log('API-compliant submission data:', apiSubmissionData)
      let apiSuccess = false
      let result = null

      // Try direct fetch to ngrok
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        const response = await fetch(
          'https://bug-saving-frog.ngrok-free.app/submit-order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify(apiSubmissionData), // Use API-compliant format
            signal: controller.signal,
          }
        )

        clearTimeout(timeoutId)

        if (response.ok) {
          result = await response.json()
          apiSuccess = true
          console.log(
            '✅ Order submitted successfully via direct fetch:',
            result
          )
        } else {
          throw new Error(`API responded with status: ${response.status}`)
        }
      } catch (fetchError) {
        console.warn('Direct fetch failed:', fetchError.message)

        // Analyze the specific error type
        let errorType = 'unknown'
        if (fetchError.message.includes('Failed to fetch')) {
          errorType = 'network_error'
        } else if (fetchError.message.includes('CORS')) {
          errorType = 'cors_error'
        } else if (fetchError.name === 'AbortError') {
          errorType = 'timeout_error'
        }

        console.log('� Error type detected:', errorType)

        // Enhanced window submission with better error handling
        try {
          console.log('📤 Attempting enhanced window submission...')

          // Validate data before creating window
          if (!selectedVendor || !orderData || !apiSubmissionData) {
            throw new Error('Missing required data for window submission')
          }

          const newWindow = window.open(
            '',
            '_blank',
            'width=900,height=700,scrollbars=yes,resizable=yes'
          )

          if (newWindow) {
            try {
              // Create HTML content with enhanced submission logic
              const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Order Submission - ${selectedVendor.name}</title>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      padding: 20px;
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      margin: 0;
                      min-height: 100vh;
                    }
                    .container {
                      max-width: 800px;
                      margin: 20px auto;
                      background: white;
                      padding: 30px;
                      border-radius: 16px;
                      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    }
                    .header {
                      text-align: center;
                      margin-bottom: 30px;
                      padding-bottom: 20px;
                      border-bottom: 2px solid #f0f0f0;
                    }
                    .status {
                      padding: 20px;
                      border-radius: 12px;
                      margin: 20px 0;
                      font-weight: 500;
                      text-align: center;
                    }
                    .status.loading {
                      background: #dbeafe;
                      color: #1e40af;
                      border: 2px solid #93c5fd;
                    }
                    .status.success {
                      background: #dcfce7;
                      color: #166534;
                      border: 2px solid #86efac;
                    }
                    .status.error {
                      background: #fee2e2;
                      color: #991b1b;
                      border: 2px solid #fca5a5;
                    }
                    .status.warning {
                      background: #fef3c7;
                      color: #92400e;
                      border: 2px solid #fcd34d;
                    }
                    .order-details {
                      background: #f8fafc;
                      padding: 25px;
                      border-radius: 12px;
                      border-left: 6px solid #3b82f6;
                      margin: 20px 0;
                    }
                    .vendor-info {
                      background: #f0fdf4;
                      padding: 25px;
                      border-radius: 12px;
                      border-left: 6px solid #22c55e;
                      margin: 20px 0;
                    }
                    .btn {
                      background: #3b82f6;
                      color: white;
                      padding: 12px 24px;
                      border: none;
                      border-radius: 8px;
                      cursor: pointer;
                      margin: 8px;
                      font-weight: 600;
                      transition: all 0.3s ease;
                      font-size: 14px;
                    }
                    .btn:hover {
                      background: #2563eb;
                      transform: translateY(-2px);
                      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                    }
                    .btn.success { background: #059669; }
                    .btn.success:hover {
                      background: #047857;
                      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
                    }
                    .btn.secondary { background: #6b7280; }
                    .btn.secondary:hover {
                      background: #4b5563;
                      box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
                    }
                    .btn.danger { background: #dc2626; }
                    .btn.danger:hover {
                      background: #b91c1c;
                      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
                    }
                    .spinner {
                      display: inline-block;
                      width: 20px;
                      height: 20px;
                      border: 3px solid #f3f3f3;
                      border-top: 3px solid #3b82f6;
                      border-radius: 50%;
                      animation: spin 1s linear infinite;
                      margin-right: 10px;
                      vertical-align: middle;
                    }
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    .error-details {
                      background: #fef2f2;
                      border: 1px solid #fecaca;
                      padding: 15px;
                      border-radius: 8px;
                      margin: 15px 0;
                      font-size: 14px;
                      color: #991b1b;
                    }
                    .json-data {
                      background: #1f2937;
                      color: #f3f4f6;
                      padding: 20px;
                      border-radius: 8px;
                      font-family: 'Courier New', monospace;
                      font-size: 12px;
                      overflow-x: auto;
                      white-space: pre-wrap;
                      max-height: 300px;
                      overflow-y: auto;
                    }
                    .button-group {
                      text-align: center;
                      margin-top: 30px;
                      padding-top: 20px;
                      border-top: 2px solid #f0f0f0;
                    }
                    .retry-info {
                      background: #fef3c7;
                      border: 1px solid #fcd34d;
                      padding: 15px;
                      border-radius: 8px;
                      margin: 15px 0;
                      font-size: 14px;
                      color: #92400e;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>🚀 Order Submission</h1>
                      <p><strong>Submitting to:</strong> ${
                        selectedVendor.name
                      }</p>
                      <p><strong>Request ID:</strong> ${
                        apiSubmissionData.request_id
                      }</p>
                    </div>

                    <div class="vendor-info">
                      <h3>🏢 Vendor Information</h3>
                      <p><strong>Name:</strong> ${selectedVendor.name}</p>
                      <p><strong>Contact:</strong> ${selectedVendor.contact}</p>
                      <p><strong>Location:</strong> ${
                        selectedVendor.location
                      }</p>
                      <p><strong>Delivery Time:</strong> ${
                        selectedVendor.deliveryTime
                      }</p>
                      <p><strong>Minimum Order:</strong> ${
                        selectedVendor.minimumOrder
                      }</p>
                    </div>

                    <div class="order-details">
                      <h3>📋 Order Summary</h3>
                      <p><strong>Customer:</strong> ${
                        orderData.customerInfo?.name || 'N/A'
                      }</p>
                      <p><strong>Phone:</strong> ${
                        orderData.customerInfo?.phone ||
                        orderData.sender_id ||
                        'N/A'
                      }</p>
                      <p><strong>Delivery Location:</strong> ${
                        apiSubmissionData.delivery_location || 'N/A'
                      }</p>
                      <p><strong>Items:</strong> ${
                        apiSubmissionData.items?.length || 0
                      } items</p>
                      <p><strong>Expected Delivery:</strong> ${
                        apiSubmissionData.expected_delivery_date || 'TBD'
                      }</p>
                    </div>

                    <div id="status" class="status loading">
                      <span class="spinner"></span>
                      Attempting to submit order to server...
                    </div>

                    <div class="button-group">
                      <button class="btn success" onclick="copyOrderData()">📋 Copy Order Data</button>
                      <button class="btn secondary" onclick="copyContactInfo()">📞 Copy Contact Info</button>
                      <button class="btn secondary" onclick="showRawData()">🔍 Show Raw JSON</button>
                      <button class="btn secondary" onclick="callVendor()">📞 Call Vendor</button>
                      <button class="btn danger" onclick="window.close()">❌ Close</button>
                    </div>

                    <div id="rawData" style="display: none;">
                      <h3>API-Compliant JSON Data:</h3>
                      <div class="json-data">${JSON.stringify(
                        apiSubmissionData,
                        null,
                        2
                      )
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')}</div>
                    </div>

                    <script>
                      const apiData = JSON.parse('${JSON.stringify(
                        apiSubmissionData
                      ).replace(/'/g, "\\'")}');
                      const legacyData = JSON.parse('${JSON.stringify(
                        legacySubmissionData
                      ).replace(/'/g, "\\'")}');
                      let submissionAttempts = 0;
                      const maxAttempts = 5;
                      const retryDelays = [1000, 2000, 3000, 5000, 10000]; // Progressive delays                    function updateStatus(type, title, message, showRetry = false) {
                      const statusDiv = document.getElementById('status');
                      statusDiv.className = 'status ' + type;

                      let html = '<h3>' + title + '</h3><p>' + message + '</p>';

                      if (showRetry && submissionAttempts < maxAttempts) {
                        html += '<br><button class="btn" onclick="retrySubmission()">🔄 Retry Submission (' + (submissionAttempts + 1) + '/' + maxAttempts + ')</button>';
                      }

                      statusDiv.innerHTML = html;
                    }

                    function copyOrderData() {
                      try {
                        if (!apiData && !legacyData) {
                          throw new Error('Order data is incomplete');
                        }

                        const orderSummary = \`API-Compliant Order Summary
Request ID: \${apiData.request_id}
Project ID: \${apiData.project_id}
Sender ID: \${apiData.sender_id}
Status: \${apiData.status}
Delivery Location: \${apiData.delivery_location}
Expected Delivery: \${apiData.expected_delivery_date}

Vendor Selection:
- Name: \${apiData.vendor_selection?.vendor_name || 'N/A'}
- Contact: \${apiData.vendor_selection?.vendor_contact || 'N/A'}
- Location: \${apiData.vendor_selection?.vendor_location || 'N/A'}
- Delivery Time: \${apiData.vendor_selection?.delivery_time || 'N/A'}

Items (\${apiData.items?.length || 0} total):
\${apiData.items?.map((item, idx) =>
  \`\${idx + 1}. \${item.material_name}\${item.sub_type ? ' (' + item.sub_type + ')' : ''} - \${item.quantity} \${item.quantity_units || 'units'}\`
).join('\\n') || 'No items'}

API Endpoint: https://bug-saving-frog.ngrok-free.app/submit-order
Timestamp: \${new Date().toLocaleString()}

Notes: \${apiData.notes || 'N/A'}\`;

                        navigator.clipboard.writeText(orderSummary)
                          .then(() => updateStatus('success', '✅ Copied!', 'API-compliant order summary copied to clipboard'))
                          .catch(() => {
                            console.log('Order Summary:', orderSummary);
                            updateStatus('success', '✅ Data Available', 'Order summary logged to console (F12 to view)');
                          });
                      } catch (error) {
                        console.error('Error copying order data:', error);
                        updateStatus('error', '❌ Copy Failed', 'Unable to copy order data: ' + error.message);
                      }
                    }

                    function copyContactInfo() {
                      try {
                        if (!apiData?.vendor_selection && !legacyData?.selectedVendor) {
                          throw new Error('Vendor information is not available');
                        }

                        const vendor = apiData.vendor_selection || legacyData.selectedVendor;
                        const contactInfo = \`Vendor Contact Information:
Name: \${vendor.vendor_name || vendor.name}
Phone: \${vendor.vendor_contact || vendor.contact}
Location: \${vendor.vendor_location || vendor.location}
Delivery Time: \${vendor.delivery_time || vendor.deliveryTime}
Minimum Order: \${vendor.minimum_order || vendor.minimumOrder}

Request ID: \${apiData.request_id}
Customer Phone: \${apiData.sender_id}
Delivery Location: \${apiData.delivery_location}\`;

                        navigator.clipboard.writeText(contactInfo)
                          .then(() => updateStatus('success', '✅ Contact Info Copied!', 'Vendor contact information copied to clipboard'))
                          .catch(() => console.log('Contact Info:', contactInfo));
                      } catch (error) {
                        console.error('Error copying contact info:', error);
                        updateStatus('error', '❌ Copy Failed', 'Unable to copy contact info: ' + error.message);
                      }
                    }                    function showRawData() {
                      const rawDataDiv = document.getElementById('rawData');
                      rawDataDiv.style.display = rawDataDiv.style.display === 'none' ? 'block' : 'none';
                    }

                    function callVendor() {
                      try {
                        const vendor = apiData?.vendor_selection || legacyData?.selectedVendor;
                        const contact = vendor?.vendor_contact || vendor?.contact;

                        if (!contact) {
                          throw new Error('Vendor contact information is not available');
                        }
                        window.open('tel:' + contact);
                      } catch (error) {
                        console.error('Error calling vendor:', error);
                        updateStatus('error', '❌ Call Failed', 'Unable to initiate call: ' + error.message);
                      }
                    }

                    function retrySubmission() {
                      if (submissionAttempts >= maxAttempts) {
                        updateStatus('error', '❌ Max Retries Reached', 'All submission attempts failed. Please contact vendor manually or copy order data.');
                        return;
                      }

                      const delay = retryDelays[submissionAttempts] || 10000;
                      updateStatus('loading', '🔄 Retrying...', \`Attempt \${submissionAttempts + 1} of \${maxAttempts}. Waiting \${delay/1000} seconds...\`);

                      setTimeout(() => attemptSubmission(), delay);
                    }

                    function attemptSubmission() {
                      try {
                        submissionAttempts++;
                        console.log(\`🚀 Submission attempt \${submissionAttempts}/\${maxAttempts}\`);

                        if (!orderData) {
                          throw new Error('Order data is not available for submission');
                        }

                        updateStatus('loading', '⏳ Submitting...', \`Attempt \${submissionAttempts} of \${maxAttempts}\`);

                      // Create multiple submission strategies
                      const strategies = [
                        // Strategy 1: API-compliant format
                        () => fetch('https://bug-saving-frog.ngrok-free.app/submit-order', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true',
                            'Accept': 'application/json'
                          },
                          body: JSON.stringify(apiData)
                        }),

                        // Strategy 2: API format with different headers
                        () => fetch('https://bug-saving-frog.ngrok-free.app/submit-order', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true',
                            'Accept': '*/*',
                            'Cache-Control': 'no-cache'
                          },
                          body: JSON.stringify(apiData)
                        }),

                        // Strategy 3: Minimal API payload
                        () => fetch('https://bug-saving-frog.ngrok-free.app/submit-order', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                          },
                          body: JSON.stringify({
                            request_id: apiData.request_id,
                            sender_id: apiData.sender_id,
                            status: apiData.status,
                            delivery_location: apiData.delivery_location,
                            items: apiData.items || []
                          })
                        }),

                        // Strategy 4: Legacy format fallback
                        () => fetch('https://bug-saving-frog.ngrok-free.app/submit-order', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                          },
                          body: JSON.stringify(legacyData)
                        })
                      ];

                      const strategy = strategies[(submissionAttempts - 1) % strategies.length];

                      strategy()
                      .then(response => {
                        console.log('📡 Response status:', response.status);
                        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

                        if (response.ok) {
                          return response.json().catch(() => response.text());
                        } else {
                          return response.text().then(text => {
                            throw new Error(\`HTTP \${response.status}: \${text}\`);
                          });
                        }
                      })
                      .then(data => {
                        console.log('✅ Success:', data);
                        const vendor = apiData.vendor_selection || legacyData?.selectedVendor;
                        const vendorName = vendor?.vendor_name || vendor?.name;
                        const vendorContact = vendor?.vendor_contact || vendor?.contact;
                        const deliveryTime = vendor?.delivery_time || vendor?.deliveryTime;
                        const customerPhone = apiData.sender_id || legacyData?.orderData?.customerInfo?.phone;

                        updateStatus('success',
                          '✅ Order Submitted Successfully!',
                          \`Your order (Request ID: \${apiData.request_id}) has been sent to \${vendorName}. They will contact you at \${customerPhone} within their delivery timeframe of \${deliveryTime}.\`
                        );
                      })
                      .catch(error => {
                        console.error(\`❌ Submission attempt \${submissionAttempts} failed:\`, error);

                        let errorMsg = error.message;
                        let suggestion = '';

                        if (error.message.includes('Failed to fetch')) {
                          errorMsg = 'Network connection failed';
                          suggestion = 'Check your internet connection and server status.';
                        } else if (error.message.includes('ERR_NGROK')) {
                          errorMsg = 'Ngrok server is unavailable';
                          suggestion = 'The server may be down or restarting.';
                        } else if (error.message.includes('CORS')) {
                          errorMsg = 'CORS policy blocking request';
                          suggestion = 'Browser security is blocking the request.';
                        }

                        if (submissionAttempts < maxAttempts) {
                          updateStatus('warning',
                            \`⚠️ Attempt \${submissionAttempts} Failed\`,
                            \`Error: \${errorMsg}<br>\${suggestion}<br><br>Will retry in a few seconds...\`,
                            true
                          );

                          // Auto-retry after delay
                          setTimeout(() => retrySubmission(), 3000);
                        } else {
                          const vendor = apiData.vendor_selection || legacyData?.selectedVendor;
                          const vendorName = vendor?.vendor_name || vendor?.name;
                          const vendorContact = vendor?.vendor_contact || vendor?.contact;

                          updateStatus('error',
                            '❌ All Submission Attempts Failed',
                            \`Final Error: \${errorMsg}<br><br>\${suggestion}<br><br>Your order data is preserved above. You can copy it and submit manually or contact \${vendorName} directly at \${vendorContact}.\`
                          );
                        }
                      });
                      } catch (submissionError) {
                        console.error('Critical error in submission:', submissionError);
                        updateStatus('error', '❌ Submission Error', 'Critical error occurred: ' + submissionError.message);
                      }
                    }

                    // Start initial submission attempt
                    submissionAttempts = 0;
                    attemptSubmission();
                  </script>
                </div>
              </body>
              </html>
            `

              newWindow.document.write(htmlContent)
              newWindow.document.close()

              console.log('✅ Order submission window opened')

              // Create a successful response for window submission
              result = {
                success: true,
                orderId: uuid,
                vendorId: selectedVendor.id,
                method: 'window_submission',
                timestamp: new Date().toISOString(),
                note: 'Submitted via new window with JSON payload. Check the opened window for submission status.',
              }
              apiSuccess = true
            } catch (htmlError) {
              console.error('Error creating HTML content:', htmlError.message)
              throw new Error('Failed to create submission window content')
            }
          } else {
            throw new Error('Popup blocked or window creation failed')
          }
        } catch (formError) {
          console.error('Window submission failed:', formError.message)
          console.log('📝 Falling back to local storage only')
        }
      }

      // If all API methods fail, create a local successful response
      if (!apiSuccess) {
        console.log(
          '🔄 All API methods failed, creating local success response'
        )
        result = {
          success: true,
          request_id: apiSubmissionData.request_id,
          orderId: uuid,
          vendorId: selectedVendor.id,
          status: 'pending_manual_sync',
          timestamp: new Date().toISOString(),
          note: 'Order saved locally due to CORS/API issues. Please manually sync or contact support.',
          submissionData: apiSubmissionData, // Include the API-compliant data for manual processing
        }
      }

      // Store selection data (always succeeds locally)
      const selectionData = {
        orderId: uuid,
        request_id: apiSubmissionData.request_id,
        vendor: selectedVendor,
        orderData: orderData,
        apiSubmissionData: apiSubmissionData,
        submissionResult: result,
        apiSuccess: apiSuccess,
        timestamp: new Date().toISOString(),
        fullSubmissionData: apiSubmissionData, // Store API-compliant data for manual processing
      }

      localStorage.setItem('vendorSelection', JSON.stringify(selectionData))
      localStorage.setItem(
        'apiSubmissionData',
        JSON.stringify(apiSubmissionData)
      )
      setVendorSelection(selectedVendor)

      // Show appropriate success message
      if (apiSuccess) {
        if (result.method === 'window_submission') {
          alert(
            `✅ Order submission initiated for ${selectedVendor.name}!\n\n📋 Request ID: ${apiSubmissionData.request_id}\n🏢 Vendor: ${selectedVendor.name}\n📞 Contact: ${selectedVendor.contact}\n🚚 Delivery: ${selectedVendor.deliveryTime}\n\n📝 Note: A new window opened to handle the submission with API-compliant JSON format.\nPlease check the new window for submission status.\n\n💡 If the window was blocked, the complete order data is saved locally.`
          )
        } else if (result.method === 'form_submission') {
          alert(
            `✅ Order submitted to ${selectedVendor.name}!\n\n📋 Request ID: ${apiSubmissionData.request_id}\n🏢 Vendor: ${selectedVendor.name}\n📞 Contact: ${selectedVendor.contact}\n🚚 Delivery: ${selectedVendor.deliveryTime}\n\n📝 Note: Order was submitted via form (new browser tab opened)\nPlease check the new tab for confirmation from the vendor.\n\n💡 If the tab didn't open, the complete order data is saved locally.`
          )
        } else {
          alert(
            `✅ Order submitted successfully to ${selectedVendor.name}!\n\n📋 Request ID: ${apiSubmissionData.request_id}\n🏢 Vendor: ${selectedVendor.name}\n📞 Contact: ${selectedVendor.contact}\n🚚 Delivery: ${selectedVendor.deliveryTime}`
          )
        }
      } else {
        // Show manual submission option
        const userChoice = confirm(
          `⚠️ Automatic submission failed due to network restrictions.\n\n✅ Vendor Selected: ${selectedVendor.name}\n📞 Contact: ${selectedVendor.contact}\n🚚 Delivery: ${selectedVendor.deliveryTime}\n\n💾 API-compliant order data is saved locally.\n\n📋 Would you like to copy the order data to clipboard for manual submission?`
        )

        if (userChoice) {
          try {
            const manualSubmissionText = `
API-COMPLIANT ORDER SUBMISSION DATA
===================================
Request ID: ${apiSubmissionData.request_id}
Project ID: ${apiSubmissionData.project_id}
Sender ID: ${apiSubmissionData.sender_id}
Status: ${apiSubmissionData.status}

Vendor Information:
- Name: ${selectedVendor.name}
- Contact: ${selectedVendor.contact}
- Location: ${selectedVendor.location}
- Delivery Time: ${selectedVendor.deliveryTime}

Delivery Details:
- Location: ${apiSubmissionData.delivery_location}
- Expected Date: ${apiSubmissionData.expected_delivery_date}
- Notes: ${apiSubmissionData.notes}

Items (${apiSubmissionData.items.length} total):
${apiSubmissionData.items
  .map(
    (item, idx) =>
      `${idx + 1}. ${item.material_name}${
        item.sub_type ? ' (' + item.sub_type + ')' : ''
      } - ${item.quantity} ${item.quantity_units || 'units'}${
        item.unit_price ? ' @ ₹' + item.unit_price : ''
      }`
  )
  .join('\n')}

API Endpoint: https://bug-saving-frog.ngrok-free.app/submit-order

API-Compliant JSON Payload:
${JSON.stringify(apiSubmissionData, null, 2)}
            `

            navigator.clipboard
              .writeText(manualSubmissionText)
              .then(() => {
                alert(
                  '📋 Order data copied to clipboard!\n\nYou can now manually submit this to the vendor or paste it into a support ticket.'
                )
              })
              .catch(() => {
                // Fallback if clipboard fails
                console.log('📋 Manual submission data:')
                console.log(manualSubmissionText)
                alert(
                  '📋 Order data logged to console.\n\nPress F12 to open developer tools and copy the data from the console.'
                )
              })
          } catch (clipboardError) {
            console.error('Clipboard operation failed:', clipboardError)
            alert(
              '📋 Order data is available in console.\n\nPress F12 to view developer tools.'
            )
          }
        }
      }

      console.log('📋 Complete vendor selection data:', selectionData)
    } catch (error) {
      console.error('❌ Error in vendor selection process:', error)
      alert(
        `Failed to select vendor: ${error.message}\n\nPlease try again or contact support.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Order not found</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Select Vendor</h1>
          <p className="text-gray-600">Choose from our verified suppliers</p>
        </div>

        {/* Loading Indicator */}
        {isSubmitting && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div>
                <span className="text-blue-700 font-medium">
                  Submitting order...
                </span>
                <p className="text-blue-600 text-sm mt-1">
                  Trying multiple methods to ensure delivery to vendor
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Indicator */}
        {vendorSelection && !isSubmitting && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-green-600">✅</div>
              <div>
                <span className="text-green-700 font-medium">
                  Vendor Selected: {vendorSelection.name}
                </span>
                <p className="text-green-600 text-sm mt-1">
                  Contact: {vendorSelection.contact} | Delivery:{' '}
                  {vendorSelection.deliveryTime}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <strong>Customer:</strong> {orderData.customerInfo.name}
              </p>
              <p>
                <strong>Phone:</strong> {orderData.customerInfo.phone}
              </p>
            </div>
            <div>
              <p>
                <strong>Site:</strong> {orderData.customerInfo.site}
              </p>
              <p>
                <strong>Address:</strong> {orderData.customerInfo.address}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">
              Items ({orderData.items.length})
            </h3>
            <div className="space-y-2">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.material_name}</span>
                  <span>
                    {item.quantity} {item.quantity_units || 'units'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {orderData.totalAmount > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>₹{orderData.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Vendors List */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Available Vendors ({vendors.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-green-300 ${
                  vendorSelection?.id === vendor.id
                    ? 'border-green-500 bg-green-50'
                    : ''
                } ${isSubmitting ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{vendor.logo}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{vendor.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">
                          {vendor.rating}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({Math.floor(vendor.rating * 20)}+ reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  {vendorSelection?.id === vendor.id && (
                    <div className="text-green-600 text-xl">✅</div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {vendor.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{vendor.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Time:</span>
                    <span className="font-medium text-green-600">
                      {vendor.deliveryTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min Order:</span>
                    <span className="font-medium">{vendor.minimumOrder}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-medium">{vendor.contact}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(`tel:${vendor.contact}`)}
                    disabled={isSubmitting}
                  >
                    📞 Call
                  </Button>
                  <Button
                    className={`flex-1 ${
                      vendorSelection?.id === vendor.id
                        ? 'bg-green-700 hover:bg-green-800'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    onClick={() => selectVendor(vendor.id)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : vendorSelection?.id === vendor.id ? (
                      '✅ Selected'
                    ) : (
                      'Select Vendor'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-3 lg:-mx-6 px-3 lg:px-6 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:flex-1 h-12 sm:h-10 text-sm sm:text-base"
            onClick={() => window.history.back()}
            aria-label="Back to Order Review"
          >
            Back to Order Review
          </Button>

          <Button
            type="submit"
            disabled={vendors.length === 0}
            className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 h-12 sm:h-10 text-sm sm:text-base font-medium"
            aria-label="Confirm Order"
          >
            <PrefetchLink
              to={`/get-quote${uuid ? `?uuid=${uuid}` : ''}`}
              prefetch={prefetch.getQuote}
            >
              Get Quote
            </PrefetchLink>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GetQuote

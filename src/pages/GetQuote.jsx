import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const GetQuote = () => {
  const [searchParams] = useSearchParams()
  const uuid = searchParams.get('uuid')
  const [orderData, setOrderData] = useState(null)
  const [vendors, setVendors] = useState([])
  const [vendorSelection, setVendorSelection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const customerInfo = orderData?.customerInfo || {
    whatsappName: 'Rajesh Kumar',
    whatsappPhone: '+91 98765 43210',
  }

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

  // Select vendor function (just updates selection state)
  const selectVendor = (vendorId) => {
    const selectedVendor = vendors.find((v) => v.id === vendorId)
    setVendorSelection(selectedVendor)
    console.log('✅ Vendor selected:', selectedVendor)
  }

  const handleGetQuote = async () => {
    if (!vendorSelection) {
      alert('Please select a vendor to get a quote.')
      return
    }
    try {
      setIsSubmitting(true)
      let apiSuccess = false
      let result = null
      // Try direct fetch to ngrok
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const response = await fetch(
          'https://bug-saving-frog.ngrok-free.app/submit-order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify(orderData), // Use the enhanced orderData
            signal: controller.signal,
          }
        )
        clearTimeout(timeoutId)
        if (response.ok) {
          result = await response.json()
          apiSuccess = true
          alert('✅ Quote requested successfully')
        } else {
          throw new Error(`API responded with status: ${response.status}`)
        }
      } catch (fetchError) {
        console.warn('Direct fetch failed:', fetchError.message)
        try {
          console.log('📤 Attempting enhanced window submission...')
        } catch (formError) {
          console.error('Window submission failed:', formError.message)
        }
      }
    } catch (error) {
      console.error('Error submitting order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatText = (text) => {
    if (!text) return ''
    return text.replace(
      /\b(\d+)([a-zA-Z])|\b([a-zA-Z])/g,
      (m, digits, letterAfterDigits, firstLetter) =>
        digits
          ? digits + ' ' + letterAfterDigits.toUpperCase()
          : firstLetter.toUpperCase()
    )
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  Select Vendor
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  Choose from verified suppliers
                </p>
              </div>
            </div>

            {/* WhatsApp User Info in Header */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                </svg>
              </div>
              <div className="text-right min-w-0 hidden sm:block">
                <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                  {customerInfo.whatsappName || customerInfo.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {customerInfo.whatsappPhone || customerInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Loading Indicator */}
        {isSubmitting && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div>
                <span className="text-blue-700 font-medium">
                  Requesting quote...
                </span>
                <p className="text-blue-600 text-sm mt-1">
                  Sending your request to the selected vendor
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
                <strong>Customer:</strong>{' '}
                {orderData.customerInfo?.name || 'N/A'}
              </p>
              <p>
                <strong>Phone:</strong> {orderData.customerInfo?.phone || 'N/A'}
              </p>
            </div>
            <div>
              <p>
                <strong>Site:</strong> {orderData.customerInfo?.site || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong>{' '}
                {orderData.customerInfo?.address || 'N/A'}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">
              Items ({orderData.items?.length || 0})
            </h3>
            <div className="space-y-2">
              {orderData.items?.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{formatText(item.material_name)}</span>
                  <span>
                    {item.quantity} {item.quantity_units || 'units'}
                  </span>
                </div>
              )) || <p className="text-gray-500 text-sm">No items found</p>}
            </div>
          </div>
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
                onClick={() => !isSubmitting && selectVendor(vendor.id)}
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
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`tel:${vendor.contact}`)
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation()
                      selectVendor(vendor.id)
                    }}
                    disabled={isSubmitting}
                  >
                    {vendorSelection?.id === vendor.id
                      ? '✅ Selected'
                      : 'Select Vendor'}
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
            disabled={isSubmitting}
          >
            Back to Order Review
          </Button>
          <Button
            type="button"
            disabled={isSubmitting || !vendorSelection}
            className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 h-12 sm:h-10 text-sm sm:text-base font-medium"
            onClick={handleGetQuote}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Requesting Quote...
              </>
            ) : (
              'Get Quote'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GetQuote

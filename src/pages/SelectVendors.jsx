import React, { useState, useCallback, memo } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

/**
 * Vendor Selection Component
 * Matches the UI design with vendor cards, ratings, and selection
 */
const SelectVendors = () => {
  const navigate = useNavigate()
  const [selectedVendors, setSelectedVendors] = useState(new Set([2, 5])) // Pre-select BuildMart and Urban Hardware
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSummary, setOrderSummary] = useState(null)

  // Load order summary from localStorage
  React.useEffect(() => {
    const storedOrder = localStorage.getItem('orderSummary')
    if (storedOrder) {
      try {
        setOrderSummary(JSON.parse(storedOrder))
      } catch (error) {
        console.error('Error parsing order summary:', error)
      }
    }
  }, [])

  // Vendor data with realistic construction material suppliers
  const vendors = [
    {
      id: 1,
      name: 'ABC Supplies',
      specialties: ['Cement', 'Concrete Blocks'],
      type: 'Distributor',
      rating: 4.2,
      reviewCount: 156,
      isAuthorized: false,
    },
    {
      id: 2,
      name: 'BuildMart',
      specialties: ['Steel Bars', 'Sand', 'Cement'],
      type: 'Retailer',
      rating: 4.5,
      reviewCount: 289,
      isAuthorized: false,
    },
    {
      id: 3,
      name: 'StrongStone',
      specialties: ['Concrete Blocks', 'Cement'],
      type: 'Authorized',
      rating: 4.7,
      reviewCount: 124,
      isAuthorized: true,
    },
    {
      id: 4,
      name: 'Urban Hardware',
      specialties: ['Steel Bars', 'River Sand'],
      type: 'Retailer',
      rating: 4.3,
      reviewCount: 203,
      isAuthorized: false,
    },
    {
      id: 5,
      name: 'ProBuild',
      specialties: ['Cement', 'Steel Bars'],
      type: 'Authorized Vendor',
      rating: 4.6,
      reviewCount: 87,
      isAuthorized: true,
    },
  ]

  // Handle vendor selection toggle
  const handleVendorToggle = useCallback((vendorId) => {
    setSelectedVendors((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(vendorId)) {
        newSelection.delete(vendorId)
      } else {
        newSelection.add(vendorId)
      }
      return newSelection
    })
  }, [])

  // Handle select all toggle
  const handleSelectAll = useCallback(() => {
    if (selectedVendors.size === vendors.length) {
      setSelectedVendors(new Set())
    } else {
      setSelectedVendors(new Set(vendors.map((v) => v.id)))
    }
  }, [selectedVendors.size, vendors.length])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (selectedVendors.size === 0) {
      alert('Please select at least one vendor')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const selectedVendorList = vendors.filter((v) =>
        selectedVendors.has(v.id)
      )
      console.log('Selected vendors:', selectedVendorList)

      alert(
        `✅ Order submitted to ${selectedVendors.size} vendor(s) successfully!`
      )

      // Navigate back to previous page or dashboard
      navigate(-1)
    } catch (error) {
      console.error('Error submitting to vendors:', error)
      alert('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedVendors, vendors, navigate])

  // Render star rating with review count
  const renderStars = useCallback((rating, reviewCount, isMobile = false) => {
    if (!rating) return null

    return (
      <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
        <div className="flex items-center gap-1">
          <span
            className={`font-medium text-gray-900 ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}
          >
            {rating}
          </span>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${
                i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>
          ({reviewCount} reviews)
        </span>
      </div>
    )
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                bab.ai
              </h1>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Review Order</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Select Vendors
          </h2>
          {orderSummary && (
            <p className="text-gray-600 text-sm sm:text-base">
              {orderSummary.items.length} items for{' '}
              {orderSummary.customerInfo.name}
            </p>
          )}
        </div>

        {/* Vendor Selection */}
        <Card className="p-3 sm:p-6 mb-6 sm:mb-8">
          {/* Select All Option */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-3 text-left w-full py-2"
            >
              <div
                className={`w-5 h-5 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedVendors.size === vendors.length
                    ? 'bg-black border-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {selectedVendors.size === vendors.length && (
                  <Check className="w-3 h-3" />
                )}
              </div>
              <span className="text-base sm:text-lg font-medium text-gray-900">
                Select All
              </span>
            </button>
          </div>

          {/* Vendor List */}
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden p-4 space-y-3">
                  {/* Header with checkbox and name */}
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleVendorToggle(vendor.id)}
                      className="mt-1"
                    >
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedVendors.has(vendor.id)
                            ? 'bg-black border-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {selectedVendors.has(vendor.id) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {vendor.name}
                        </h3>
                        {vendor.type && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              vendor.isAuthorized
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {vendor.type}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {vendor.specialties.join(', ')}
                      </p>
                      {/* Rating on separate line for mobile */}
                      <div className="flex items-center">
                        {renderStars(vendor.rating, vendor.reviewCount, true)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => handleVendorToggle(vendor.id)}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedVendors.has(vendor.id)
                            ? 'bg-black border-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {selectedVendors.has(vendor.id) && (
                          <Check className="w-3 h-3" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {vendor.name}
                        </h3>
                        {vendor.type && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              vendor.isAuthorized
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {vendor.type}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {vendor.specialties.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Rating and Reviews */}
                  <div className="flex items-center">
                    {renderStars(vendor.rating, vendor.reviewCount, false)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-3 -mx-3 px-3 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-11 sm:h-12 text-base sm:text-lg"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedVendors.size === 0}
            className="flex-1 bg-black hover:bg-gray-800 text-white h-11 sm:h-12 text-base sm:text-lg font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedVendors.size > 0 && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              {selectedVendors.size} vendor
              {selectedVendors.size !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(SelectVendors)

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'

// Static data - will be replaced with PostgreSQL data later
const PREFILLED_ITEMS = [
  {
    id: 1,
    name: 'Portland Cement (50kg)',
    category: 'Cement',
    unit: 'bags',
    price: 450,
    quantity: 50,
  },
  {
    id: 2,
    name: 'Steel Rods TMT (12mm)',
    category: 'Steel',
    unit: 'tonnes',
    price: 65000,
    quantity: 2,
  },
  {
    id: 3,
    name: 'Red Bricks (First Class)',
    category: 'Bricks',
    unit: 'pieces',
    price: 8,
    quantity: 5000,
  },
  {
    id: 4,
    name: 'River Sand (M-Sand)',
    category: 'Sand',
    unit: 'cubic feet',
    price: 45,
    quantity: 500,
  },
  {
    id: 5,
    name: '20mm Aggregate',
    category: 'Aggregate',
    unit: 'cubic feet',
    price: 55,
    quantity: 300,
  },
  {
    id: 6,
    name: 'PVC Pipes (4 inch)',
    category: 'Plumbing',
    unit: 'feet',
    price: 120,
    quantity: 200,
  },
]

const PlaceOrder = () => {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    site: '',
    address: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = () => {
      try {
        // Get customer info from URL params
        const urlCustomerInfo = {
          name: searchParams.get('name') || '',
          phone: searchParams.get('phone') || '',
          site: searchParams.get('site') || '',
          address: searchParams.get('address') || '',
        }
        setCustomerInfo(urlCustomerInfo)

        // Get items from URL params or use default
        const itemsParam = searchParams.get('items')
        let itemsToUse = PREFILLED_ITEMS

        if (itemsParam) {
          try {
            const decodedItems = JSON.parse(atob(itemsParam))
            if (Array.isArray(decodedItems) && decodedItems.length > 0) {
              itemsToUse = decodedItems.map((item, index) => ({
                id: item.id || index + 1,
                name: item.name || 'Unknown Item',
                category: item.category || 'General',
                unit: item.unit || 'pieces',
                price: item.price || 0,
                minQuantity: item.minQuantity || 1,
                quantity: item.quantity || 1,
                image: item.image || '/placeholder.svg',
              }))
            }
          } catch (error) {
            console.error('Error parsing items from URL:', error)
          }
        }

        setItems(itemsToUse)
        setIsLoading(false)
      } catch (error) {
        console.error('Error initializing data:', error)
        setItems(PREFILLED_ITEMS)
        setIsLoading(false)
      }
    }

    initializeData()
  }, [searchParams])

  // Calculate total amount whenever items change
  useEffect(() => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    setTotalAmount(total)
  }, [items])

  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(item.minQuantity, parseInt(newQuantity) || 0),
            }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would send data to your backend
    console.log('Order submitted:', { customerInfo, items, totalAmount })

    // Redirect back to WhatsApp or show success message
    alert('Order placed successfully! We will contact you shortly.')
    setIsSubmitting(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your order...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      Place Order
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      Babai Construction Materials
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs sm:text-sm px-2 sm:px-3 py-1">
                  Quick Order
                </Badge>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6"
          >
            {/* Customer Information */}
            <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Phone Number *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter your phone number"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Site/Project Name *
                  </label>
                  <Input
                    required
                    value={customerInfo.site}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, site: e.target.value })
                    }
                    placeholder="Enter site or project name"
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Delivery Address *
                  </label>
                  <Input
                    required
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter delivery address"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Order Items
                </h2>
                <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm px-2 sm:px-3 py-1">
                  {items.length} items
                </Badge>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                          {item.name}
                        </h3>
                        <div className="flex flex-row items-center gap-3 sm:gap-4">
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-1 bg-white"
                          >
                            {item.category}
                          </Badge>
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">
                            {formatCurrency(item.price)} per {item.unit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-center">
                          <label className="block text-xs text-gray-500 mb-1 font-medium">
                            Quantity
                          </label>
                          <Input
                            type="number"
                            min={item.minQuantity}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, e.target.value)
                            }
                            className="w-20 sm:w-24 text-center text-sm font-semibold"
                          />
                        </div>

                        <div className="text-center sm:text-right min-w-[90px] sm:min-w-[110px]">
                          <div className="text-xs text-gray-500 mb-1 font-medium">
                            Total
                          </div>
                          <div className="font-bold text-gray-900 text-sm sm:text-base">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0 h-8 w-8 p-0 rounded-full"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Items ({items.length})</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base sm:text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-3 lg:-mx-6 px-3 lg:px-6 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:flex-1 h-12 sm:h-10 text-sm sm:text-base"
                onClick={() => window.history.back()}
              >
                Back to WhatsApp
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 h-12 sm:h-10 text-sm sm:text-base font-medium"
              >
                {isSubmitting
                  ? 'Placing Order...'
                  : `Place Order • ${formatCurrency(totalAmount)}`}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default PlaceOrder

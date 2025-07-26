import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'
import OrderItemCard from './OrderItemCard.jsx'

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api' // Vercel monorepo - backend API routes
    : 'http://10.101.56.159:4000' || 'http://localhost:4000' // Local development

const ReviewOrder = () => {
  const [userProjects, setUserProjects] = useState([])
  const [prefilledItems, setPrefilledItems] = useState([])
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    site: '',
    address: '',
    whatsappName: '',
    whatsappPhone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [editingItemId, setEditingItemId] = useState(null)
  const [editingItemName, setEditingItemName] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const [projectsRes, itemsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/items`),
        ])

        if (!projectsRes.ok || !itemsRes.ok) {
          console.error(
            'API request failed:',
            projectsRes.status,
            itemsRes.status
          )
          console.error(
            'Response headers:',
            projectsRes.headers,
            itemsRes.headers
          )
          return
        }

        const projects = await projectsRes.json()
        const items = await itemsRes.json()
        setUserProjects(projects)
        setPrefilledItems(items)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (prefilledItems.length === 0) return
    const initializeData = () => {
      try {
        const urlCustomerInfo = {
          site: searchParams.get('site') || '',
          address: searchParams.get('address') || '',
          whatsappName: searchParams.get('name') || 'Rajesh Kumar',
          whatsappPhone: searchParams.get('phone') || '+91 98765 43210',
        }
        setCustomerInfo((prev) => ({
          ...prev,
          ...urlCustomerInfo,
        }))
        const itemsParam = searchParams.get('items')
        let itemsToUse = prefilledItems
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
                quantity: item.quantity || 1,
              }))
            }
          } catch (error) {
            console.error('Error parsing items from URL:', error)
          }
        }
        setItems(itemsToUse)
      } catch (error) {
        console.error('Error initializing data:', error)
        setItems(prefilledItems)
      }
    }
    initializeData()
  }, [searchParams, prefilledItems])

  useEffect(() => {
    setTotalAmount(
      items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )
  }, [items])

  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, parseInt(newQuantity, 10) || 1) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleEditClick = (item) => {
    setEditingItemId(item.id)
    setEditingItemName(item.name)
  }

  const handleCancelClick = () => {
    setEditingItemId(null)
    setEditingItemName('')
  }

  const updateItemName = (id, newName) => {
    if (!newName.trim()) return
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, name: newName.trim() } : item
      )
    )
    handleCancelClick()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const orderData = {
        customerInfo: {
          name: customerInfo.whatsappName,
          phone: customerInfo.whatsappPhone,
          site: customerInfo.site,
          address: customerInfo.address,
        },
        items,
        totalAmount,
      }
      console.log('Order submitted:', orderData)
      alert('Order confirmed successfully! We will contact you shortly.')
    } catch (error) {
      console.error('Order submission failed:', error)
      alert('Order submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            <div
              className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              aria-label="Loading spinner"
            ></div>
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
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-lg flex items-center justify-center shrink-0"
                    aria-label="Cart icon"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      Review Order
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      Construction Materials
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs sm:text-sm px-2 sm:px-3 py-1">
                  Order Confirmation
                </Badge>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6"
            aria-label="Review Order Form"
          >
            {/* Customer Information */}
            <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Customer Information
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      Logged in as{' '}
                      <span className="font-semibold">
                        {customerInfo.whatsappName}
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      {customerInfo.whatsappPhone}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-green-700 bg-green-100 rounded-md px-3 py-2 text-center">
                  ✓ Your contact information has been automatically verified
                  through WhatsApp
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-1">
                  <label
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    htmlFor="site"
                  >
                    Select Site/Project *
                  </label>
                  <select
                    id="site"
                    required
                    value={customerInfo.site}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, site: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                  >
                    <option value="">Choose your project...</option>
                    {userProjects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    htmlFor="address"
                  >
                    Delivery Address *
                  </label>
                  <Input
                    id="address"
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
                  Review Your Items
                </h2>
                <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm px-2 sm:px-3 py-1">
                  {items.length} items
                </Badge>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <OrderItemCard
                    key={item.id}
                    item={item}
                    editingItemId={editingItemId}
                    editingItemName={editingItemName}
                    handleEditClick={handleEditClick}
                    handleCancelClick={handleCancelClick}
                    updateItemName={updateItemName}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    setEditingItemName={setEditingItemName}
                    formatCurrency={formatCurrency}
                  />
                ))}
              </div>
            </Card>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-3 lg:-mx-6 px-3 lg:px-6 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:flex-1 h-12 sm:h-10 text-sm sm:text-base"
                onClick={() => window.history.back()}
                aria-label="Back to WhatsApp"
              >
                Back to WhatsApp
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 h-12 sm:h-10 text-sm sm:text-base font-medium"
                aria-label="Confirm Order"
              >
                Get Quote
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default ReviewOrder

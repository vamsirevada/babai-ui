import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import OrderItemCard from './OrderItemCard.jsx'
import { apiCall } from '../utils/api.js'

const ReviewOrder = () => {
  // State management
  const [userProjects, setUserProjects] = useState([])
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  // URL parameters
  const [searchParams] = useSearchParams()
  const uuid = searchParams.get('uuid')

  // Customer information with defaults
  const [customerInfo, setCustomerInfo] = useState({
    site: searchParams.get('site') || '',
    address: searchParams.get('address') || '',
    whatsappName: searchParams.get('name') || 'Rajesh Kumar',
    whatsappPhone: searchParams.get('phone') || '+91 98765 43210',
  })

  // Item editing state
  const [editingItemId, setEditingItemId] = useState(null)
  const [editingItemName, setEditingItemName] = useState('')

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Prepare fetch promises
        const fetchPromises = [apiCall('projects'), apiCall('items')]

        // Add review order fetch if UUID exists
        if (uuid) {
          fetchPromises.push(apiCall(`review-order/${uuid}`))
        }

        const responses = await Promise.all(fetchPromises)
        const [projectsRes, itemsRes, reviewOrderRes] = responses

        // Handle projects
        let projects = []
        if (projectsRes.ok) {
          try {
            projects = await projectsRes.json()
            if (!Array.isArray(projects)) {
              console.warn('Projects data is not an array:', projects)
              projects = []
            }
          } catch (err) {
            console.error('Projects response not JSON:', err)
            projects = []
          }
        }
        setUserProjects(projects)

        // Handle review order items if UUID exists
        let orderItems = []
        if (uuid && reviewOrderRes && reviewOrderRes.ok) {
          try {
            const reviewOrderData = await reviewOrderRes.json()
            console.log('✅ Loaded review order data:', reviewOrderData)

            if (Array.isArray(reviewOrderData)) {
              orderItems = reviewOrderData
            } else if (reviewOrderData && typeof reviewOrderData === 'object') {
              orderItems = [reviewOrderData]
            }
          } catch (err) {
            console.error('ReviewOrder response not JSON:', err)
          }
        }

        setItems(orderItems)
        console.log('✅ Initialized items:', orderItems)
      } catch (error) {
        console.error('❌ Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [uuid])

  // Item management functions
  const updateQuantity = (id, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity, 10) || 1)
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleEditClick = (item) => {
    setEditingItemId(item.id)
    setEditingItemName(item.material_name)
  }

  const handleCancelClick = () => {
    setEditingItemId(null)
    setEditingItemName('')
  }

  const updateItemName = (id, newName) => {
    if (!newName.trim()) return

    setItems(
      items.map((item) =>
        item.id === id ? { ...item, material_name: newName.trim() } : item
      )
    )
    handleCancelClick()
  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (items.length === 0) {
      alert('Please add at least one item to proceed.')
      return
    }

    if (!customerInfo.address.trim()) {
      alert('Please enter a delivery address.')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate project ID
      const projectId = crypto.randomUUID
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0
            const v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
          })

      // Create API-compliant order data
      const orderData = {
        request_id: uuid,
        project_id: projectId,
        sender_id: customerInfo.whatsappPhone.replace(/\D/g, ''),
        status: 'DRAFT',
        delivery_location: customerInfo.address || 'Construction Site',
        notes: `Order placed via BAB.AI Dashboard for ${
          customerInfo.site || 'construction project'
        }. Customer: ${customerInfo.whatsappName}`,
        expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        user_editable: true,
        items: items.map((item) => ({
          material_name: item.material_name,
          sub_type: item.sub_type || null,
          dimensions: item.dimensions || null,
          dimension_units: item.dimension_units || null,
          quantity: item.quantity || 1,
          quantity_units: item.quantity_units || 'units',
          unit_price: item.price || null,
          status: 'DRAFT',
          vendor_notes: null,
        })),
        customerInfo: {
          name: customerInfo.whatsappName,
          phone: customerInfo.whatsappPhone,
          site: customerInfo.site || 'Construction Site',
          address: customerInfo.address || 'Delivery Address',
        },
        timestamp: new Date().toISOString(),
      }

      // Cache order data
      try {
        localStorage.setItem('orderData', JSON.stringify(orderData))
        const storedData = localStorage.getItem('orderData')
        if (!storedData) {
          throw new Error('Failed to store data in localStorage')
        }
        console.log('✅ Order data cached successfully')
      } catch (cacheError) {
        console.error('❌ Cache error:', cacheError)
        throw new Error('Failed to cache order data')
      }

      // Navigate to vendor selection
      console.log('🚀 Navigating to vendor selection...')
      navigate(`/get-quote?uuid=${uuid}`, {
        state: { orderData },
      })
    } catch (error) {
      console.error('❌ Order submission failed:', error)
      alert(`Order submission failed: ${error.message}\n\nPlease try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            {/* <Badge className="bg-green-100 text-green-700 border-green-200 text-xs sm:text-sm px-2 sm:px-3 py-1">
              Order Confirmation
            </Badge> */}
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
                  {customerInfo.whatsappName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {customerInfo.whatsappPhone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6"
      >
        {/* Customer Information */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Customer Information
          </h2>

          {/* WhatsApp User Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="text-xs text-green-700 bg-green-100 rounded-md px-3 py-2 text-center">
              ✓ Your contact information has been automatically verified through
              WhatsApp
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-1">
              <label
                htmlFor="site"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Select Site/Project *
              </label>
              <select
                id="site"
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
                htmlFor="address"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Delivery Address *
              </label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
                placeholder="Enter delivery address"
                className="text-sm sm:text-base"
                required
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

          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📦</div>
              <p className="text-gray-500 mb-2">No items in your order</p>
              <p className="text-sm text-gray-400">
                Items will appear here once loaded from your WhatsApp
                conversation
              </p>
            </div>
          ) : (
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
                />
              ))}
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-3 lg:-mx-6 px-3 lg:px-6 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:flex-1 h-12 sm:h-10 text-sm sm:text-base"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Back to WhatsApp
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 h-12 sm:h-10 text-sm sm:text-base font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              'Select Vendor'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReviewOrder

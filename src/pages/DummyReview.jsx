import React, { useState, useCallback, memo, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { EditModal } from '../components/ui/edit-modal'
import { useIsMobile } from '../hooks/use-media-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiCall } from '../utils/api'
import { Edit2, Trash2, Plus, Minus } from 'lucide-react'

// Logo component adapted for DummyReview theme
const Logo = memo(() => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-sm">B</span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">ai</span>
      </div>
    </div>
    <div>
      <h1 className="text-lg sm:text-xl font-bold text-gray-900">bab.ai</h1>
      <p className="text-xs sm:text-sm text-gray-500">Order Review</p>
    </div>
  </div>
))

// Simplified TableRow component
const TableRow = memo(
  ({
    row,
    editingCell,
    setEditingCell,
    onCellEdit,
    onDeleteRow,
    suggestions = [],
  }) => {
    const [tempValue, setTempValue] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleEdit = useCallback(
      (field, value = row[field] || '') => {
        const cellKey = `${row.id}-${field}`
        if (editingCell === cellKey) {
          // Save edit
          if (field === 'quantity' && (isNaN(value) || value <= 0)) {
            alert('Please enter a valid quantity greater than 0')
            return
          }
          onCellEdit(row.id, field, value)
          setEditingCell(null)
          setShowSuggestions(false)
        } else {
          // Start edit
          setEditingCell(cellKey)
          setTempValue(value)
          setShowSuggestions(field === 'material_name')
        }
      },
      [row, editingCell, setEditingCell, onCellEdit, tempValue]
    )

    const isEditing = (field) => editingCell === `${row.id}-${field}`

    const filteredSuggestions = suggestions
      .filter(
        (s) =>
          s.toLowerCase().includes(String(tempValue).toLowerCase()) &&
          s !== tempValue
      )
      .slice(0, 5)

    const renderCell = (field, value) => (
      <td
        className="bg-white hover:bg-gray-50 px-4 py-3 border-b border-gray-200 cursor-pointer group"
        onClick={() => handleEdit(field)}
      >
        {isEditing(field) ? (
          <div className="relative">
            <Input
              type={field === 'quantity' ? 'number' : 'text'}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={() => handleEdit(field, tempValue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit(field, tempValue)
                if (e.key === 'Escape') setEditingCell(null)
              }}
              className="h-8 text-sm"
              autoFocus
              min={field === 'quantity' ? 1 : undefined}
            />
            {field === 'material_name' &&
              showSuggestions &&
              filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 bg-white border rounded-lg shadow-lg mt-1 z-20 min-w-48">
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg text-sm"
                      onClick={() => {
                        setTempValue(suggestion)
                        setShowSuggestions(false)
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {field === 'quantity'
                ? value
                : value || (
                    <span className="text-gray-400 italic">
                      Click to add...
                    </span>
                  )}
            </span>
            <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </td>
    )

    const renderQuantityCell = (value) => (
      <td className="bg-white hover:bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="hidden md:flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onCellEdit(row.id, 'quantity', Math.max(1, (value || 1) - 1))
            }
            disabled={value <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={value || 1}
            onChange={(e) =>
              onCellEdit(row.id, 'quantity', parseInt(e.target.value) || 1)
            }
            className="h-8 w-16 text-center text-sm"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCellEdit(row.id, 'quantity', (value || 1) + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <div className="md:hidden" onClick={() => handleEdit('quantity')}>
          <span className="text-sm font-medium">{value || 1}</span>
        </div>
      </td>
    )

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        {renderCell('material_name', row.material_name)}
        {renderCell('sub_type', row.sub_type)}
        {renderCell('dimensions', row.dimensions)}
        {renderQuantityCell(row.quantity)}
        <td className="px-4 py-3 border-b border-gray-200 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteRow(row.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      </tr>
    )
  }
)

// Simplified ItemCard component
const ItemCard = memo(({ item, onEdit, onDelete }) => (
  <Card className="p-4 mb-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">
          {item.material_name || (
            <span className="text-gray-400 italic">Unnamed item</span>
          )}
        </h3>
        {item.sub_type && (
          <p className="text-sm text-gray-600 mt-1">{item.sub_type}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(item)}
          className="h-9 w-9 p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(item.id)}
          className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <div>
        <span className="text-gray-500">Size/Unit:</span>
        <p className="font-medium mt-1">
          {item.dimensions || (
            <span className="text-gray-400 italic">Not specified</span>
          )}
        </p>
      </div>
      <div className="text-right">
        <span className="text-gray-500">Quantity:</span>
        <p className="font-medium mt-1">{item.quantity || 1}</p>
      </div>
    </div>
  </Card>
))

// Main component
const DummyReview = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const uuid = searchParams.get('uuid')

  // Consolidated state
  const [state, setState] = useState({
    orderData: [],
    userProjects: [],
    isLoading: true,
    editingCell: null,
    isSubmitting: false,
    editModalOpen: false,
    editingItem: null,
  })

  // Customer info - simplified
  const [customerInfo, setCustomerInfo] = useState({
    name: searchParams.get('name') || 'Rajesh Kumar',
    phone: searchParams.get('phone') || '+91 98765 43210',
    site: searchParams.get('site') || 'Residential Construction - Phase 2',
    address:
      searchParams.get('address') ||
      '123 Construction Site, Bangalore, Karnataka 560001',
    whatsappName: searchParams.get('name') || 'Rajesh Kumar',
    whatsappPhone: searchParams.get('phone') || '+91 98765 43210',
  })

  const materialSuggestions = [
    'Cement',
    'Steel Bar',
    'Sand',
    'Concrete Block',
    'Bricks',
    'Stone Chips',
    'PVC Pipes',
    'Electrical Cables',
    'Paint',
    'Tiles',
    'Marble',
    'Wood',
  ]

  // Simplified data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        const promises = [apiCall('projects'), apiCall('items')]
        if (uuid) promises.push(apiCall(`review-order/${uuid}`))

        const [projectsRes, itemsRes, reviewOrderRes] = await Promise.all(
          promises
        )

        let projects = []
        if (projectsRes?.ok) {
          try {
            projects = await projectsRes.json()
            if (!Array.isArray(projects)) projects = []
          } catch (err) {
            console.error('Projects response error:', err)
          }
        }

        let orderItems = []
        if (uuid && reviewOrderRes?.ok) {
          try {
            const reviewOrderData = await reviewOrderRes.json()
            orderItems = Array.isArray(reviewOrderData)
              ? reviewOrderData.map((item, index) => ({
                  id: item.id || index + 1,
                  ...item,
                }))
              : [{ id: 1, ...reviewOrderData }]
          } catch (err) {
            console.error('ReviewOrder response error:', err)
          }
        }

        setState((prev) => ({
          ...prev,
          userProjects: projects,
          orderData: orderItems,
          isLoading: false,
        }))
      } catch (error) {
        console.error('Error loading data:', error)
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    }
    loadData()
  }, [uuid])

  // Event handlers - simplified
  const updateState = useCallback(
    (updates) => setState((prev) => ({ ...prev, ...updates })),
    []
  )

  const handleCellEdit = useCallback(
    (rowId, field, value) => {
      updateState({
        orderData: state.orderData.map((item) =>
          item.id === rowId ? { ...item, [field]: value } : item
        ),
      })
    },
    [state.orderData, updateState]
  )

  const handleDeleteRow = useCallback(
    (rowId) => {
      updateState({
        orderData: state.orderData.filter((item) => item.id !== rowId),
      })
    },
    [state.orderData, updateState]
  )

  const handleAddRow = useCallback(() => {
    const newId = Math.max(...state.orderData.map((item) => item.id), 0) + 1
    const newRow = {
      id: newId,
      material_name: '',
      sub_type: '',
      dimensions: '',
      quantity: 1,
      unit_price: 0,
    }

    updateState({ orderData: [...state.orderData, newRow] })

    if (isMobile) {
      updateState({ editingItem: newRow, editModalOpen: true })
    }
  }, [state.orderData, isMobile, updateState])

  const handleEditItem = useCallback(
    (item) => {
      updateState({ editingItem: item, editModalOpen: true })
    },
    [updateState]
  )

  const handleSaveItem = useCallback(
    async (formData) => {
      updateState({ isLoading: true })
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

      updateState({
        orderData: state.orderData.map((item) =>
          item.id === state.editingItem.id ? { ...item, ...formData } : item
        ),
        editModalOpen: false,
        editingItem: null,
        isLoading: false,
      })
    },
    [state.orderData, state.editingItem, updateState]
  )

  const handleSubmit = useCallback(async () => {
    const invalidItems = state.orderData.filter(
      (item) =>
        !item.material_name?.trim() || !item.quantity || item.quantity <= 0
    )

    if (invalidItems.length > 0) {
      alert('Please fill in all required fields (Item name and valid quantity)')
      return
    }

    if (!customerInfo.address.trim()) {
      alert('Please enter a delivery address.')
      return
    }

    updateState({ isSubmitting: true })

    try {
      const projectId = crypto.randomUUID?.() || Date.now().toString()
      const orderDataPayload = {
        request_id: uuid,
        project_id: projectId,
        sender_id: customerInfo.whatsappPhone.replace(/\D/g, ''),
        status: 'DRAFT',
        delivery_location: customerInfo.address,
        notes: `Order placed via BAB.AI Dashboard for ${customerInfo.site}. Customer: ${customerInfo.whatsappName}`,
        expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        user_editable: true,
        items: state.orderData.map((item) => ({
          material_name: item.material_name,
          sub_type: item.sub_type || null,
          dimensions: item.dimensions || null,
          quantity: item.quantity || 1,
          quantity_units: 'units',
          unit_price: item.unit_price || null,
          status: 'DRAFT',
        })),
        customerInfo,
        timestamp: new Date().toISOString(),
      }

      localStorage.setItem('orderData', JSON.stringify(orderDataPayload))
      navigate(`/select-vendors?uuid=${uuid || projectId}`, {
        state: { orderData: orderDataPayload },
      })
    } catch (error) {
      console.error('Order submission failed:', error)
      alert(`Order submission failed: ${error.message}`)
    } finally {
      updateState({ isSubmitting: false })
    }
  }, [state.orderData, customerInfo, navigate, uuid, updateState])

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-2 sm:px-4 lg:px-6 xl:px-8 py-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                </svg>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {customerInfo.name}
                </div>
                <div className="text-xs text-gray-500">
                  {customerInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6">
        {/* Site Information */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Site Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Select Site/Project *
                </label>
                <select
                  value={customerInfo.site}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, site: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="">Choose your project...</option>
                  {state.userProjects.map((project) => (
                    <option key={project.id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Delivery Address *
                </label>
                <Input
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter delivery address"
                  className="text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-semibold">
                Order Items
              </h2>
              <Badge className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                {state.orderData.length} items
              </Badge>
            </div>
            <Button
              onClick={handleAddRow}
              className="bg-black hover:bg-gray-800 text-white h-9 sm:h-10 px-3 sm:px-4"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add Item</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* Desktop Table */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Material Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Sub Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Dimensions
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.orderData.map((row) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      editingCell={state.editingCell}
                      setEditingCell={(cell) =>
                        updateState({ editingCell: cell })
                      }
                      onCellEdit={handleCellEdit}
                      onDeleteRow={handleDeleteRow}
                      suggestions={materialSuggestions}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {isMobile && (
            <div className="space-y-3">
              {state.orderData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No items added yet.</p>
                  <p className="text-sm mt-1">Tap "Add" to get started.</p>
                </div>
              ) : (
                state.orderData.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteRow}
                  />
                ))
              )}
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => window.history.back()}
            disabled={state.isSubmitting}
          >
            Back to WhatsApp
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={state.isSubmitting || state.orderData.length === 0}
            className="flex-1 bg-black hover:bg-gray-800 h-12 font-medium text-white"
          >
            {state.isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Listing Vendors...
              </>
            ) : (
              'Select Vendor'
            )}
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={state.editModalOpen}
        onClose={() => updateState({ editModalOpen: false, editingItem: null })}
        item={state.editingItem}
        onSave={handleSaveItem}
        suggestions={materialSuggestions}
        isLoading={state.isLoading}
      />
    </div>
  )
}

export default memo(DummyReview)

import React, { useState, useCallback, memo } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { EditModal } from '../components/ui/edit-modal'
import { useIsMobile } from '../hooks/use-media-query'
import { useNavigate } from 'react-router-dom'
import { Edit2, Trash2, Plus, Minus } from 'lucide-react'

/**
 * Responsive TableRow component for desktop view
 * Features inline editing with accessibility support
 */
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

    const startEdit = useCallback(
      (field) => {
        setEditingCell(`${row.id}-${field}`)
        setTempValue(row[field] || '')
        if (field === 'item') {
          setShowSuggestions(true)
        }
      },
      [row.id, row, setEditingCell]
    )

    const saveEdit = useCallback(
      (field) => {
        if (field === 'quantity' && (isNaN(tempValue) || tempValue <= 0)) {
          alert('Please enter a valid quantity greater than 0')
          return
        }
        onCellEdit(row.id, field, tempValue)
        setEditingCell(null)
        setShowSuggestions(false)
      },
      [row.id, tempValue, onCellEdit, setEditingCell]
    )

    const cancelEdit = useCallback(() => {
      setEditingCell(null)
      setTempValue('')
      setShowSuggestions(false)
    }, [setEditingCell])

    const handleKeyPress = useCallback(
      (e, field) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          saveEdit(field)
        } else if (e.key === 'Escape') {
          e.preventDefault()
          cancelEdit()
        }
      },
      [saveEdit, cancelEdit]
    )

    const selectSuggestion = useCallback((suggestion) => {
      setTempValue(suggestion)
      setShowSuggestions(false)
    }, [])

    const filteredSuggestions = suggestions
      .filter(
        (s) =>
          s.toLowerCase().includes(String(tempValue).toLowerCase()) &&
          s !== tempValue
      )
      .slice(0, 5)

    const renderCell = useCallback(
      (field, value) => {
        const isEditing = editingCell === `${row.id}-${field}`
        const cellId = `cell-${row.id}-${field}`
        const isAnyEditing = editingCell && editingCell.startsWith(row.id)
        const shouldShowEditIcon = !isEditing && (!isAnyEditing || !editingCell)

        return (
          <td className="bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer px-4 py-3 border-b border-gray-200 relative group">
            {/* Changed from group to table-cell for individual hover */}
            <div className="flex items-center justify-between min-h-[32px]">
              {isEditing ? (
                <div className="relative flex-1">
                  <Input
                    id={cellId}
                    type={field === 'quantity' ? 'number' : 'text'}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={() => saveEdit(field)}
                    onKeyDown={(e) => handleKeyPress(e, field)}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 focus:border-gray-500 hover:border-gray-400 h-8 text-sm"
                    autoFocus
                    min={field === 'quantity' ? 1 : undefined}
                    aria-label={`Edit ${field}`}
                  />
                  {field === 'item' &&
                    showSuggestions &&
                    filteredSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 bg-white border rounded-lg shadow-lg mt-1 z-20 min-w-48 max-w-80">
                        {filteredSuggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="w-full px-3 py-2 text-left cursor-pointer hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
                            onClick={() => selectSuggestion(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ) : (
                <>
                  <span
                    className="text-sm font-medium text-gray-900 flex-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                    onClick={() => startEdit(field)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        startEdit(field)
                      }
                    }}
                    aria-label={`${field}: ${
                      value || 'Click to add'
                    }. Press Enter to edit.`}
                  >
                    {field === 'quantity'
                      ? `${value}`
                      : value || (
                          <span className="text-gray-400 italic">
                            Click to add...
                          </span>
                        )}
                  </span>
                  {shouldShowEditIcon && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(field)}
                      className="ml-2 h-6 w-6 p-0 hover:bg-gray-100 hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] rounded border border-gray-300 bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label={`Edit ${field}`}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </td>
        )
      },
      [
        editingCell,
        row.id,
        tempValue,
        showSuggestions,
        filteredSuggestions,
        startEdit,
        saveEdit,
        handleKeyPress,
        selectSuggestion,
      ]
    )

    const renderQuantityCell = useCallback(
      (value) => {
        const isAnyEditing = editingCell && editingCell.startsWith(row.id)
        const shouldShowEditIcon = !isAnyEditing || !editingCell

        const handleIncrement = () =>
          onCellEdit(row.id, 'quantity', (value || 0) + 1)
        const handleDecrement = () => {
          if ((value || 0) > 1) {
            onCellEdit(row.id, 'quantity', (value || 0) - 1)
          }
        }
        const handleDirectEdit = (newValue) => {
          const numValue = parseInt(newValue) || 1
          if (numValue >= 1) {
            onCellEdit(row.id, 'quantity', numValue)
          }
        }

        return (
          <td className="bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer px-4 py-3 border-b border-gray-200 relative">
            <div className="flex items-center justify-between min-h-[32px]">
              {/* Desktop: Increment/Decrement Controls */}
              <div className="hidden md:flex items-center gap-1 w-fit">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecrement}
                  disabled={(value || 0) <= 1}
                  className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={value || 1}
                  onChange={(e) => handleDirectEdit(e.target.value)}
                  className="h-8 w-16 text-center text-sm"
                  min="1"
                  aria-label="Quantity"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleIncrement}
                  className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Mobile: Simple display with edit option */}
              <div className="md:hidden flex items-center justify-between w-full">
                <span className="text-sm font-medium text-gray-900">
                  {value || 1}
                </span>
                {shouldShowEditIcon && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit('quantity')}
                    className="hover:bg-gray-100 hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] rounded border border-gray-300 bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Edit quantity"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </td>
        )
      },
      [row.id, onCellEdit, startEdit]
    )

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
        {renderCell('item', row.item)}
        {renderCell('subtype', row.subtype)}
        {renderCell('size', row.size)}
        {renderQuantityCell(row.quantity)}
        <td className="px-4 py-3 border-b border-gray-200 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteRow(row.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
            aria-label={`Delete item ${row.item || 'untitled'}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
      </tr>
    )
  }
)

/**
 * Mobile-optimized ItemCard component
 * Features card-based layout with touch-friendly interactions
 */
const ItemCard = memo(({ item, onEdit, onDelete }) => {
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 p-4 mb-4 hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-opacity-25">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {item.item || (
                <span className="text-gray-400 italic">Unnamed item</span>
              )}
            </h3>
            {item.subtype && (
              <p className="text-sm text-gray-600 mt-1">{item.subtype}</p>
            )}
          </div>
          <div className="flex gap-2 ml-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
              className="min-h-[44px] min-w-[44px] rounded border border-gray-300 bg-white shadow-sm transition-all duration-150 hover:bg-gray-100 hover:scale-105 active:scale-95 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 h-9 w-9 p-0"
              aria-label={`Edit ${item.item || 'item'}`}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="min-h-[44px] min-w-[44px] rounded border border-gray-300 bg-white shadow-sm transition-all duration-150 hover:scale-105 active:scale-95 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              aria-label={`Delete ${item.item || 'item'}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className="flex justify-between items-start text-sm">
          <div>
            <span className="text-gray-500">Size/Unit:</span>
            <p className="font-medium text-gray-900 mt-1">
              {item.size || (
                <span className="text-gray-400 italic">Not specified</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className="text-gray-500">Quantity:</span>
            <p className="font-medium text-gray-900 mt-1">
              {item.quantity || 1}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
})

/**
 * Main DummyReview component with responsive design
 * Automatically switches between table (desktop) and card (mobile) layouts
 */
const DummyReview = () => {
  // State management
  const [orderData, setOrderData] = useState([
    {
      id: 1,
      item: 'Cement',
      subtype: 'OPC 53 Grade',
      size: '50 kg Bag',
      quantity: 100,
      unitPrice: 500,
    },
    {
      id: 2,
      item: 'Concrete Block',
      subtype: 'Solid',
      size: '16 x 8 x 8 in',
      quantity: 500,
      unitPrice: 25,
    },
    {
      id: 3,
      item: 'Steel Bar',
      subtype: 'TMT Rebar',
      size: '12 mm',
      quantity: 250,
      unitPrice: 65,
    },
    {
      id: 4,
      item: 'Sand',
      subtype: 'River Sand',
      size: 'Per Ton',
      quantity: 20,
      unitPrice: 1500,
    },
  ])

  const [editingCell, setEditingCell] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Responsive hook
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  // Customer info state
  const [customerInfo] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    site: 'Residential Construction - Phase 2',
    address: '123 Construction Site, Bangalore, Karnataka 560001',
  })

  // Material suggestions for autocomplete
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
    'Glass',
    'Aluminum',
    'Copper Pipes',
    'Insulation Material',
  ]

  // Event handlers
  const handleCellEdit = useCallback((rowId, field, value) => {
    setOrderData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    )
  }, [])

  const handleDeleteRow = useCallback((rowId) => {
    setOrderData((prevData) => prevData.filter((item) => item.id !== rowId))
  }, [])

  const handleAddRow = useCallback(() => {
    const newId = Math.max(...orderData.map((item) => item.id), 0) + 1
    const newRow = {
      id: newId,
      item: '',
      subtype: '',
      size: '',
      quantity: 1,
      unitPrice: 0,
    }
    setOrderData((prev) => [...prev, newRow])

    // Open edit modal for new item on mobile
    if (isMobile) {
      setEditingItem(newRow)
      setEditModalOpen(true)
    }
  }, [orderData, isMobile])

  const handleEditItem = useCallback((item) => {
    setEditingItem(item)
    setEditModalOpen(true)
  }, [])

  const handleSaveItem = useCallback(
    async (formData) => {
      setIsLoading(true)

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (editingItem) {
          setOrderData((prevData) =>
            prevData.map((item) =>
              item.id === editingItem.id ? { ...item, ...formData } : item
            )
          )
        }

        setEditModalOpen(false)
        setEditingItem(null)
      } catch (error) {
        console.error('Error saving item:', error)
        alert('Failed to save item. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [editingItem]
  )

  const handleSubmit = useCallback(async () => {
    // Validation
    const invalidItems = orderData.filter(
      (item) => !item.item?.trim() || !item.quantity || item.quantity <= 0
    )

    if (invalidItems.length > 0) {
      alert('Please fill in all required fields (Item name and valid quantity)')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to prepare order data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store order data for vendor selection
      const orderSummary = {
        customerInfo,
        items: orderData,
        timestamp: new Date().toISOString(),
      }

      // Store in localStorage for the vendor selection page
      localStorage.setItem('orderSummary', JSON.stringify(orderSummary))

      // Navigate to vendor selection
      navigate('/select-vendors')
    } catch (error) {
      console.error('Error preparing order:', error)
      alert('Failed to prepare order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [orderData, customerInfo, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-2 sm:px-4 lg:px-6 xl:px-8 py-6">
      {/* Header - Responsive */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  bab.ai
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">Order Review</p>
              </div>
            </div>

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
      <div className="max-w-screen-2xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 transition-all duration-300 ease-in-out">
        {/* Customer Information Card */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm">
                <strong>Name:</strong> {customerInfo.name}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {customerInfo.phone}
              </p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm">
                <strong>Site:</strong> {customerInfo.site}
              </p>
              <p className="text-sm">
                <strong>Address:</strong> {customerInfo.address}
              </p>
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
                {orderData.length} items
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

          {/* Desktop Table View */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white" role="table">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Item
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Subtype
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Size/Unit
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
                  {orderData.map((row) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      editingCell={editingCell}
                      setEditingCell={setEditingCell}
                      onCellEdit={handleCellEdit}
                      onDeleteRow={handleDeleteRow}
                      suggestions={materialSuggestions}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card View */}
          {isMobile && (
            <div className="space-y-3">
              {orderData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No items added yet.</p>
                  <p className="text-sm mt-1">Tap "Add" to get started.</p>
                </div>
              ) : (
                orderData.map((item) => (
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

        {/* Action Buttons - Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12 sm:h-12"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Back to WhatsApp
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || orderData.length === 0}
            className="flex-1 bg-black hover:bg-gray-800 h-12 sm:h-12 font-medium text-white"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Preparing Order...
              </>
            ) : (
              'Select Vendor'
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false)
          setEditingItem(null)
        }}
        item={editingItem}
        onSave={handleSaveItem}
        suggestions={materialSuggestions}
        isLoading={isLoading}
      />
    </div>
  )
}

export default memo(DummyReview)

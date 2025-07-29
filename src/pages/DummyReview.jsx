import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'

const TableRow = ({
  row,
  editingCell,
  setEditingCell,
  onCellEdit,
  onDeleteRow,
  suggestions = [],
}) => {
  const [tempValue, setTempValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const startEdit = (field) => {
    setEditingCell(`${row.id}-${field}`)
    setTempValue(row[field])
    if (field === 'item') {
      setShowSuggestions(true)
    }
  }

  const saveEdit = (field) => {
    if (field === 'quantity' && (isNaN(tempValue) || tempValue <= 0)) {
      alert('Please enter a valid quantity greater than 0')
      return
    }
    onCellEdit(row.id, field, tempValue)
    setEditingCell(null)
    setShowSuggestions(false)
  }

  const cancelEdit = () => {
    setEditingCell(null)
    setTempValue('')
    setShowSuggestions(false)
  }

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      saveEdit(field)
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  const selectSuggestion = (suggestion) => {
    setTempValue(suggestion)
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions
    .filter(
      (s) =>
        s.toLowerCase().includes(String(tempValue).toLowerCase()) &&
        s !== tempValue
    )
    .slice(0, 5)

  const renderCell = (field, value) => {
    const isEditing = editingCell === `${row.id}-${field}`

    return (
      <td className="px-4 py-3 border-b border-gray-200 relative">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <div className="relative flex-1">
              <Input
                type={field === 'quantity' ? 'number' : 'text'}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => saveEdit(field)}
                onKeyDown={(e) => handleKeyPress(e, field)}
                className="h-8 text-sm"
                autoFocus
                min={field === 'quantity' ? 1 : undefined}
              />
              {field === 'item' &&
                showSuggestions &&
                filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 bg-white border rounded-lg shadow-lg mt-1 z-20 min-w-48 max-w-80">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ) : (
            <div 
              className="text-sm font-medium text-gray-900 flex-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              onClick={() => startEdit(field)}
              title="Click to edit"
            >
              {field === 'quantity' ? `${value}` : value || 'Click to add...'}
            </div>
          )}
        </div>
      </td>
    )
  }

  const renderQuantityCell = (value) => {
    const handleIncrement = () => {
      onCellEdit(row.id, 'quantity', (value || 0) + 1)
    }

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
      <td className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-1 w-fit">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecrement}
            disabled={
              (editingCell && editingCell !== `${row.id}-quantity`) ||
              (value || 0) <= 1
            }
            className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </Button>
          <Input
            type="number"
            value={value || 1}
            onChange={(e) => handleDirectEdit(e.target.value)}
            className="h-8 w-16 text-center text-sm"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleIncrement}
            disabled={editingCell && editingCell !== `${row.id}-quantity`}
            className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Button>
        </div>
      </td>
    )
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {renderCell('item', row.item)}
      {renderCell('subtype', row.subtype)}
      {renderCell('size', row.size)}
      {renderQuantityCell(row.quantity)}
      <td className="px-4 py-3 border-b border-gray-200 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteRow(row.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
        >
          <svg
            className="w-3 h-3"
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
      </td>
    </tr>
  )
}

const DummyReview = () => {
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
  const [customerInfo, setCustomerInfo] = useState({
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

  const handleSetEditingCell = (cellId) => {
    setEditingCell(cellId)
  }

  const handleCellEdit = (rowId, field, value) => {
    setOrderData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    )
  }

  const handleDeleteRow = (rowId) => {
    setOrderData((prevData) => prevData.filter((item) => item.id !== rowId))
  }

  const handleAddRow = () => {
    const newId = Math.max(...orderData.map((item) => item.id)) + 1
    const newRow = {
      id: newId,
      item: '',
      subtype: '',
      size: '',
      quantity: 1,
      unitPrice: 0,
    }
    setOrderData([...orderData, newRow])
  }

  const handleSubmit = async () => {
    // Validation
    const invalidItems = orderData.filter(
      (item) => !item.item.trim() || !item.quantity || item.quantity <= 0
    )

    if (invalidItems.length > 0) {
      alert('Please fill in all required fields (Item name and valid quantity)')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Order submitted:', {
        customerInfo,
        items: orderData,
        total: calculateGrandTotal(),
        timestamp: new Date().toISOString(),
      })

      alert(`✅ Order Submitted Successfully!`)
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  BAB.AI Dashboard
                </h1>
                <p className="text-sm text-gray-500">Enhanced Order Review</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                <svg
                  className="w-5 h-5 text-white"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Customer Information Card */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <strong>Name:</strong> {customerInfo.name}
              </p>
              <p className="text-sm">
                <strong>Phone:</strong> {customerInfo.phone}
              </p>
            </div>
            <div>
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
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Order Items</h2>
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                {orderData.length} items
              </Badge>
            </div>
            <Button
              onClick={handleAddRow}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Item
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
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
                    setEditingCell={handleSetEditingCell}
                    onCellEdit={handleCellEdit}
                    onDeleteRow={handleDeleteRow}
                    suggestions={materialSuggestions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Back to WhatsApp
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || orderData.length === 0}
            className="flex-1 bg-green-600 hover:bg-green-700 h-12 font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting Order...
              </>
            ) : (
              `Select Vendor`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DummyReview

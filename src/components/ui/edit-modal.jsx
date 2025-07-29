import React, { useState, useEffect } from 'react'
import { Button } from './button'
import { Input } from './input'
import { X } from 'lucide-react'

/**
 * Mobile-optimized modal for editing order items
 * Features full-screen overlay with touch-friendly controls
 */
export const EditModal = ({
  isOpen,
  onClose,
  item,
  onSave,
  suggestions = [],
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    item: '',
    subtype: '',
    size: '',
    quantity: 1,
  })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [errors, setErrors] = useState({})

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && item) {
      setFormData({
        item: item.item || '',
        subtype: item.subtype || '',
        size: item.size || '',
        quantity: item.quantity || 1,
      })
      setErrors({})
    }
  }, [isOpen, item])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }

    // Show suggestions for item field
    if (field === 'item') {
      setShowSuggestions(value.length > 0)
    }
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, formData.quantity + delta)
    handleInputChange('quantity', newQuantity)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.item.trim()) {
      newErrors.item = 'Item name is required'
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleSuggestionSelect = (suggestion) => {
    handleInputChange('item', suggestion)
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions
    .filter(
      (s) =>
        s.toLowerCase().includes(formData.item.toLowerCase()) &&
        s.toLowerCase() !== formData.item.toLowerCase()
    )
    .slice(0, 5)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-md sm:rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {item?.id ? 'Edit Item' : 'Add Item'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
          {/* Item Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Item Name *
            </label>
            <div className="relative">
              <Input
                type="text"
                value={formData.item}
                onChange={(e) => handleInputChange('item', e.target.value)}
                placeholder="Enter item name"
                className={`h-12 ${errors.item ? 'border-red-500' : ''}`}
                aria-describedby={errors.item ? 'item-error' : undefined}
              />
              {errors.item && (
                <p id="item-error" className="text-sm text-red-600 mt-1">
                  {errors.item}
                </p>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-20 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="w-full px-3 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subtype Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subtype</label>
            <Input
              type="text"
              value={formData.subtype}
              onChange={(e) => handleInputChange('subtype', e.target.value)}
              placeholder="Enter subtype"
              className="h-12"
            />
          </div>

          {/* Size Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Size/Unit
            </label>
            <Input
              type="text"
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              placeholder="Enter size or unit"
              className="h-12"
            />
          </div>

          {/* Quantity Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Quantity *
            </label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={formData.quantity <= 1}
                className="h-12 w-12 rounded-lg"
                aria-label="Decrease quantity"
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
                    d="M20 12H4"
                  />
                </svg>
              </Button>

              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  handleInputChange('quantity', parseInt(e.target.value) || 1)
                }
                className={`h-12 text-center flex-1 ${
                  errors.quantity ? 'border-red-500' : ''
                }`}
                min="1"
                aria-describedby={
                  errors.quantity ? 'quantity-error' : undefined
                }
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="h-12 w-12 rounded-lg"
                aria-label="Increase quantity"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Button>
            </div>
            {errors.quantity && (
              <p id="quantity-error" className="text-sm text-red-600">
                {errors.quantity}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 h-12 bg-black hover:bg-gray-800 text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

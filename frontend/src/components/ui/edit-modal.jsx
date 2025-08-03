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
    material_name: '',
    sub_type: '',
    dimensions: '',
    quantity: 1,
  })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [errors, setErrors] = useState({})

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && item) {
      setFormData({
        material_name: item.material_name || '', // Use API field names
        sub_type: item.sub_type || '', // Use API field names
        dimensions: item.dimensions || '', // Use API field names
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

    if (!formData.material_name.trim()) {
      newErrors.material_name = 'Material name is required'
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
    handleInputChange('material_name', suggestion)
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions
    .filter(
      (s) =>
        s.toLowerCase().includes(formData.material_name.toLowerCase()) &&
        s.toLowerCase() !== formData.material_name.toLowerCase()
    )
    .slice(0, 5)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-brand-charcoal bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-brand-white w-full h-full sm:h-auto sm:max-w-md sm:rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-charcoal/20 bg-brand-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-brand-charcoal font-heading">
            {item?.id ? 'Edit Item' : 'Add Item'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-brand-charcoal/10"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
          {/* Item Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-charcoal font-body">
              Item Name *
            </label>
            <div className="relative">
              <Input
                type="text"
                value={formData.material_name}
                onChange={(e) =>
                  handleInputChange('material_name', e.target.value)
                }
                placeholder="Enter material name"
                className={`h-12 ${
                  errors.material_name ? 'border-functional-danger' : ''
                }`}
                aria-describedby={
                  errors.material_name ? 'material_name-error' : undefined
                }
              />
              {errors.material_name && (
                <p
                  id="material_name-error"
                  className="text-sm text-functional-danger mt-1 font-body"
                >
                  {errors.material_name}
                </p>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-brand-white border border-brand-charcoal/20 rounded-lg shadow-lg mt-1 z-20 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="w-full px-3 py-3 text-left hover:bg-brand-charcoal/5 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm font-body"
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
            <label className="text-sm font-medium text-brand-charcoal font-body">
              Subtype
            </label>
            <Input
              type="text"
              value={formData.sub_type}
              onChange={(e) => handleInputChange('subtype', e.target.value)}
              placeholder="Enter subtype"
              className="h-12"
            />
          </div>

          {/* Size Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-charcoal font-body">
              Size/Unit
            </label>
            <Input
              type="text"
              value={formData.dimensions}
              onChange={(e) => handleInputChange('dimensions', e.target.value)}
              placeholder="Enter size or unit"
              className="h-12"
            />
          </div>

          {/* Quantity Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-charcoal font-body">
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
                  errors.quantity ? 'border-functional-danger' : ''
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
              <p
                id="quantity-error"
                className="text-sm text-functional-danger font-body"
              >
                {errors.quantity}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-charcoal/20 bg-brand-charcoal/5 sticky bottom-0">
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
              className="flex-1 h-12 bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-white font-body"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-brand-white border-t-transparent rounded-full animate-spin mr-2" />
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

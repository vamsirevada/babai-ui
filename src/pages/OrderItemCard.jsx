import { useState, useEffect, useMemo, useCallback } from 'react'
import { Input } from '../components/ui/input.jsx'
import { Button } from '../components/ui/button'
import { apiCall } from '../utils/api.js'

// Simple debounce hook
const useDebouncedValue = (value, delay) => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debounced
}

// Suggestion dropdown component
const SuggestionDropdown = ({
  inputValue,
  suggestions,
  setEditingItemName,
}) => {
  const debouncedInput = useDebouncedValue(inputValue, 250)
  const filteredSuggestions = useMemo(() => {
    if (!debouncedInput) return []
    return suggestions
      .filter(
        (suggestion) =>
          suggestion.name
            ?.toLowerCase()
            .includes(debouncedInput.toLowerCase()) &&
          suggestion.name !== debouncedInput
      )
      .slice(0, 5)
  }, [debouncedInput, suggestions])

  if (filteredSuggestions.length === 0) return null

  return (
    <ul className="absolute top-full left-0 bg-white border rounded-lg shadow-lg mt-1 z-20 min-w-48 max-w-80">
      {filteredSuggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
          onClick={() => setEditingItemName(suggestion.name)}
        >
          <div className="font-medium text-gray-900 truncate">
            {suggestion.name}
          </div>
          {suggestion.category && (
            <div className="text-xs text-gray-500">{suggestion.category}</div>
          )}
        </li>
      ))}
    </ul>
  )
}

const OrderItemCard = ({
  item,
  editingItemId,
  editingItemName,
  handleEditClick,
  handleCancelClick,
  updateItemName,
  updateQuantity,
  removeItem,
  setEditingItemName,
}) => {
  const [suggestions, setSuggestions] = useState([])

  // Fetch suggestions on mount
  useEffect(() => {
    let isMounted = true
    const fetchSuggestions = async () => {
      try {
        const response = await apiCall('inventory')
        if (response.ok && isMounted) {
          const data = await response.json()
          setSuggestions(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    }
    fetchSuggestions()
    return () => {
      isMounted = false
    }
  }, [])

  // Event handlers
  const handleInputChange = useCallback(
    (e) => setEditingItemName(e.target.value),
    [setEditingItemName]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') updateItemName(item.id, editingItemName)
      if (e.key === 'Escape') handleCancelClick()
    },
    [item.id, editingItemName, updateItemName, handleCancelClick]
  )

  const handleQuantityChange = useCallback(
    (e) => {
      const newQuantity = Math.max(1, parseInt(e.target.value, 10) || 1)
      updateQuantity(item.id, newQuantity)
    },
    [item.id, updateQuantity]
  )

  // Format text helper
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

  const isEditing = editingItemId === item.id

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header Section */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Material Name:
                </span>
                <div className="relative flex-1 max-w-xs">
                  <Input
                    value={editingItemName}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="h-8 text-sm border-2 border-blue-300 focus:border-blue-500"
                    autoFocus
                    placeholder="Enter item name"
                  />
                  {editingItemName && (
                    <SuggestionDropdown
                      inputValue={editingItemName}
                      suggestions={suggestions}
                      setEditingItemName={setEditingItemName}
                    />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => updateItemName(item.id, editingItemName)}
                    className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                  >
                    ✓
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelClick}
                    className="hover:bg-red-50 text-red-600 h-8 w-8 p-0"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Material Name:{' '}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatText(item.material_name || 'Unknown Item')}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"
                    />
                  </svg>
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 py-4 space-y-3">
        {/* Quantity */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              value={item.quantity || 1}
              onChange={handleQuantityChange}
              className="w-20 h-8 text-center text-sm"
            />
            <span className="text-sm text-gray-600">
              {item.quantity_units || 'units'}
            </span>
          </div>
        </div>

        {/* Sub Type */}
        {item.sub_type && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Sub Type:</span>
            <span className="text-sm text-gray-900 font-medium">
              {formatText(item.sub_type)}
            </span>
          </div>
        )}

        {/* Dimensions */}
        {item.dimensions && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Dimensions:
            </span>
            <span className="text-sm text-gray-900 font-medium">
              {item.dimensions}
            </span>
          </div>
        )}

        {/* Unit Price */}
        {item.unit_price && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Unit Price:
            </span>
            <span className="text-sm text-gray-900 font-medium">
              {formatCurrency
                ? formatCurrency(item.unit_price)
                : `₹${item.unit_price}`}
            </span>
          </div>
        )}

        {/* Total Price */}
        {item.unit_price && item.quantity && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-semibold text-gray-700">Total:</span>
            <span className="text-sm font-bold text-green-600">
              {formatCurrency
                ? formatCurrency(item.unit_price * item.quantity)
                : `₹${(item.unit_price * item.quantity).toLocaleString()}`}
            </span>
          </div>
        )}

        {/* Remove Button */}
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderItemCard

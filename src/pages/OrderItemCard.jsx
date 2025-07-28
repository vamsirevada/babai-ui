import { useState, useEffect, useMemo, useCallback } from 'react'
import { Input } from '../components/ui/input.jsx'
import { Button } from '../components/ui/button'
import CheckmarkIcon from '../assets/icons/checkmark.svg?react'
import CloseIcon from '../assets/icons/close.svg?react'
import { apiCall } from '../utils/api.js'

const useDebouncedValue = (value, delay) => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debounced
}

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
            .toLowerCase()
            .includes(debouncedInput.toLowerCase()) &&
          suggestion.name !== debouncedInput
      )
      .slice(0, 5)
  }, [debouncedInput, suggestions])

  if (filteredSuggestions.length === 0) return null

  return (
    <ul className="absolute top-full left-0 w-full bg-white border rounded shadow mt-1 z-10">
      {filteredSuggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => setEditingItemName(suggestion.name)}
          tabIndex={0}
          aria-label={`Suggestion: ${suggestion.name}`}
        >
          {suggestion.name}
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
  formatCurrency,
}) => {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const response = await apiCall('inventory')
        if (!response.ok) return
        const data = await response.json()
        if (isMounted) setSuggestions(data)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between gap-4">
          {editingItemId === item.id ? (
            <div className="flex-grow flex items-center gap-2 relative">
              <div className="relative w-full">
                <Input
                  value={editingItemName}
                  onChange={handleInputChange}
                  className="h-9 text-base"
                  autoFocus
                  onKeyDown={handleKeyDown}
                  aria-label="Edit item name"
                />
                {editingItemName && (
                  <SuggestionDropdown
                    inputValue={editingItemName}
                    suggestions={suggestions}
                    setEditingItemName={setEditingItemName}
                  />
                )}
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => updateItemName(item.id, editingItemName)}
                className="bg-green-600 hover:bg-green-700"
                aria-label="Confirm edit"
              >
                <CheckmarkIcon />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleCancelClick}
                aria-label="Cancel edit"
              >
                <CloseIcon />
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-gray-900 text-base truncate pr-2">
                {item.material_name}
              </h3>
              <div className="flex items-center shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  aria-label={`Edit ${item.name}`}
                >
                  <svg
                    className="w-4 h-4 mr-1.5"
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
            </>
          )}
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor={`quantity-${item.id}`}
            >
              Quantity:
            </label>
            {item.quantity}
            {/* <Input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              className="w-24 text-center font-semibold border-gray-300 focus:border-green-500 focus:ring-green-500"
              aria-label={`Quantity for ${item.name}`}
            /> */}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors duration-200"
            aria-label={`Remove ${item.name}`}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderItemCard

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
    <ul className="absolute top-full left-0 bg-white border rounded-lg shadow-lg mt-1 z-20 min-w-48 max-w-80">
      {filteredSuggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
          onClick={() => setEditingItemName(suggestion.name)}
          tabIndex={0}
          aria-label={`Suggestion: ${suggestion.name}`}
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

  console.log('OrderItemCard rendered:', item)

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

  // Helper function to format text
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header Section - Responsive Name Display */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-start justify-between gap-2 sm:gap-4 sm:items-center">
          {editingItemId === item.id ? (
            // Editing mode - responsive inline edit
            <div className="flex-grow">
              {/* Desktop layout */}
              <div className="hidden sm:flex items-center gap-2">
                {/* Always show Material Name label */}
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Material Name:
                </span>
                {/* Inline input with auto-sizing */}
                <div className="relative">
                  <Input
                    value={editingItemName}
                    onChange={handleInputChange}
                    className="h-8 text-sm border-2 border-blue-300 focus:border-blue-500 px-2"
                    style={{
                      width: `${Math.max(
                        editingItemName.length * 8 + 24,
                        120
                      )}px`,
                      maxWidth: '250px',
                    }}
                    autoFocus
                    onKeyDown={handleKeyDown}
                    aria-label="Edit item name"
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

                {/* Confirm and Cancel buttons */}
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => updateItemName(item.id, editingItemName)}
                    className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0 flex-shrink-0"
                    aria-label="Confirm edit"
                  >
                    <CheckmarkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelClick}
                    className="hover:bg-red-50 text-red-600 h-8 w-8 p-0 flex-shrink-0"
                    aria-label="Cancel edit"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile layout - stacked */}
              <div className="sm:hidden space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-2">
                    Material Name:
                  </span>
                  <div className="relative">
                    <Input
                      value={editingItemName}
                      onChange={handleInputChange}
                      className="h-10 text-sm border-2 border-blue-300 focus:border-blue-500 px-3 w-full"
                      autoFocus
                      onKeyDown={handleKeyDown}
                      aria-label="Edit item name"
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
                </div>

                {/* Mobile action buttons */}
                <div className="flex items-center gap-3 justify-center">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => updateItemName(item.id, editingItemName)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm"
                    aria-label="Confirm edit"
                  >
                    <CheckmarkIcon className="w-4 h-4" />
                    <span>Save</span>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCancelClick}
                    className="border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 text-sm"
                    aria-label="Cancel edit"
                  >
                    <CloseIcon />
                    <span>Cancel</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 min-w-0">
                {/* Material name display */}
                <div className="flex items-start gap-2 sm:gap-3 text-sm">
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-gray-900 block">
                      <span className="text-sm font-medium text-gray-700">
                        Material Name:{' '}
                      </span>
                      <span className="break-words">
                        {formatText(item.material_name || 'Unknown Item')}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex items-start shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(item)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 sm:px-3 sm:py-2"
                  aria-label={`Edit ${item.material_name}`}
                >
                  <svg
                    className="w-4 h-4 sm:mr-1.5"
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
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details Section - Responsive layout */}
      <div className="px-4 py-4">
        {/* Desktop layout */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Quantity Display */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <span className="font-semibold text-gray-900">
                {item.quantity} {item.quantity_units || 'units'}
              </span>
            </div>

            {/* Separator and Sub Type */}
            {item.sub_type && (
              <>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Sub Type:
                  </span>
                  <span className="text-gray-700 font-medium">
                    {formatText(item.sub_type)}
                  </span>
                </div>
              </>
            )}

            {/* Separator and Dimensions */}
            {item.dimensions && (
              <>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Dimensions:
                  </span>
                  <span className="text-gray-600 font-medium">
                    {item.dimensions}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Remove Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors duration-200 flex-shrink-0"
            aria-label={`Remove ${item.material_name}`}
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

        {/* Mobile layout - stacked with better spacing */}
        <div className="sm:hidden space-y-4">
          {/* Quantity in its own card */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <span className="font-semibold text-gray-900">
                {item.quantity} {item.quantity_units || 'units'}
              </span>
            </div>
          </div>

          {/* Sub Type in its own card */}
          {item.sub_type && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between space-y-1">
                <span className="text-sm font-medium text-gray-700 block">
                  Sub Type:
                </span>
                <span className="text-gray-700 font-medium text-sm block break-words">
                  {formatText(item.sub_type)}
                </span>
              </div>
            </div>
          )}

          {/* Dimensions in its own card */}
          {item.dimensions && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between space-y-1">
                <span className="text-sm font-medium text-gray-700 block">
                  Dimensions:
                </span>
                <span className="text-gray-600 font-medium text-sm block break-words">
                  {item.dimensions}
                </span>
              </div>
            </div>
          )}

          {/* Remove button in its own row */}
          <div className="pt-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white w-full"
              aria-label={`Remove ${item.material_name}`}
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
    </div>
  )
}

export default OrderItemCard

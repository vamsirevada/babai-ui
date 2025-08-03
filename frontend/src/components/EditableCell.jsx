// src/components/EditableCell.jsx

import React, {useState, memo, useEffect, useRef} from 'react'
import {Input} from './ui/input'
import {Edit2} from 'lucide-react'

const EditableCell = memo(({value, onSave, inputType = 'text'}) => {
		const [isEditing, setIsEditing] = useState(false)
		const [tempValue, setTempValue] = useState(value)
		const inputRef = useRef(null)

		useEffect(() => {
				if (isEditing && inputRef.current) {
						inputRef.current.focus()
						inputRef.current.select()
				}
		}, [isEditing])

		const handleSave = () => {
				// Only call onSave if the value has actually changed
				if (tempValue !== value) {
						onSave(tempValue)
				}
				setIsEditing(false)
		}

		const handleCancel = () => {
				setTempValue(value) // Revert to original value
				setIsEditing(false)
		}

		if (isEditing) {
				return (
						<Input
								ref={inputRef}
								type={inputType}
								value={tempValue}
								onChange={(e) => setTempValue(e.target.value)}
								onBlur={handleSave}
								onKeyDown={(e) => {
										if (e.key === 'Enter') handleSave()
										if (e.key === 'Escape') handleCancel()
								}}
								className="h-8 text-sm"
								min={inputType === 'number' ? 1 : undefined}
						/>
				)
		}

		return (
				<div
						className="flex items-center justify-between cursor-pointer group w-full h-full p-2 -m-2 rounded-md"
						onClick={() => setIsEditing(true)}
				>
      <span className="text-sm font-medium text-gray-900">
        {value || <span className="text-gray-400 italic">Click to add...</span>}
      </span>
						<Edit2 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"/>
				</div>
		)
})

export default EditableCell
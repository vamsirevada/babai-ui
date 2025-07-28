import React, { useState } from 'react'
import './Dummy.css'

const TableRow = ({ row, editingCell, setEditingCell, onCellEdit }) => {
  const [tempValue, setTempValue] = useState('')

  const startEdit = (field) => {
    setEditingCell(`${row.id}-${field}`)
    setTempValue(row[field])
  }

  const saveEdit = (field) => {
    onCellEdit(row.id, field, tempValue)
    setEditingCell(null)
  }

  const cancelEdit = () => {
    setEditingCell(null)
    setTempValue('')
  }

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      saveEdit(field)
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  const renderCell = (field, value) => {
    const isEditing = editingCell === `${row.id}-${field}`

    return (
      <td className="editable-cell">
        <div className="cell-content">
          {isEditing ? (
            <input
              type={field === 'quantity' ? 'number' : 'text'}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={() => saveEdit(field)}
              onKeyDown={(e) => handleKeyPress(e, field)}
              className="cell-input"
              autoFocus
            />
          ) : (
            <span className="cell-value">{value}</span>
          )}
          <button
            className="edit-button"
            onClick={() => startEdit(field)}
            disabled={editingCell && editingCell !== `${row.id}-${field}`}
          >
            ✏️
          </button>
        </div>
      </td>
    )
  }

  return (
    <tr>
      {renderCell('item', row.item)}
      {renderCell('subtype', row.subtype)}
      {renderCell('size', row.size)}
      {renderCell('quantity', row.quantity)}
    </tr>
  )
}

const DummyReview = () => {
  const [orderData, setOrderData] = useState([
    {
      id: 1,
      item: 'Cement',
      subtype: 'Portland',
      size: '50 kg Bag',
      quantity: 100,
    },
    {
      id: 2,
      item: 'Concrete Block',
      subtype: 'Solid',
      size: '16 x 8 x 8 in',
      quantity: 500,
    },
    {
      id: 3,
      item: 'Steel Bar',
      subtype: 'Rebar',
      size: '12 mm',
      quantity: 250,
    },
    {
      id: 4,
      item: 'Sand',
      subtype: 'River',
      size: 'Ton',
      quantity: 20,
    },
  ])

  const [editingCell, setEditingCell] = useState(null)

  const handleCellEdit = (rowId, field, value) => {
    setOrderData((prevData) =>
      prevData.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    )
  }

  const handleSubmit = () => {
    console.log('Order submitted:', orderData)
    // Handle form submission
  }

  return (
    <div className="review-order-container">
      <div className="header">
        <div className="logo">bab·ai</div>
        <div className="vendor-selection">Vendor Selection</div>
      </div>

      <div className="content">
        <h1 className="title">Review Order</h1>

        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Subtype</th>
                <th>Size</th>
                <th>Quantity</th>
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
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-container">
          <button className="back-button">Back</button>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default DummyReview

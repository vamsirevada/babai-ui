import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'

// Utility function to generate order links for WhatsApp
export const generateOrderLink = (customerInfo = {}, prefilledItems = []) => {
  const baseUrl = window.location.origin
  const params = new URLSearchParams()

  // Add customer info if available
  if (customerInfo.name) params.set('name', customerInfo.name)
  if (customerInfo.phone) params.set('phone', customerInfo.phone)
  if (customerInfo.site) params.set('site', customerInfo.site)

  // Add prefilled items as compressed JSON
  if (prefilledItems.length > 0) {
    params.set('items', btoa(JSON.stringify(prefilledItems)))
  }

  const queryString = params.toString()
  return `${baseUrl}/place-order${queryString ? '?' + queryString : ''}`
}

// Quick order link generator component for WhatsApp bot
const OrderLinkGenerator = () => {
  const [generatedLink, setGeneratedLink] = useState('')

  const commonOrderTypes = [
    {
      name: 'Basic House Construction',
      items: [
        {
          id: 1,
          name: 'Portland Cement (50kg)',
          quantity: 100,
          price: 450,
          unit: 'bags',
        },
        {
          id: 2,
          name: 'Steel Rods TMT (12mm)',
          quantity: 3,
          price: 65000,
          unit: 'tonnes',
        },
        {
          id: 3,
          name: 'Red Bricks (First Class)',
          quantity: 10000,
          price: 8,
          unit: 'pieces',
        },
        {
          id: 4,
          name: 'River Sand (M-Sand)',
          quantity: 1000,
          price: 45,
          unit: 'cubic feet',
        },
      ],
    },
    {
      name: 'Flooring Materials',
      items: [
        {
          id: 1,
          name: 'Ceramic Tiles (60x60)',
          quantity: 200,
          price: 150,
          unit: 'sq ft',
        },
        {
          id: 2,
          name: 'Tile Adhesive',
          quantity: 50,
          price: 350,
          unit: 'bags',
        },
        { id: 3, name: 'Grout', quantity: 20, price: 180, unit: 'kg' },
      ],
    },
    {
      name: 'Plumbing Essentials',
      items: [
        {
          id: 1,
          name: 'PVC Pipes (4 inch)',
          quantity: 500,
          price: 120,
          unit: 'feet',
        },
        {
          id: 2,
          name: 'PVC Pipes (2 inch)',
          quantity: 300,
          price: 80,
          unit: 'feet',
        },
        {
          id: 3,
          name: 'Pipe Fittings Set',
          quantity: 1,
          price: 2500,
          unit: 'set',
        },
      ],
    },
  ]

  const generateQuickLink = (orderType) => {
    const link = generateOrderLink({}, orderType.items)
    setGeneratedLink(link)

    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      alert('Order link copied to clipboard!')
    })
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">
        Quick Order Links for WhatsApp
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Generate instant order links to send to customers via WhatsApp
      </p>

      <div className="space-y-3">
        {commonOrderTypes.map((orderType, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <span className="font-medium">{orderType.name}</span>
              <Badge className="ml-2 text-xs">
                {orderType.items.length} items
              </Badge>
            </div>
            <Button
              onClick={() => generateQuickLink(orderType)}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              Generate Link
            </Button>
          </div>
        ))}
      </div>

      {generatedLink && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800 mb-2">
            Generated Link:
          </p>
          <code className="text-xs text-green-700 bg-white p-2 rounded block break-all">
            {generatedLink}
          </code>
          <p className="text-xs text-green-600 mt-2">
            ✓ Link copied to clipboard! Share this with your customer on
            WhatsApp.
          </p>
        </div>
      )}
    </Card>
  )
}

export default OrderLinkGenerator

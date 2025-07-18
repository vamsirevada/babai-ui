import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from './ui/badge'
import { CreditCard, TrendingUp, AlertCircle } from 'lucide-react'

export function CreditSection() {
  const creditData = {
    totalCredit: 125000,
    usedCredit: 89500,
    availableCredit: 35500,
    creditUtilization: 71.6,
    paymentStatus: 'Current',
    nextPaymentDue: '2024-12-15',
    transactions: [
      {
        id: 1,
        description: 'Steel Purchase - Q4',
        amount: -15000,
        date: '2024-11-28',
      },
      {
        id: 2,
        description: 'Equipment Rental',
        amount: -8500,
        date: '2024-11-25',
      },
      {
        id: 3,
        description: 'Payment Received',
        amount: 25000,
        date: '2024-11-20',
      },
      {
        id: 4,
        description: 'Material Transport',
        amount: -3200,
        date: '2024-11-18',
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Credit Management</h2>
      </div>

      {/* Credit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Credit Line
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${creditData.totalCredit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Approved credit facility
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Credit
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${creditData.availableCredit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (creditData.availableCredit / creditData.totalCredit) *
                100
              ).toFixed(1)}
              % of total limit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credit Utilization
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {creditData.creditUtilization}%
            </div>
            <p className="text-xs text-muted-foreground">
              ${creditData.usedCredit.toLocaleString()} used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Current payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                {creditData.paymentStatus}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Next Payment Due</span>
              <span className="text-sm text-gray-600">
                {creditData.nextPaymentDue}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full"
                style={{ width: `${creditData.creditUtilization}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              Utilization: {creditData.creditUtilization}% of credit limit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest credit account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creditData.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {transaction.amount < 0 ? '-' : '+'}$
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

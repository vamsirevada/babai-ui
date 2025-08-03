import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from './MetricCard'
import {
  Package,
  Users,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  DollarSign,
  TrendingUp,
} from 'lucide-react'

export function ProcurementSection() {
  const vendorRequests = [
    {
      id: 1,
      vendor: 'Steel Dynamics Co.',
      item: 'Structural Steel Beams',
      quantity: '500 units',
      status: 'pending',
      priority: 'high',
      deadline: '3 days',
    },
    {
      id: 2,
      vendor: 'Concrete Solutions Ltd.',
      item: 'Ready-mix Concrete',
      quantity: '200 m³',
      status: 'quoted',
      priority: 'medium',
      deadline: '5 days',
    },
    {
      id: 3,
      vendor: 'SafeWork Equipment',
      item: 'Safety Harnesses',
      quantity: '25 units',
      status: 'approved',
      priority: 'low',
      deadline: '7 days',
    },
  ]

  const activeQuotes = [
    {
      id: 1,
      vendor: 'ProBuild Materials',
      items: 'Electrical Components',
      amount: '$12,450',
      validUntil: '2 days',
      status: 'review',
    },
    {
      id: 2,
      vendor: 'Quality Fixtures Inc.',
      items: 'Plumbing Fixtures',
      amount: '$8,750',
      validUntil: '5 days',
      status: 'pending',
    },
  ]

  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'default'
      case 'quoted':
        return 'outline'
      case 'pending':
        return 'secondary'
      case 'review':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-destructive'
      case 'medium':
        return 'text-warning'
      case 'low':
        return 'text-success'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Procurement</h2>
        <Button variant="outline" size="sm">
          <Package className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Active Vendors"
          value={28}
          change={{ value: 12, type: 'increase' }}
          icon={<Users />}
          status="success"
        />
        <MetricCard
          title="Pending Quotes"
          value={15}
          icon={<FileText />}
          status="warning"
        />
        <MetricCard
          title="Processing Time"
          value="2.3 days"
          change={{ value: 15, type: 'decrease' }}
          icon={<Clock />}
          status="success"
        />
        <MetricCard
          title="Cost Savings"
          value="$47.2K"
          change={{ value: 8, type: 'increase' }}
          icon={<DollarSign />}
          status="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Requests */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Vendor Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vendorRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 rounded-lg border border-border bg-gradient-to-r from-background to-primary/5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{request.vendor}</span>
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.item}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {request.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${getPriorityColor(
                        request.priority
                      )}`}
                    >
                      {request.priority.toUpperCase()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Due in {request.deadline}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Process Request
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Requests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Active Quotes */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-success" />
              Active Quotes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeQuotes.map((quote) => (
              <div key={quote.id} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{quote.vendor}</span>
                      <Badge variant={getStatusVariant(quote.status)}>
                        {quote.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {quote.items}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Valid for {quote.validUntil}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{quote.amount}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Compare
                  </Button>
                  <Button size="sm" className="flex-1">
                    Accept Quote
                  </Button>
                </div>
              </div>
            ))}

            <div className="space-y-3 pt-4 border-t">
              <div className="text-center text-sm text-muted-foreground">
                Streamline vendor relationships
              </div>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <TrendingUp className="mr-2 h-4 w-4" />
                Vendor Performance Analytics
              </Button>
              <Button variant="outline" className="w-full">
                Integrate Supply Chain
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

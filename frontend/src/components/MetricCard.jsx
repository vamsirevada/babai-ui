import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function MetricCard({ title, value, change, icon, status = 'default' }) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-success'
      case 'warning':
        return 'text-warning'
      case 'destructive':
        return 'text-destructive'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={getStatusColor()}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground">
            {change.type === 'increase' ? (
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
            )}
            <span
              className={
                change.type === 'increase' ? 'text-success' : 'text-destructive'
              }
            >
              {change.value}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from './MetricCard'
import {
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Bell,
  ArrowRight,
} from 'lucide-react'

export function SiteOperationsSection() {
  const siteUpdates = [
    {
      id: 1,
      site: 'Skyline Towers - Phase 2',
      message: 'Foundation concrete pour completed ahead of schedule',
      timestamp: '2 min ago',
      status: 'success',
      location: 'Building A - Ground Level',
      contractor: 'BuildFast Construction',
    },
    {
      id: 2,
      site: 'Metro Commercial Complex',
      message: 'Crane delivery delayed due to traffic - ETA pushed to 3 PM',
      timestamp: '15 min ago',
      status: 'warning',
      location: 'Main Gate - Entry Point 2',
      contractor: 'Heavy Lift Services',
    },
    {
      id: 3,
      site: 'Riverside Residential',
      message: 'Safety inspection required for scaffolding in Zone C',
      timestamp: '1 hour ago',
      status: 'destructive',
      location: 'Zone C - 3rd Floor',
      contractor: 'SafeWork Solutions',
    },
    {
      id: 4,
      site: 'Tech Park Extension',
      message: 'Steel beam installation 85% complete',
      timestamp: '2 hours ago',
      status: 'success',
      location: 'Block B - 5th Floor',
      contractor: 'Steel Masters Ltd',
    },
  ]

  const aiAlerts = [
    {
      id: 1,
      title: 'Weather Risk Alert',
      description:
        'Heavy monsoon rains predicted tomorrow (18-20 July). Recommend rescheduling outdoor concrete work and securing materials.',
      severity: 'warning',
      action: 'View Weather Plan',
      impact: 'High',
      affectedSites: 3,
    },
    {
      id: 2,
      title: 'Resource Optimization',
      description:
        'Crane at Skyline Towers running at 45% capacity. Consider reassigning to Metro Complex for steel installation.',
      severity: 'info',
      action: 'Optimize Schedule',
      impact: 'Medium',
      potentialSavings: '₹2.3L',
    },
    {
      id: 3,
      title: 'Vendor Performance Alert',
      description:
        'Steel Masters Ltd consistently delivering 20% faster than schedule. Consider increasing allocation.',
      severity: 'success',
      action: 'View Performance',
      impact: 'Positive',
      efficiency: '+20%',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'default'
      case 'warning':
        return 'outline'
      case 'destructive':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Site Operations</h2>
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Configure Alerts
        </Button>
      </div>

      {/* Enhanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Active Project Sites"
          value={18}
          change={{ value: 12, type: 'increase' }}
          icon={<MapPin />}
          status="success"
          subtitle="Across 4 cities"
        />
        <MetricCard
          title="WhatsApp Updates Today"
          value={247}
          change={{ value: 18, type: 'increase' }}
          icon={<MessageCircle />}
          subtitle="Real-time communications"
        />
        <MetricCard
          title="AI Risk Alerts"
          value={3}
          icon={<AlertTriangle />}
          status="warning"
          subtitle="Requiring attention"
        />
        <MetricCard
          title="Project Completion Rate"
          value="92%"
          change={{ value: 7, type: 'increase' }}
          icon={<CheckCircle />}
          status="success"
          subtitle="This quarter"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Updates */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Live Site Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {siteUpdates.map((update) => (
              <div
                key={update.id}
                className="p-4 rounded-lg border border-border bg-gradient-to-r from-background to-primary/5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{update.site}</span>
                      <Badge variant={getStatusColor(update.status)}>
                        {update.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {update.message}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {update.location} • {update.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced AI Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              AI-Powered Intelligence Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge
                        variant={
                          alert.severity === 'warning'
                            ? 'destructive'
                            : alert.severity === 'success'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>

                    {/* Additional Context */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span>Impact: {alert.impact}</span>
                      {alert.affectedSites && (
                        <span>Sites: {alert.affectedSites}</span>
                      )}
                      {alert.potentialSavings && (
                        <span>Savings: {alert.potentialSavings}</span>
                      )}
                      {alert.efficiency && (
                        <span>Efficiency: {alert.efficiency}</span>
                      )}
                    </div>

                    <Button size="sm" variant="outline">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-3 pt-4 border-t">
              <div className="text-center text-sm text-muted-foreground">
                Connect your communication channels for comprehensive AI
                analysis
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button className="bg-gradient-success hover:opacity-90">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Business
                </Button>
                <Button variant="outline">Enable Slack Integration</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

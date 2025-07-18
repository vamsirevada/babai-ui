import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { SiteOperationsSection } from './SiteOperationsSection'
import { ProcurementSection } from './ProcurementSection'
import { CreditSection } from './CreditSection'
import { Settings, Bell, User, MapPin, Package, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function OperationsDashboard() {
  const [activeTab, setActiveTab] = useState('operations')
  const navigate = useNavigate()

  // Real-time dashboard metrics
  const dashboardStats = {
    totalProjects: 24,
    activeProjects: 18,
    onTimeDelivery: 92,
    costSavings: 2.8,
    riskAlertsToday: 3,
    vendorPerformance: 4.6,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Real-time Stats */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => navigate('/')} className="cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ai</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Construction Command Center
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {dashboardStats.activeProjects} active projects •{' '}
                    {dashboardStats.onTimeDelivery}% on-time delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Real-time Status Indicators */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">
                    ₹{dashboardStats.costSavings}M saved
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">
                    {dashboardStats.vendorPerformance}★ avg vendor rating
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                  {dashboardStats.riskAlertsToday > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {dashboardStats.riskAlertsToday}
                    </div>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full max-w-lg grid-cols-3 mx-auto bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="operations"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Site Operations</span>
              <span className="sm:hidden">Sites</span>
            </TabsTrigger>
            <TabsTrigger
              value="procurement"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Smart Procurement</span>
              <span className="sm:hidden">Procurement</span>
            </TabsTrigger>
            <TabsTrigger
              value="credit"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Credit & Finance</span>
              <span className="sm:hidden">Finance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-6">
            <SiteOperationsSection />
          </TabsContent>

          <TabsContent value="procurement" className="space-y-6">
            <ProcurementSection />
          </TabsContent>

          <TabsContent value="credit" className="space-y-6">
            <CreditSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>© 2025 bab.ai Construction Intelligence</span>
              </div>
              <div className="text-xs opacity-75">
                Powering smart construction management
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Last sync: Just now</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground">
              <span>AI Analysis: Active</span>
              <span>Projects Monitored: {dashboardStats.totalProjects}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

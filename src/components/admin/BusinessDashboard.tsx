import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";

interface BusinessDashboardProps {
  timeRange: string;
}

const BusinessDashboard = ({ timeRange }: BusinessDashboardProps) => {
  // Mock data - in real app this would come from API
  const metrics = {
    totalRevenue: 125000,
    revenueGrowth: 12.5,
    activeEscrows: 34,
    completedEscrows: 128,
    averageValue: 3250,
    conversionRate: 85.2
  };

  const recentEscrows = [
    { id: "ESC-001", amount: 5000, asset: "USDC", status: "active", created: "2h ago" },
    { id: "ESC-002", amount: 2500, asset: "ETH", status: "completed", created: "4h ago" },
    { id: "ESC-003", amount: 8000, asset: "USDC", status: "pending", created: "6h ago" },
    { id: "ESC-004", amount: 1200, asset: "BTC", status: "active", created: "8h ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800'; 
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              +{metrics.revenueGrowth}% from last {timeRange}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Escrows</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeEscrows}</div>
            <div className="text-xs text-muted-foreground">
              {metrics.completedEscrows} completed total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.averageValue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Per escrow transaction
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <Progress value={metrics.conversionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Escrow Activity</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEscrows.map((escrow) => (
              <div key={escrow.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{escrow.id}</p>
                    <p className="text-sm text-muted-foreground">{escrow.created}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium">{escrow.amount} {escrow.asset}</p>
                    <Badge className={getStatusColor(escrow.status)}>
                      {escrow.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDashboard;
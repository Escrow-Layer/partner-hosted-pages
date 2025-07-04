import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar 
} from 'recharts';
import { CalendarDays, TrendingUp, DollarSign } from "lucide-react";

interface RevenueAnalyticsProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const RevenueAnalytics = ({ timeRange, onTimeRangeChange }: RevenueAnalyticsProps) => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, transactions: 23 },
    { month: 'Feb', revenue: 52000, transactions: 28 },
    { month: 'Mar', revenue: 48000, transactions: 25 },
    { month: 'Apr', revenue: 61000, transactions: 32 },
    { month: 'May', revenue: 55000, transactions: 29 },
    { month: 'Jun', revenue: 67000, transactions: 35 },
  ];

  const paymentMethods = [
    { name: 'USDC', value: 45, amount: 156000 },
    { name: 'ETH', value: 25, amount: 87000 },
    { name: 'BTC', value: 20, amount: 69000 },
    { name: 'USDT', value: 10, amount: 35000 },
  ];

  const topPerformers = [
    { category: 'Domain Sales', revenue: 89000, growth: 15.2 },
    { category: 'NFT Trading', revenue: 67000, growth: 8.7 },
    { category: 'Digital Services', revenue: 45000, growth: 12.1 },
    { category: 'SaaS Licenses', revenue: 34000, growth: -2.3 },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Revenue Analytics</h3>
        </div>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{method.name}</Badge>
                    <span className="text-sm text-muted-foreground">{method.value}%</span>
                  </div>
                  <span className="font-medium">${method.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{category.category}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className={`h-3 w-3 ${category.growth > 0 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={category.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                        {category.growth > 0 ? '+' : ''}{category.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${category.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueAnalytics;
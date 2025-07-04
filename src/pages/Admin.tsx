import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import BusinessDashboard from "@/components/admin/BusinessDashboard";
import RevenueAnalytics from "@/components/admin/RevenueAnalytics";
import EssentialSettings from "@/components/admin/EssentialSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  DollarSign,
  Settings,
  TrendingUp
} from "lucide-react";

// Simplified business configuration
interface BusinessConfig {
  name: string;
  logo: string;
}

const initialConfig: BusinessConfig = {
  name: "Flippa",
  logo: "/placeholder.svg"
};

const Admin = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<BusinessConfig>(initialConfig);
  const [timeRange, setTimeRange] = useState("month");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your business settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader partnerName={config.name} partnerLogo={config.logo} />
      
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Business Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your escrow business performance and manage essential settings
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-2 px-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 py-2 px-3">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-2 px-3">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <BusinessDashboard timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <RevenueAnalytics 
              timeRange={timeRange} 
              onTimeRangeChange={setTimeRange} 
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <EssentialSettings onSave={handleSave} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
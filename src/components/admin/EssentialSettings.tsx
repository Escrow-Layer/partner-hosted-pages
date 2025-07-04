import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Settings, Wallet, Shield, Bell } from "lucide-react";

interface EssentialSettingsProps {
  onSave: () => void;
}

const EssentialSettings = ({ onSave }: EssentialSettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    businessName: "Flippa",
    payoutWallet: "",
    defaultCurrency: "USDC",
    commissionRate: 2.5,
    autoApproval: false,
    emailNotifications: true,
    webhookUrl: ""
  });

  const handleSave = () => {
    onSave();
    toast({
      title: "Settings saved",
      description: "Your essential settings have been updated successfully.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Business Basics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Basics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="business-name">Business Name</Label>
            <Input
              id="business-name"
              value={settings.businessName}
              onChange={(e) => updateSetting("businessName", e.target.value)}
              placeholder="Your business name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default-currency">Default Currency</Label>
              <Select value={settings.defaultCurrency} onValueChange={(value) => updateSetting("defaultCurrency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="commission-rate">Commission Rate (%)</Label>
              <Input
                id="commission-rate"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={settings.commissionRate}
                onChange={(e) => updateSetting("commissionRate", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="payout-wallet">Payout Wallet Address</Label>
            <Input
              id="payout-wallet"
              value={settings.payoutWallet}
              onChange={(e) => updateSetting("payoutWallet", e.target.value)}
              placeholder="0x... or wallet address"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Where commission payments will be sent
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="auto-approval">Auto-approve small transactions</Label>
              <p className="text-sm text-muted-foreground">
                Automatically approve escrows under $1,000
              </p>
            </div>
            <Switch
              id="auto-approval"
              checked={settings.autoApproval}
              onCheckedChange={(checked) => updateSetting("autoApproval", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about escrow activities
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
            />
          </div>
          
          <div>
            <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
            <Input
              id="webhook-url"
              value={settings.webhookUrl}
              onChange={(e) => updateSetting("webhookUrl", e.target.value)}
              placeholder="https://yoursite.com/webhook"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Receive real-time notifications about escrow events
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Recommended for admin access</p>
              </div>
              <Button variant="outline">Setup 2FA</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">API Access</p>
                <p className="text-sm text-muted-foreground">Manage API keys for integrations</p>
              </div>
              <Button variant="outline">Manage Keys</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="min-w-32">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default EssentialSettings;
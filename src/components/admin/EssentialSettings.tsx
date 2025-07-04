import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings, Wallet, Shield, Bell, Globe, Zap, Copy, Eye, EyeOff, RefreshCw } from "lucide-react";

interface EssentialSettingsProps {
  onSave: () => void;
}

const EssentialSettings = ({ onSave }: EssentialSettingsProps) => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "Flippa",
    businessEmail: "admin@flippa.com",
    businessUrl: "https://flippa.com",
    payoutWallet: "",
    payoutNetwork: "ethereum",
    backupWallet: "",
    backupNetwork: "ethereum",
    defaultCurrency: "USDC",
    commissionRate: 2.5,
    minTransactionAmount: 100,
    maxTransactionAmount: 100000,
    autoApproval: false,
    autoApprovalLimit: 1000,
    disputeTimeLimit: 72,
    emailNotifications: true,
    smsNotifications: false,
    webhookUrl: "",
    apiKey: "sk_live_" + Math.random().toString(36).substring(2, 15),
    rateLimitPerHour: 1000,
    allowedOrigins: ["https://flippa.com"],
    maintenanceMode: false
  });

  const handleSave = () => {
    onSave();
    toast({
      title: "Settings saved",
      description: "Your business settings have been updated successfully.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const regenerateApiKey = () => {
    const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15);
    updateSetting("apiKey", newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. Update your integrations.",
    });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard.",
    });
  };

  const networkOptions = [
    { value: "ethereum", label: "Ethereum", fee: "$15-25" },
    { value: "arbitrum", label: "Arbitrum", fee: "$1-3" },
    { value: "base", label: "Base", fee: "$0.50-1" },
    { value: "polygon", label: "Polygon", fee: "$0.10-0.50" },
    { value: "solana", label: "Solana", fee: "$0.01-0.05" },
  ];

  return (
    <div className="space-y-6">
      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Business Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={settings.businessName}
                onChange={(e) => updateSetting("businessName", e.target.value)}
                placeholder="Your business name"
              />
            </div>
            
            <div>
              <Label htmlFor="business-email">Business Email</Label>
              <Input
                id="business-email"
                type="email"
                value={settings.businessEmail}
                onChange={(e) => updateSetting("businessEmail", e.target.value)}
                placeholder="admin@yoursite.com"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="business-url">Business Website</Label>
            <Input
              id="business-url"
              value={settings.businessUrl}
              onChange={(e) => updateSetting("businessUrl", e.target.value)}
              placeholder="https://yoursite.com"
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="default-currency">Default Currency</Label>
              <Select value={settings.defaultCurrency} onValueChange={(value) => updateSetting("defaultCurrency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
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
            
            <div>
              <Label htmlFor="dispute-time-limit">Dispute Time Limit (hours)</Label>
              <Input
                id="dispute-time-limit"
                type="number"
                min="24"
                max="168"
                value={settings.disputeTimeLimit}
                onChange={(e) => updateSetting("disputeTimeLimit", parseInt(e.target.value) || 72)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet & Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet & Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Payout Wallet */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Primary Payout Wallet</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payout-network">Network</Label>
                <Select value={settings.payoutNetwork} onValueChange={(value) => updateSetting("payoutNetwork", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {networkOptions.map((network) => (
                      <SelectItem key={network.value} value={network.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{network.label}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {network.fee}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="payout-wallet">Wallet Address</Label>
                <Input
                  id="payout-wallet"
                  value={settings.payoutWallet}
                  onChange={(e) => updateSetting("payoutWallet", e.target.value)}
                  placeholder="0x... or wallet address"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Backup Wallet */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Backup Payout Wallet (Optional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backup-network">Network</Label>
                <Select value={settings.backupNetwork} onValueChange={(value) => updateSetting("backupNetwork", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {networkOptions.map((network) => (
                      <SelectItem key={network.value} value={network.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{network.label}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {network.fee}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="backup-wallet">Wallet Address</Label>
                <Input
                  id="backup-wallet"
                  value={settings.backupWallet}
                  onChange={(e) => updateSetting("backupWallet", e.target.value)}
                  placeholder="0x... or wallet address"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Transaction Limits */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Transaction Limits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-amount">Minimum Transaction ($)</Label>
                <Input
                  id="min-amount"
                  type="number"
                  min="1"
                  value={settings.minTransactionAmount}
                  onChange={(e) => updateSetting("minTransactionAmount", parseInt(e.target.value) || 100)}
                />
              </div>
              
              <div>
                <Label htmlFor="max-amount">Maximum Transaction ($)</Label>
                <Input
                  id="max-amount"
                  type="number"
                  min="1000"
                  value={settings.maxTransactionAmount}
                  onChange={(e) => updateSetting("maxTransactionAmount", parseInt(e.target.value) || 100000)}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Auto-approval Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="auto-approval">Auto-approve Transactions</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically approve escrows below threshold
                </p>
              </div>
              <Switch
                id="auto-approval"
                checked={settings.autoApproval}
                onCheckedChange={(checked) => updateSetting("autoApproval", checked)}
              />
            </div>
            
            {settings.autoApproval && (
              <div>
                <Label htmlFor="auto-approval-limit">Auto-approval Limit ($)</Label>
                <Input
                  id="auto-approval-limit"
                  type="number"
                  min="100"
                  max="10000"
                  value={settings.autoApprovalLimit}
                  onChange={(e) => updateSetting("autoApprovalLimit", parseInt(e.target.value) || 1000)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Escrow status updates
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Critical alerts only
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value={settings.webhookUrl}
              onChange={(e) => updateSetting("webhookUrl", e.target.value)}
              placeholder="https://yoursite.com/webhook"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Receive real-time notifications about escrow events (JSON payload)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* API & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            API & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key Management */}
          <div className="space-y-3">
            <Label className="text-base font-medium">API Access</Label>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <code className="flex-1 text-sm font-mono">
                {showApiKey ? settings.apiKey : settings.apiKey.substring(0, 12) + "..."}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={copyApiKey}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={regenerateApiKey}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rate-limit">Rate Limit (per hour)</Label>
                <Input
                  id="rate-limit"
                  type="number"
                  min="100"
                  max="10000"
                  value={settings.rateLimitPerHour}
                  onChange={(e) => updateSetting("rateLimitPerHour", parseInt(e.target.value) || 1000)}
                />
              </div>
              
              <div>
                <Label htmlFor="allowed-origins">Allowed Origins</Label>
                <Input
                  id="allowed-origins"
                  value={settings.allowedOrigins.join(", ")}
                  onChange={(e) => updateSetting("allowedOrigins", e.target.value.split(", ").filter(Boolean))}
                  placeholder="https://yoursite.com"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Security Settings */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Protect your admin account</p>
              </div>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Setup 2FA
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable new escrow creation
                </p>
              </div>
              <Switch
                id="maintenance-mode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex-col py-4">
              <Globe className="h-5 w-5 mb-2" />
              <span className="text-sm">Test Webhook</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Shield className="h-5 w-5 mb-2" />
              <span className="text-sm">Security Audit</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <RefreshCw className="h-5 w-5 mb-2" />
              <span className="text-sm">Sync Wallets</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4">
              <Settings className="h-5 w-5 mb-2" />
              <span className="text-sm">Export Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} className="min-w-32">
          <Settings className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default EssentialSettings;
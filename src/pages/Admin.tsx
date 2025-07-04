import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import HelpTooltip from "@/components/admin/HelpTooltip";
import SaveBar from "@/components/admin/SaveBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Plus, 
  Trash2, 
  Key, 
  RefreshCw,
  Wallet,
  Globe,
  Palette,
  Settings,
  Shield,
  Webhook,
  User,
  Building
} from "lucide-react";

interface PartnerConfig {
  // Brand Identity
  name: string;
  logo: string;
  redirectUrl: string;
  cnameSubdomain: string;
  
  // Wallet Settings
  payoutWallet: string;
  payoutNetwork: string;
  commissionRate: number;
  
  // Business Information
  businessType: string;
  country: string;
  contactEmail: string;
  platformDescription: string;
  
  // Escrow Product Settings
  sellingItems: string[];
  defaultCurrency: string;
  defaultNetwork: string;
  
  // Branding & Appearance
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  buttonStyle: string;
  customCss: string;
  
  // Workflow Options
  milestonePayments: boolean;
  disputeResolution: boolean;
  customFields: string;
  webhookEndpoints: string[];
  apiKey: string;
}

const initialConfig: PartnerConfig = {
  name: "Flippa",
  logo: "/placeholder.svg",
  redirectUrl: "https://flippa.com",
  cnameSubdomain: "",
  payoutWallet: "",
  payoutNetwork: "Ethereum",
  commissionRate: 2.5,
  businessType: "Company",
  country: "United States",
  contactEmail: "",
  platformDescription: "",
  sellingItems: ["Domains", "Websites"],
  defaultCurrency: "USDC",
  defaultNetwork: "Ethereum",
  primaryColor: "#000000",
  secondaryColor: "#666666",
  accentColor: "#333333",
  fontFamily: "Inter",
  buttonStyle: "rounded",
  customCss: "",
  milestonePayments: true,
  disputeResolution: true,
  customFields: "{}",
  webhookEndpoints: [],
  apiKey: "sk_live_" + Math.random().toString(36).substring(2, 15)
};

const Admin = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<PartnerConfig>(initialConfig);
  const [originalConfig, setOriginalConfig] = useState<PartnerConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [newWebhook, setNewWebhook] = useState("");
  const [newSellingItem, setNewSellingItem] = useState("");

  const hasChanges = JSON.stringify(config) !== JSON.stringify(originalConfig);

  const sellingItemOptions = [
    "Domains", "Websites", "NFTs", "Invoices", "Digital Art", 
    "Services", "Ebooks/Content", "SaaS Licenses", "Consulting", "Physical Goods"
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOriginalConfig({ ...config });
    setIsSaving(false);
    toast({
      title: "Configuration Saved",
      description: "All changes have been saved successfully.",
    });
  };

  const updateConfig = (field: keyof PartnerConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const addWebhook = () => {
    if (newWebhook.trim()) {
      setConfig(prev => ({
        ...prev,
        webhookEndpoints: [...prev.webhookEndpoints, newWebhook.trim()]
      }));
      setNewWebhook("");
    }
  };

  const removeWebhook = (index: number) => {
    setConfig(prev => ({
      ...prev,
      webhookEndpoints: prev.webhookEndpoints.filter((_, i) => i !== index)
    }));
  };

  const addSellingItem = () => {
    if (newSellingItem.trim() && !config.sellingItems.includes(newSellingItem.trim())) {
      setConfig(prev => ({
        ...prev,
        sellingItems: [...prev.sellingItems, newSellingItem.trim()]
      }));
      setNewSellingItem("");
    }
  };

  const removeSellingItem = (item: string) => {
    setConfig(prev => ({
      ...prev,
      sellingItems: prev.sellingItems.filter(i => i !== item)
    }));
  };

  const regenerateApiKey = () => {
    const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15);
    updateConfig("apiKey", newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. Make sure to update your integrations.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader partnerName={config.name} partnerLogo={config.logo} />
      
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Partner Configuration
          </h1>
          <p className="text-muted-foreground">
            Manage your white-label escrow platform settings and branding
          </p>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="basic" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Building className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Basic Settings</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Wallet className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Payment & Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Palette className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 px-2 sm:px-3">
              <Settings className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 sm:space-y-6 mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Brand Identity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Brand Identity
                    <HelpTooltip content="Configure your platform's branding and identity settings" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="partner-name">Partner Name</Label>
                    <Input
                      id="partner-name"
                      value={config.name}
                      onChange={(e) => updateConfig("name", e.target.value)}
                      placeholder="Enter your platform name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="logo-url" className="flex items-center gap-2">
                      Logo URL
                      <HelpTooltip content="Direct URL to your logo image. Recommended size: 200x200px" />
                    </Label>
                    <Input
                      id="logo-url"
                      value={config.logo}
                      onChange={(e) => updateConfig("logo", e.target.value)}
                      placeholder="https://yoursite.com/logo.png"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="redirect-url" className="flex items-center gap-2">
                      Redirect URL
                      <HelpTooltip content="Where users are redirected after completing escrow transactions" />
                    </Label>
                    <Input
                      id="redirect-url"
                      value={config.redirectUrl}
                      onChange={(e) => updateConfig("redirectUrl", e.target.value)}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cname-subdomain" className="flex items-center gap-2">
                      CNAME Subdomain
                      <HelpTooltip content="Custom subdomain for your escrow pages (e.g., escrow.yoursite.com). Requires DNS CNAME setup." />
                    </Label>
                    <Input
                      id="cname-subdomain"
                      value={config.cnameSubdomain}
                      onChange={(e) => updateConfig("cnameSubdomain", e.target.value)}
                      placeholder="escrow.yoursite.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Business Information
                    <HelpTooltip content="Your business details for compliance and support" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select value={config.businessType} onValueChange={(value) => updateConfig("businessType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="DAO">DAO</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={config.country} onValueChange={(value) => updateConfig("country", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-email">Business Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={config.contactEmail}
                      onChange={(e) => updateConfig("contactEmail", e.target.value)}
                      placeholder="contact@yoursite.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="platform-description">About Your Platform</Label>
                    <Textarea
                      id="platform-description"
                      value={config.platformDescription}
                      onChange={(e) => updateConfig("platformDescription", e.target.value)}
                      placeholder="Brief description of your platform..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 sm:space-y-6 mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Wallet Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Payout Wallet Configuration
                    <HelpTooltip content="Configure where commission payments will be sent" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="payout-network" className="flex items-center gap-2">
                      Payout Network
                      <HelpTooltip content="Blockchain network for your payout wallet address" />
                    </Label>
                    <Select value={config.payoutNetwork} onValueChange={(value) => updateConfig("payoutNetwork", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ethereum">Ethereum</SelectItem>
                        <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                        <SelectItem value="Base">Base</SelectItem>
                        <SelectItem value="Polygon">Polygon</SelectItem>
                        <SelectItem value="BSC">BSC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="payout-wallet" className="flex items-center gap-2">
                      Payout Wallet Address
                      <HelpTooltip content="Wallet address where fees and commissions will be sent on the selected network" />
                    </Label>
                    <Input
                      id="payout-wallet"
                      value={config.payoutWallet}
                      onChange={(e) => updateConfig("payoutWallet", e.target.value)}
                      placeholder="0x..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Network: {config.payoutNetwork}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="commission-rate" className="flex items-center gap-2">
                      Commission Rate (%)
                      <HelpTooltip content="Percentage of transaction value charged as commission" />
                    </Label>
                    <Input
                      id="commission-rate"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={config.commissionRate}
                      onChange={(e) => updateConfig("commissionRate", parseFloat(e.target.value) || 0)}
                      placeholder="2.5"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Escrow Product Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Default Payment Settings
                    <HelpTooltip content="Configure default payment settings for escrow transactions" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="default-currency" className="text-sm font-medium">Default Currency</Label>
                      <Select value={config.defaultCurrency} onValueChange={(value) => updateConfig("defaultCurrency", value)}>
                        <SelectTrigger className="mt-2">
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
                      <Label htmlFor="default-network" className="text-sm font-medium">Default Network</Label>
                      <Select value={config.defaultNetwork} onValueChange={(value) => updateConfig("defaultNetwork", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ethereum">Ethereum</SelectItem>
                          <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                          <SelectItem value="Base">Base</SelectItem>
                          <SelectItem value="Solana">Solana</SelectItem>
                          <SelectItem value="Tron">Tron</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      What are you selling?
                      <HelpTooltip content="Select or add the types of items/services you facilitate escrow for" />
                    </Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newSellingItem}
                        onChange={(e) => setNewSellingItem(e.target.value)}
                        placeholder="Add custom item..."
                        onKeyPress={(e) => e.key === "Enter" && addSellingItem()}
                      />
                      <Button onClick={addSellingItem} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {config.sellingItems.map((item) => (
                        <Badge key={item} variant="secondary" className="flex items-center gap-1">
                          {item}
                          <button onClick={() => removeSellingItem(item)}>
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sellingItemOptions
                        .filter(item => !config.sellingItems.includes(item))
                        .map((item) => (
                          <Button
                            key={item}
                            variant="outline"
                            size="sm"
                            onClick={() => updateConfig("sellingItems", [...config.sellingItems, item])}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {item}
                          </Button>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4 sm:space-y-6 mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Branding & Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Colors & Typography
                    <HelpTooltip content="Customize the visual appearance of your escrow pages" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primary-color" className="text-sm font-medium">Primary Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => updateConfig("primaryColor", e.target.value)}
                          className="w-12 h-10 p-1 border rounded"
                        />
                        <Input
                          value={config.primaryColor}
                          onChange={(e) => updateConfig("primaryColor", e.target.value)}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="secondary-color" className="text-sm font-medium">Secondary</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          value={config.secondaryColor}
                          onChange={(e) => updateConfig("secondaryColor", e.target.value)}
                          className="w-12 h-10 p-1 border rounded"
                        />
                        <Input
                          value={config.secondaryColor}
                          onChange={(e) => updateConfig("secondaryColor", e.target.value)}
                          placeholder="#666666"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="accent-color" className="text-sm font-medium">Accent</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          value={config.accentColor}
                          onChange={(e) => updateConfig("accentColor", e.target.value)}
                          className="w-12 h-10 p-1 border rounded"
                        />
                        <Input
                          value={config.accentColor}
                          onChange={(e) => updateConfig("accentColor", e.target.value)}
                          placeholder="#333333"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="font-family" className="text-sm font-medium">Font Family</Label>
                      <Select value={config.fontFamily} onValueChange={(value) => updateConfig("fontFamily", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Helvetica">Helvetica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="button-style" className="text-sm font-medium">Button Style</Label>
                      <Select value={config.buttonStyle} onValueChange={(value) => updateConfig("buttonStyle", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rounded">Rounded</SelectItem>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="pill">Pill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="custom-css" className="flex items-center gap-2">
                      Custom CSS
                      <HelpTooltip content="Advanced styling - add custom CSS for additional customization" />
                    </Label>
                    <Textarea
                      id="custom-css"
                      value={config.customCss}
                      onChange={(e) => updateConfig("customCss", e.target.value)}
                      placeholder="/* Custom CSS rules... */"
                      className="font-mono text-sm"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Live Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Globe className="h-4 w-4 mr-2" />
                      Preview Page
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={config.logo} 
                        alt="Logo preview"
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <span className="font-semibold text-lg">{config.name}</span>
                    </div>
                    <div className="space-y-2">
                      <div 
                        className="h-6 rounded"
                        style={{ backgroundColor: config.primaryColor }}
                      />
                      <div 
                        className="h-4 rounded w-3/4"
                        style={{ backgroundColor: config.secondaryColor }}
                      />
                      <div 
                        className="h-4 rounded w-1/2"
                        style={{ backgroundColor: config.accentColor }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Color scheme preview
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 sm:space-y-6 mt-6">
            {/* Workflow Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Workflow Options
                  <HelpTooltip content="Configure advanced escrow workflow features" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Label htmlFor="milestone-payments" className="text-sm font-medium">Milestone Payments</Label>
                      <p className="text-sm text-muted-foreground mt-1">Enable step-by-step payment releases</p>
                    </div>
                    <Switch
                      id="milestone-payments"
                      checked={config.milestonePayments}
                      onCheckedChange={(checked) => updateConfig("milestonePayments", checked)}
                      className="flex-shrink-0"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Label htmlFor="dispute-resolution" className="text-sm font-medium">Dispute Resolution</Label>
                      <p className="text-sm text-muted-foreground mt-1">Enable dispute handling module</p>
                    </div>
                    <Switch
                      id="dispute-resolution"
                      checked={config.disputeResolution}
                      onCheckedChange={(checked) => updateConfig("disputeResolution", checked)}
                      className="flex-shrink-0"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="custom-fields" className="flex items-center gap-2">
                    Custom Fields for Escrow Deals
                    <HelpTooltip content="JSON configuration for additional form fields in escrow creation" />
                  </Label>
                  <Textarea
                    id="custom-fields"
                    value={config.customFields}
                    onChange={(e) => updateConfig("customFields", e.target.value)}
                    placeholder='{"field1": {"type": "text", "label": "Custom Field", "required": true}}'
                    className="font-mono text-sm"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="flex items-center gap-2">
                    Webhook Endpoints
                    <HelpTooltip content="URLs to receive real-time notifications about escrow events" />
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newWebhook}
                      onChange={(e) => setNewWebhook(e.target.value)}
                      placeholder="https://yoursite.com/webhook"
                      onKeyPress={(e) => e.key === "Enter" && addWebhook()}
                    />
                    <Button onClick={addWebhook} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {config.webhookEndpoints.map((webhook, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <Webhook className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 text-sm font-mono">{webhook}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeWebhook(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="flex items-center gap-2">
                    API Key Management
                    <HelpTooltip content="API key for programmatic access to escrow functions" />
                  </Label>
                  <div className="flex items-center gap-2 p-3 border rounded">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <code className="flex-1 text-sm font-mono">{config.apiKey}</code>
                    <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Audit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Audit
                  <HelpTooltip content="Security settings and configuration audit log" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Recent Configuration Changes</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Commission rate updated</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Webhook endpoint added</span>
                        <span className="text-muted-foreground">1 day ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Primary color changed</span>
                        <span className="text-muted-foreground">3 days ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline">
                      Partner Documentation
                    </Button>
                    <Button variant="outline">
                      Security Best Practices
                    </Button>
                    <Button variant="outline">
                      Onboarding Video
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <SaveBar 
        hasChanges={hasChanges}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Admin;
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Admin = () => {
  const { toast } = useToast();
  const [branding, setBranding] = useState({
    name: "Flippa",
    logo: "/placeholder.svg",
    primaryColor: "#000000",
    secondaryColor: "#333333",
    accentColor: "#666666",
    customCss: "",
    redirectUrl: "https://flippa.com",
  });

  const handleSave = () => {
    // In a real app, this would save to an API
    toast({
      title: "Partner Branding Updated",
      description: "The white-label configuration has been saved successfully.",
    });
  };

  const handleColorChange = (field: string, value: string) => {
    setBranding(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Partner Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage white-label branding and configuration for your escrow platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="partner-name">Partner Name</Label>
                  <Input
                    id="partner-name"
                    value={branding.name}
                    onChange={(e) => setBranding(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter partner name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    value={branding.logo}
                    onChange={(e) => setBranding(prev => ({ ...prev, logo: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div>
                  <Label htmlFor="redirect-url">Redirect URL</Label>
                  <Input
                    id="redirect-url"
                    value={branding.redirectUrl}
                    onChange={(e) => setBranding(prev => ({ ...prev, redirectUrl: e.target.value }))}
                    placeholder="https://yoursite.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={branding.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={branding.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={branding.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      placeholder="#333333"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={branding.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={branding.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      placeholder="#666666"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom CSS</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="custom-css">Additional Styling</Label>
                <Textarea
                  id="custom-css"
                  value={branding.customCss}
                  onChange={(e) => setBranding(prev => ({ ...prev, customCss: e.target.value }))}
                  placeholder="Enter custom CSS rules..."
                  className="min-h-[200px] font-mono text-sm"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-background">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={branding.logo} 
                      alt="Logo preview"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="font-semibold text-lg">{branding.name}</span>
                  </div>
                  <div 
                    className="h-8 rounded mb-2"
                    style={{ backgroundColor: branding.primaryColor }}
                  />
                  <div className="text-sm text-muted-foreground">
                    Primary color preview
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full" size="lg">
              Save Configuration
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
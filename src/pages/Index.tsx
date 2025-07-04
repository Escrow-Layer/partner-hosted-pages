import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Zap, 
  Globe, 
  ArrowRight, 
  Lock,
  CheckCircle,
  Users,
  BarChart3
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [escrowId, setEscrowId] = useState("");

  const handleEscrowAccess = () => {
    if (escrowId.trim()) {
      navigate(`/escrow/${escrowId.trim()}`);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Smart contract escrow with multi-signature protection and automatic release conditions."
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Lightning-fast transactions across multiple networks with real-time status updates."
    },
    {
      icon: Globe,
      title: "Multi-Chain Support",
      description: "Support for Ethereum, Arbitrum, Base, Polygon, and more blockchain networks."
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "End-to-end encryption, audit trails, and regulatory compliance built-in."
    }
  ];

  const stats = [
    { label: "Transactions Secured", value: "$2.5M+" },
    { label: "Active Partners", value: "150+" },
    { label: "Success Rate", value: "99.9%" },
    { label: "Networks Supported", value: "8+" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Trusted by 150+ Partners
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Secure Escrow
                <span className="text-muted-foreground block mt-2">
                  for Digital Assets
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The most trusted blockchain escrow platform for domain sales, digital assets, 
                and high-value transactions. Secure, fast, and transparent.
              </p>
            </div>

            {/* Access Existing Escrow */}
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Access Your Escrow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter escrow ID (e.g., esc_12345)"
                    value={escrowId}
                    onChange={(e) => setEscrowId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleEscrowAccess()}
                  />
                  <Button onClick={handleEscrowAccess} disabled={!escrowId.trim()}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Don't have an escrow ID? Your transaction partner will provide one.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/admin")}
                className="min-w-[160px]"
              >
                <Users className="h-5 w-5 mr-2" />
                Partner Portal
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/escrow/demo")}
                className="min-w-[160px]"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Escrow Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for the modern digital economy with enterprise-grade security and reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
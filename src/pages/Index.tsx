import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustIndicators from "@/components/TrustIndicators";
import { Shield, ArrowRight, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [escrowId, setEscrowId] = useState("");

  const handleEscrowLookup = () => {
    if (!escrowId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid escrow ID",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/escrow/${escrowId.trim()}`);
  };

  const handleCreateDemo = () => {
    navigate("/escrow/esc_demo_12345");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Secure Blockchain Escrow
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional escrow services powered by smart contracts. 
            Protect your high-value transactions with transparency and security.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Existing Escrow */}
          <Card className="relative group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Access Existing Escrow
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your escrow ID to view transaction details and make payments
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={escrowId}
                  onChange={(e) => setEscrowId(e.target.value)}
                  placeholder="Enter escrow ID (e.g., esc_12345)"
                  onKeyPress={(e) => e.key === "Enter" && handleEscrowLookup()}
                />
                <Button onClick={handleEscrowLookup} size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your escrow ID was provided when the transaction was created
              </p>
            </CardContent>
          </Card>

          {/* Demo Escrow */}
          <Card className="relative group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Try Demo Escrow
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Explore our platform with a sample domain purchase transaction
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleCreateDemo} className="w-full" size="lg">
                View Demo Transaction
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Experience our escrow process with a business.com domain purchase example
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Escrow?</h2>
          <TrustIndicators />
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Initiate Escrow</h3>
                <p className="text-sm text-muted-foreground">
                  Buyer and seller agree on terms and create escrow transaction
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Buyer deposits funds into blockchain-secured smart contract
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Complete Transfer</h3>
                <p className="text-sm text-muted-foreground">
                  Seller delivers asset, buyer confirms, funds are released
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const SUPPORTED_CHAINS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB" },
  { id: "base", name: "Base", symbol: "BASE" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "tron", name: "Tron", symbol: "TRX" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [selectedChain, setSelectedChain] = useState("");

  // Mock deal data - would come from API based on URL parameters
  const dealData = {
    id: "esc_12345",
    amount: "1.5",
    asset: "ETH", 
    description: "Domain transfer: crypto.flippa.com",
    buyer: "buyer@example.com",
    seller: "seller@example.com",
    customFields: [
      { label: "Domain", value: "crypto.flippa.com" },
      { label: "Registrar", value: "GoDaddy" },
    ]
  };

  const handleContinue = () => {
    if (selectedChain) {
      navigate(`/deposit?chain=${selectedChain}&escrow=${dealData.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-4 sm:py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Secure Escrow Transaction
          </h1>
          <p className="text-muted-foreground">
            Review the transaction details and select your preferred blockchain
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Deal Summary
              <Badge variant="secondary">#{dealData.id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-semibold">{dealData.amount} {dealData.asset}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Asset:</span>
                <p className="font-semibold">{dealData.asset}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Buyer:</span>
                <p className="font-mono text-xs">{dealData.buyer}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Seller:</span>
                <p className="font-mono text-xs">{dealData.seller}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-2">Description:</p>
              <p className="font-medium">{dealData.description}</p>
            </div>

            {dealData.customFields.length > 0 && (
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Additional Details:</p>
                <div className="space-y-1">
                  {dealData.customFields.map((field, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{field.label}:</span>
                      <span className="font-medium">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Blockchain</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your preferred blockchain" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_CHAINS.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex items-center gap-2">
                      <span>{chain.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {chain.symbol}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleContinue}
              disabled={!selectedChain}
              className="w-full"
              size="lg"
            >
              Continue to Deposit
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Landing;
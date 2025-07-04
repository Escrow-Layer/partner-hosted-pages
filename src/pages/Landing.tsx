import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import DynamicForm from "@/components/DynamicForm";
import { useEscrow } from "@/hooks/useEscrow";
import { usePartnerTheme } from "@/hooks/usePartnerTheme";
import { useToast } from "@/hooks/use-toast";

const SUPPORTED_CHAINS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB" },
  { id: "base", name: "Base", symbol: "BASE" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "tron", name: "Tron", symbol: "TRX" },
];

const Landing = () => {
  const navigate = useNavigate();
  const { escrowId } = useParams();
  const { toast } = useToast();
  const [selectedChain, setSelectedChain] = useState("");
  const [showCustomFields, setShowCustomFields] = useState(false);

  // Use the actual escrow ID from URL params or fallback to demo
  const actualEscrowId = escrowId || "esc_12345";
  const { escrowData, loading, error } = useEscrow(actualEscrowId);
  
  // Apply partner theming
  usePartnerTheme(escrowData?.partnerBranding);

  // Show error toast if there's an API error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleContinue = () => {
    if (!selectedChain) return;
    
    // Check if we need to collect custom fields first
    const requiredFields = escrowData?.customFields?.filter(field => field.required && !field.value);
    if (requiredFields && requiredFields.length > 0) {
      setShowCustomFields(true);
      return;
    }
    
    // Navigate to deposit page with new URL structure
    if (escrowId) {
      navigate(`/escrow/${escrowId}/deposit?chain=${selectedChain}`);
    } else {
      navigate(`/deposit?chain=${selectedChain}&escrow=${actualEscrowId}`);
    }
  };

  const handleCustomFieldsSubmit = (values: Record<string, string>) => {
    console.log("Custom fields submitted:", values);
    
    // In a real app, you'd update the escrow data via API
    toast({
      title: "Information Updated",
      description: "Your additional details have been saved.",
    });
    
    setShowCustomFields(false);
    
    // Navigate to deposit page
    if (escrowId) {
      navigate(`/escrow/${escrowId}/deposit?chain=${selectedChain}`);
    } else {
      navigate(`/deposit?chain=${selectedChain}&escrow=${actualEscrowId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
      <Header partnerBranding={escrowData?.partnerBranding} />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading escrow details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!escrowData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Escrow Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The escrow transaction you're looking for doesn't exist or has expired.
            </p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </main>
      </div>
    );
  }

  // Show custom fields form if needed
  if (showCustomFields) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Additional Information Required
            </h1>
            <p className="text-muted-foreground">
              Please provide the following details to continue with your escrow transaction
            </p>
          </div>
          
          <DynamicForm
            fields={escrowData.customFields.filter(field => field.required && !field.value)}
            onSubmit={handleCustomFieldsSubmit}
            onCancel={() => setShowCustomFields(false)}
            title="Required Information"
            description="These details are necessary to process your transaction"
            submitLabel={`Continue with ${selectedChain}`}
          />
        </main>
      </div>
    );
  }

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
              <Badge variant="secondary">#{escrowData.id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-semibold">{escrowData.amount} {escrowData.asset}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Asset:</span>
                <p className="font-semibold">{escrowData.asset}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Buyer:</span>
                <p className="font-mono text-xs">{escrowData.buyer}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Seller:</span>
                <p className="font-mono text-xs">{escrowData.seller}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-2">Description:</p>
              <p className="font-medium">{escrowData.description}</p>
            </div>

            {escrowData.customFields.length > 0 && (
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Transaction Details:</p>
                <div className="space-y-1">
                  {escrowData.customFields.map((field) => (
                    <div key={field.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {field.label}:
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </span>
                      <span className="font-medium">
                        {field.value || <span className="text-muted-foreground italic">Pending</span>}
                      </span>
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
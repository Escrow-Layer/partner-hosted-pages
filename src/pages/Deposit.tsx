import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import Header from "@/components/Header";

const Deposit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bridgeProgress, setBridgeProgress] = useState(0);
  const [depositAddress, setDepositAddress] = useState("");
  const [isBridging, setIsBridging] = useState(false);

  const chain = searchParams.get("chain");
  const escrowId = searchParams.get("escrow");

  // Mock deposit address generation
  useEffect(() => {
    const generateAddress = () => {
      switch (chain) {
        case "ethereum":
        case "arbitrum":
        case "base":
          return "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434";
        case "solana":
          return "9WNL1YN8tTTvDhYgvYmPKwQNe7X7FzB3CjjhB5gNb4E3";
        case "tron":
          return "TLsV52sRDL79HXGGm9yzwKiW6fP9BvNisr";
        default:
          return "";
      }
    };

    if (chain) {
      setDepositAddress(generateAddress());
    }
  }, [chain]);

  // Simulate bridging progress
  useEffect(() => {
    if (isBridging) {
      const interval = setInterval(() => {
        setBridgeProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            navigate(`/status?escrow=${escrowId}`);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isBridging, navigate, escrowId]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      toast({
        title: "Address Copied",
        description: "Deposit address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  const handleSwitchChain = () => {
    navigate(`/?escrow=${escrowId}`);
  };

  // Mock chain info
  const chainInfo = {
    ethereum: { name: "Ethereum", symbol: "ETH", estimatedFee: "$15-25" },
    arbitrum: { name: "Arbitrum", symbol: "ARB", estimatedFee: "$1-3" },
    base: { name: "Base", symbol: "BASE", estimatedFee: "$0.50-1" },
    solana: { name: "Solana", symbol: "SOL", estimatedFee: "$0.01-0.05" },
    tron: { name: "Tron", symbol: "TRX", estimatedFee: "$1-2" },
  }[chain as string] || { name: "Unknown", symbol: "?", estimatedFee: "Unknown" };

  // Simulate deposit detection after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBridging(true);
      toast({
        title: "Deposit Detected",
        description: "Your transaction has been detected and is being processed",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Send {chainInfo.symbol} Deposit
          </h1>
          <p className="text-muted-foreground">
            Send your deposit to the address below to continue the escrow
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Deposit Address
              <Badge variant="secondary">{chainInfo.name}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <QRCodeDisplay address={depositAddress} />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deposit Address:</span>
                <Button 
                  onClick={handleCopyAddress}
                  variant="outline" 
                  size="sm"
                >
                  Copy
                </Button>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm font-mono break-all">
                  {depositAddress}
                </code>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Network:</span>
                <p className="font-semibold">{chainInfo.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Est. Fee:</span>
                <p className="font-semibold">{chainInfo.estimatedFee}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isBridging && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Processing Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bridging Progress</span>
                  <span>{Math.round(bridgeProgress)}%</span>
                </div>
                <Progress value={bridgeProgress} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your transaction is being processed and verified on the blockchain.
                This may take a few minutes.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleSwitchChain}
            variant="outline"
            className="w-full"
          >
            Switch Chain
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Explorer link will appear once transaction is confirmed
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Deposit;
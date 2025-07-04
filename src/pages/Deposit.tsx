import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import Header from "@/components/Header";
import { useEscrow } from "@/hooks/useEscrow";
import { usePartnerTheme } from "@/hooks/usePartnerTheme";
import { getDepositAddress } from "@/lib/api-enhanced";

const Deposit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { escrowId: urlEscrowId } = useParams();
  const { toast } = useToast();
  const [bridgeProgress, setBridgeProgress] = useState(0);
  const [depositAddress, setDepositAddress] = useState("");
  const [isBridging, setIsBridging] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  const chain = searchParams.get("chain");
  const escrowId = urlEscrowId || searchParams.get("escrow");
  
  // Load escrow data and apply theming
  const { escrowData, loading, error } = useEscrow(escrowId);
  usePartnerTheme(escrowData?.partnerBranding);

  // Load deposit address from API
  useEffect(() => {
    const loadDepositAddress = async () => {
      if (!chain || !escrowId) return;
      
      setAddressLoading(true);
      try {
        const response = await getDepositAddress(escrowId, chain);
        if (response.error) {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive",
          });
        } else if (response.data) {
          setDepositAddress(response.data.address);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to generate deposit address",
          variant: "destructive",
        });
      } finally {
        setAddressLoading(false);
      }
    };

    loadDepositAddress();
  }, [chain, escrowId, toast]);

  // Simulate bridging progress
  useEffect(() => {
    if (isBridging) {
      const interval = setInterval(() => {
        setBridgeProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            if (urlEscrowId) {
              navigate(`/escrow/${urlEscrowId}/status`);
            } else {
              navigate(`/status?escrow=${escrowId}`);
            }
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
    if (urlEscrowId) {
      navigate(`/escrow/${urlEscrowId}`);
    } else {
      navigate(`/?escrow=${escrowId}`);
    }
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
      <Header partnerBranding={escrowData?.partnerBranding} />
      
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
            {addressLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : depositAddress ? (
              <>
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
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Failed to generate deposit address</p>
              </div>
            )}

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
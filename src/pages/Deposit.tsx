import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import Header from "@/components/Header";
import DealSummary from "@/components/DealSummary";
import StatusBar, { EscrowStep } from "@/components/StatusBar";
import HelpButton from "@/components/HelpButton";
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
  const [currentStep, setCurrentStep] = useState<EscrowStep>("waiting");

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

  // Simulate deposit detection and progression
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStep("detected");
      toast({
        title: "Deposit Detected",
        description: "Your transaction has been detected and is being processed",
      });
    }, 5000);

    const timer2 = setTimeout(() => {
      setCurrentStep("bridging");
      setIsBridging(true);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header partnerBranding={escrowData?.partnerBranding} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Primary Focus */}
          <div className="lg:col-span-3">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Send Your Payment
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Send your payment to complete the secure escrow transaction
          </p>
        </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Payment Address
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
                          <span className="text-sm font-medium">Send payment to:</span>
                          <Button 
                            onClick={handleCopyAddress}
                            variant="outline" 
                            size="sm"
                          >
                            Copy Address
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
                      <p className="text-muted-foreground">Failed to generate payment address</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-lg">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing Progress</span>
                        <span>{Math.round(bridgeProgress)}%</span>
                      </div>
                      <Progress value={bridgeProgress} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your payment is being processed. Please wait while we confirm the transaction.
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
                  Change Payment Network
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Transaction details will appear once payment is confirmed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Supporting Information */}
          <div className="lg:col-span-1 lg:border-l lg:border-border/50 lg:pl-6">
            <div className="bg-muted/20 rounded-lg p-4 space-y-4 lg:sticky lg:top-8">
              {escrowData && (
                <div className="opacity-70">
                  <DealSummary escrowData={escrowData} className="scale-90 origin-top" />
                </div>
              )}
              
              <div className="opacity-70">
                <StatusBar 
                  currentStep={currentStep} 
                  bridgeProgress={bridgeProgress}
                  className="scale-90 origin-top"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <HelpButton />
    </div>
  );
};

export default Deposit;
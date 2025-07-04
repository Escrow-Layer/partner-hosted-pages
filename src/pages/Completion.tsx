import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useEscrow } from "@/hooks/useEscrow";
import { usePartnerTheme } from "@/hooks/usePartnerTheme";

const Completion = () => {
  const [searchParams] = useSearchParams();
  const { escrowId: urlEscrowId } = useParams();
  const [countdown, setCountdown] = useState(10);
  
  const escrowId = urlEscrowId || searchParams.get("escrow");
  const status = searchParams.get("status");
  
  // Load escrow data and apply theming
  const { escrowData, loading, error } = useEscrow(escrowId);
  usePartnerTheme(escrowData?.partnerBranding);

  // No automatic redirect - removed as per client request

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-background">
      <Header partnerBranding={escrowData?.partnerBranding} />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="mb-4">
            {isSuccess ? (
              <div className="w-16 h-16 mx-auto bg-success rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto bg-destructive rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-destructive-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {isSuccess ? "Escrow Completed!" : "Escrow Failed"}
          </h1>
          <p className="text-muted-foreground">
            {isSuccess 
              ? "Your transaction has been successfully completed"
              : "There was an issue with your transaction"
            }
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Transaction Summary
              <Badge variant={isSuccess ? "default" : "destructive"} className="text-sm">
                {isSuccess ? "Success" : "Failed"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Escrow ID</span>
                <p className="font-mono text-sm bg-muted/50 px-2 py-1 rounded">{escrowId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Final Status</span>
                <p className="font-semibold">
                  {isSuccess ? "✅ Released" : "❌ Failed"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Completed</span>
                <p className="font-medium">
                  {new Date().toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wide">Processing Time</span>
                <p className="font-medium">~2 minutes</p>
              </div>
            </div>

            {isSuccess && (
              <>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    Blockchain Transaction Details
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Transaction Hash</p>
                        <code className="text-xs font-mono">0x742d35Cc6634C0532925a3b8D96BB44e39FcB434</code>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open("https://etherscan.io/tx/0x742d35Cc6634C0532925a3b8D96BB44e39FcB434", "_blank")}
                      >
                        View on Etherscan
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Network:</span>
                        <p className="font-medium">Ethereum Mainnet</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gas Used:</span>
                        <p className="font-medium">21,000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    Security & Trust Verification
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded">
                      <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-success-foreground" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.5 0l-1.5 1.5-1.5-1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5-1.5-1.5 1.5-1.5z"/>
                        </svg>
                      </div>
                      <span>Funds Secured</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded">
                      <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-success-foreground" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.5 0l-1.5 1.5-1.5-1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5-1.5-1.5 1.5-1.5z"/>
                        </svg>
                      </div>
                      <span>Identity Verified</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded">
                      <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-success-foreground" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.5 0l-1.5 1.5-1.5-1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5-1.5-1.5 1.5-1.5z"/>
                        </svg>
                      </div>
                      <span>Contract Verified</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => window.location.href = "/"}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  Start New Transaction
                </Button>
              </div>

              {isSuccess && (
                <div className="border-t pt-4 space-y-3">
                  <p className="text-sm font-medium">What's next?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="font-medium mb-1">📧 Confirmation Email</p>
                      <p className="text-muted-foreground">Transaction receipt sent to your email</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="font-medium mb-1">🔐 Download Receipt</p>
                      <button className="text-primary hover:underline text-xs">
                        PDF Receipt
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Completion;
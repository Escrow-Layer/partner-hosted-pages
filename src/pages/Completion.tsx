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

  // Get partner redirect URL from escrow data or fallback
  const partnerUrl = escrowData?.partnerBranding?.redirectUrl || escrowData?.redirectUrl || "https://flippa.com";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = partnerUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [partnerUrl]);

  const handleRedirectNow = () => {
    window.location.href = partnerUrl;
  };

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
              <Badge variant={isSuccess ? "default" : "destructive"}>
                {isSuccess ? "Success" : "Failed"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Escrow ID:</span>
                <p className="font-mono">{escrowId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-semibold">
                  {isSuccess ? "Released" : "Failed"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Completed:</span>
                <p className="font-medium">
                  {new Date().toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Processing Time:</span>
                <p className="font-medium">~2 minutes</p>
              </div>
            </div>

            {isSuccess && (
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Final Transaction Hash:
                </p>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                    0x742d35Cc6634C0532925a3b8D96BB44e39FcB434
                  </code>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open("https://etherscan.io/tx/0x742d35Cc6634C0532925a3b8D96BB44e39FcB434", "_blank")}
                  >
                    View
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Redirecting to partner site in {countdown} seconds...
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={handleRedirectNow}
                  className="w-full sm:w-auto"
                >
                  Return to {escrowData?.partnerBranding?.name || "Partner"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "/"}
                  className="w-full sm:w-auto"
                >
                  New Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Completion;
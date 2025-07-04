import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/Timeline";
import Header from "@/components/Header";

export type EscrowStatus = "initiated" | "funded" | "locked" | "released" | "refunded";

interface StatusUpdate {
  status: EscrowStatus;
  timestamp: string;
  txHash?: string;
  chainId?: string;
}

const Status = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState<EscrowStatus>("initiated");
  const [statusHistory, setStatusHistory] = useState<StatusUpdate[]>([]);

  const escrowId = searchParams.get("escrow");

  // Simulate status progression
  useEffect(() => {
    const progressStatuses: EscrowStatus[] = ["initiated", "funded", "locked", "released"];
    let currentIndex = 0;

    // Initial status
    setStatusHistory([{
      status: "initiated",
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    }]);

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < progressStatuses.length) {
        const newStatus = progressStatuses[currentIndex];
        setCurrentStatus(newStatus);
        
        setStatusHistory(prev => [...prev, {
          status: newStatus,
          timestamp: new Date().toISOString(),
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          chainId: "ethereum",
        }]);

        if (newStatus === "released") {
          setTimeout(() => {
            navigate(`/completion?escrow=${escrowId}&status=success`);
          }, 3000);
        }
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [navigate, escrowId]);

  const getStatusColor = (status: EscrowStatus) => {
    switch (status) {
      case "initiated": return "secondary";
      case "funded": return "secondary";
      case "locked": return "warning";
      case "released": return "success";
      case "refunded": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusDescription = (status: EscrowStatus) => {
    switch (status) {
      case "initiated": return "Escrow created and waiting for deposit";
      case "funded": return "Deposit received and confirmed";
      case "locked": return "Funds locked in escrow contract";
      case "released": return "Funds released to recipient";
      case "refunded": return "Funds refunded to sender";
      default: return "Unknown status";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Escrow Status
          </h1>
          <p className="text-muted-foreground">
            Track your transaction progress in real-time
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Status
              <Badge variant={getStatusColor(currentStatus) as any}>
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {getStatusDescription(currentStatus)}
            </p>
            {escrowId && (
              <p className="text-xs text-muted-foreground mt-2">
                Escrow ID: {escrowId}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Transaction Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline 
              statusHistory={statusHistory}
              currentStatus={currentStatus}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
          >
            Refresh Status
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Status updates automatically every 5 seconds
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Status;
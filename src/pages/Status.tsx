import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/Timeline";
import Header from "@/components/Header";
import MilestoneTracker from "@/components/MilestoneTracker";
import DealSummary from "@/components/DealSummary";
import StatusBar, { EscrowStep } from "@/components/StatusBar";
import HelpButton from "@/components/HelpButton";
import { useEscrow } from "@/hooks/useEscrow";
import { usePartnerTheme } from "@/hooks/usePartnerTheme";

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
  const { escrowId: urlEscrowId } = useParams();
  const [currentStatus, setCurrentStatus] = useState<EscrowStatus>("initiated");
  const [statusHistory, setStatusHistory] = useState<StatusUpdate[]>([]);
  const [currentStep, setCurrentStep] = useState<EscrowStep>("funded");

  const escrowId = urlEscrowId || searchParams.get("escrow");
  
  // Load escrow data and apply theming
  const { escrowData, loading, error } = useEscrow(escrowId);
  usePartnerTheme(escrowData?.partnerBranding);

  // Enhanced demo with realistic progression and auto-redirect
  useEffect(() => {
    const progressStatuses: EscrowStatus[] = ["initiated", "funded", "locked", "released"];
    let currentIndex = 0;

    // Initial status with more realistic timing
    setStatusHistory([{
      status: "initiated",
      timestamp: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
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
      } else {
        clearInterval(interval);
        // Auto-redirect to completion page after transaction is released
        setTimeout(() => {
          if (urlEscrowId) {
            navigate(`/escrow/${urlEscrowId}/completion?status=success`);
          } else {
            navigate(`/completion?escrow=${escrowId}&status=success`);
          }
        }, 2000); // Wait 2 seconds after completion before redirecting
      }
    }, 3000); // Faster progression - 3 seconds per step

    return () => clearInterval(interval);
  }, [escrowId, urlEscrowId, navigate]);

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
      <Header partnerBranding={escrowData?.partnerBranding} />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-4 mb-8">
          {escrowData && (
            <DealSummary escrowData={escrowData} />
          )}
          
          <StatusBar currentStep={currentStep} />
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Escrow Status
            </h1>
            <p className="text-muted-foreground">
              Track your transaction progress in real-time
            </p>
          </div>
        </div>

        <Card className="mb-6 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentStatus === "released" && (
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {currentStatus === "locked" && (
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-5 h-5 text-warning-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                Current Status
              </div>
              <Badge variant={getStatusColor(currentStatus) as any} className="text-sm">
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {getStatusDescription(currentStatus)}
            </p>
            {currentStatus === "released" && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-3">
                <p className="text-sm text-success font-medium">
                  🎉 Transaction completed successfully! Redirecting to results...
                </p>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Escrow ID: {escrowId}</span>
              <span>Processing time: ~{Math.floor((Date.now() - new Date(statusHistory[0]?.timestamp || Date.now()).getTime()) / 60000)}m</span>
            </div>
          </CardContent>
        </Card>

        {escrowData?.milestones ? (
          <MilestoneTracker 
            milestones={escrowData.milestones}
            currentMilestone={escrowData.milestones.find(m => m.status === 'in_progress')?.id}
          />
        ) : (
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
        )}

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
            disabled={currentStatus === "released"}
          >
            {currentStatus === "released" ? "Redirecting..." : "Refresh Status"}
          </Button>
          
          {currentStatus === "released" && (
            <Button
              onClick={() => {
                if (urlEscrowId) {
                  navigate(`/escrow/${urlEscrowId}/completion?status=success`);
                } else {
                  navigate(`/completion?escrow=${escrowId}&status=success`);
                }
              }}
              className="w-full"
            >
              View Results Now
            </Button>
          )}
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {currentStatus === "released" 
                ? "Automatically redirecting to results page..." 
                : "Status updates automatically every 3 seconds"
              }
            </p>
          </div>
        </div>
      </main>
      
      <HelpButton />
    </div>
  );
};

export default Status;
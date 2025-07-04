import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";

export type EscrowStep = "waiting" | "detected" | "bridging" | "funded" | "completed";

interface StatusBarProps {
  currentStep: EscrowStep;
  bridgeProgress?: number;
  className?: string;
}

const StatusBar = ({ currentStep, bridgeProgress = 0, className = "" }: StatusBarProps) => {
  const steps = [
    {
      id: "waiting" as const,
      label: "Waiting for deposit",
      description: "Send your payment to the deposit address",
      icon: Clock,
      status: currentStep === "waiting" ? "current" : currentStep === "detected" || currentStep === "bridging" || currentStep === "funded" || currentStep === "completed" ? "completed" : "pending"
    },
    {
      id: "detected" as const,
      label: "Deposit detected",
      description: "Confirming transaction on blockchain",
      icon: AlertCircle,
      status: currentStep === "detected" ? "current" : currentStep === "bridging" || currentStep === "funded" || currentStep === "completed" ? "completed" : "pending"
    },
    {
      id: "bridging" as const,
      label: "Bridging funds",
      description: "Transferring to secure escrow wallet",
      icon: Loader2,
      status: currentStep === "bridging" ? "current" : currentStep === "funded" || currentStep === "completed" ? "completed" : "pending"
    },
    {
      id: "funded" as const,
      label: "Escrow funded",
      description: "Funds secured in escrow contract",
      icon: CheckCircle,
      status: currentStep === "funded" ? "current" : currentStep === "completed" ? "completed" : "pending"
    }
  ];

  const getStepIcon = (step: typeof steps[0]) => {
    const Icon = step.icon;
    
    if (step.status === "completed") {
      return <CheckCircle className="w-4 h-4 text-success" />;
    }
    
    if (step.status === "current") {
      if (step.id === "bridging") {
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      }
      return <Icon className="w-4 h-4 text-primary animate-pulse" />;
    }
    
    return <Icon className="w-4 h-4 text-muted-foreground" />;
  };

  const getStepBadge = (step: typeof steps[0]) => {
    if (step.status === "completed") {
      return <Badge variant="default" className="text-xs bg-success text-success-foreground">Done</Badge>;
    }
    
    if (step.status === "current") {
      return <Badge variant="outline" className="text-xs animate-pulse">Active</Badge>;
    }
    
    return null;
  };

  return (
    <Card className={`bg-muted/30 border-muted ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getStepIcon(step)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-medium ${
                    step.status === "completed" ? "text-success" : 
                    step.status === "current" ? "text-primary" : 
                    "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                  {getStepBadge(step)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
                
                {step.id === "bridging" && currentStep === "bridging" && bridgeProgress > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{Math.round(bridgeProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${bridgeProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusBar;
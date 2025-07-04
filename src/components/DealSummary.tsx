import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { EscrowData } from "@/lib/api-enhanced";

interface DealSummaryProps {
  escrowData: EscrowData;
  className?: string;
}

const DealSummary = ({ escrowData, className = "" }: DealSummaryProps) => {
  return (
    <Card className={`border border-border bg-card/50 backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        {/* Header with Security Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Secure Escrow</span>
          </div>
          {escrowData.partnerBranding?.logo && (
            <img 
              src={escrowData.partnerBranding.logo} 
              alt="Partner" 
              className="h-5 w-auto opacity-80"
            />
          )}
        </div>
        
        {/* Main Transaction Info */}
        <div className="text-center space-y-2 mb-4">
          <div className="text-2xl font-bold text-foreground">
            {Number(escrowData.amount).toLocaleString()} {escrowData.asset}
          </div>
          <div className="text-sm text-muted-foreground">
            {escrowData.description || "Premium Domain Purchase"}
          </div>
        </div>

        {/* Transaction ID */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs font-mono">
            ID: {escrowData.id || "esc_12345"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealSummary;
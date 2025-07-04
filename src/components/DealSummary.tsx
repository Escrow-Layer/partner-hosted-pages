import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EscrowData } from "@/lib/api-enhanced";

interface DealSummaryProps {
  escrowData: EscrowData;
  className?: string;
}

const DealSummary = ({ escrowData, className = "" }: DealSummaryProps) => {
  const maskAddress = (address: string) => {
    if (!address) return "Unknown";
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Card className={`border-2 border-primary/20 bg-card sticky top-4 z-10 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <Badge variant="outline" className="text-xs font-mono">
              #{escrowData.id || "12345"}
            </Badge>
          </div>
          {escrowData.partnerBranding?.logo && (
            <img 
              src={escrowData.partnerBranding.logo} 
              alt="Partner" 
              className="h-6 w-auto"
            />
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="sm:col-span-1">
            <div className="text-2xl font-bold text-primary mb-1">
              {Number(escrowData.amount).toLocaleString()} {escrowData.asset}
            </div>
            <div className="text-xs text-muted-foreground">
              {escrowData.description || "Premium Domain"}
            </div>
          </div>
          
          <div className="sm:col-span-2 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground font-medium">Buyer</div>
              <div className="font-mono text-xs">{maskAddress(escrowData.buyer)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Seller</div>
              <div className="font-mono text-xs">{maskAddress(escrowData.seller)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealSummary;
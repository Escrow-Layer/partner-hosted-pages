import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, CheckCircle } from "lucide-react";
import { EscrowData } from "@/lib/api-enhanced";

interface DomainPurchaseSummaryProps {
  escrowData: EscrowData;
}

const DomainPurchaseSummary = ({ escrowData }: DomainPurchaseSummaryProps) => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/80">
      <CardContent className="p-6 text-center space-y-6">
        {/* Domain Name - Hero */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            business.com
          </h1>
          <p className="text-muted-foreground">Premium Domain Purchase</p>
        </div>

        {/* Price - Prominent */}
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
          <div className="text-3xl font-bold text-primary mb-1">
            {Number(escrowData.amount).toLocaleString()} {escrowData.asset}
          </div>
          <div className="text-sm text-muted-foreground">
            Secured with blockchain escrow
          </div>
        </div>

        {/* What Happens Next */}
        <div className="text-left space-y-3">
          <h3 className="font-semibold text-center mb-4">What happens next:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div className="text-sm">
                <div className="font-medium">Choose your payment network</div>
                <div className="text-muted-foreground">Select the blockchain for your payment</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">2</span>
              </div>
              <div className="text-sm">
                <div className="font-medium">Send payment to secure address</div>
                <div className="text-muted-foreground">Funds are held safely in escrow</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">3</span>
              </div>
              <div className="text-sm">
                <div className="font-medium">Domain transfer completed</div>
                <div className="text-muted-foreground">Receive ownership of business.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <Shield className="w-5 h-5 text-success mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Secure</div>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Fast</div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Verified</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainPurchaseSummary;
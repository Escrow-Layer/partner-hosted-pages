import { Shield, CheckCircle, Users, Clock } from "lucide-react";

const TrustIndicators = () => {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="font-semibold text-base sm:text-lg mb-2">Why Choose EscrowLayer?</h3>
        <p className="text-sm text-muted-foreground">Trusted by thousands of businesses worldwide</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted/70 hover:scale-[1.02]">
          <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base">Blockchain Secured</p>
            <p className="text-xs text-muted-foreground">Smart contract escrow</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted/70 hover:scale-[1.02]">
          <div className="p-2 bg-success/10 rounded-full flex-shrink-0">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base">Verified Secure</p>
            <p className="text-xs text-muted-foreground">SSL & audit certified</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted/70 hover:scale-[1.02]">
          <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base">10,000+ Transactions</p>
            <p className="text-xs text-muted-foreground">Trusted by businesses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted/70 hover:scale-[1.02]">
          <div className="p-2 bg-warning/10 rounded-full flex-shrink-0">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base">24/7 Support</p>
            <p className="text-xs text-muted-foreground">Expert assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
import { Shield, CheckCircle, Users, Clock } from "lucide-react";

const TrustIndicators = () => {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center space-y-2">
          <div className="p-3 bg-muted/30 rounded-full w-fit mx-auto">
            <Shield className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">Blockchain</p>
            <p className="font-semibold text-sm">Secured</p>
            <p className="text-xs text-muted-foreground mt-1">Smart contract</p>
            <p className="text-xs text-muted-foreground">escrow</p>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="p-3 bg-muted/30 rounded-full w-fit mx-auto">
            <CheckCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">Verified</p>
            <p className="font-semibold text-sm">Secure</p>
            <p className="text-xs text-muted-foreground mt-1">SSL & audit</p>
            <p className="text-xs text-muted-foreground">certified</p>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="p-3 bg-muted/30 rounded-full w-fit mx-auto">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">10,000+</p>
            <p className="font-semibold text-sm">Transactions</p>
            <p className="text-xs text-muted-foreground mt-1">Trusted by</p>
            <p className="text-xs text-muted-foreground">businesses</p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="p-3 bg-muted/30 rounded-full w-fit mx-auto">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">24/7</p>
            <p className="font-semibold text-sm">Support</p>
            <p className="text-xs text-muted-foreground mt-1">Expert</p>
            <p className="text-xs text-muted-foreground">assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
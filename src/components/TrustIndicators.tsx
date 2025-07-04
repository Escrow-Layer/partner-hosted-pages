import { Shield, CheckCircle, Users, Clock } from "lucide-react";

const TrustIndicators = () => {
  return (
    <div className="mt-8">
      <div className="bg-muted/20 rounded-lg p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-background border rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Smart Contract</p>
              <p className="font-semibold text-sm">Escrow</p>
              <p className="text-xs text-muted-foreground mt-1">Automated security</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-background border rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">SSL Encrypted</p>
              <p className="font-semibold text-sm">Connection</p>
              <p className="text-xs text-muted-foreground mt-1">Bank-grade security</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-background border rounded-full flex items-center justify-center mx-auto">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Professional</p>
              <p className="font-semibold text-sm">Service</p>
              <p className="text-xs text-muted-foreground mt-1">Business focused</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-background border rounded-full flex items-center justify-center mx-auto">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Support</p>
              <p className="font-semibold text-sm">Available</p>
              <p className="text-xs text-muted-foreground mt-1">When you need it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
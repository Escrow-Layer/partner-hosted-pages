import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EscrowData } from "@/lib/api-enhanced";

interface TransactionDetailsProps {
  escrowData: EscrowData;
}

const TransactionDetails = ({ escrowData }: TransactionDetailsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Premium domain acquisition: business.com
          </h1>
          <Badge variant="outline" className="text-sm">#12345</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Transaction Value - Main Focus */}
        <div className="bg-accent/30 p-8 rounded-lg border border-accent/50">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
              {Number(escrowData.amount).toLocaleString()} {escrowData.asset}
            </div>
            <div className="text-muted-foreground">Transaction Value</div>
          </div>
        </div>
        
        {/* Buyer and Seller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Buyer:</span>
            <p className="font-medium break-all">{escrowData.buyer}</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Seller:</span>
            <p className="font-medium break-all">{escrowData.seller}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Payment Method:</span>
            <p className="font-medium">{escrowData.asset} (Stablecoin)</p>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Asset Type:</span>
            <p className="font-medium">Premium Domain</p>
          </div>
        </div>

        {/* Essential Details */}
        <div className="border-t pt-6">
          <p className="text-sm font-medium text-muted-foreground mb-4">Essential Details:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Escrow ID:</span>
              <span className="font-medium">#12345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Domain Name:</span>
              <span className="font-medium">business.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transfer Authorization:</span>
              <span className="font-medium text-success">Verified</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionDetails;
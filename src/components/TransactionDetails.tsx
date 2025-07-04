import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EscrowData } from "@/lib/api-enhanced";

interface TransactionDetailsProps {
  escrowData: EscrowData;
}

const TransactionDetails = ({ escrowData }: TransactionDetailsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Premium domain acquisition: business.com
            </h2>
            <Badge variant="outline" className="w-fit">#{escrowData.id}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Highlighted Transaction Value */}
        <div className="bg-accent/30 p-6 rounded-lg border border-accent/50">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              {Number(escrowData.amount).toLocaleString()} {escrowData.asset}
            </div>
            <div className="text-sm text-muted-foreground">Transaction Value</div>
          </div>
        </div>
        
        {/* Buyer and Seller Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Buyer:</span>
              <p className="font-medium text-sm break-all">{escrowData.buyer}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Payment Method:</span>
              <p className="font-medium text-sm">{escrowData.asset} (Stablecoin)</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Seller:</span>
              <p className="font-medium text-sm break-all">{escrowData.seller}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Asset Type:</span>
              <p className="font-medium text-sm">Premium Domain</p>
            </div>
          </div>
        </div>

        {/* Essential Details */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-muted-foreground mb-3">Essential Details:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Escrow ID:</span>
                <span className="font-medium">#{escrowData.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Domain Name:</span>
                <span className="font-medium">business.com</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transfer Authorization:</span>
                <span className="font-medium text-success">Verified</span>
              </div>
              {escrowData.customFields.filter(field => field.required && field.value).length > 0 && (
                escrowData.customFields.filter(field => field.required && field.value).map((field) => (
                  <div key={field.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{field.label}:</span>
                    <span className="font-medium">{field.value}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionDetails;
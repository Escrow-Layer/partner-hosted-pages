import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EscrowData } from "@/lib/api-enhanced";

interface TransactionDetailsProps {
  escrowData: EscrowData;
}

const TransactionDetails = ({ escrowData }: TransactionDetailsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {escrowData.description}
          <Badge variant="secondary">#{escrowData.id}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Number(escrowData.amount).toLocaleString()} {escrowData.asset}
              </div>
              <div className="text-sm text-muted-foreground">Transaction Value</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Buyer:</span>
                <p className="font-medium break-all">{escrowData.buyer}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Payment Method:</span>
                <p className="font-medium">{escrowData.asset} (Stablecoin)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Seller:</span>
                <p className="font-medium break-all">{escrowData.seller}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Asset Type:</span>
                <p className="font-medium">Premium Domain</p>
              </div>
            </div>
          </div>
        </div>

        {/* Show only essential custom fields */}
        {escrowData.customFields.filter(field => field.required).length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2">Essential Details:</p>
            <div className="space-y-1">
              {escrowData.customFields.filter(field => field.required).map((field) => (
                <div key={field.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {field.label}:
                  </span>
                  <span className="font-medium">
                    {field.value || <span className="text-muted-foreground italic">Pending</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionDetails;
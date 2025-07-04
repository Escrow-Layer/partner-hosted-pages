import { CheckCircle, Circle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EscrowMilestone } from "@/lib/api-enhanced";

interface MilestoneTrackerProps {
  milestones: EscrowMilestone[];
  currentMilestone?: string;
}

const MilestoneTracker = ({ milestones, currentMilestone }: MilestoneTrackerProps) => {
  const getStatusIcon = (status: EscrowMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: EscrowMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">In Progress</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${
                milestone.id === currentMilestone
                  ? 'bg-accent/50 border border-accent'
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex flex-col items-center">
                {getStatusIcon(milestone.status)}
                {index < milestones.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{milestone.title}</h4>
                  {getStatusBadge(milestone.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {milestone.description}
                </p>
                
                {milestone.timestamp && (
                  <p className="text-xs text-muted-foreground">
                    {milestone.status === 'completed' ? 'Completed' : 'Updated'}: {' '}
                    {new Date(milestone.timestamp).toLocaleString()}
                  </p>
                )}
                
                {milestone.txHash && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {milestone.txHash.slice(0, 10)}...{milestone.txHash.slice(-8)}
                    </code>
                  </div>
                )}
                
                {milestone.metadata && Object.keys(milestone.metadata).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(milestone.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
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

export default MilestoneTracker;
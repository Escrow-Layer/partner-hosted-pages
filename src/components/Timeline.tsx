import { EscrowStatus } from "@/pages/Status";
import { Badge } from "@/components/ui/badge";

interface StatusUpdate {
  status: EscrowStatus;
  timestamp: string;
  txHash?: string;
  chainId?: string;
}

interface TimelineProps {
  statusHistory: StatusUpdate[];
  currentStatus: EscrowStatus;
}

const Timeline = ({ statusHistory, currentStatus }: TimelineProps) => {
  const allStatuses: EscrowStatus[] = ["initiated", "funded", "locked", "released"];
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getStatusIndex = (status: EscrowStatus) => {
    return allStatuses.indexOf(status);
  };

  const isCompleted = (status: EscrowStatus) => {
    const completed = statusHistory.find(s => s.status === status);
    return !!completed;
  };

  const isCurrent = (status: EscrowStatus) => {
    return status === currentStatus;
  };

  const getStatusUpdate = (status: EscrowStatus) => {
    return statusHistory.find(s => s.status === status);
  };

  return (
    <div className="space-y-6">
      {allStatuses.map((status, index) => {
        const completed = isCompleted(status);
        const current = isCurrent(status);
        const statusUpdate = getStatusUpdate(status);
        const isLast = index === allStatuses.length - 1;

        return (
          <div key={status} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div 
                className={`absolute left-4 top-8 w-0.5 h-16 ${
                  completed ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
            
            {/* Timeline dot */}
            <div className="flex items-start gap-4">
              <div 
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  completed 
                    ? 'bg-primary border-primary' 
                    : current
                    ? 'bg-background border-primary animate-pulse'
                    : 'bg-muted border-muted-foreground'
                }`}
              >
                {completed && (
                  <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium capitalize">
                    {status.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  {current && (
                    <Badge variant="outline" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                
                {statusUpdate && (
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      {formatDate(statusUpdate.timestamp)} at {formatTime(statusUpdate.timestamp)}
                    </p>
                    
                    {statusUpdate.txHash && (
                      <div className="flex items-center gap-2">
                        <span>Transaction:</span>
                        <code className="bg-muted px-1 rounded text-xs">
                          {statusUpdate.txHash.slice(0, 10)}...{statusUpdate.txHash.slice(-8)}
                        </code>
                        <button 
                          className="text-primary hover:underline text-xs"
                          onClick={() => window.open(`https://etherscan.io/tx/${statusUpdate.txHash}`, '_blank')}
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {!completed && !current && (
                  <p className="text-sm text-muted-foreground">
                    Pending
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
}

const ProgressIndicator = ({ steps, currentStep, completedSteps }: ProgressIndicatorProps) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const isUpcoming = !isCompleted && !isCurrent;

        return (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30",
                    isCurrent && "animate-pulse"
                  )}
                >
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4
                className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-success",
                  isCurrent && "text-primary",
                  isUpcoming && "text-muted-foreground"
                )}
              >
                {step.title}
              </h4>
              <p
                className={cn(
                  "text-xs mt-1",
                  isCompleted && "text-success/80",
                  isCurrent && "text-muted-foreground",
                  isUpcoming && "text-muted-foreground/60"
                )}
              >
                {step.description}
              </p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="absolute left-2 ml-0.5 mt-8 w-px h-6 bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
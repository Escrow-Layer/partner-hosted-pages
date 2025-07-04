import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldValidationProps {
  isValid?: boolean;
  error?: string;
  success?: string;
  className?: string;
}

const FieldValidation = ({ 
  isValid, 
  error, 
  success, 
  className 
}: FieldValidationProps) => {
  if (!error && !success) return null;

  return (
    <div className={cn("flex items-center gap-2 text-sm mt-1", className)}>
      {error && (
        <>
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-destructive">{error}</span>
        </>
      )}
      {success && isValid && (
        <>
          <CheckCircle className="h-4 w-4 text-success" />
          <span className="text-success">{success}</span>
        </>
      )}
    </div>
  );
};

export default FieldValidation;
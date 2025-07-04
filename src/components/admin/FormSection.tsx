import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import HelpTooltip from "./HelpTooltip";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  helpText?: string;
}

const FormSection = ({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  helpText 
}: FormSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
          {helpText && <HelpTooltip content={helpText} />}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
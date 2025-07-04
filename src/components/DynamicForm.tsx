import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomField } from "@/lib/api-enhanced";

interface DynamicFormProps {
  fields: CustomField[];
  onSubmit: (values: Record<string, string>) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  submitLabel?: string;
  isLoading?: boolean;
}

const DynamicForm = ({
  fields,
  onSubmit,
  onCancel,
  title = "Additional Information",
  description = "Please provide the following details to continue",
  submitLabel = "Continue",
  isLoading = false,
}: DynamicFormProps) => {
  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.id]: field.value || '',
    }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: CustomField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    if (value && field.validation) {
      const regex = new RegExp(field.validation);
      if (!regex.test(value)) {
        return `${field.label} format is invalid`;
      }
    }

    if (value && field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (value && field.type === 'url') {
      try {
        new URL(value);
      } catch {
        return 'Please enter a valid URL';
      }
    }

    return null;
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const error = validateField(field, values[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
  };

  const getInputType = (fieldType: CustomField['type']) => {
    switch (fieldType) {
      case 'email': return 'email';
      case 'url': return 'url';
      case 'number': return 'number';
      case 'date': return 'date';
      default: return 'text';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={field.id}
                type={getInputType(field.type)}
                value={values[field.id]}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className={errors[field.id] ? 'border-destructive' : ''}
                disabled={isLoading}
              />
              {errors[field.id] && (
                <p className="text-sm text-destructive">{errors[field.id]}</p>
              )}
            </div>
          ))}
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Processing...' : submitLabel}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;
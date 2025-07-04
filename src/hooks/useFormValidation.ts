import { useState, useCallback } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((field: string, value: any): string | null => {
    const rule = rules[field];
    if (!rule) return null;

    if (rule.required && (!value || value.toString().trim() === "")) {
      return "This field is required";
    }

    if (value && rule.minLength && value.toString().length < rule.minLength) {
      return `Minimum ${rule.minLength} characters required`;
    }

    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      return `Maximum ${rule.maxLength} characters allowed`;
    }

    if (value && rule.pattern && !rule.pattern.test(value.toString())) {
      return "Invalid format";
    }

    if (value && rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const validateForm = useCallback((formData: Record<string, any>): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearFieldError,
    setFieldError,
    hasErrors: Object.keys(errors).length > 0
  };
};

// Common validation rules
export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
      }
      return null;
    }
  },
  url: {
    pattern: /^https?:\/\/.+/,
    custom: (value: string) => {
      if (value && !/^https?:\/\/.+/.test(value)) {
        return "Please enter a valid URL starting with http:// or https://";
      }
      return null;
    }
  },
  walletAddress: {
    pattern: /^0x[a-fA-F0-9]{40}$/,
    custom: (value: string) => {
      if (value && !/^0x[a-fA-F0-9]{40}$/.test(value)) {
        return "Please enter a valid wallet address";
      }
      return null;
    }
  },
  percentage: {
    custom: (value: number) => {
      if (value !== undefined && (value < 0 || value > 100)) {
        return "Percentage must be between 0 and 100";
      }
      return null;
    }
  }
};
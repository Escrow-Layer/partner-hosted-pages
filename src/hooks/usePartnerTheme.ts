import { useEffect, useState } from "react";
import { PartnerBranding } from "@/lib/api-enhanced";

export const usePartnerTheme = (partnerBranding?: PartnerBranding) => {
  const [isThemeApplied, setIsThemeApplied] = useState(false);

  useEffect(() => {
    if (!partnerBranding) return;

    // Apply partner theme to CSS custom properties
    const root = document.documentElement;
    
    // Convert hex colors to HSL for CSS variables
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply partner colors
    root.style.setProperty('--brand-primary', hexToHsl(partnerBranding.primaryColor));
    root.style.setProperty('--brand-secondary', hexToHsl(partnerBranding.secondaryColor));
    root.style.setProperty('--brand-accent', hexToHsl(partnerBranding.accentColor));
    
    // Update primary color to match partner branding
    root.style.setProperty('--primary', hexToHsl(partnerBranding.primaryColor));
    
    // Apply custom CSS if provided
    if (partnerBranding.customCss) {
      const styleId = 'partner-custom-styles';
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = partnerBranding.customCss;
    }

    setIsThemeApplied(true);

    // Cleanup function to reset theme
    return () => {
      root.style.removeProperty('--brand-primary');
      root.style.removeProperty('--brand-secondary');
      root.style.removeProperty('--brand-accent');
      root.style.removeProperty('--primary');
      
      const styleElement = document.getElementById('partner-custom-styles');
      if (styleElement) {
        styleElement.remove();
      }
      
      setIsThemeApplied(false);
    };
  }, [partnerBranding]);

  return { isThemeApplied };
};
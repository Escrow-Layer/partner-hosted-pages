import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { PartnerBranding } from "@/lib/api-enhanced";

interface HeaderProps {
  partnerBranding?: PartnerBranding;
}

const Header = ({ partnerBranding }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Use provided partner branding or fallback to default
  const partnerData = partnerBranding || {
    name: "Flippa",
    logo: "/placeholder.svg",
    primaryColor: "#000000",
    secondaryColor: "#333333",
    accentColor: "#666666",
    redirectUrl: "https://flippa.com",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={partnerData.logo} 
              alt={`${partnerData.name} logo`}
              className="h-8 w-8 object-contain"
            />
            <span className="font-semibold text-lg">{partnerData.name}</span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 p-0"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          )}
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Help
          </Button>
          <Button variant="outline" size="sm">
            Support
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mock partner data - would be loaded from API based on subdomain/URL
  const partnerData = {
    name: "Flippa",
    logo: "/placeholder.svg", // Would be dynamic URL from API
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
          <div className="hidden sm:block h-6 w-px bg-border" />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="font-semibold text-sm">EscrowLayer</span>
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
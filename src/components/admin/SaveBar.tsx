import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaveBarProps {
  hasChanges: boolean;
  onSave: () => void;
  isSaving?: boolean;
}

const SaveBar = ({ hasChanges, onSave, isSaving = false }: SaveBarProps) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && showSaved) {
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, showSaved]);

  const handleSave = () => {
    onSave();
    setShowSaved(true);
  };

  if (!hasChanges && !showSaved) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 transition-transform duration-300",
      hasChanges || showSaved ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {showSaved ? "Changes saved successfully" : "You have unsaved changes"}
          </div>
          <div className="flex items-center gap-2">
            {showSaved ? (
              <Button disabled className="min-w-[100px]">
                <Check className="mr-2 h-4 w-4" />
                Saved
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={isSaving} className="min-w-[100px]">
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveBar;
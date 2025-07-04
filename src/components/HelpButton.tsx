import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, MessageCircle, Mail, X } from "lucide-react";

const HelpButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <Card className="mb-4 w-64 shadow-lg border-2 animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Need Help?</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => window.open("mailto:support@escrowlayer.com")}
              >
                <Mail className="h-3 w-3 mr-2" />
                Email Support
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => {
                  // In a real app, this would open a chat widget
                  alert("Chat support coming soon!");
                }}
              >
                <MessageCircle className="h-3 w-3 mr-2" />
                Live Chat
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              We're here to help with your escrow transaction.
            </p>
          </CardContent>
        </Card>
      )}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        size="sm"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HelpButton;
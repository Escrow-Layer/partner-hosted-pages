import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicForm from "@/components/DynamicForm";
import EscrowHeader from "@/components/EscrowHeader";
import TransactionDetails from "@/components/TransactionDetails";
import ChainSelector from "@/components/ChainSelector";
import TrustIndicators from "@/components/TrustIndicators";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useEscrow } from "@/hooks/useEscrow";
import { usePartnerTheme } from "@/hooks/usePartnerTheme";
import { useToast } from "@/hooks/use-toast";


const Landing = () => {
  const navigate = useNavigate();
  const { escrowId } = useParams();
  const { toast } = useToast();
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use the actual escrow ID from URL params or fallback to demo
  const actualEscrowId = escrowId || "esc_12345";
  const { escrowData, loading, error } = useEscrow(actualEscrowId);
  
  // Apply partner theming
  usePartnerTheme(escrowData?.partnerBranding);

  // Show error toast if there's an API error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleContinue = () => {
    if (!selectedChain) return;
    
    // Check if we need to collect custom fields first
    const requiredFields = escrowData?.customFields?.filter(field => field.required && !field.value);
    if (requiredFields && requiredFields.length > 0) {
      setShowCustomFields(true);
      return;
    }
    
    // Show confirmation dialog before proceeding
    setShowConfirmation(true);
  };

  const handleConfirmProceed = () => {
    // Navigate to deposit page with new URL structure
    if (escrowId) {
      navigate(`/escrow/${escrowId}/deposit?chain=${selectedChain}`);
    } else {
      navigate(`/deposit?chain=${selectedChain}&escrow=${actualEscrowId}`);
    }
  };

  const handleCustomFieldsSubmit = (values: Record<string, string>) => {
    console.log("Custom fields submitted:", values);
    
    // In a real app, you'd update the escrow data via API
    toast({
      title: "Information Updated",
      description: "Your additional details have been saved.",
    });
    
    setShowCustomFields(false);
    
    // Navigate to deposit page
    if (escrowId) {
      navigate(`/escrow/${escrowId}/deposit?chain=${selectedChain}`);
    } else {
      navigate(`/deposit?chain=${selectedChain}&escrow=${actualEscrowId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header partnerBranding={escrowData?.partnerBranding} />
        <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading escrow details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!escrowData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Escrow Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The escrow transaction you're looking for doesn't exist or has expired.
            </p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show custom fields form if needed
  if (showCustomFields) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header partnerBranding={escrowData?.partnerBranding} />
        <main className="container mx-auto px-4 py-8 max-w-2xl flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Additional Information Required
            </h1>
            <p className="text-muted-foreground">
              Please provide the following details to continue with your escrow transaction
            </p>
          </div>
          
          <DynamicForm
            fields={escrowData.customFields.filter(field => field.required && !field.value)}
            onSubmit={handleCustomFieldsSubmit}
            onCancel={() => setShowCustomFields(false)}
            title="Required Information"
            description="These details are necessary to process your transaction"
            submitLabel={`Continue with ${selectedChain}`}
          />
        </main>
        <Footer partnerBranding={escrowData?.partnerBranding} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header partnerBranding={escrowData?.partnerBranding} />
      
      <main className="container mx-auto px-4 py-4 sm:py-8 max-w-2xl">
        <EscrowHeader 
          title="Secure Premium Domain Escrow"
          description="Complete your business.com acquisition with blockchain-secured escrow"
        />

        <TransactionDetails escrowData={escrowData} />

        <ChainSelector 
          selectedChain={selectedChain}
          onChainChange={setSelectedChain}
          onContinue={handleContinue}
        />
        
        <TrustIndicators />
      </main>
      
      <Footer partnerBranding={escrowData?.partnerBranding} />
      
      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        title="Proceed to Payment"
        description={`You've selected ${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} network for your escrow payment. This action will generate a unique deposit address for your transaction.`}
        confirmText="Generate Deposit Address"
        onConfirm={handleConfirmProceed}
      />
    </div>
  );
};

export default Landing;
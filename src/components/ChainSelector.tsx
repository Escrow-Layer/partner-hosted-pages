import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SUPPORTED_CHAINS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB" },
  { id: "base", name: "Base", symbol: "BASE" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "tron", name: "Tron", symbol: "TRX" },
];

interface ChainSelectorProps {
  selectedChain: string;
  onChainChange: (chain: string) => void;
  onContinue: () => void;
}

const DEFAULT_CHAIN = "ethereum";

const ChainSelector = ({ selectedChain, onChainChange, onContinue }: ChainSelectorProps) => {
  // Set default chain if none selected
  React.useEffect(() => {
    if (!selectedChain) {
      onChainChange(DEFAULT_CHAIN);
    }
  }, [selectedChain, onChainChange]);
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          Choose Payment Network
        </CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Select your preferred blockchain network for secure USDC payment. 
          <span className="block mt-1 text-xs">
            💡 <strong>Recommended:</strong> Ethereum for maximum security, Base/Arbitrum for lower fees
          </span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        <Select value={selectedChain} onValueChange={onChainChange}>
          <SelectTrigger className="h-12 text-left">
            <SelectValue placeholder="Choose your preferred payment network" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_CHAINS.map((chain) => (
              <SelectItem key={chain.id} value={chain.id} className="p-3">
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-mono">{chain.symbol.slice(0, 2)}</span>
                    </div>
                    <span className="font-medium">{chain.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {chain.symbol}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-3">
          <Button 
            onClick={onContinue}
            disabled={!selectedChain}
            className="w-full font-semibold"
            size="lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Continue to Secure Payment
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Your transaction is protected by smart contract escrow
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChainSelector;
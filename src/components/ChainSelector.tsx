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

const ChainSelector = ({ selectedChain, onChainChange, onContinue }: ChainSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Payment Network</CardTitle>
        <p className="text-sm text-muted-foreground">
          Select the blockchain network for your USDC payment. Lower fees = faster transaction.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select value={selectedChain} onValueChange={onChainChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose your preferred payment network" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_CHAINS.map((chain) => (
              <SelectItem key={chain.id} value={chain.id}>
                <div className="flex items-center gap-2">
                  <span>{chain.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {chain.symbol}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={onContinue}
          disabled={!selectedChain}
          className="w-full"
          size="lg"
        >
          Continue to Secure Payment
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChainSelector;
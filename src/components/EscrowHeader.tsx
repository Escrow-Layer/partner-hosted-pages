import { Badge } from "@/components/ui/badge";

interface EscrowHeaderProps {
  title: string;
  description: string;
}

const EscrowHeader = ({ title, description }: EscrowHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-sm">
        <div className="bg-success/10 text-success px-3 py-1 rounded-full">
          ✓ Blockchain Secured
        </div>
        <div className="bg-success/10 text-success px-3 py-1 rounded-full">
          ✓ Instant Verification
        </div>
        <div className="bg-success/10 text-success px-3 py-1 rounded-full">
          ✓ Protected Transfer
        </div>
      </div>
    </div>
  );
};

export default EscrowHeader;
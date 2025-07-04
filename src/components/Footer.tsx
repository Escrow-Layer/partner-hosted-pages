import { PartnerBranding } from "@/lib/api-enhanced";

interface FooterProps {
  partnerBranding?: PartnerBranding;
}

const Footer = ({ partnerBranding }: FooterProps) => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Powered by</span>
            <span className="font-semibold text-primary">EscrowLayer</span>
            <span>•</span>
            <span>Secure blockchain escrow platform</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
          <p>
            © 2024 EscrowLayer. All transactions are secured by blockchain technology.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            Your funds are protected by smart contract escrow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// Simulated API functions for escrow operations

export interface EscrowData {
  id: string;
  amount: string;
  asset: string;
  description: string;
  buyer: string;
  seller: string;
  status: "initiated" | "funded" | "locked" | "released" | "refunded";
  chainId?: string;
  txHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepositAddress {
  address: string;
  chainId: string;
  qrCodeUrl: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock escrow status endpoint
export const getEscrowStatus = async (escrowId: string): Promise<EscrowData> => {
  await delay(500); // Simulate network delay
  
  return {
    id: escrowId,
    amount: "1.5",
    asset: "ETH",
    description: "Domain transfer: crypto.flippa.com",
    buyer: "buyer@example.com",
    seller: "seller@example.com",
    status: "initiated",
    createdAt: new Date(Date.now() - 300000).toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Mock deposit address generation
export const getDepositAddress = async (
  escrowId: string, 
  chainId: string
): Promise<DepositAddress> => {
  await delay(300);
  
  const mockAddresses: Record<string, string> = {
    ethereum: "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434",
    arbitrum: "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434",
    base: "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434",
    solana: "9WNL1YN8tTTvDhYgvYmPKwQNe7X7FzB3CjjhB5gNb4E3",
    tron: "TLsV52sRDL79HXGGm9yzwKiW6fP9BvNisr",
  };

  const address = mockAddresses[chainId] || "";
  
  return {
    address,
    chainId,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`,
  };
};

// Mock escrow resolution
export const resolveEscrow = async (
  escrowId: string, 
  action: "release" | "refund"
): Promise<{ success: boolean; txHash?: string }> => {
  await delay(1000);
  
  return {
    success: true,
    txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
  };
};

// Mock partner branding
export const getPartnerBranding = async (partnerId: string) => {
  await delay(200);
  
  const mockBranding = {
    flippa: {
      name: "Flippa",
      logo: "/placeholder.svg",
      primaryColor: "#000000",
      redirectUrl: "https://flippa.com",
    },
    opensea: {
      name: "OpenSea",
      logo: "/placeholder.svg", 
      primaryColor: "#2081e2",
      redirectUrl: "https://opensea.io",
    },
  };

  return mockBranding[partnerId as keyof typeof mockBranding] || mockBranding.flippa;
};

// Mock polling for deposit detection
export const pollDepositStatus = async (escrowId: string) => {
  await delay(1500);
  
  // Simulate random deposit detection
  return Math.random() > 0.7; // 30% chance of deposit being detected
};
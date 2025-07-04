// Enhanced API layer with webhook notifications and improved error handling

export interface CustomField {
  id: string;
  label: string;
  value: string;
  type: "text" | "email" | "url" | "number" | "date";
  required?: boolean;
  validation?: string;
}

export interface EscrowData {
  id: string;
  amount: string;
  asset: string;
  description: string;
  buyer: string;
  seller: string;
  status: "initiated" | "funded" | "locked" | "released" | "refunded" | "disputed";
  chainId?: string;
  txHash?: string;
  depositAddress?: string;
  createdAt: string;
  updatedAt: string;
  customFields: CustomField[];
  milestones: EscrowMilestone[];
  partnerId: string;
  partnerBranding: PartnerBranding;
  webhookUrl?: string;
  redirectUrl?: string;
}

export interface EscrowMilestone {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  timestamp?: string;
  txHash?: string;
  metadata?: Record<string, any>;
}

export interface PartnerBranding {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customCss?: string;
  redirectUrl: string;
}

export interface DepositAddress {
  address: string;
  chainId: string;
  qrCodeUrl: string;
  estimatedFee: string;
  networkName: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

// Simulate API delay with variable timing
const delay = (ms: number = Math.random() * 500 + 200) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced error handling
class ApiError extends Error {
  constructor(public statusCode: number, message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

// Mock escrow data with enhanced features
const mockEscrowData: Record<string, EscrowData> = {
  'esc_12345': {
    id: 'esc_12345',
    amount: '100000',
    asset: 'USDC',
    description: 'Premium domain acquisition: business.com',
    buyer: 'enterprises@techcorp.com',
    seller: 'domains@premiumventures.com',
    status: 'initiated',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    updatedAt: new Date().toISOString(),
    partnerId: 'flippa',
    customFields: [
      { id: 'domain', label: 'Domain Name', value: 'business.com', type: 'text', required: true },
      { id: 'registrar', label: 'Current Registrar', value: 'Namecheap', type: 'text' },
      { id: 'transfer_code', label: 'EPP Transfer Code', value: 'EPP-BIZ-789456', type: 'text', required: true },
      { id: 'valuation', label: 'Domain Valuation', value: '$120,000 USD', type: 'text' },
      { id: 'traffic', label: 'Monthly Traffic', value: '50,000+ unique visitors', type: 'text' },
    ],
    milestones: [
      {
        id: 'init',
        title: 'Escrow Initiated',
        description: 'Premium domain escrow initiated and awaiting payment',
        status: 'completed',
        timestamp: new Date(Date.now() - 300000).toISOString(),
      },
      {
        id: 'deposit',
        title: 'Deposit Received',
        description: 'USDC payment received and verified on blockchain',
        status: 'pending',
      },
      {
        id: 'verification',
        title: 'Asset Verification',
        description: 'Verifying domain ownership, DNS records, and transfer authorization',
        status: 'pending',
      },
      {
        id: 'release',
        title: 'Funds Released',
        description: 'Domain transferred successfully and funds released to seller',
        status: 'pending',
      },
    ],
    partnerBranding: {
      name: 'Flippa',
      logo: '/placeholder.svg',
      primaryColor: '#000000',
      secondaryColor: '#333333',
      accentColor: '#666666',
      redirectUrl: 'https://flippa.com',
    },
    webhookUrl: 'https://flippa.com/webhooks/escrow',
    redirectUrl: 'https://flippa.com/deals/business-domain',
  },
};

// Enhanced escrow status endpoint
export const getEscrowStatus = async (escrowId: string): Promise<ApiResponse<EscrowData>> => {
  await delay();
  
  try {
    const escrowData = mockEscrowData[escrowId];
    
    if (!escrowData) {
      throw new ApiError(404, 'Escrow not found', { escrowId });
    }

    return {
      data: escrowData,
      statusCode: 200,
      message: 'Escrow data retrieved successfully',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
        statusCode: error.statusCode,
      };
    }
    
    return {
      error: 'Internal server error',
      statusCode: 500,
    };
  }
};

// Enhanced deposit address generation with dynamic chain support
export const getDepositAddress = async (
  escrowId: string, 
  chainId: string
): Promise<ApiResponse<DepositAddress>> => {
  await delay();
  
  try {
    const chainConfigs: Record<string, { address: string; networkName: string; estimatedFee: string }> = {
      ethereum: { 
        address: "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434", 
        networkName: "Ethereum Mainnet",
        estimatedFee: "$15-25"
      },
      arbitrum: { 
        address: "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434", 
        networkName: "Arbitrum One",
        estimatedFee: "$1-3"
      },
      base: { 
        address: "0x742d35Cc6634C0532925a3b8D96BB44e39FcB434", 
        networkName: "Base",
        estimatedFee: "$0.50-1"
      },
      solana: { 
        address: "9WNL1YN8tTTvDhYgvYmPKwQNe7X7FzB3CjjhB5gNb4E3", 
        networkName: "Solana Mainnet",
        estimatedFee: "$0.01-0.05"
      },
      tron: { 
        address: "TLsV52sRDL79HXGGm9yzwKiW6fP9BvNisr", 
        networkName: "Tron Mainnet",
        estimatedFee: "$1-2"
      },
    };

    const config = chainConfigs[chainId];
    if (!config) {
      throw new ApiError(400, 'Unsupported chain ID', { chainId });
    }

    const depositAddress: DepositAddress = {
      address: config.address,
      chainId,
      networkName: config.networkName,
      estimatedFee: config.estimatedFee,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(config.address)}`,
    };

    return {
      data: depositAddress,
      statusCode: 200,
      message: 'Deposit address generated successfully',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
        statusCode: error.statusCode,
      };
    }
    
    return {
      error: 'Failed to generate deposit address',
      statusCode: 500,
    };
  }
};

// Enhanced polling with webhook simulation
export const pollDepositStatus = async (escrowId: string): Promise<ApiResponse<boolean>> => {
  await delay(1500);
  
  try {
    // Simulate deposit detection with higher probability over time
    const hasDeposit = Math.random() > 0.6;
    
    if (hasDeposit) {
      // Simulate webhook notification
      await sendWebhookNotification(escrowId, 'deposit_detected');
    }
    
    return {
      data: hasDeposit,
      statusCode: 200,
      message: hasDeposit ? 'Deposit detected' : 'No deposit detected',
    };
  } catch (error) {
    return {
      error: 'Failed to poll deposit status',
      statusCode: 500,
    };
  }
};

// Webhook notification system
export const sendWebhookNotification = async (
  escrowId: string, 
  event: string, 
  data?: any
): Promise<void> => {
  await delay(100);
  
  const escrowData = mockEscrowData[escrowId];
  if (!escrowData?.webhookUrl) return;

  // Simulate webhook call
  console.log(`Webhook notification sent to ${escrowData.webhookUrl}:`, {
    escrowId,
    event,
    timestamp: new Date().toISOString(),
    data,
  });
};

// Enhanced escrow resolution
export const resolveEscrow = async (
  escrowId: string, 
  action: "release" | "refund",
  reason?: string
): Promise<ApiResponse<{ txHash: string }>> => {
  await delay(1000);
  
  try {
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    // Update mock data
    if (mockEscrowData[escrowId]) {
      mockEscrowData[escrowId].status = action === 'release' ? 'released' : 'refunded';
      mockEscrowData[escrowId].txHash = txHash;
      mockEscrowData[escrowId].updatedAt = new Date().toISOString();
    }
    
    // Send webhook notification
    await sendWebhookNotification(escrowId, `escrow_${action}`, { txHash, reason });
    
    return {
      data: { txHash },
      statusCode: 200,
      message: `Escrow ${action} completed successfully`,
    };
  } catch (error) {
    return {
      error: `Failed to ${action} escrow`,
      statusCode: 500,
    };
  }
};

// Update escrow milestones
export const updateMilestone = async (
  escrowId: string,
  milestoneId: string,
  status: EscrowMilestone['status'],
  metadata?: Record<string, any>
): Promise<ApiResponse<EscrowMilestone>> => {
  await delay();
  
  try {
    const escrowData = mockEscrowData[escrowId];
    if (!escrowData) {
      throw new ApiError(404, 'Escrow not found');
    }

    const milestone = escrowData.milestones.find(m => m.id === milestoneId);
    if (!milestone) {
      throw new ApiError(404, 'Milestone not found');
    }

    milestone.status = status;
    milestone.metadata = { ...milestone.metadata, ...metadata };
    if (status === 'completed') {
      milestone.timestamp = new Date().toISOString();
    }

    // Send webhook notification
    await sendWebhookNotification(escrowId, 'milestone_updated', { milestoneId, status });

    return {
      data: milestone,
      statusCode: 200,
      message: 'Milestone updated successfully',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
        statusCode: error.statusCode,
      };
    }
    
    return {
      error: 'Failed to update milestone',
      statusCode: 500,
    };
  }
};
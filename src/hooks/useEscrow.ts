import { useState, useEffect, useCallback } from "react";
import { getEscrowStatus, pollDepositStatus, EscrowData, ApiResponse } from "@/lib/api-enhanced";

export const useEscrow = (escrowId: string | null) => {
  const [escrowData, setEscrowData] = useState<EscrowData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEscrowData = useCallback(async () => {
    if (!escrowId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getEscrowStatus(escrowId);
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setEscrowData(response.data);
      }
    } catch (err) {
      setError("Failed to fetch escrow data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [escrowId]);

  // Poll for deposit status updates
  const startPolling = useCallback(() => {
    if (!escrowId) return;

    const interval = setInterval(async () => {
      try {
        const response = await pollDepositStatus(escrowId);
        if (response.data && escrowData?.status === "initiated") {
          setEscrowData(prev => prev ? { ...prev, status: "funded" } : null);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [escrowId, escrowData?.status]);

  useEffect(() => {
    fetchEscrowData();
  }, [fetchEscrowData]);

  return {
    escrowData,
    loading,
    error,
    refetch: fetchEscrowData,
    startPolling,
  };
};
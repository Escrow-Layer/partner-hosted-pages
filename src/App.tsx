import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import Landing from "./pages/Landing";
import Deposit from "./pages/Deposit";
import Status from "./pages/Status";
import Completion from "./pages/Completion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/escrow/:escrowId" element={<Landing />} />
              <Route path="/escrow/:escrowId/deposit" element={<Deposit />} />
              <Route path="/escrow/:escrowId/status" element={<Status />} />
              <Route path="/escrow/:escrowId/completion" element={<Completion />} />
              {/* Legacy routes for backward compatibility */}
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/status" element={<Status />} />
              <Route path="/completion" element={<Completion />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

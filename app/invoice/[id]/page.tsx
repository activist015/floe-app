"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as Id<"invoices">;
  
  const invoice = useQuery(api.invoices.getById, { invoiceId });
  const processPayment = useAction(api.payments.processPayment);
  
  const [walletAddress, setWalletAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  if (!invoice) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (invoice.status === "paid") {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-4">This invoice has been paid.</p>
          {invoice.paymentHash && (
            <p className="text-xs text-gray-500 font-mono break-all">
              TX: {invoice.paymentHash}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (invoice.status === "cancelled") {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Invoice Cancelled</h2>
          <p className="text-gray-400">This invoice has been cancelled.</p>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!walletAddress) {
      setError("Please enter your wallet address");
      return;
    }

    // Basic wallet address validation
    if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
      setError("Please enter a valid Ethereum wallet address");
      return;
    }

    setError("");
    setIsProcessing(true);
    
    try {
      const result = await processPayment({
        invoiceId,
        walletAddress,
        amount: invoice.amount,
      });

      if (result.success) {
        // Show success and reload
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute w-4 h-4 top-0 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45"></div>
            <div className="absolute w-3 h-3 top-1.5 left-5 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-400 to-blue-600 transform -rotate-45"></div>
            <div className="absolute w-3 h-3 top-4 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-600 to-blue-800 transform -rotate-45"></div>
            <div className="absolute w-5 h-5 top-5 left-4 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45 opacity-85"></div>
          </div>
          <span className="text-xl font-semibold text-white">Floe</span>
        </div>
      </div>

      {/* Payment Card */}
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm mb-2">You're paying</p>
            <p className="text-white font-medium mb-1">{invoice.clientName}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-5xl font-bold text-white">${invoice.amount.toLocaleString()}</h1>
              <span className="text-gray-400">USD</span>
            </div>
            <p className="text-sm text-gray-400">Invoice {invoice.invoiceNumber}</p>
          </div>

          <div className="border-t border-white/10 pt-6 mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
            <p className="text-white">{invoice.description}</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-300 font-medium text-sm mb-1">Demo Mode</p>
                <p className="text-blue-200 text-xs">This is a simulated payment for MVP demo. Real Circle USDC integration coming next!</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Payment Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network</span>
              <span className="text-white font-medium">Base</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Currency</span>
              <span className="text-white font-medium">USDC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Transaction Fee</span>
              <span className="text-white font-medium">~$0.01</span>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-white font-medium">Total</span>
                <span className="text-white font-bold text-lg">{invoice.amount} USDC</span>
              </div>
            </div>
          </div>

          {/* Wallet Address Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              disabled={isProcessing}
            />
            <p className="text-xs text-gray-400 mt-2">
              Enter your wallet address to simulate payment
            </p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || !walletAddress}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pay {invoice.amount} USDC (Demo)
              </>
            )}
          </button>
        </div>

        {/* Security Info */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secured by blockchain technology
          </div>
        </div>
      </div>
    </div>
  );
}
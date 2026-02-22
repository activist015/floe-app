"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { parseUnits } from "viem";
import { USDC_ADDRESS_BASE, USDC_ABI } from "@/lib/usdc";

export default function PaymentPage() {
  const params = useParams();
  const invoiceId = params.id as Id<"invoices">;
  
  const invoice = useQuery(api.invoices.getById, { invoiceId });
  const seller = useQuery(
    api.users.getProfile,
    invoice ? { userId: invoice.userId } : "skip"
  );
  const processPayment = useAction(api.payments.processPayment);
  
  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending: isWriting } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "exchange">("wallet");
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
            <a 
              href={`https://basescan.org/tx/${invoice.paymentHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 font-mono break-all"
            >
              View on BaseScan →
            </a>
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

  // Handle successful wallet transaction
  if (isSuccess && hash && !isProcessing && paymentMethod === "wallet") {
    setIsProcessing(true);
    processPayment({
      invoiceId,
      walletAddress: address!,
      amount: invoice.amount,
      transactionHash: hash,
    }).then(() => {
      window.location.reload();
    }).catch((err) => {
      setError(err.message);
      setIsProcessing(false);
    });
  }

  const handleWalletPayment = async () => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!seller?.walletAddress) {
      setError("Seller has not configured their wallet address");
      return;
    }

    setError("");

    try {
      const amountInUSDC = parseUnits(invoice.amount.toString(), 6);

      writeContract({
        address: USDC_ADDRESS_BASE,
        abi: USDC_ABI,
        functionName: "transfer",
        args: [seller.walletAddress as `0x${string}`, amountInUSDC],
      });
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute w-4 h-4 top-0 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45"></div>
              <div className="absolute w-3 h-3 top-1.5 left-5 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-400 to-blue-600 transform -rotate-45"></div>
              <div className="absolute w-3 h-3 top-4 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-600 to-blue-800 transform -rotate-45"></div>
              <div className="absolute w-5 h-5 top-5 left-4 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45 opacity-85"></div>
            </div>
            <span className="text-xl font-semibold text-white">Floe</span>
          </div>
          
          {paymentMethod === "wallet" && <ConnectButton />}
        </div>
      </div>

      {/* Payment Card */}
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-8 mb-6">
          {/* Amount Display */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm mb-2">You're paying</p>
            <p className="text-white font-medium mb-1">{invoice.clientName}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl font-light text-gray-400">$</span>
              <h1 className="text-6xl font-bold text-white">{invoice.amount.toLocaleString()}</h1>
            </div>
            <p className="text-sm text-blue-400 bg-blue-500/10 inline-block px-3 py-1 rounded-full">
              Invoice {invoice.invoiceNumber}
            </p>
          </div>

          <div className="border-t border-white/10 pt-6 mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
            <p className="text-white">{invoice.description}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Payment Method Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setPaymentMethod("wallet")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  paymentMethod === "wallet"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Pay via Wallet
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod("exchange")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  paymentMethod === "exchange"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Send from Exchange
                </div>
              </button>
            </div>

            {/* Wallet Payment */}
            {paymentMethod === "wallet" && (
              <div className="space-y-4">
                {!isConnected && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-blue-300 font-medium text-sm mb-1">Connect Your Wallet</p>
                        <p className="text-blue-200 text-xs">
                          Click "Connect Wallet" above to pay with MetaMask, Coinbase Wallet, or other Web3 wallets
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network</span>
                    <span className="text-white font-medium">Base</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Currency</span>
                    <span className="text-white font-medium">USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network Fee</span>
                    <span className="text-white font-medium">~$0.01</span>
                  </div>
                </div>

                <button
                  onClick={handleWalletPayment}
                  disabled={!isConnected || isWriting || isConfirming || isProcessing}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isWriting || isConfirming || isProcessing ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      {isWriting && "Confirm in Wallet..."}
                      {isConfirming && "Processing..."}
                      {isProcessing && "Finalizing..."}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pay {invoice.amount} USDC
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Exchange Payment */}
            {paymentMethod === "exchange" && seller?.walletAddress && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 font-medium text-sm mb-3">Send USDC from your exchange:</p>
                  <ol className="text-blue-200 text-sm space-y-2 list-decimal list-inside">
                    <li>Open Coinbase, Binance, or your exchange</li>
                    <li>Go to "Send" or "Withdraw"</li>
                    <li>Select <strong>USDC on Base network</strong></li>
                    <li>Copy the address below</li>
                    <li>Send exactly <strong>{invoice.amount} USDC</strong></li>
                  </ol>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payment Address (Base Network)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={seller.walletAddress}
                      readOnly
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(seller.walletAddress!);
                        alert("Address copied!");
                      }}
                      className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-yellow-300 font-medium text-sm mb-1">Important</p>
                      <ul className="text-yellow-200 text-xs space-y-1">
                        <li>• Must use <strong>Base network</strong> (not Ethereum or other chains)</li>
                        <li>• Send exactly {invoice.amount} USDC</li>
                        <li>• Payment detected automatically within 1-2 minutes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">After sending, your invoice will auto-update</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Refresh to check payment status →
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === "exchange" && !seller?.walletAddress && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">
                  Seller has not configured their wallet address yet. Please contact them or try wallet payment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Security Info */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-gray-500 text-xs">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured by Base</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Settlement</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 max-w-md mx-auto">
            Payments are processed on-chain and settled instantly. All transactions are final and cannot be reversed.
          </p>
        </div>
      </div>
    </div>
  );
}
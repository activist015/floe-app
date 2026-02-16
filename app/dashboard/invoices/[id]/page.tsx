"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

export default function InvoiceDetailPage() {
  const params = useParams();
  const invoiceId = params.id as Id<"invoices">;
  
  const invoice = useQuery(api.invoices.getById, { invoiceId });

  if (!invoice) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading invoice...</p>
        </div>
      </div>
    );
  }

  const paymentUrl = `${window.location.origin}/invoice/${invoiceId}`;
  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    paid: "bg-green-500/20 text-green-400 border-green-500/50",
    overdue: "bg-red-500/20 text-red-400 border-red-500/50",
    cancelled: "bg-gray-500/20 text-gray-400 border-gray-500/50",
    draft: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentUrl);
    // You could add a toast notification here
    alert("Payment link copied to clipboard!");
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link 
            href="/dashboard/invoices"
            className="text-gray-400 hover:text-white transition mb-2 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Invoices
          </Link>
          <h1 className="text-3xl font-bold text-white">Invoice {invoice.invoiceNumber}</h1>
        </div>
        <div className={`px-4 py-2 rounded-lg border font-medium ${statusColors[invoice.status]}`}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </div>
      </div>

      {/* Invoice Details Card */}
      <div className="glass-card rounded-2xl p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Client Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Client Name</p>
                <p className="text-white font-medium">{invoice.clientName}</p>
              </div>
              {invoice.clientEmail && (
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-white">{invoice.clientEmail}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Invoice Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Amount</p>
                <p className="text-2xl font-bold text-white">${invoice.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Created</p>
                <p className="text-white">{new Date(invoice.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
          <p className="text-white whitespace-pre-wrap">{invoice.description}</p>
        </div>
      </div>

      {/* Payment Link Card */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Link</h3>
        <p className="text-gray-400 text-sm mb-4">
          Share this link with your client to receive payment in USDC
        </p>
        
        <div className="flex gap-3">
          <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono truncate">
            {paymentUrl}
          </div>
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </button>
        </div>

        {/* QR Code Placeholder */}
        <div className="mt-6 p-6 bg-white/5 rounded-lg text-center">
          <div className="w-48 h-48 mx-auto bg-white/10 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">QR Code for mobile payments (coming soon)</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <Link
          href={`/invoice/${invoiceId}`}
          target="_blank"
          className="flex-1 px-6 py-3 glass-card rounded-lg font-medium text-white hover:bg-white/5 transition text-center"
        >
          Preview Payment Page
        </Link>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to cancel this invoice?")) {
              // We'll add the cancel mutation later
              alert("Cancel invoice feature coming soon!");
            }
          }}
          className="px-6 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          Cancel Invoice
        </button>
      </div>
    </div>
  );
}
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function InvoicesList() {
  const router = useRouter();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/sign-in");
      return;
    }
    setUserId(id as Id<"users">);
  }, [router]);

  const invoices = useQuery(
    api.invoices.getByUser,
    userId ? { userId } : "skip"
  );

  if (!userId) {
    return null;
  }

  if (invoices === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No invoices yet</h3>
        <p className="text-gray-400 mb-6">Create your first invoice to get started</p>
        <Link
          href="/dashboard/invoices/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Invoice
        </Link>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400",
    paid: "bg-green-500/20 text-green-400",
    overdue: "bg-red-500/20 text-red-400",
    cancelled: "bg-gray-500/20 text-gray-400",
    draft: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Invoice</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Client</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Date</th>
              <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b border-white/5 last:border-0 hover:bg-white/5 transition cursor-pointer"
                onClick={() => router.push(`/dashboard/invoices/${invoice._id}`)}
              >
                <td className="p-4">
                  <span className="text-white font-medium">{invoice.invoiceNumber}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-300">{invoice.clientName}</span>
                </td>
                <td className="p-4">
                  <span className="text-white font-medium">${invoice.amount.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/dashboard/invoices/${invoice._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {invoices.map((invoice) => (
          <Link
            key={invoice._id}
            href={`/dashboard/invoices/${invoice._id}`}
            className="block glass-card rounded-xl p-4 hover:bg-white/5 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-medium">{invoice.invoiceNumber}</p>
                <p className="text-gray-400 text-sm">{invoice.clientName}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                {invoice.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">${invoice.amount.toLocaleString()}</span>
              <span className="text-gray-400 text-sm">
                {new Date(invoice.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
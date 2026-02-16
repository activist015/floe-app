import { InvoicesList } from "@/components/dashboard/InvoicesList";
import Link from "next/link";

export default function InvoicesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
          <p className="text-gray-400">Manage all your invoices in one place</p>
        </div>
        <Link
          href="/dashboard/invoices/new"
          className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Invoice
        </Link>
      </div>

      {/* Invoices List */}
      <InvoicesList />
    </div>
  );
}
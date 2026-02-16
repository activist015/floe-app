import { InvoiceForm } from "@/components/dashboard/InvoiceForm";

export default function NewInvoicePage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Invoice</h1>
        <p className="text-gray-400">Fill in the details to create a new invoice</p>
      </div>

      <InvoiceForm />
    </div>
  );
}
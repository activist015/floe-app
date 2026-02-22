import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Process USDC payment with real transaction
export const processPayment = action({
  args: {
    invoiceId: v.id("invoices"),
    walletAddress: v.string(),
    amount: v.number(),
    transactionHash: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    paymentId: Id<"payments">;
    message: string;
  }> => {
    const invoice = await ctx.runQuery(api.invoices.getById, {
      invoiceId: args.invoiceId,
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    if (invoice.status !== "pending") {
      throw new Error("Invoice is not pending");
    }

    // Create payment record
    const paymentId: Id<"payments"> = await ctx.runMutation(api.payments.createPayment, {
      invoiceId: args.invoiceId,
      amount: args.amount,
      walletAddress: args.walletAddress,
      network: "base",
      transactionHash: args.transactionHash || "",
    });

    // Mark invoice as paid
    await ctx.runMutation(api.payments.markInvoicePaid, {
      invoiceId: args.invoiceId,
      paymentHash: args.transactionHash || "",
    });

    return {
      success: true,
      paymentId,
      message: "Payment processed successfully!",
    };
  },
});

export const createPayment = mutation({
  args: {
    invoiceId: v.id("invoices"),
    amount: v.number(),
    walletAddress: v.string(),
    network: v.string(),
    transactionHash: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"payments">> => {
    const paymentId = await ctx.db.insert("payments", {
      invoiceId: args.invoiceId,
      amount: args.amount,
      currency: "USDC",
      walletAddress: args.walletAddress,
      transactionHash: args.transactionHash,
      network: args.network,
      status: "confirmed",
      createdAt: Date.now(),
    });

    return paymentId;
  },
});

export const markInvoicePaid = mutation({
  args: {
    invoiceId: v.id("invoices"),
    paymentHash: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.patch(args.invoiceId, {
      status: "paid",
      paidAt: Date.now(),
      paymentHash: args.paymentHash,
      updatedAt: Date.now(),
    });
  },
});

export const getByInvoice = query({
  args: {
    invoiceId: v.id("invoices"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_invoice", (q) => q.eq("invoiceId", args.invoiceId))
      .collect();
  },
});
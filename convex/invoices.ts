import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Generate invoice number
function generateInvoiceNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `INV-${timestamp}-${random}`.toUpperCase();
}

export const create = mutation({
  args: {
    userId: v.id("users"),
    clientName: v.string(),
    clientEmail: v.optional(v.string()),
    amount: v.number(),
    description: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"invoices">> => {
    const invoiceNumber = generateInvoiceNumber();
    
    const invoiceId = await ctx.db.insert("invoices", {
      userId: args.userId,
      invoiceNumber,
      clientName: args.clientName,
      clientEmail: args.clientEmail,
      amount: args.amount,
      description: args.description,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return invoiceId;
  },
});

export const getByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("invoices")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: {
    invoiceId: v.id("invoices"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.invoiceId);
  },
});

export const getStats = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const invoices = await ctx.db
      .query("invoices")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const totalEarned = invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);

    const pendingAmount = invoices
      .filter((inv) => inv.status === "pending")
      .reduce((sum, inv) => sum + inv.amount, 0);

    const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;
    const pendingInvoices = invoices.filter((inv) => inv.status === "pending").length;

    return {
      totalEarned,
      pendingAmount,
      paidInvoices,
      pendingInvoices,
    };
  },
});
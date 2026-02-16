import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.optional(v.string()),
    walletAddress: v.optional(v.string()),
    businessName: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  invoices: defineTable({
    userId: v.id("users"),
    invoiceNumber: v.string(),
    clientName: v.string(),
    clientEmail: v.optional(v.string()),
    amount: v.number(),
    description: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("paid"),
      v.literal("overdue"),
      v.literal("cancelled")
    ),
    dueDate: v.optional(v.number()),
    paidAt: v.optional(v.number()),
    paymentHash: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_invoice_number", ["invoiceNumber"])
    .index("by_status", ["status"]),

  payments: defineTable({
    invoiceId: v.id("invoices"),
    amount: v.number(),
    currency: v.string(),
    walletAddress: v.string(),
    transactionHash: v.string(),
    network: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("failed")
    ),
    createdAt: v.number(),
  })
    .index("by_invoice", ["invoiceId"])
    .index("by_transaction", ["transactionHash"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
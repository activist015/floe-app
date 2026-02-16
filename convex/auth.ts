import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import bcrypt from "bcryptjs";

// Public actions (can use bcrypt)
export const signUp = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"users">> => {
    // Check if user exists directly
    const existingUser: boolean = await ctx.runQuery(api.auth.checkUserExists, {
      email: args.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(args.password, 10);

    // Create user
    const userId: Id<"users"> = await ctx.runMutation(api.auth.createUserInternal, {
      email: args.email,
      passwordHash: hashedPassword,
    });

    return userId;
  },
});

export const signIn = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"users">> => {
    // Find user
    const user = await ctx.runQuery(api.auth.getUserByEmailInternal, {
      email: args.email,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check password
    const isValid: boolean = await bcrypt.compare(args.password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return user._id;
  },
});

// Helper mutation (called by action)
export const createUserInternal = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"users">> => {
    const userId = await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// Helper queries
export const getUserByEmailInternal = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const checkUserExists = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args): Promise<boolean> => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    return user !== null;
  },
});
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const addTransaction = mutation({
  args: {
    user_id: v.id("profiles"),
    amount: v.number(),
    transaction_type: v.union(
      v.literal("deposit"),
      v.literal("withdrawal"),
      v.literal("game_win"),
      v.literal("game_loss"),
      v.literal("commission")
    ),
    description: v.optional(v.string()),
    reference_id: v.optional(v.string()),
    created_by: v.optional(v.id("profiles")),
  },
  handler: async (ctx, args) => {
    // Get current user
    const user = await ctx.db.get(args.user_id);
    if (!user) {
      throw new ConvexError("User not found");
    }

    // Calculate new balance
    let newBalance = user.wallet_balance;
    if (args.transaction_type === "deposit" || args.transaction_type === "game_win" || args.transaction_type === "commission") {
      newBalance += args.amount;
    } else {
      newBalance -= args.amount;
      if (newBalance < 0) {
        throw new ConvexError("Insufficient balance");
      }
    }

    // Update user balance
    await ctx.db.patch(args.user_id, {
      wallet_balance: newBalance,
    });

    // Create transaction record
    const transactionId = await ctx.db.insert("wallet_transactions", args);

    return {
      transactionId,
      newBalance,
    };
  },
});

export const getTransactions = query({
  args: {
    user_id: v.id("profiles"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { user_id, limit = 50 }) => {
    return await ctx.db
      .query("wallet_transactions")
      .withIndex("by_user", (q) => q.eq("user_id", user_id))
      .order("desc")
      .take(limit);
  },
});

export const getWalletBalance = query({
  args: {
    user_id: v.id("profiles"),
  },
  handler: async (ctx, { user_id }) => {
    const user = await ctx.db.get(user_id);
    return user?.wallet_balance || 0;
  },
});
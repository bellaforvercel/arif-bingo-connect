import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const createGame = mutation({
  args: {
    agent_id: v.id("profiles"),
    bet_amount: v.number(),
    winning_pattern: v.string(),
    call_speed: v.string(),
    selected_numbers: v.array(v.number()),
    players_count: v.number(),
  },
  handler: async (ctx, args) => {
    const total_pot = args.bet_amount * args.players_count;
    
    const gameId = await ctx.db.insert("bingo_games", {
      ...args,
      status: "pending",
      total_pot,
    });

    return gameId;
  },
});

export const getGamesByAgent = query({
  args: {
    agent_id: v.id("profiles"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { agent_id, limit = 50 }) => {
    return await ctx.db
      .query("bingo_games")
      .withIndex("by_agent", (q) => q.eq("agent_id", agent_id))
      .order("desc")
      .take(limit);
  },
});

export const updateGameStatus = mutation({
  args: {
    game_id: v.id("bingo_games"),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    called_numbers: v.optional(v.array(v.number())),
    winner_numbers: v.optional(v.array(v.number())),
    total_calls: v.optional(v.number()),
    profit_amount: v.optional(v.number()),
    payout_amount: v.optional(v.number()),
  },
  handler: async (ctx, { game_id, ...updates }) => {
    await ctx.db.patch(game_id, updates);
  },
});

export const getGameStats = query({
  args: {
    agent_id: v.id("profiles"),
    days: v.optional(v.number()),
  },
  handler: async (ctx, { agent_id, days = 30 }) => {
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    
    const games = await ctx.db
      .query("bingo_games")
      .withIndex("by_agent", (q) => q.eq("agent_id", agent_id))
      .filter((q) => q.gte(q.field("_creationTime"), cutoffTime))
      .collect();

    const totalGames = games.length;
    const completedGames = games.filter(g => g.status === "completed");
    const totalProfit = completedGames.reduce((sum, game) => sum + (game.profit_amount || 0), 0);
    const totalPayout = completedGames.reduce((sum, game) => sum + (game.payout_amount || 0), 0);

    return {
      totalGames,
      completedGames: completedGames.length,
      totalProfit,
      totalPayout,
      totalRevenue: totalProfit + totalPayout,
    };
  },
});
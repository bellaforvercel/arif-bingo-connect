import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    email: v.string(),
    full_name: v.string(),
    phone_number: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("agent")),
    wallet_balance: v.number(),
    profit_share_agent: v.optional(v.number()),
    status: v.union(v.literal("active"), v.literal("inactive")),
    password_hash: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  wallet_transactions: defineTable({
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
  })
    .index("by_user", ["user_id"])
    .index("by_type", ["transaction_type"]),

  bingo_games: defineTable({
    agent_id: v.id("profiles"),
    bet_amount: v.number(),
    winning_pattern: v.string(),
    call_speed: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    selected_numbers: v.array(v.number()),
    called_numbers: v.optional(v.array(v.number())),
    winner_numbers: v.optional(v.array(v.number())),
    total_calls: v.optional(v.number()),
    players_count: v.number(),
    total_pot: v.number(),
    profit_amount: v.optional(v.number()),
    payout_amount: v.optional(v.number()),
  })
    .index("by_agent", ["agent_id"])
    .index("by_status", ["status"]),

  bingo_cards: defineTable({
    game_id: v.id("bingo_games"),
    card_number: v.number(),
    numbers: v.array(v.number()),
    is_winner: v.optional(v.boolean()),
  })
    .index("by_game", ["game_id"]),

  sessions: defineTable({
    user_id: v.id("profiles"),
    token: v.string(),
    expires_at: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_user", ["user_id"]),
});
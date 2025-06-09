import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Simple password hashing (in production, use bcrypt or similar)
function hashPassword(password: string): string {
  // This is a simple hash - in production use bcrypt
  return btoa(password + "salt");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    // Find user by email
    const user = await ctx.db
      .query("profiles")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      throw new ConvexError("Invalid email or password");
    }

    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      throw new ConvexError("Invalid email or password");
    }

    // Check if user is active
    if (user.status !== "active") {
      throw new ConvexError("Account is inactive");
    }

    // Create session
    const token = generateToken();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await ctx.db.insert("sessions", {
      user_id: user._id,
      token,
      expires_at: expiresAt,
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        wallet_balance: user.wallet_balance,
        profit_share_agent: user.profit_share_agent,
        status: user.status,
      },
    };
  },
});

export const signOut = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const getCurrentUser = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session || session.expires_at < Date.now()) {
      return null;
    }

    const user = await ctx.db.get(session.user_id);
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      wallet_balance: user.wallet_balance,
      profit_share_agent: user.profit_share_agent,
      status: user.status,
    };
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    full_name: v.string(),
    role: v.union(v.literal("admin"), v.literal("agent")),
    phone_number: v.optional(v.string()),
    profit_share_agent: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("profiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    // Create user
    const userId = await ctx.db.insert("profiles", {
      email: args.email,
      password_hash: hashPassword(args.password),
      full_name: args.full_name,
      role: args.role,
      phone_number: args.phone_number,
      wallet_balance: 0,
      profit_share_agent: args.profit_share_agent || (args.role === "agent" ? 20 : undefined),
      status: "active",
    });

    return userId;
  },
});
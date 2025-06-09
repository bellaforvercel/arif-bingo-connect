import { useState, useEffect, createContext, useContext } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'agent';
  wallet_balance: number;
  profit_share_agent?: number;
  status: 'active' | 'inactive';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('auth_token')
  );
  const [loading, setLoading] = useState(true);

  const signInMutation = useMutation(api.auth.signIn);
  const signOutMutation = useMutation(api.auth.signOut);
  
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    token ? { token } : "skip"
  );

  useEffect(() => {
    if (currentUser !== undefined) {
      setUser(currentUser);
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    // If no token, stop loading
    if (!token) {
      setLoading(false);
    }
  }, [token]);

  const signIn = async (email: string, password: string) => {
    console.log('[Auth] signIn: Attempting sign in for:', email);
    try {
      const result = await signInMutation({ email, password });
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('auth_token', result.token);
      console.log('[Auth] signIn: Sign in successful');
    } catch (error) {
      console.error('[Auth] signIn: Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('[Auth] signOut: Signing out');
    try {
      if (token) {
        await signOutMutation({ token });
      }
      setToken(null);
      setUser(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('[Auth] signOut: Error signing out:', error);
      // Still clear local state even if server call fails
      setToken(null);
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
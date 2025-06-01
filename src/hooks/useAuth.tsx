
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  role: 'admin' | 'agent';
  full_name: string;
  phone_number?: string;
  wallet_balance: number;
  profit_share_agent?: number;
  status: 'active' | 'inactive';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('[Auth] fetchProfile: Starting profile fetch for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      console.log('[Auth] fetchProfile: Query result:', { data, error });
      
      if (error) {
        console.error('[Auth] fetchProfile: Error fetching profile:', error);
        setProfile(null);
        return;
      }
      
      if (data) {
        console.log('[Auth] fetchProfile: Profile data retrieved:', data);
        const typedProfile: Profile = {
          ...data,
          role: data.role as 'admin' | 'agent',
          status: data.status as 'active' | 'inactive'
        };
        setProfile(typedProfile);
      } else {
        console.log('[Auth] fetchProfile: No profile data found');
        setProfile(null);
      }
    } catch (error) {
      console.error('[Auth] fetchProfile: Exception occurred:', error);
      setProfile(null);
    }
  };

  const handleAuthChange = async (event: string, session: Session | null) => {
    console.log('[Auth] handleAuthChange: Auth state changed -', { event, userId: session?.user?.id });
    
    setSession(session);
    setUser(session?.user ?? null);
    
    if (session?.user) {
      console.log('[Auth] handleAuthChange: User authenticated, fetching profile');
      await fetchProfile(session.user.id);
    } else {
      console.log('[Auth] handleAuthChange: No user, clearing profile');
      setProfile(null);
    }
    
    console.log('[Auth] handleAuthChange: Setting loading to false');
    setLoading(false);
  };

  useEffect(() => {
    console.log('[Auth] useEffect: Setting up auth listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log('[Auth] initializeAuth: Starting auth initialization');
        console.log('[Auth] initializeAuth: Checking for existing session');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[Auth] initializeAuth: Error getting session:', error);
          setLoading(false);
          return;
        }
        
        console.log('[Auth] initializeAuth: Session check complete:', { hasSession: !!session, userId: session?.user?.id });
        
        // If we have a session, handle it
        if (session) {
          await handleAuthChange('INITIAL_SESSION', session);
        } else {
          console.log('[Auth] initializeAuth: No session found, setting loading to false');
          setLoading(false);
        }
      } catch (error) {
        console.error('[Auth] initializeAuth: Exception during initialization:', error);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('[Auth] useEffect: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('[Auth] signIn: Attempting sign in for:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('[Auth] signIn: Sign in error:', error);
      throw error;
    }
    console.log('[Auth] signIn: Sign in successful');
  };

  const signOut = async () => {
    console.log('[Auth] signOut: Signing out');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    profile,
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

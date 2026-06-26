import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile — otomatis buat pake RPC jika belum ada (bypass RLS)
  const fetchProfile = async (userId, userMeta) => {
    if (!userId) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code === "PGRST116") {
      // Profile not found — buat pake RPC (bypass RLS via SECURITY DEFINER)
      const metadata = userMeta || {};
      const fullName =
        metadata.full_name || metadata.email?.split("@")[0] || "New Member";

      // Cek apakah ini user pertama (belum ada profile Admin)
      let role = "Member";
      try {
        const { count } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "Admin");

        // Jika belum ada Admin satupun, user ini jadi Admin
        if (count === 0 || count === null) {
          role = "Admin";
        }
      } catch (e) {
        // Kalau query gagal (misal tabel masih kosong), tetap Member
        console.warn("Could not check admin count:", e.message);
      }

      // Pakai RPC upsert (bypass RLS)
      const { data: newProfile, error: rpcError } = await supabase.rpc(
        "upsert_profile",
        {
          p_id: userId,
          p_full_name: fullName,
          p_role: role,
          p_points: 0,
          p_tier: "Bronze",
        }
      );

      if (rpcError) {
        console.error("RPC upsert_profile error:", rpcError.message);
        setProfile(null);
        return;
      }

      setProfile(newProfile?.[0] || null);
      return;
    }

    if (error) {
      console.error("Error fetching profile:", error.message);
      setProfile(null);
      return;
    }

    setProfile(data);
  };

  // Sign In
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  // Sign Up
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  // Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const meta = {
          full_name: currentUser.user_metadata?.full_name,
          email: currentUser.email,
        };
        fetchProfile(currentUser.id, meta);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const meta = {
          full_name: currentUser.user_metadata?.full_name,
          email: currentUser.email,
        };
        fetchProfile(currentUser.id, meta);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile: () => fetchProfile(user?.id, user?.user_metadata),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;

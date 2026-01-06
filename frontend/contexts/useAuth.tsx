"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authCurrentUser } from "@/services/authServices";

type User = {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

type AuthContextType = {
  user: Record<string,string> | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Record<string,string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authCurrentUser()
      .then((u) => setUser(u.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

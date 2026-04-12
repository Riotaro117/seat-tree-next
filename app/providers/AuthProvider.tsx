'use client';

import { subscribeToAuthStateChange } from '@/lib/auth';
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null | undefined;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: undefined, isLoading: true });

// childrenで小要素に渡す限り、子孫要素にクライアントコンポーネントが伝播することはない
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined); // 初期値はローディング中
  const isLoading = user === undefined;

  useEffect(() => {
    const unsubscribe = subscribeToAuthStateChange(setUser);
    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

// hooksはContextから取得する形にする(グローバルステート化)
export const useAuthState = () => useContext(AuthContext);

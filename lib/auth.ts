import { User } from '@supabase/supabase-js';
import { createClient } from './supabase/client';

// 認証の監視イベント
export const subscribeToAuthStateChange = (
  onChange: (user: User | null | undefined) => void,
): (() => void) => {
  const {
    data: { subscription },
  } = createClient().auth.onAuthStateChange((_event, session) => {
    onChange(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
};

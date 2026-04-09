import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// supabaseをブラウザで使用するための新しいクライアントを作成
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

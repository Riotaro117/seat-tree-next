import { supabase } from '@/lib/supabase';

const signout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('ログアウトできませんでした。',{cause:error});
};

export default signout;

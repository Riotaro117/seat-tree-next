import { createClient } from '@/lib/supabase/client';

const signout = async (): Promise<void> => {
  const { error } = await createClient().auth.signOut();
  if (error) throw new Error('ログアウトできませんでした。',{cause:error});
};

export default signout;

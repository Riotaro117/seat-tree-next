import { createClient } from '@/lib/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

type SigninAnonymously = {
  user: User;
  session: Session | null;
};
const signinAnonymously = async (): Promise<SigninAnonymously> => {
  const { data, error } = await createClient().auth.signInAnonymously();
  if (error) throw new Error('仮ユーザーの作成に失敗しました。', { cause: error });
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした。');
  return {
    user: data.user,
    session: data.session,
  };
};

export default signinAnonymously;

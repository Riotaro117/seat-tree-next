import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type SigninAnonymously = {
  user: User;
  session: Session | null;
};
const signinAnonymously = async (): Promise<SigninAnonymously> => {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw new Error('仮ユーザーの作成に失敗しました。');
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした。');
  return {
    user: data.user,
    session: data.session,
  };
};

export default signinAnonymously;

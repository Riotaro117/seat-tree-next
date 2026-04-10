import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type SigninResult = User & { userName: string | null };

const signin = async (email: string, password: string): Promise<SigninResult> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        throw new Error('メールアドレスまたはパスワードが間違っています。');
      case 'Email not confirmed':
        throw new Error(
          'メールアドレスの認証が完了していません。届いたメールのリンクを確認して下さい。',
        );
      case 'Email rate limit exceeded':
        throw new Error('試行回数が多すぎます。しばらく時間をおいてからさいどお試し下さい。');
      default:
        throw new Error('ログインに失敗しました。時間をおいて再度お試しください。');
    }
  }
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした');
  return {
    ...data.user,
    userName: data.user.user_metadata.name ?? null,
  };
};

export default signin;

import type { Session, User } from '@supabase/supabase-js';
import { createClient } from './client';

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

// ユーザー情報の取得
type GetCurrentUserResult = { user: User };
export const getCurrentUser = async (): Promise<GetCurrentUserResult> => {
  const { data, error } = await createClient().auth.getUser();
  if (error) throw new Error('ユーザー情報の取得に失敗しました。', { cause: error }); // エラーコードやHTTPステータスを確認できる
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした。');
  return { user: data.user };
};

// ログイン
type SigninResult = User & { userName: string | null };
export const signin = async (email: string, password: string): Promise<SigninResult> => {
  const { data, error } = await createClient().auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        throw new Error('メールアドレスまたはパスワードが間違っています。', { cause: error });
      case 'Email not confirmed':
        throw new Error(
          'メールアドレスの認証が完了していません。届いたメールのリンクを確認して下さい。',
          { cause: error },
        );
      case 'Email rate limit exceeded':
        throw new Error('試行回数が多すぎます。しばらく時間をおいてからさいどお試し下さい。', {
          cause: error,
        });
      default:
        throw new Error('ログインに失敗しました。時間をおいて再度お試しください。', {
          cause: error,
        });
    }
  }
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした');
  return {
    ...data.user,
    userName: data.user.user_metadata.name ?? null,
  };
};

// 仮ユーザーとしてログイン
type SigninAnonymously = {
  user: User;
  session: Session | null;
};
export const signinAnonymously = async (): Promise<SigninAnonymously> => {
  const { data, error } = await createClient().auth.signInAnonymously();
  if (error) throw new Error('仮ユーザーの作成に失敗しました。', { cause: error });
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした。');
  return {
    user: data.user,
    session: data.session,
  };
};

// ログアウト
export const signout = async (): Promise<void> => {
  const { error } = await createClient().auth.signOut();
  if (error) throw new Error('ログアウトできませんでした。', { cause: error });
};

// ユーザー情報の更新
type UpdateUserResult = {
  user: User;
};
export const updateUser = async (
  email: string,
  password: string,
  name: string,
): Promise<UpdateUserResult> => {
  if (!email || !password || !name)
    throw new Error('メールアドレスとパスワードとユーザーネームは必須です。');

  const { data, error } = await createClient().auth.updateUser({
    email,
    password,
    data: {
      name,
    },
  });
  if (error) throw new Error('ユーザー情報の更新に失敗しました。', { cause: error });
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした。');
  return {
    user: data.user,
  };
};

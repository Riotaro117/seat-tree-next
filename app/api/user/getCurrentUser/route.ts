import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

type GetCurrentUserResult = {
  user: User;
};

const getCurrentUser = async (): Promise<GetCurrentUserResult> => {
  const { data, error } = await createClient().auth.getUser();
  if (error) throw new Error('ユーザー情報の取得に失敗しました。', { cause: error }); // エラーコードやHTTPステータスを確認できる
  if (!data.user) throw new Error('ユーザー情報が取得できませんでした。');
  return { user: data.user };
};

export default getCurrentUser;

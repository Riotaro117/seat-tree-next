import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

type UpdateUserResult = {
  user: User;
};

const updateUser = async (
  email: string,
  password: string,
  name: string,
): Promise<UpdateUserResult> => {
  if (!email || !password || !name)
    throw new Error('メールアドレスとパスワードとユーザーネームは必須です。');

  const { data, error } = await supabase.auth.updateUser({
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

export default updateUser;

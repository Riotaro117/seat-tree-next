// import { supabase } from '@/lib/supabase';
// import type { User } from '@supabase/supabase-js';

// getSession()はクライアントサイド限定
// userだけ必要ならgetUser()で十分。jwtトークンを使用するなら使うべき

// type GetSessionResult = {
//   user: User;
// };

// const getSession = async (): Promise<GetSessionResult> => {
//   const { data, error } = await supabase.auth.getSession();
//   if (error) throw new Error('セッションの取得に失敗しました。', { cause: error });
//   if (!data.session) throw new Error('セッションがありません。');

//   return { user: data.session.user };
// };

// export default getSession;

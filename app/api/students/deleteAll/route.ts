import { createClient } from '@/lib/supabase/client';

const deleteAllStudents = async (userId: string): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { error } = await createClient().from('students').delete().eq('user_id', userId);
  if (error) throw new Error('全生徒を削除することに失敗しました。', { cause: error });
};

export default deleteAllStudents;

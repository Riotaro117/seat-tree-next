import { createClient } from '@/lib/supabase/client';

const deleteLayout = async (userId: string, id: string): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');
  if (!id) throw new Error('教室のレイアウトにIDが指定されていません。');

  const { error } = await createClient()
    .from('layouts')
    .delete()
    .eq('user_id', userId)
    .eq('id', id)
    .select(); // 削除対象が対象が存在しないときにエラーを返す
  if (error) throw new Error('教室のレイアウトの削除に失敗しました。', { cause: error });
};

export default deleteLayout;

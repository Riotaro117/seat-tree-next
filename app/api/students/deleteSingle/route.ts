import { supabase } from '@/lib/supabase';
import type { Student } from '@/lib/type';

const deleteStudent = async (userId: string, student: Student): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', student.id)
    .eq('user_id', userId);

  if (error) throw new Error('生徒の削除に失敗しました。', { cause: error });
};

export default deleteStudent;

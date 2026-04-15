import { formatStudent } from '@/lib/formatStudent.type';
import { createClient } from '@/lib/supabase/client';
import type { Student } from '@/lib/type';

const updateStudent = async (student: Student, userId: string): Promise<Student> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { data, error } = await createClient()
    .from('students')
    .update({
      name: student.name,
      gender: student.gender,
      needs_front_row: student.needsFrontRow,
      bad_chemistry_with: student.badChemistryWith,
    })
    .eq('id', student.id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw new Error('生徒の更新に失敗しました。', { cause: error });
  if (!data) throw new Error('生徒の情報が取得できませんでした。');

  return formatStudent(data);
};

export default updateStudent;

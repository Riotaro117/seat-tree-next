import { formatStudent } from '@/lib/formatStudent.type';
import { supabase } from '@/lib/supabase';
import type { Student } from '@/lib/type';

const createStudent = async (userId: string, student: Omit<Student, 'id'>) => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  // 作成したときには、Jsonデータが混じっているので注意！
  const { data, error } = await supabase
    .from('students')
    .insert({
      user_id: userId, // 作成者のid
      name: student.name,
      gender: student.gender,
      needs_front_row: student.needsFrontRow, // キーはDBの表記に合わせること
      bad_chemistry_with: student.badChemistryWith,
    })
    .select()
    .single();

  if (error) throw new Error('生徒の作成に失敗しました。', { cause: error });
  if (!data) throw new Error('生徒の情報がありません。');

  return formatStudent(data);
};

export default createStudent;

import { formatStudent } from '@/lib/formatStudent.type';
import { supabase } from '@/lib/supabase';
import type { Student } from '@/lib/type';

const fetchStudents = async (userId: string): Promise<Student[]> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw new Error('生徒の読み込みに失敗しました。', { cause: error });

  const formattedStudents = data.map((s) => formatStudent(s));
  return formattedStudents;
};

export default fetchStudents;

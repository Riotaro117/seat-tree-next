import { createClient } from '@/lib/supabase/client';

const insertExcelFile = async (
  userId: string,
  studentToInsert: { name: string }[],
): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const studentRow = studentToInsert
    .filter((s) => s.name && s.name.trim() !== '')
    .map((s) => ({
      user_id: userId,
      name: s.name.trim(),
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    }));

  if (studentRow.length === 0) throw new Error('追加できる生徒がいません。');

  const { error } = await createClient().from('students').insert(studentRow);
  if (error) throw new Error('エクセルファイルの取り込みに失敗しました。', { cause: error });
};

export default insertExcelFile;

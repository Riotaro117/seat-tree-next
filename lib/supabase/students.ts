import { formatStudent } from '@/lib/formatStudent.type';
import { createClient } from '@/lib/supabase/client';
import type { Student } from '@/lib/type';

// 生徒の作成
export const createStudent = async (
  userId: string,
  student: Omit<Student, 'id'>,
): Promise<Student> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  // 作成したときには、Jsonデータが混じっているので注意！
  const { data, error } = await createClient()
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

// Excelファイルによるインポートでの生徒の追加
export const insertExcelFile = async (
  userId: string,
  studentToInsert: { name: string }[],
): Promise<Student[]> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const studentRow = studentToInsert
    .filter((s) => s.name && s.name.trim() !== '')
    .map((s) => ({
      user_id: userId,
      name: s.name.trim(),
      gender: 'boy' as const,
      needs_front_row: false,
      bad_chemistry_with: [],
    }));

  if (studentRow.length === 0) throw new Error('追加できる生徒がいません。');

  const { data, error } = await createClient().from('students').insert(studentRow).select();

  if (error) throw new Error('エクセルファイルの取り込みに失敗しました。必ずテンプレートファイルを使って下さい。', { cause: error });

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    gender: 'boy',
    needsFrontRow: false,
    badChemistryWith: [],
  }));
};

// テンプレートの生徒の追加
export const insertTemplateStudents = async (userId: string): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const templateStudents = [
    {
      user_id: userId,
      name: '織田信長',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '徳川家康',
      gender: 'boy',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '北条政子',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: 'お市',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '与謝野晶子',
      gender: 'girl',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '推古天皇',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: 'ジャンヌダルク',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '中臣鎌足',
      gender: 'boy',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '行基',
      gender: 'boy',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '卑弥呼',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '坂本龍馬',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '豊臣秀吉',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: 'ザビエル',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: 'マリーアントワネット',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '紫式部',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '石川五右衛門',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '武田信玄',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '上杉謙信',
      gender: 'boy',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '北条氏康',
      gender: 'boy',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '今川義元',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '明智光秀',
      gender: 'boy',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '黒田官兵衛',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '清少納言',
      gender: 'girl',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: 'ねね',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '細川ガラシャ',
      gender: 'girl',
      needs_front_row: true,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '巴御前',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: 'マザーテレサ',
      gender: 'girl',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '野口英世',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '福沢諭吉',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
    {
      user_id: userId,
      name: '真田幸村',
      gender: 'boy',
      needs_front_row: false,
      bad_chemistry_with: [],
    },
  ];

  // 生徒数の確認をしたのちに作成する
  const { count, error: countError } = await createClient()
    .from('students')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  if (countError) throw new Error('生徒数の確認に失敗しました。', { cause: countError });
  if (count && count > 0) return;

  const { error: insertError } = await createClient().from('students').insert(templateStudents);
  if (insertError)
    throw new Error('テンプレートの生徒を作成することに失敗しました。', { cause: insertError });
};

// 全ての生徒の削除
export const deleteAllStudents = async (userId: string): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { error } = await createClient().from('students').delete().eq('user_id', userId);
  if (error) throw new Error('全生徒を削除することに失敗しました。', { cause: error });
};

// 指定した生徒の削除
export const deleteStudent = async (userId: string, student: Student): Promise<void> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { error } = await createClient()
    .from('students')
    .delete()
    .eq('id', student.id)
    .eq('user_id', userId);

  if (error) throw new Error('生徒の削除に失敗しました。', { cause: error });
};

// 生徒情報の取得
export const fetchStudents = async (userId: string): Promise<Student[]> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { data, error } = await createClient()
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw new Error('生徒の読み込みに失敗しました。', { cause: error });

  const formattedStudents = data.map((s) => formatStudent(s));
  return formattedStudents;
};

// 生徒情報の更新（内容は任せる）
export const updateStudent = async (userId: string, student: Student): Promise<Student> => {
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

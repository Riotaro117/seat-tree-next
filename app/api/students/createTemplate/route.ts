import { supabase } from '@/lib/supabase';

export const insertAllStudents = async (userId: string): Promise<void> => {
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
  const { count, error: countError } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  if (countError) throw new Error('生徒数の確認に失敗しました。', { cause: countError });
  if (count && count > 0) return;

  const { error: insertError } = await supabase.from('students').insert(templateStudents);
  if (insertError)
    throw new Error('テンプレートの生徒を作成することに失敗しました。', { cause: insertError });
};

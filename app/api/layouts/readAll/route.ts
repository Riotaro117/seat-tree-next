import { createClient } from '@/lib/supabase/client';
import type { ClassroomLayout, Seat, Student } from '@/lib/type';

const fetchLayouts = async (userId: string): Promise<ClassroomLayout[]> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');

  const { data, error } = await createClient()
    .from('layouts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20); // 存在しなければ[]を返し、nullは無い

  if (error) throw new Error('教室のレイアウトの読み込みに失敗しました。', { cause: error });
  if (!data) throw new Error('教室のレイアウトのデータがありません。');

  // Json形式をClassroomLayout[]の型になるように変換
  const formattedLayouts: ClassroomLayout[] = data.map((layout) => ({
    ...layout,
    seats: layout.seats as Seat[],
    students: layout.students as Student[],
  }));
  return formattedLayouts;
};

export default fetchLayouts;

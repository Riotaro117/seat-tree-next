import { createClient } from '@/lib/supabase/client';
import type { ClassroomLayout, Seat, Student } from '@/lib/type';

// 教室のレイアウトの保存
export const createLayout = async (
  userId: string,
  layout: Omit<ClassroomLayout, 'id'>,
): Promise<ClassroomLayout> => {
  if (!userId) throw new Error('ユーザーIDが指定されていません。');
  const { data, error } = await createClient()
    .from('layouts')
    .insert({
      user_id: userId, // 作成者
      name: layout.name,
      date: new Date().toISOString().split('T')[0],
      rows: layout.rows,
      cols: layout.cols,
      seats: layout.seats,
      students: layout.students,
    })
    .select()
    .single();
  if (error) throw new Error('現在の教室のレイアウトを保存できませんでした。', { cause: error });
  if (!data) throw new Error('教室のレイアウトが存在しません。');
  // appで使用するClassroomLayout型に変更
  return {
    id: data.id,
    name: data.name,
    date: data.date,
    rows: data.rows,
    cols: data.cols,
    seats: data.seats as Seat[],
    students: data.students as Student[],
  };
};

// 教室のレイアウトの削除
export const deleteLayout = async (userId: string, id: string): Promise<void> => {
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

// 教室のレイアウトの取得
export const fetchLayouts = async (userId: string): Promise<ClassroomLayout[]> => {
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

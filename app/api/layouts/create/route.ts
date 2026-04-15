import { createClient } from '@/lib/supabase/client';
import type { ClassroomLayout, Seat, Student } from '@/lib/type';

const createLayout = async (
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

export default createLayout;

'use client';

import { useEffect, useRef } from 'react';
import { useAuthState } from './AuthProvider';
import { useStudentsStore } from '../store/useStudentsStore';
import { useLayoutsStore } from '../store/useLayoutsStore';
import { useSeatsStore } from '../store/useSeatsStore';
import { fetchStudents, insertTemplateStudents } from '@/lib/supabase/students';
import { fetchLayouts } from '@/lib/supabase/layouts';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuthState();
  const { setStudents } = useStudentsStore();
  const { setLayouts } = useLayoutsStore();
  const { seats, handleResizeSeats,handleResizeCols } = useSeatsStore();
  const hadInsertedTemplate = useRef(false); // 再レンダリングされても値が変わらないし、変更しても再レンダリングがトリガーされない

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [isLoading, user?.id]);

  // supabaseのデータ取得
  const fetchData = async () => {
    if (!user) return null;
    try {
      // ①生徒情報を取得
      let formattedStudents = await fetchStudents(user.id);
      // ②匿名ユーザーであり生徒が０ならテンプレの投入
      if (user.is_anonymous && formattedStudents.length === 0 && !hadInsertedTemplate.current) {
        hadInsertedTemplate.current = true;
        await insertTemplateStudents(user.id);
        // ③再取得
        formattedStudents = await fetchStudents(user.id);
      }
      // 取得した生徒情報をグローバルステートに格納
      setStudents(formattedStudents);
      // 教室のレイアウトを取得
      const formattedLayouts = await fetchLayouts(user.id);
      // 教室のレイアウトをグローバルステートに格納
      setLayouts(formattedLayouts);
    } catch (error) {
      // 失敗した時
      console.error('Error fetching data:', error);
      alert('データの読み込みに失敗しました');
    } finally {
      if (seats.length === 0) {
        handleResizeSeats(30);
        handleResizeCols(6, 30);
      }
    }
  };

  return <>{children}</>;
};

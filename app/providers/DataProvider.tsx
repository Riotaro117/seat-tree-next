'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from './AuthProvider';
import { useStudentsStore } from '../store/useStudentsStore';
import { useLayoutsStore } from '../store/useLayoutsStore';
import { useSeatsStore } from '../store/useSeatsStore';
import { fetchStudents, insertTemplateStudents } from '@/lib/supabase/students';
import { fetchLayouts } from '@/lib/supabase/layouts';
import SpinnerWhole from '../classroom/components/layouts/SpinnerWhole';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDataLoading, setIsDataLoading] = useState(true); //初期状態をtrueにすることでデータ取得前のHTMLが見えなくなる
  const { isLoading, user } = useAuthState();
  const { setStudents } = useStudentsStore();
  const { setLayouts } = useLayoutsStore();
  const { seats, handleResizeSeats, handleResizeCols } = useSeatsStore();

  // supabaseのデータ取得
  // useCallbackはメモ化し、依存配列が変わらない限り、同じ関数を参照し続けて、無限実行にならない
  const fetchData = useCallback(async () => {
    if (!user) {
      setIsDataLoading(false);
      return;
    }
    try {
      setIsDataLoading(true);
      // ①生徒情報を取得
      let formattedStudents = await fetchStudents(user.id);
      // ②匿名ユーザーであり生徒が０ならテンプレの投入
      if (user.is_anonymous && formattedStudents.length === 0) {
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
      console.error('Error fetching data:', error);
      alert(error instanceof Error ? error.message : 'データの読み込みに失敗しました');
    } finally {
      setIsDataLoading(false);
    }
  }, [user?.id, user?.is_anonymous]);

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [isLoading, fetchData]);

  useEffect(() => {
    if (!isDataLoading && seats.length === 0) {
      handleResizeSeats(30);
      handleResizeCols(6, 30);
    }
  }, [isDataLoading]);

  return <>{isLoading || isDataLoading ? <SpinnerWhole /> : children}</>;
};

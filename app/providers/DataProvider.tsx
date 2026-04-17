'use client';

import { useEffect, useRef } from 'react';
import { useAuthState } from './AuthProvider';
import fetchStudents from '../api/students/read/route';
import { insertTemplateStudents } from '../api/students/createTemplate/route';
import fetchLayouts from '../api/layouts/readAll/route';
import { useStudentsStore } from '../store/useStudentsStore';
import { useLayoutsStore } from '../store/useLayoutsStore';
import { useSeatsStore } from '../store/useSeatsStore';
import { useTotalSeatsStore } from '../store/useTotalSeatsStore';
import type { Seat } from '@/lib/type';
import { useColsStore } from '../store/useColsStore';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuthState();
  const { setStudents } = useStudentsStore();
  const { setLayouts } = useLayoutsStore();
  const { seats, setSeats } = useSeatsStore();
  const { setTotalSeats } = useTotalSeatsStore();
  const { cols, setCols } = useColsStore();
  const hadInsertedTemplate = useRef(false); // 再レンダリングされても値が変わらないし、変更しても再レンダリングがトリガーされない

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [isLoading, user?.id]);

  // 総座席数が変わったときに教室の座席配置を作り直す関数
  const handleResizeSeats = (size: number) => {
    // 総座席数の更新
    setTotalSeats(size);
    // 引数のsizeを元に新しい座席データを作成する
    // 引数のsizeを配列のようなオブジェクトlength:sizeとして配列にしている
    // 使わないvalueは_で示している elementはundefinedなので存在しない
    const newSeats: Seat[] = Array.from({ length: size }, (_, i) => ({
      id: `seat-${Math.floor(i / cols)}-${i % cols}`,
      row: Math.floor(i / cols),
      col: i % cols,
      studentId: null, // 初めは誰も座っていない
      isDisabled: false,
    }));
    // 座席情報の更新
    setSeats(newSeats);
  };

  const handleResizeCols = (size: number, totalSeats: number) => {
    setCols(size);
    const newSeats: Seat[] = Array.from({ length: totalSeats }, (_, i) => ({
      id: `seat-${Math.floor(i / size)}-${i % size}`,
      row: Math.floor(i / size),
      col: i % size,
      studentId: null,
      isDisabled: false,
    }));
    setSeats(newSeats);
  };

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

'use client';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useColsStore } from '@/app/store/useColsStore';
import { useLayoutsStore } from '@/app/store/useLayoutsStore';
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { useTotalSeatsStore } from '@/app/store/useTotalSeatsStore';
import { generateSeatingChart } from '@/app/utils/seatingLogic';
import type { ClassroomLayout } from '@/lib/type';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import TopButtons from '../ui/TopButtons';
import { useFrontRowLimitStore } from '@/app/store/useFrontRowLimitStore';
import { useRouter } from 'next/navigation';
import ClassroomSeats from '../ui/classroom-seats/ClassroomSeats';
import { createLayout } from '@/lib/supabase/layouts';

const MainContents = () => {
  const { cols } = useColsStore();
  const { setLayouts } = useLayoutsStore();
  const { seats, setSeats } = useSeatsStore();
  const { students } = useStudentsStore();
  const { totalSeats } = useTotalSeatsStore();
  const { user } = useAuthState();
  const { frontRowLimit } = useFrontRowLimitStore();
  const router = useRouter();

  // 印刷ボタン
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPrinted, setIsPrinted] = useState(false);

  // 後で、メガネマークなどが消えるように設定しておくこと
  const handlePrintCurrentLayout = useReactToPrint({
    contentRef,
    onBeforePrint: async () => {
      setIsPrinted(true);
      // DOMの更新が完了後に印刷画面へ進む
      await new Promise((resolve) => setTimeout(resolve, 0));
    },
    onAfterPrint: () => {
      setIsPrinted(false);
    },
  });

  if (!user) return null;

  // 席替えをする
  const handleRandomize = () => {
    // rowsを定義する
    const rows = Math.ceil(totalSeats / cols);
    try {
      // 新しい座席を制約を元にして定義する
      const newSeats = generateSeatingChart(seats, rows, cols, students, frontRowLimit);
      // 総座席数より、生徒が座っている座席が少ない場合
      if (newSeats.length < totalSeats) {
        // 生徒が座っていない座席に繰り返し処理でseatのstudentIdにnullを入れていく
        for (let i = newSeats.length; i < totalSeats; i++) {
          newSeats.push({
            id: `seat-${Math.floor(i / cols)}-${i % cols}`,
            row: Math.floor(i / cols),
            col: i % cols,
            studentId: null,
            isDisabled: false,
          });
        }
      }
      // 座席を更新する
      setSeats(newSeats);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // 教室配置保存ボタン
  const handleSaveCurrentLayout = async () => {
    if (!user) return;
    if (user.is_anonymous) {
      const ok = window.confirm('この機能はユーザー登録者限定です。ユーザー登録しますか？');
      if (ok) {
        router.push('/user/update');
      }
      return;
    }
    // promptで保存する名前を定義する
    const nameLayout = prompt(
      '保存する名前を入力してください（例: 4月の席替え）',
      `${new Date().getMonth() + 1}月の席替え`,
    );
    if (!nameLayout) return;

    try {
      const layout: Omit<ClassroomLayout, 'id'> = {
        name: nameLayout,
        date: new Date().toLocaleDateString(),
        rows: Math.ceil(totalSeats / cols),
        cols,
        seats,
        students,
      };
      const createdLayout = await createLayout(user.id, layout);
      setLayouts((prev) => [...prev, createdLayout]);
    } catch (error) {
      console.error(error);
      alert('保存に失敗しました');
    }
  };

  return (
    <>
      <TopButtons
        handleRandomize={handleRandomize}
        handleSaveCurrentLayout={handleSaveCurrentLayout}
        handlePrintCurrentLayout={handlePrintCurrentLayout}
      />

      <ClassroomSeats contentRef={contentRef} isPrinted={isPrinted} />
    </>
  );
};

export default MainContents;

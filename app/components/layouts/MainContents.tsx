'use client';
import createLayout from '@/app/api/layouts/create/route';
import fetchLayouts from '@/app/api/layouts/readAll/route';
import { insertTemplateStudents } from '@/app/api/students/createTemplate/route';
import fetchStudents from '@/app/api/students/read/route';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useColsStore } from '@/app/store/useColsStore';
import { useLayoutsStore } from '@/app/store/useLayoutsStore';
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { useTotalSeatsStore } from '@/app/store/useTotalSeatsStore';
import { ADJACENT_OFFSETS } from '@/app/utils/constants';
import { generateSeatingChart } from '@/app/utils/seatingLogic';
import type { ClassroomLayout, Seat, Student } from '@/lib/type';
import { AlertTriangle, ArrowRightLeft, Glasses, GripHorizontal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import TopButtons from '../ui/TopButtons';

const MainContents = () => {
  const { cols, setCols } = useColsStore();
  const { layouts, setLayouts } = useLayoutsStore();
  const { seats, setSeats } = useSeatsStore();
  const { students, setStudents } = useStudentsStore();
  const { totalSeats, setTotalSeats } = useTotalSeatsStore();
  const { user, isLoading } = useAuthState();
  const [frontRowLimit, setFrontRowLimit] = useState(2);
  // 現在選択している座席のid
  const [isSelectedSeatId, setIsSelectedSeatId] = useState<string | null>(null);
    // 印刷ボタン
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPrinted, setIsPrinted] = useState(false);
  console.log(seats);

  const hadInsertedTemplate = useRef(false); // 再レンダリングされても値が変わらないし、変更しても再レンダリングがトリガーされない
    // 後で、メガネマークなどが消えるように設定しておくこと
  const printCurrentLayout = useReactToPrint({
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

  if (!user) return null;
  // supabaseのデータ取得
  const fetchData = async () => {
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

  // 生徒に高速アクセスするために、mapの作成
  const studentMap = new Map<string, Student>(students.map((student) => [student.id, student]));

  // 指定した生徒同士の座席を入れ替える
  const handleSwap = (id1: string, id2: string) => {
    // 元の座席順をコピーして入れ替える準備をする
    const newSeats = [...seats];
    // コピーした配列の中から選択しているid1とid2に一致するインデックスをそれぞれ取得する
    const seat1Idx = newSeats.findIndex((s) => s.id === id1);
    const seat2Idx = newSeats.findIndex((s) => s.id === id2);
    // 見つからなかったらそのまま返す
    if (seat1Idx === -1 || seat2Idx === -1) return;
    // 生徒のidを交換する処理
    // 一時的にid1を格納する
    const temp = newSeats[seat1Idx].studentId;
    // id2をid1に格納
    newSeats[seat1Idx].studentId = newSeats[seat2Idx].studentId;
    // tempをid2に格納
    newSeats[seat2Idx].studentId = temp;
    // 現在の座席を更新
    setSeats(newSeats);
  };

  // 座席をクリックしたら選択済みにする
  const handleSeatClick = (seat: Seat) => {
    if (seat.isDisabled) {
      alert('使用できない座席は選択できません');
      return;
    }
    // 選択済みの座席がない場合
    if (!isSelectedSeatId) {
      setIsSelectedSeatId(seat.id);
    } else {
      // 選択済みがある場合、選んでいない座席なら入れ替え
      if (isSelectedSeatId !== seat.id) {
        handleSwap(isSelectedSeatId, seat.id);
      }
      // 既に選択済みなら外す
      setIsSelectedSeatId(null);
    }
  };

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

  // const navigate = useNavigate();
  const seatMap = new Map(seats.map((s) => [`${s.row}-${s.col}`, s]));

  // この席に座っている生徒はルール違反をしているかどうかをbooleanで返す
  const getConflictWarning = (seat: Seat, totalSeats: number, frontRowLimit: number): boolean => {
    // 座席に生徒がいないならfalseで終了
    if (!seat.studentId) return false;
    // 生徒を定義する
    const student = studentMap.get(seat.studentId);
    // 生徒がいないならfalseで終了
    if (!student) return false;

    const rows = Math.ceil(totalSeats / cols);

    // 1.相性が悪いチェック
    // for-ofで上下左右一つずつループさせて確かめる
    for (const offset of ADJACENT_OFFSETS) {
      // 隣の行と列を定義する
      const neighborRow = seat.row + offset.r;
      const neighborCol = seat.col + offset.c;
      if (neighborRow < 0 || neighborRow >= rows) continue;
      if (neighborCol < 0 || neighborCol >= cols) continue;

      // ADJACENT_OFFSETSに基づいた隣の席を見つける
      const neighborSeat = seatMap.get(`${neighborRow}-${neighborCol}`);
      // 隣の席があり、隣の席に生徒が座っているなら
      if (neighborSeat && neighborSeat.studentId) {
        // 隣の席の生徒が相性悪い配列の中にあるなら違反報告
        if (student.badChemistryWith.includes(neighborSeat.studentId)) return true;
        // 隣の生徒を定義し、反対も同様に二重チェックする→片思いの苦手でもNGにする
        const neighborStudent = studentMap.get(neighborSeat.studentId);
        if (neighborStudent && neighborStudent.badChemistryWith.includes(seat.studentId))
          return true;
      }
    }

    // 2. 視力が悪い人のチェック
    if (student.needsFrontRow && seat.row >= frontRowLimit) return true;

    // 何も違反がない場合はfalse
    return false;
  };
  // 教室配置保存ボタン
  const saveCurrentLayout = async () => {
    if (!user) return;
    if (user.is_anonymous) {
      const ok = window.confirm('この機能はユーザー登録者限定です。ユーザー登録しますか？');
      if (ok) {
        // navigate('/updateUser', { replace: true });
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

  // 設定画面へ遷移
  const transitionSetting = () => {
    if (window.confirm('現在の配置は失われます。座席設定画面に遷移しますか？')) {
      // onResizeSeats(30);
      // onResizeCols(6, 30);
      // setViewMode('settings');
    }
  };
  // 設定画面へ遷移
  const transitionStudentManager = () => {
    if (window.confirm('現在の配置は失われます。生徒名簿画面に遷移しますか？')) {
      // onResizeSeats(30);
      // onResizeCols(6, 30);
      // setViewMode('students');
    }
  };




  return (
    <main className="max-w-7xl mx-auto px-4 pt-6">
      <>
        <TopButtons
          onRandomize={handleRandomize}
          onTransitionSetting={transitionSetting}
          onTransitionStudentManager={transitionStudentManager}
          onSaveCurrentLayout={saveCurrentLayout}
          onPrintCurrentLayout={printCurrentLayout}
        />

        <div
          ref={contentRef}
          className="flex flex-col items-center w-full"
        >
          <div className="bg-lime-600 text-white px-12 py-2 rounded-b-xl shadow-md mb-8 w-2/3 text-center border-b-4 border-lime-800">
            <h3 className="font-serif tracking-widest text-lg opacity-90">黒板</h3>
          </div>

          {/* 座席をグリッドレイアウトで配置していく styleは動的にクラスを得る書き方 */}
          <div
            className="grid gap-4 w-full max-w-5xl mx-auto p-4 justify-center"
            style={{
              gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`,
            }}
          >
            {/* 座席の配列を展開して並べていく */}
            {seats.map((seat) => {
              // 生徒を定義
              const student = seat.studentId ? studentMap.get(seat.studentId) : null;
              // 選択している座席のidとseatのidが一致している状態を定義
              const isSelected = isSelectedSeatId === seat.id;
              // seatingLogicを元に制約違反があるかどうか
              const hasConflict = getConflictWarning(seat, totalSeats, frontRowLimit);

              // 文字の色を定義
              let textColor = 'text-wood-900';
              // 生徒が存在するかどうかで文字の色を変化させる
              if (student) {
                // 制約違反があるなら赤色で警告
                if (hasConflict) textColor = 'text-red-700';
                // 制約違反がなければ、男女で色を変化させる
                else if (student.gender === 'boy') textColor = 'text-blue-900';
                else if (student.gender === 'girl') textColor = 'text-pink-900';
              }

              // 出力する
              return (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={`
                relative aspect-[4/3] rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer
                transition-all duration-300 transform border-b-4
                ${
                  // 選択されているかでスタイルの変化
                  isSelected
                    ? 'bg-blue-100 border-blue-400 -translate-y-2 shadow-xl ring-4 ring-blue-200 z-10'
                    : 'hover:-translate-y-1 hover:shadow-lg'
                }
                ${
                  seat.isDisabled
                    ? 'bg-emerald-100 border-emerald-200 border-dashed'
                    : !student
                      ? 'bg-wood-100 border-wood-200 border-dashed'
                      : hasConflict
                        ? 'bg-red-50 border-red-300'
                        : 'bg-orange-200 border-wood-400'
                }
              `}
                >
                  {/* 生徒がいて制約違反もなく、選択もされていないなら */}
                  {student && !isSelected && !hasConflict && (
                    <div className="absolute inset-2 border border-orange-300/50 rounded-lg pointer-events-none"></div>
                  )}

                  {/* 生徒の有無でスタイル変更 */}
                  {seat.isDisabled ? (
                    <span className="text-emerald-300 text-xs font-medium">
                      <X className="w-3 h-3 sm:w-6 h-6" />
                    </span>
                  ) : student ? (
                    <>
                      <div className="flex items-center gap-1 mb-1">
                        {/* 前列配慮のある生徒の場合のスタイル */}
                        {student.needsFrontRow && (
                          <Glasses
                            className={`w-3 h-3 ${hasConflict ? 'text-red-500' : 'text-wood-700'}`}
                          />
                        )}
                        {/* もし制約違反があったら */}
                        {hasConflict && (
                          <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
                        )}
                      </div>
                      {/* 生徒の名前を表示する */}
                      <span
                        className={`text-center font-bold leading-tight select-none line-clamp-2 ${textColor}`}
                        style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}
                      >
                        {student.name}
                      </span>
                      {/* ホバーした時だけ入れ替えマークが出現 */}
                      <div className="mt-2 opacity-0 hover:opacity-100 absolute inset-0 bg-black/5 rounded-xl flex items-center justify-center transition-opacity">
                        <ArrowRightLeft className="text-wood-800 w-6 h-6" />
                      </div>
                    </>
                  ) : (
                    <span className="text-wood-300 text-xs font-medium">空席</span>
                  )}

                  {/* 座席が選択された時の表示変更 */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 shadow-md">
                      <GripHorizontal className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    </main>
  );
};

export default MainContents;

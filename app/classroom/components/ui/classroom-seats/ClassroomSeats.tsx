'use client';
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { ADJACENT_OFFSETS } from '@/app/utils/constants';
import type {  Student } from '@/lib/type';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { RefObject, useMemo, useState } from 'react'; // useMemo を追加
import { useColsStore } from '@/app/store/useColsStore';
import { useTotalSeatsStore } from '@/app/store/useTotalSeatsStore';
import { useFrontRowLimitStore } from '@/app/store/useFrontRowLimitStore';
import DroppableSeat from './DroppableSeat';
import DraggableSeatCard from './DraggableSeatCard';
import OverlayCard from './OverlayCard';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import BlackBoard from '../BlackBoard';

type ClassroomSeatsProps = {
  contentRef: RefObject<HTMLDivElement | null>;
  isPrinted: boolean;
};

const ClassroomSeats: React.FC<ClassroomSeatsProps> = ({ contentRef, isPrinted }) => {
  const { seats, setSeats } = useSeatsStore();
  const { students } = useStudentsStore();
  const { cols } = useColsStore();
  const { totalSeats } = useTotalSeatsStore();
  const { frontRowLimit } = useFrontRowLimitStore();

  const [activeSeatId, setActiveSeatId] = useState<string | null>(null);
  // students が変わったときだけ再生成（再レンダリングごとにnewMapが実行されるのを防ぐ）
  // 上記のuseStateなどが変化するごとに再計算されてしまう。
  // Mapはキーにどんな値でも使える、オブジェクトだがプロトタイプがない
  // 今回はMapの方が適切。理由としては、値を取得したときに、はっきりとundefinedが返るから
  const studentMap = useMemo(
    () => new Map<string, Student>(students.map((s) => [s.id, s])),
    [students],
  );

  // seats が変わったときだけ再生成
  const seatMap = useMemo(() => new Map(seats.map((s) => [`${s.row}-${s.col}`, s])), [seats]);

  // 競合チェック結果を seats/students/cols/totalSeats/frontRowLimit が変わったときだけ再計算
  const conflictSet = useMemo(() => {
    const rows = Math.ceil(totalSeats / cols);

    return new Set(
      seats
        .filter((seat) => {
          if (!seat.studentId) return false;
          const student = studentMap.get(seat.studentId);
          if (!student) return false;

          for (const offset of ADJACENT_OFFSETS) {
            const neighborRow = seat.row + offset.r;
            const neighborCol = seat.col + offset.c;
            if (neighborRow < 0 || neighborRow >= rows) continue; // 教室の端から飛び出したら終了
            if (neighborCol < 0 || neighborCol >= cols) continue;

            const neighborSeat = seatMap.get(`${neighborRow}-${neighborCol}`);
            if (neighborSeat?.studentId) {
              if (student.badChemistryWith.includes(neighborSeat.studentId)) return true;
              const neighborStudent = studentMap.get(neighborSeat.studentId);
              if (neighborStudent?.badChemistryWith.includes(seat.studentId)) return true;
            }
          }

          // 前列希望であり、設定している前列を超えていたら違反
          if (student.needsFrontRow && seat.row >= frontRowLimit) return true;
          return false;
        })
        .map((seat) => seat.id),
    );
  }, [seats, studentMap, seatMap, cols, totalSeats, frontRowLimit]);

  const handleSwap = (id1: string, id2: string) => {
    const newSeats = [...seats];
    const seat1Idx = newSeats.findIndex((s) => s.id === id1);
    const seat2Idx = newSeats.findIndex((s) => s.id === id2);
    if (seat1Idx === -1 || seat2Idx === -1) return;
    const temp = newSeats[seat1Idx].studentId;
    newSeats[seat1Idx] = { ...newSeats[seat1Idx], studentId: newSeats[seat2Idx].studentId };
    newSeats[seat2Idx] = { ...newSeats[seat2Idx], studentId: temp };
    setSeats(newSeats);
  };

  // activeSeatId が変わったときだけ再取得
  const activeStudent = useMemo(() => {
    if (!activeSeatId) return null;
    const activeSeat = seats.find((s) => s.id === activeSeatId);
    return activeSeat?.studentId ? (studentMap.get(activeSeat.studentId) ?? null) : null;
  }, [activeSeatId, seats, studentMap]);

  return (
    <DragDropProvider
      onDragStart={(event) => {
        setActiveSeatId((event.operation.source?.id as string) ?? null);
      }}
      onDragEnd={(event) => {
        if (!event.canceled) {
          const sourceId = event.operation.source?.id as string;
          const targetId = event.operation.target?.id as string;
          if (sourceId && targetId && sourceId !== targetId) {
            handleSwap(sourceId, targetId);
          }
        }
        setActiveSeatId(null);
      }}
    >
      <div ref={contentRef} className="flex flex-col items-center w-full">
        <BlackBoard />
        <div
          className="grid gap-4 w-full max-w-5xl mx-auto p-4 justify-center"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {seats.map((seat) => {
            const student = seat.studentId ? (studentMap.get(seat.studentId) ?? null) : null;
            const hasConflict = conflictSet.has(seat.id); // Set は一発で見つかる（配列は先頭から1件ずつ探す）

            return (
              <DroppableSeat
                key={seat.id}
                seat={seat}
                student={student}
                hasConflict={hasConflict}
                isPrinted={isPrinted}
              >
                <DraggableSeatCard
                  seat={seat}
                  student={student}
                  hasConflict={hasConflict}
                  isPrinted={isPrinted}
                />
              </DroppableSeat>
            );
          })}
        </div>
      </div>
      <DragOverlay>
        <OverlayCard student={activeStudent ?? null} />
      </DragOverlay>
    </DragDropProvider>
  );
};

export default ClassroomSeats;

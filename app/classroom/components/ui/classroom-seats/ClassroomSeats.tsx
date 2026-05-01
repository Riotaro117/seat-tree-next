'use client';
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { ADJACENT_OFFSETS } from '@/app/utils/constants';
import type { Seat, Student } from '@/lib/type';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { RefObject, useState } from 'react';
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

  // 現在ドラッグ中の座席id
  const [activeSeatId, setActiveSeatId] = useState<string | null>(null);

  const studentMap = new Map<string, Student>(students.map((s) => [s.id, s]));
  const seatMap = new Map(seats.map((s) => [`${s.row}-${s.col}`, s]));

  const getConflictWarning = (seat: Seat, totalSeats: number, frontRowLimit: number): boolean => {
    if (!seat.studentId) return false;
    const student = studentMap.get(seat.studentId);
    if (!student) return false;

    const rows = Math.ceil(totalSeats / cols);

    for (const offset of ADJACENT_OFFSETS) {
      const neighborRow = seat.row + offset.r;
      const neighborCol = seat.col + offset.c;
      if (neighborRow < 0 || neighborRow >= rows) continue;
      if (neighborCol < 0 || neighborCol >= cols) continue;

      const neighborSeat = seatMap.get(`${neighborRow}-${neighborCol}`);
      if (neighborSeat && neighborSeat.studentId) {
        if (student.badChemistryWith.includes(neighborSeat.studentId)) return true;
        const neighborStudent = studentMap.get(neighborSeat.studentId);
        if (neighborStudent && neighborStudent.badChemistryWith.includes(seat.studentId))
          return true;
      }
    }

    if (student.needsFrontRow && seat.row >= frontRowLimit) return true;
    return false;
  };

  const handleSwap = (id1: string, id2: string) => {
    const newSeats = [...seats];
    const seat1Idx = newSeats.findIndex((s) => s.id === id1);
    const seat2Idx = newSeats.findIndex((s) => s.id === id2);
    if (seat1Idx === -1 || seat2Idx === -1) return;
    const temp = newSeats[seat1Idx].studentId;
    newSeats[seat1Idx].studentId = newSeats[seat2Idx].studentId;
    newSeats[seat2Idx].studentId = temp;
    setSeats(newSeats);
  };

  // ドラッグ中の座席から生徒を取得（オーバーレイ表示用）
  const activeSeat = seats.find((s) => s.id === activeSeatId);
  const activeStudent = activeSeat?.studentId ? studentMap.get(activeSeat.studentId) : null;

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
            const student = seat.studentId ? (studentMap.get(seat.studentId) ?? null) : null; // studentをStudentかnullに固定
            const hasConflict = getConflictWarning(seat, totalSeats, frontRowLimit);

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
      {/* ドラッグ中に指に追従するカード */}
      <DragOverlay>
        {activeStudent ? <OverlayCard student={activeStudent}  /> : <OverlayCard student={null} />}
      </DragOverlay>
    </DragDropProvider>
  );
};

export default ClassroomSeats;

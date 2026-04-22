'use client';
import { getStudentDeskStyle } from '@/app/utils/getStudentDeskStyle';
import { SeatCardProps } from '@/lib/type';
import { useDraggable } from '@dnd-kit/react';
import { AlertTriangle, Glasses, X } from 'lucide-react';

const DraggableSeatCard = ({ seat, student, hasConflict, isPrinted }: SeatCardProps) => {
  const { ref, isDragging } = useDraggable({
    id: seat.id,
    disabled: seat.isDisabled,
    data: { seat },
  });

  const { deskColor, nameColor } = getStudentDeskStyle(student, seat, hasConflict);

  return (
    <div
      ref={ref}
      className={`
        aspect-[4/3] rounded-xl flex flex-col items-center justify-center p-2
        border-b-4 transition-all duration-200
        ${isDragging ? 'opacity-40 scale-95 cursor-grabbing' : 'cursor-grab'}
        ${deskColor}
      `}
    >
      {seat.isDisabled ? (
        <span className="text-wood-600 text-xs font-medium">
          <X className="w-[100%]" />
        </span>
      ) : student ? (
        <>
          <div className="flex items-center gap-1 mb-1">
            {student.needsFrontRow && !isPrinted && (
              <Glasses className={`w-3 h-3 ${hasConflict ? 'text-red-500' : 'text-wood-700'}`} />
            )}
            {hasConflict && <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />}
          </div>
          <span
            className={`text-center font-bold leading-tight select-none line-clamp-2 ${nameColor}`}
            style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}
          >
            {student.name}
          </span>
        </>
      ) : (
        <span className="text-wood-300 text-xs font-medium">空席</span>
      )}
    </div>
  );
};

export default DraggableSeatCard;

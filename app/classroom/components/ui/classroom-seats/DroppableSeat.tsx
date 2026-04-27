"use client"
import type { SeatCardProps } from '@/lib/type';
import { useDroppable } from '@dnd-kit/react';

const DroppableSeat = ({ seat, children }: SeatCardProps & { children: React.ReactNode }) => {
  const { ref, isDropTarget } = useDroppable({
    id: seat.id,
    disabled: seat.isDisabled, // 使用不可の座席はドロップ対象にしない
  });

  return (
    <div
      ref={ref}
      className={`
        relative aspect-[4/3] rounded-xl transition-all duration-200
        ${isDropTarget && !seat.isDisabled ? 'ring-4 ring-blue-400 bg-blue-50 scale-105' : ''}
      `}
    >
      {children}
    </div>
  );
};

export default DroppableSeat;

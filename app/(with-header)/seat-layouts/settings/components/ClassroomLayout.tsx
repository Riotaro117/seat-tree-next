'use client';
import BlackBoard from '@/app/(with-header)/components/ui/BlackBoard';
import { useColsStore } from '@/app/store/useColsStore';
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { X } from 'lucide-react';

const ClassroomLayout = () => {
  const { seats, setSeats } = useSeatsStore();
  const { cols } = useColsStore();

  const handleToggleDisable = (id: string) => {
    setSeats((prev) =>
      prev.map((seat) => (seat.id === id ? { ...seat, isDisabled: !seat.isDisabled } : seat)),
    );
  };
  return (
    <div className="flex flex-col items-center w-full">
      <BlackBoard />
      {/* 座席をグリッドレイアウトで配置していく styleは動的にクラスを得る書き方 */}
      <div
        className="grid gap-4 w-full max-w-5xl mx-auto p-4 justify-center"
        style={{
          gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`,
        }}
      >
        {/* 座席の配列を展開して並べていく */}
        {seats.map((seat) => {
          // 出力する
          return (
            <div
              key={seat.id}
              onClick={() => handleToggleDisable(seat.id)}
              className={`relative aspect-[4/3] rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer
                      transition-all duration-300 transform border-b-4 hover:-translate-y-1 hover:shadow-lg border-dashed
                      ${seat.isDisabled ? 'bg-emerald-100 border-emerald-200' : 'bg-wood-100 border-wood-200'}`}
            >
              {seat.isDisabled ? (
                <span className="text-emerald-300 text-xs font-medium">
                  <X className="w-3 h-3 sm:w-6 h-6" />
                </span>
              ) : (
                <span className="text-wood-300 text-xs font-medium">空席</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassroomLayout;

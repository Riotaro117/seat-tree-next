"use client"
import { useColsStore } from '@/app/store/useColsStore';
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { useTotalSeatsStore } from '@/app/store/useTotalSeatsStore';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SettingButtons = () => {
  const { totalSeats } = useTotalSeatsStore();
  const { handleResizeSeats, handleResizeCols } = useSeatsStore();
  const { cols } = useColsStore();

  return (
    <div className="flex mt-2 justify-between sm:justify-start sm:gap-5 ">
      <div className="flex items-center gap-2  bg-wood-50 px-3 py-1 rounded-lg border border-wood-100">
        <span className="text-sm font-bold text-wood-600">座席数:</span>
        <button
          onClick={() => handleResizeSeats(Math.max(24, totalSeats - 1))}
          className="cursor-pointer  hover:bg-wood-200 rounded"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
        <span className="w-8 text-center font-mono">{totalSeats}</span>
        <button
          onClick={() => handleResizeSeats(Math.min(48, totalSeats + 1))}
          className="cursor-pointer  hover:bg-wood-200 rounded"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center gap-2  bg-wood-50 px-3 py-1 rounded-lg border border-wood-100">
        <span className="text-sm font-bold text-wood-600">列数:</span>
        <button
          onClick={() => handleResizeCols(Math.max(4, cols - 1), totalSeats)}
          className="cursor-pointer  hover:bg-wood-200 rounded"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
        <span className="w-8 text-center font-mono">{cols}</span>
        <button
          onClick={() => handleResizeCols(Math.min(8, cols + 1), totalSeats)}
          className="cursor-pointer  hover:bg-wood-200 rounded"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SettingButtons;

"use client"
import { useSeatsStore } from '@/app/store/useSeatsStore';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { AlertTriangle } from 'lucide-react';

const Cautions = () => {
  const { students } = useStudentsStore();
  const { seats } = useSeatsStore();

  const enabledSeatsCount = seats.filter((seat) => seat.isDisabled === false).length;
  return (
    <div className=" bg-wood-50 px-3 py-1 rounded-lg border border-wood-100 mb-5">
      {enabledSeatsCount < students.length && (
        <p className="text-red-500 text-m">
          <AlertTriangle className="w-6 h-6" />
          必ず、利用できる座席数が生徒の数以上になるようにして下さい。
        </p>
      )}

      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-wood-600">利用できる席数:</span>
        <span className="font-mono">{enabledSeatsCount}席</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-wood-600">生徒の数:</span>
        <span className="font-mono">{students.length}人</span>
      </div>
    </div>
  );
};

export default Cautions;

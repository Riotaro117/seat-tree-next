'use client';
import { useStudentsStore } from '@/app/store/useStudentsStore';

type CurrentCapacityProps = {
  enabledSeatsCount: number;
};

const CurrentCapacity: React.FC<CurrentCapacityProps> = ({ enabledSeatsCount }) => {
  const { students } = useStudentsStore();
  return (
    <div className='flex gap-5 justify-center'>
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

export default CurrentCapacity;

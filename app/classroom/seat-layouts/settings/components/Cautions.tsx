'use client';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { AlertTriangle } from 'lucide-react';

type CautionsProps = {
  enabledSeatsCount: number;
};

const Cautions: React.FC<CautionsProps> = ({ enabledSeatsCount }) => {
  const { students } = useStudentsStore();

  return (
    <>
      {enabledSeatsCount < students.length && (
        <div className=" bg-wood-50 px-3 py-1 rounded-lg border border-wood-100 mt-5 mb-5">
          <p className="flex justify-center items-center gap-3 text-red-500">
            <AlertTriangle className="w-6 h-6" />
            <span className='text-sm md:text-lg'>必ず、利用できる座席数が生徒の数以上になるようにして下さい。</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Cautions;

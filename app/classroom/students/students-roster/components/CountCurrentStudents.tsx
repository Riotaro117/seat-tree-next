'use client';
import { useStudentsStore } from '@/app/store/useStudentsStore';

const CountCurrentStudents = () => {
  const { students } = useStudentsStore();
  return (
    <div className="p-3 mt-3 mb-5 rounded-lg bg-wood-100 flex items-center justify-between">
      <p className="p-1 text-wood-800 font-bold text-sm bg-white rounded-lg sm:text-lg sm:p-4">
        現在の人数: 計 {students.length}名
      </p>
      <div className="flex gap-2 items-center">
        <span className="p-1 text-xs bg-blue-100 font-bold text-blue-800 rounded-lg sm:text-lg sm:p-4">
          男子: {students.filter((s) => s.gender === 'boy').length}名
        </span>
        <span className="p-1 text-xs bg-red-100 font-bold text-red-800 rounded-lg sm:text-lg sm:p-4">
          女子: {students.filter((s) => s.gender === 'girl').length}名
        </span>
      </div>
    </div>
  );
};

export default CountCurrentStudents;

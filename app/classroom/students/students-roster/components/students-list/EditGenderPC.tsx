import Spinner from '@/app/classroom/components/layouts/Spinner';
import type { Student } from '@/lib/type';
import { CircleUserRound } from 'lucide-react';

const EditGenderPC = ({
  student,
  handleUpdateGender,
  isUpdatingGender,
}: {
  student: Student;
  handleUpdateGender: (student: Student, gender: Student['gender']) => Promise<void>;
  isUpdatingGender: boolean;
}) => {
  return (
    <div className="hidden sm:flex bg-white rounded-lg p-1 border border-wood-200">
      <button
        onClick={() => handleUpdateGender(student, 'boy')}
        disabled={isUpdatingGender}
        className={`cursor-pointer p-1.5 rounded-md transition-all ${student.gender === 'boy' ? 'bg-blue-100 text-blue-600 shadow-sm' : 'text-gray-300 hover:text-gray-500'}`}
        title="男子"
      >
        {isUpdatingGender ? <Spinner /> : <CircleUserRound className="w-5 h-5" />}
      </button>
      <button
        onClick={() => handleUpdateGender(student, 'girl')}
        disabled={isUpdatingGender}
        className={`cursor-pointer p-1.5 rounded-md transition-all ${student.gender === 'girl' ? 'bg-pink-100 text-pink-600 shadow-sm' : 'text-gray-300 hover:text-gray-500'}`}
        title="女子"
      >
        {isUpdatingGender ? <Spinner /> : <CircleUserRound className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default EditGenderPC;

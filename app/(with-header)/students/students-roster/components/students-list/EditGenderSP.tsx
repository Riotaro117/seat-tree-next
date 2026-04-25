import Spinner from '@/app/(with-header)/components/layouts/Spinner';
import type { Student } from '@/lib/type';

const EditGenderSP = ({
  student,
  handleUpdateGender,
  isUpdatingGender,
}: {
  student: Student;
  handleUpdateGender: (student: Student, gender: Student['gender']) => Promise<void>;
  isUpdatingGender: boolean;
}) => {
  return (
    <div className="flex gap-2 sm:hidden mt-1">
      <button
        onClick={() => handleUpdateGender(student, 'boy')}
        disabled={isUpdatingGender}
        className={`cursor-pointer text-xs px-2 py-0.5 rounded border ${student.gender === 'boy' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-400'}`}
      >
        {isUpdatingGender ? <Spinner /> : '男'}
      </button>
      <button
        onClick={() => handleUpdateGender(student, 'girl')}
        disabled={isUpdatingGender}
        className={`cursor-pointer text-xs px-2 py-0.5 rounded border ${student.gender === 'girl' ? 'bg-pink-100 border-pink-300 text-pink-700' : 'border-gray-200 text-gray-400'}`}
      >
        {isUpdatingGender ? <Spinner /> : '女'}
      </button>
    </div>
  );
};

export default EditGenderSP;

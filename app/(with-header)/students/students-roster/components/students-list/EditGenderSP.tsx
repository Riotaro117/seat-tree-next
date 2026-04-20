import { useAuthState } from '@/app/providers/AuthProvider';
import type { Student } from '@/lib/type';

const EditGenderSP = ({
  student,
  handleUpdateGender,
}: {
  student: Student;
  handleUpdateGender: (student: Student, gender: Student['gender']) => Promise<void>;
}) => {
  const { isLoading } = useAuthState();
  return (
    <div className="flex gap-2 sm:hidden mt-1">
      <button
        onClick={() => handleUpdateGender(student, 'boy')}
        disabled={isLoading}
        className={`cursor-pointer text-xs px-2 py-0.5 rounded border ${student.gender === 'boy' ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-400'}`}
      >
        男
      </button>
      <button
        onClick={() => handleUpdateGender(student, 'girl')}
        disabled={isLoading}
        className={`cursor-pointer text-xs px-2 py-0.5 rounded border ${student.gender === 'girl' ? 'bg-pink-100 border-pink-300 text-pink-700' : 'border-gray-200 text-gray-400'}`}
      >
        女
      </button>
    </div>
  );
};

export default EditGenderSP;

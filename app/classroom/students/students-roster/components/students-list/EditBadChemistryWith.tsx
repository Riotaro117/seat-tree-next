import { useAuthState } from '@/app/providers/AuthProvider';
import type { Student } from '@/lib/type';
import { SetStateAction } from 'jotai';
import { X } from 'lucide-react';
import { Dispatch } from 'react';

const EditBadChemistryWith = ({
  student,
  editingId,
  setEditingId,
}: {
  student: Student;
  editingId: string | null;
  setEditingId: Dispatch<SetStateAction<string | null>>;
}) => {
  const { isLoading } = useAuthState();
  return (
    <button
      onClick={() => setEditingId(editingId === student.id ? null : student.id)}
      disabled={isLoading}
      className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        student.badChemistryWith.length > 0
          ? 'bg-red-100 text-red-700 border border-red-200'
          : 'bg-white text-gray-400 border border-transparent hover:bg-gray-100'
      }`}
    >
      <X className="w-4 h-4" />
      NG: {student.badChemistryWith.length}人
    </button>
  );
};

export default EditBadChemistryWith;

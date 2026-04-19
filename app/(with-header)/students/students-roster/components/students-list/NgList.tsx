import updateStudent from '@/app/api/students/update/route';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { Student } from '@/lib/type';
import { Check, Users } from 'lucide-react';

const NgList = ({ student, editingId }: { student: Student; editingId: string | null }) => {
  const { user, isLoading } = useAuthState();
  const { students, setStudents } = useStudentsStore();
  if (!user) return null;
  const toggleBadChemistry = async (student: Student, targetId: string) => {
    try {
      // 元々相性が悪い子を持っているか定義
      const hasConflict = student.badChemistryWith.includes(targetId);
      // 元々持っていたらその子をfilterで除外し、そうでないならそのまま追加する
      const updateChemistry = hasConflict
        ? student.badChemistryWith.filter((id) => id !== targetId)
        : [...student.badChemistryWith, targetId];

      //更新した生徒を定義する
      const newChemistryStudent = { ...student, badChemistryWith: updateChemistry };
      await updateStudent(user.id, newChemistryStudent);

      setStudents((prev) =>
        prev.map((s) => (s.id === newChemistryStudent.id ? newChemistryStudent : s)),
      );
    } catch (error) {
      console.error(error);
      alert('更新に失敗しました');
    }
  };
  return (
    <>
      {editingId === student.id && (
        <div className="w-full mt-3 p-3 bg-white rounded-xl border-2 border-red-100">
          <p className="text-xs font-bold text-red-500 mb-2 flex items-center gap-1">
            <Users className="w-3 h-3" />
            隣の席にしたくない生徒を選択:
          </p>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {students
              .filter((s) => s.id !== student.id) // 選択されている生徒自身は除外する
              .map((other) => {
                // 相性が悪い生徒に選択されているか状態を定義
                const isSelected = student.badChemistryWith.includes(other.id);
                return (
                  <button
                    key={other.id}
                    onClick={() => toggleBadChemistry(student, other.id)}
                    disabled={isLoading}
                    className={`cursor-pointer px-2 py-1 text-xs rounded-md border transition-all ${
                      isSelected
                        ? 'bg-red-500 text-white border-red-600 shadow-sm'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {other.name}
                    {isSelected && <Check className="w-3 h-3 inline ml-1" />}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default NgList;

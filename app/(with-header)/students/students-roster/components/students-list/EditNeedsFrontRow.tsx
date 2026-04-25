import Spinner from '@/app/(with-header)/components/layouts/Spinner';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { updateStudent } from '@/lib/supabase/students';
import type { Student } from '@/lib/type';
import { Glasses } from 'lucide-react';
import { useState } from 'react';

const EditNeedsFrontRow = ({ student }: { student: Student }) => {
  const { user } = useAuthState();
  const { setStudents } = useStudentsStore();
  const [isEditingNeedsFrontRow, setIsEditingNeedsFrontRow] = useState(false);

  if (!user) return null;

  // 視力のオンオフを更新する関数
  const handleToggleProperty = async (student: Student, props: 'needsFrontRow') => {
    try {
      setIsEditingNeedsFrontRow(true);
      // キーのみ更新する生徒を定義する→ブラケット方式で動的にキーを取得する
      const frontRowStudent = { ...student, [props]: !student[props] };
      await updateStudent(user.id, frontRowStudent);
      setStudents((prev) => prev.map((s) => (s.id === frontRowStudent.id ? frontRowStudent : s)));
    } catch (error) {
      console.error(error);
      alert('更新に失敗しました');
    } finally {
      setIsEditingNeedsFrontRow(false);
    }
  };
  return (
    <button
      onClick={() => handleToggleProperty(student, 'needsFrontRow')}
      disabled={isEditingNeedsFrontRow}
      className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        student.needsFrontRow
          ? 'bg-yellow-100 text-blue-700 border border-blue-200'
          : 'bg-white text-gray-400 border border-transparent hover:bg-gray-100'
      }`}
    >
      {isEditingNeedsFrontRow ? (
        <Spinner />
      ) : (
        <>
          <Glasses className="w-4 h-4" />
          {student.needsFrontRow ? '前席希望' : '視力OK'}
        </>
      )}
    </button>
  );
};

export default EditNeedsFrontRow;

import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { deleteStudent } from '@/lib/supabase/students';
import { Student } from '@/lib/type';
import { Trash2 } from 'lucide-react';

const DeleteStudentButton = ({ student }: { student: Student }) => {
  const { user, isLoading } = useAuthState();
  const { students, setStudents } = useStudentsStore();

  if (!user) return null;
  const handleRemove = async (targetId: string) => {
    if (!confirm('本当に削除しますか？')) return;
    try {
      // 選択されたidと一致する生徒を削除する生徒として定義する
      const deletedStudent = students.find((s) => s.id === targetId);
      if (!deletedStudent) return;
      await deleteStudent(user.id, deletedStudent);
      setStudents((prev) => prev.filter((s) => s.id !== targetId));
    } catch (error) {
      console.error(error);
      alert('削除に失敗しました');
    }
  };
  return (
    <button
      onClick={() => handleRemove(student.id)}
      disabled={isLoading}
      className="cursor-pointer p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
};

export default DeleteStudentButton;

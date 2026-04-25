import Spinner from '@/app/(with-header)/components/layouts/Spinner';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { deleteStudent } from '@/lib/supabase/students';
import { Student } from '@/lib/type';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

const DeleteStudentButton = ({ student }: { student: Student }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthState();
  const { students, setStudents } = useStudentsStore();

  if (!user) return null;
  const handleRemove = async (targetId: string) => {
    if (!confirm('本当に削除しますか？')) return;
    try {
      setIsDeleting(true);
      // 選択されたidと一致する生徒を削除する生徒として定義する
      const deletedStudent = students.find((s) => s.id === targetId);
      if (!deletedStudent) return;
      await deleteStudent(user.id, deletedStudent);
      setStudents((prev) => prev.filter((s) => s.id !== targetId));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : '削除に失敗しました');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <button
      onClick={() => handleRemove(student.id)}
      disabled={isDeleting}
      className="cursor-pointer p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
    >
      {isDeleting ? <Spinner /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
};

export default DeleteStudentButton;

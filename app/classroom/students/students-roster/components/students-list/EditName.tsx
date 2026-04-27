import Spinner from '@/app/classroom/components/layouts/Spinner';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { updateStudent } from '@/lib/supabase/students';
import type { Student } from '@/lib/type';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

const EditName = ({ student }: { student: Student }) => {
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { setStudents } = useStudentsStore();
  const { user } = useAuthState();

  if (!user) return null;

  // 生徒の名前を更新する処理
  const handleUpdateName = async (student: Student, editingName: string) => {
    if (!editingName.trim()) return;
    try {
      setIsEditing(true);
      const newNameStudent = { ...student, name: editingName };
      const data = await updateStudent(user.id, newNameStudent);
      setStudents((prev) => prev.map((s) => (s.id === student.id ? data : s)));
      setEditingNameId(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : '更新に失敗しました');
    } finally {
      setIsEditing(false);
    }
  };
  return (
    <>
      {editingNameId === student.id ? (
        <div className="flex items-center gap-2">
          <input
            maxLength={20}
            value={editingName}
            className="bg-white border border-wood-200"
            onChange={(e) => setEditingName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleUpdateName(student, editingName);
              }
            }}
          />
          <button
            className="cursor-pointer text-gray-400 hover:text-blue-700"
            onClick={() => handleUpdateName(student, editingName)}
            disabled={isEditing}
          >
            {isEditing ? <Spinner /> : <Save className="w-5 h-5" />}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-wood-900">{student.name}</span>
          <button
            className="cursor-pointer text-gray-400 hover:text-red-700"
            onClick={() => {
              setEditingNameId(student.id);
              setEditingName(student.name);
            }}
            disabled={isEditing}
          >
            {isEditing ? <Spinner /> : <Pencil className="w-4 h-4" />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditName;

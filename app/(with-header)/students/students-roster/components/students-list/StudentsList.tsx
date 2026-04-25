'use client';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import type { Student } from '@/lib/type';
import { User } from 'lucide-react';
import { useState } from 'react';
import NgList from './NgList';
import EditName from './EditName';
import EditGenderSP from './EditGenderSP';
import EditGenderPC from './EditGenderPC';
import EditNeedsFrontRow from './EditNeedsFrontRow';
import EditBadChemistryWith from './EditBadChemistryWith';
import DeleteStudentButton from './DeleteStudentButton';
import { updateStudent } from '@/lib/supabase/students';

const StudentsList = () => {
  const { user } = useAuthState();
  const { students, setStudents } = useStudentsStore();
  const [isUpdatingGender, setIsUpdatingGender] = useState(false);

  // 編集しているidの状態
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!user) return null;

  // 生徒の性別を更新する処理
  const handleUpdateGender = async (student: Student, gender: Student['gender']) => {
    try {
      setIsUpdatingGender(true);
      // genderのみ書き換えた生徒を定義する
      const newGenderStudent = { ...student, gender };
      await updateStudent(user.id, newGenderStudent);
      // DB操作→stateの更新 更新された生徒と同じidの生徒だけを新しいstudentに置き換える
      setStudents((prev) => prev.map((s) => (s.id === newGenderStudent.id ? newGenderStudent : s)));
    } catch (error) {
      alert(error instanceof Error ? error.message : '更新に失敗しました');
    } finally {
      setIsUpdatingGender(false);
    }
  };

  return (
    <div
      className={`flex-1 overflow-y-auto pr-2 space-y-3 ${isUpdatingGender ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-wood-50 p-4 rounded-2xl border border-wood-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all hover:border-wood-300 group"
        >
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                student.gender === 'boy'
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : student.gender === 'girl'
                    ? 'bg-pink-50 border-pink-200 text-pink-600'
                    : 'bg-wood-200 border-wood-300 text-wood-700'
              }`}
            >
              <User className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <EditName student={student} />
              <EditGenderSP
                student={student}
                handleUpdateGender={handleUpdateGender}
                isUpdatingGender={isUpdatingGender}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <EditGenderPC
              student={student}
              handleUpdateGender={handleUpdateGender}
              isUpdatingGender={isUpdatingGender}
            />
            <EditNeedsFrontRow student={student} />
            <div className="relative">
              <EditBadChemistryWith
                student={student}
                editingId={editingId}
                setEditingId={setEditingId}
              />
            </div>
            <DeleteStudentButton student={student} />
          </div>
          <NgList student={student} editingId={editingId} />
        </div>
      ))}

      {students.length === 0 && (
        <div className="text-center py-12 text-wood-400">
          <p className="text-lg">生徒が登録されていません</p>
          <p className="text-sm">「追加」ボタンから登録してください</p>
        </div>
      )}
    </div>
  );
};

export default StudentsList;

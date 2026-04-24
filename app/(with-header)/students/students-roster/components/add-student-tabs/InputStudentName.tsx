'use client';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { createStudent } from '@/lib/supabase/students';
import type { Student } from '@/lib/type';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

const InputStudentName: React.FC = () => {
  // 生徒名簿の名前入力欄の値
  const [newStudentName, setNewStudentName] = useState('');
  // 生徒の性別
  const [newStudentGender, setNewStudentGender] = useState<'boy' | 'girl' | 'other'>('boy');
  // DBとの通信状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuthState();
  const { setStudents } = useStudentsStore();

  // 生徒を追加する処理
  const handleAddStudent = async () => {
    if (!user) return;
    // 入力欄の両端の空白はカットして、空白なら処理を止める→文字列をbooleanにすると、''はfalse
    if (!newStudentName.trim()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const student: Omit<Student, 'id'> = {
        name: newStudentName,
        gender: newStudentGender,
        needsFrontRow: false, // 初期値はfalse
        badChemistryWith: [], // 初期値は[]
      };
      const addStudent = await createStudent(user.id, student);
      // idはDBが作成したものなので、既存の生徒の配列をコピーして、idを追加して生徒を追加する
      setStudents((prev) => [...prev, { ...student, id: addStudent.id }]);
      setNewStudentName('');
    } catch (error) {
      console.error(error);
      alert('保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 bg-wood-50 p-4 rounded-xl border border-wood-100">
      <input
        type="text"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="新しい生徒の名前"
        className="flex-1 px-4 py-3 rounded-xl border-2 border-wood-200 focus:border-wood-400 focus:outline-none bg-white"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleAddStudent();
          }
        }}
      />
      <div className="flex gap-2">
        <button
          onClick={() => setNewStudentGender('boy')}
          disabled={isSubmitting}
          className={`cursor-pointer px-4 py-2 rounded-xl border-2 font-bold transition-all ${newStudentGender === 'boy' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white border-wood-200 text-gray-400'}`}
        >
          男子
        </button>
        <button
          onClick={() => setNewStudentGender('girl')}
          disabled={isSubmitting}
          className={`cursor-pointer px-4 py-2 rounded-xl border-2 font-bold transition-all ${newStudentGender === 'girl' ? 'bg-pink-100 border-pink-400 text-pink-700' : 'bg-white border-wood-200 text-gray-400'}`}
        >
          女子
        </button>
        <button
          className="cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-wood-600 text-white hover:bg-wood-700 shadow-wood-800/20"
          onClick={handleAddStudent}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          追加
        </button>
      </div>
    </div>
  );
};

export default InputStudentName;

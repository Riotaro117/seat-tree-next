'use client';
import Spinner from '@/app/classroom/components/layouts/Spinner';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useStudentsStore } from '@/app/store/useStudentsStore';
import { deleteAllStudents } from '@/lib/supabase/students';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteAllStudentsButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthState();
  const { setStudents } = useStudentsStore();
  const router = useRouter();

  // 仮登録の人は使えないようにする
  const handleAllRemove = async () => {
    if (!user) return;
    if (user.is_anonymous) {
      const ok = window.confirm('この機能はユーザー登録者限定です。ユーザー登録しますか？');
      if (ok) router.push('/user/update');
      return;
    }
    if (!window.confirm('全ての生徒を本当に削除しますか？')) return;
    try {
      setIsDeleting(true);
      await deleteAllStudents(user.id);
      setStudents([]);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : '削除に失敗しました');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <button
      className="flex cursor-pointer mt-3 items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 bg-white text-red-800 border-2 border-red-200 hover:border-red-400 hover:bg-red-50"
      onClick={handleAllRemove}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Spinner />
      ) : (
        <>
          <AlertTriangle />
          全ての生徒を削除
        </>
      )}
    </button>
  );
};

export default DeleteAllStudentsButton;

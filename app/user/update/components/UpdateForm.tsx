'use client';
import { useState } from 'react';
import { signout, updateUser } from '@/lib/supabase/auth';
import Spinner from '@/app/classroom/components/layouts/Spinner';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

const UpdateForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const router = useRouter();

  const handleUpdateUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsUpdatingUser(true);
      await updateUser(email, password, name);
      alert('仮登録が完了しました。');
      await signout();
      router.replace('/user/registered');
    } catch (error) {
      alert(error instanceof Error ? error.message : '入力欄に必須事項を入力して下さい。');
    } finally {
      setIsUpdatingUser(false);
    }
  };
  return (
    <form onSubmit={handleUpdateUser} className="space-y-4">
      <input
        type="text"
        placeholder="ユーザー名"
        className="w-full px-4 py-3 rounded-xl border-2 border-wood-100 focus:border-wood-400 outline-none bg-wood-50"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="メールアドレス"
        className="w-full px-4 py-3 rounded-xl border-2 border-wood-100 focus:border-wood-400 outline-none bg-wood-50"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        className="w-full px-4 py-3 rounded-xl border-2 border-wood-100 focus:border-wood-400 outline-none bg-wood-50"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={isUpdatingUser || !name || !email || !password}>
        {isUpdatingUser ? <Spinner /> : 'ユーザー登録'}
      </Button>
    </form>
  );
};

export default UpdateForm;

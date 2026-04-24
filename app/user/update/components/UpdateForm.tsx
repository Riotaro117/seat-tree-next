'use client';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useState } from 'react';
import Button from '../../components/Button';
import { signout, updateUser } from '@/lib/supabase/auth';

const UpdateForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading } = useAuthState();

  const handleUpdateUser = async () => {
    try {
      await updateUser(email, password, name);
      alert(
        '本登録が完了しました。このあと届くメールの「登録を完了する」ボタンを押してから、ログインしてください。',
      );
      await signout();
    } catch (error) {
      console.error('Error input form:', error);
      alert('入力欄に必須事項を入力して下さい。');
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
      <Button type="submit" disabled={isLoading || !name || !email || !password}>
        ユーザー登録
      </Button>
    </form>
  );
};

export default UpdateForm;

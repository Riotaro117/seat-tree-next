'use client';
import { useState } from 'react';
import signin from '@/app/api/user/signin/route';
import { useAuthState } from '@/app/providers/AuthProvider';
import Button from './Button';
import { useRouter } from 'next/navigation';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading } = useAuthState();

  const router = useRouter();

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signin(email, password);
      router.push('/');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ログインに失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSignin} className="space-y-4 mb-4">
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        className="w-full px-4 py-3 rounded-xl border-2 border-wood-100 focus:border-wood-400 outline-none bg-wood-50"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        className="w-full px-4 py-3 rounded-xl border-2 border-wood-100 focus:border-wood-400 outline-none bg-wood-50"
      />
      <Button type="submit" disabled={!email || !password} isLoading={isLoading} color={'green'}>
        ログイン
      </Button>
    </form>
  );
};

export default SigninForm;

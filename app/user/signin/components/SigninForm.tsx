'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signin } from '@/lib/supabase/auth';
import Spinner from '@/app/classroom/components/layouts/Spinner';
import Button from '@/app/components/Button';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const router = useRouter();

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsSigningIn(true);
      await signin(email, password);
      router.replace('/classroom');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'ログインに失敗しました。');
    } finally {
      setIsSigningIn(false);
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
      <Button type="submit" disabled={!email || !password} isLoading={isSigningIn} color={'green'}>
        {isSigningIn ? <Spinner /> : 'ログイン'}
      </Button>
    </form>
  );
};

export default SigninForm;

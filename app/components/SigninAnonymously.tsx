'use client';
import { useRouter } from 'next/navigation';
import { signinAnonymously } from '@/lib/supabase/auth';
import { useState } from 'react';
import Spinner from '@/app/classroom/components/layouts/Spinner';
import Button from './Button';

const SigninAnonymously = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const handleSigninAnonymously = async () => {
    try {
      setIsSigningIn(true);
      await signinAnonymously();
      router.replace('/classroom');
    } catch (error) {
      alert(error instanceof Error ? error.message : '仮ログインに失敗しました。');
    } finally {
      setIsSigningIn(false);
    }
  };
  return (
    <Button onClick={handleSigninAnonymously} isLoading={isSigningIn} color="brown">
      {isSigningIn ? <Spinner /> : 'ゲストログイン'}
    </Button>
  );
};

export default SigninAnonymously;

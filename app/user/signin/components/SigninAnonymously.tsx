'use client';
import { useRouter } from 'next/navigation';
import Button from '../../components/Button';
import { signinAnonymously } from '@/lib/supabase/auth';
import { useState } from 'react';
import Spinner from '@/app/(with-header)/components/layouts/Spinner';

const SigninAnonymously = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const handleSigninAnonymously = async () => {
    try {
      setIsSigningIn(true);
      await signinAnonymously();
      router.push('/');
    } catch (error) {
      alert(error instanceof Error ? error.message : '仮ログインに失敗しました。');
    } finally {
      setIsSigningIn(false);
    }
  };
  return (
    <Button onClick={handleSigninAnonymously} isLoading={isSigningIn} color="brown">
      {isSigningIn ? <Spinner /> : '今すぐ始める！'}
    </Button>
  );
};

export default SigninAnonymously;

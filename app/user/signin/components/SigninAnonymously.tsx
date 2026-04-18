'use client';
import signinAnonymously from '@/app/api/user/signinAnonymously/route';
import { useAuthState } from '@/app/providers/AuthProvider';
import Button from './Button';
import { useRouter } from 'next/navigation';

const SigninAnonymously = () => {
  const { isLoading } = useAuthState();
  const router = useRouter();

  const handleSigninAnonymously = async () => {
    try {
      await signinAnonymously();
      router.push('/');
    } catch (error) {
      alert(error instanceof Error ? error.message : '仮ログインに失敗しました。');
    }
  };
  return (
    <Button onClick={handleSigninAnonymously} isLoading={isLoading} color="green">
      今すぐ始める！
    </Button>
  );
};

export default SigninAnonymously;

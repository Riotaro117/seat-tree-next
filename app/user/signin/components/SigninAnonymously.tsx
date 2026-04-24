'use client';
import { useAuthState } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Button from '../../components/Button';
import { signinAnonymously } from '@/lib/supabase/auth';

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
    <Button onClick={handleSigninAnonymously} isLoading={isLoading} color="brown">
      今すぐ始める！
    </Button>
  );
};

export default SigninAnonymously;

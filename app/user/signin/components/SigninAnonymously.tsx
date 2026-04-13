'use client';
import signinAnonymously from '@/app/api/user/signinAnonymously/route';
import { useAuthState } from '@/app/providers/AuthProvider';
import Button from './Button';

const SigninAnonymously = () => {
  const { isLoading } = useAuthState();

  const handleSigninAnonymously = async () => {
    try {
      await signinAnonymously();
      console.log('仮ログイン成功');
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

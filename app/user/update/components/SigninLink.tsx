'use client';
import { signout } from '@/lib/supabase/auth';
import { useRouter } from 'next/navigation';

const SigninLink = () => {
  const router = useRouter();
  const handleLoadingSignin = async () => {
    await signout();
    router.replace('/user/signin');
  };
  return (
    <div className="mt-4 text-center text-sm">
      <button className="cursor-pointer w-full underline" onClick={handleLoadingSignin}>
        すでにアカウントをお持ちの方
      </button>
    </div>
  );
};

export default SigninLink;

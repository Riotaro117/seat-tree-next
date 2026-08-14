import MainContents from './components/layouts/MainContents';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Classroom() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/user/signin');
  }

  return <MainContents />;
}

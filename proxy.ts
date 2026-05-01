import { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/proxy.auth';

// リクエストが完了する目にプロキシを作成し、サーバー上でコードを実行
export const proxy = async (request: NextRequest) => {
  return await updateSession(request);
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|update-history|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

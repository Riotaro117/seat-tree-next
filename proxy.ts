import { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/proxy';

// リクエストが完了する目にプロキシを作成し、サーバー上でコードを実行
export const proxy = async (request: NextRequest) => {
  return await updateSession(request);
};

export const config = {
  matcher: [
    // /user/signin 自体はproxyを通さない（無限リダイレクト防止）
    '/((?!_next/static|_next/image|favicon.ico|user/signin|update-history|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

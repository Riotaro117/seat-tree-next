import { NextResponse } from 'next/server';
import getCurrentUser from './app/api/user/getCurrentUser/route';

// リクエストが完了する目にプロキシを作成し、サーバー上でコードを実行
export const proxy = async (request: NextResponse) => {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(new URL('signin', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/'],
};

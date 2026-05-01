import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll(); // リクエストからcookieを読んで、Supabaseに渡す
        },
        setAll(cookiesToSet) {
          // リクエストオブジェクトにも反映
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          // レスポンスを再生成（新しいCookieを含めるため）
          supabaseResponse = NextResponse.next({ request });
          // レスポンスのCookieに書き込む（ブラウザに返される）
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  const { data } = await supabase.auth.getClaims();

  const claims = data?.claims ?? null;
  const isFullUser = claims?.is_anonymous === false;
  const isAnonymous = claims?.is_anonymous === true;
  const isGuest = claims === null;
  const { pathname } = request.nextUrl;

  // ユーザーが存在しないかつ/classroom配下もしくは/user/updateへのアクセスがあったとき
  if (isGuest && (pathname.startsWith('/classroom') || pathname.startsWith('/user/update'))) {
    return NextResponse.redirect(new URL('/user/signin', request.url));
  }
  // 仮ログインしているかつ/または/user/signin配下へのアクセスがあったとき
  if (isAnonymous && (pathname === '/' || pathname.startsWith('/user/signin'))) {
    return NextResponse.redirect(new URL('/classroom', request.url));
  }
  // ログインしているかつ/または/user配下へのアクセスがあったとき
  if (isFullUser && (pathname === '/' || pathname.startsWith('/user'))) {
    return NextResponse.redirect(new URL('/classroom', request.url));
  }
  return supabaseResponse;
}

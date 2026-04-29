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
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );
  const { data } = await supabase.auth.getClaims();
  console.log('data', data);
  console.log('request', request);

  const isLoggedIn = data?.claims;
  const isAnonymous = data?.claims.is_anonymous;
  const { pathname } = request.nextUrl;

  // ログインしていないかつ/classroom配下へのアクセスがあったとき
  if (!isLoggedIn && pathname.startsWith('/classroom')) {
    return NextResponse.redirect(new URL('/user/signin', request.url));
  }
  // 仮ログインしているかつ/または/user/signin配下へのアクセスがあったとき
  if (isAnonymous && (pathname === '/' || pathname.startsWith('/user/signin'))) {
    return NextResponse.redirect(new URL('/user/update', request.url));
  }
  // ログインしているかつ/または/user/signin配下へのアクセスがあったとき
  if (isLoggedIn && (pathname === '/' || pathname.startsWith('/user/signin'))) {
    return NextResponse.redirect(new URL('/classroom', request.url));
  }
  return supabaseResponse;
}

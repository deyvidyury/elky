import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { createAuthActions } from '@insforge/sdk/ssr';

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const proto = request.headers.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('insforge_code');
  const oauthError = request.nextUrl.searchParams.get('error');
  const baseUrl = getBaseUrl(request);

  if (oauthError || !code) {
    if (oauthError) {
      console.warn('OAuth callback failed', { error: oauthError });
    }
    return NextResponse.redirect(
      new URL('/sign-in?error=oauth_failed', baseUrl),
    );
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get('insforge_code_verifier')?.value;

  if (!codeVerifier) {
    return NextResponse.redirect(
      new URL('/sign-in?error=missing_verifier', baseUrl),
    );
  }

  const response = NextResponse.redirect(new URL('/admin', baseUrl));
  const auth = createAuthActions({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });

  const { data, error } = await auth.exchangeOAuthCode(code, codeVerifier);

  if (error || !data?.user) {
    if (error) {
      console.error('OAuth code exchange failed', error);
    }
    return NextResponse.redirect(
      new URL('/sign-in?error=exchange_failed', baseUrl),
    );
  }

  response.cookies.delete('insforge_code_verifier');

  return response;
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  // matcher: ['/reservaciones/:path*']
};

export default function middleware(request: NextRequest) {
  const _isAuthtenticated = Boolean(request.cookies.get('authToken'));

  // if (!isAuthtenticated) {
  //   return NextResponse.redirect(new URL('/sign-up', request.url));
  // }

  return NextResponse.next();
}

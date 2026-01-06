import { NextResponse, NextRequest } from 'next/server';
function isAuthenticated(request: NextRequest): boolean {
    const sessionCookie = request.cookies.get('accessToken');
    return !!sessionCookie;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const publicPaths = ['/login', '/signup', '/api/auth'];
    if (
        publicPaths.includes(pathname) ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.startsWith('/images/') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    if (!isAuthenticated(request)) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

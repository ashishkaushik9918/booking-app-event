import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
interface JwtPayload {
    userId: string;
    role: 'admin' | 'student' | 'parent' | 'employee';
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string): Promise<JwtPayload | null> {
    try {
        const { payload }: { payload: JwtPayload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}
function isAuthenticated(request: NextRequest): boolean {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (accessToken) return true;
    if (!accessToken && refreshToken) return true;
    return false;
}
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const publicPaths = ['/', '/login', '/signup', '/api/auth'];
    if (
        publicPaths.includes(pathname) ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.startsWith('/images/') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;

    if (!isAuthenticated(request) && !accessToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    const userRole = await verifyToken(accessToken!);

    // if (pathname.startsWith("/dashboard") && userRole?.role !== "admin") {
    //     return NextResponse.redirect(new URL('/unauthorized', request.url));
    // }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/dashboard/:path*',
        '/profile/:path*',
    ],
};
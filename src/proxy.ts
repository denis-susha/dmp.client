import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/cart", "/payment", "/my"];
const nonAuthPublicRoutes = ["/login", "/registration", "/registration/forgot-password", "/"];

export default function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = nonAuthPublicRoutes.includes(path);

    // Presence of the access token cookie is enough here; the API validates the token itself.
    const accessToken = req.cookies.get("access_token")?.value;

    if (isProtectedRoute && !accessToken) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && accessToken) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

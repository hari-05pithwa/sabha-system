// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     // This function runs after the user is authenticated
//     // You can add custom logic here if needed
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Returns true if a session token exists
//     },
//     pages: {
//       signIn: "/login", // Redirects unauthenticated users here
//     },
//   }
// );

// export const config = { 
//   // List all pages that require a login
//   matcher: [
//     "/", 
//     "/registration/:path*", 
//     "/attendance/:path*", 
//     "/data/:path*",
//   ] 
// };
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// We wrap the next-auth middleware to ensure it's compatible 
// with the Next.js 16 Proxy naming convention
export default withAuth(
  function proxy(req) {
    // Custom logic can go here (e.g., role-based access)
    return NextResponse.next();
  },
  {
    callbacks: {
      // Returns true if the user has a valid JWT token
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", // Redirect destination if not authorized
    },
  }
);

export const config = { 
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth internal routes)
     * - _next (Next.js internals/static files)
     * - favicon, baps.png (public assets)
     * - login (the login page itself to avoid redirect loops)
     */
    "/((?!api/auth|_next|favicon.ico|baps.png|login).*)",
  ] 
};
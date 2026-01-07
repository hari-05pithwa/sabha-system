import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // This function runs after the user is authenticated
    // You can add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Returns true if a session token exists
    },
    pages: {
      signIn: "/login", // Redirects unauthenticated users here
    },
  }
);

export const config = { 
  // List all pages that require a login
  matcher: [
    "/", 
    "/registration/:path*", 
    "/attendance/:path*", 
    "/data/:path*",
  ] 
};

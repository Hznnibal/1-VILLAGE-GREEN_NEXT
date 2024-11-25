import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = ['/compte', '/checkout'].some(path => nextUrl.pathname.startsWith(path));
      const isOnLoginPage = ['/auth/sign-in'].some(path => nextUrl.pathname.startsWith(path));

      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

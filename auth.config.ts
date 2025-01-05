import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    'signIn': '/login'
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl  } }) {
      const isLoggedIno = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIno) return true
        return false
      } else if (isLoggedIno) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    }
  }
} satisfies NextAuthConfig;
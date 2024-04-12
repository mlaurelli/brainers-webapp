import { withAuth } from "next-auth/middleware"

export const config = { matcher: ['/((?!dist|_next/static|_next/image|favicon.ico|api/jobs/run|assets).*)'] }

export default withAuth({
    pages: {
        signIn: '/'
    },
})
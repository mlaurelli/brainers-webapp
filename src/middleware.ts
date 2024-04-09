import { withAuth } from "next-auth/middleware"

export const config = { matcher: ['/((?!dist|_next/static|_next/image|favicon.ico|api/jobs/run).*)'] }

export default withAuth({
    pages: {
        signIn: '/'
    },
})
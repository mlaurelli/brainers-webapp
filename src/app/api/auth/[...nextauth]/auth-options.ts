import Auth0 from "next-auth/providers/auth0"
import { upsertUser } from '../../../../utils/db';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      async profile(profile: any, tokens) {

        try {
          upsertUser(profile.email, profile.nickname)
          console.log({ message: 'Item updated successfully' })
        } catch (error) {
          console.error({ message: 'An error occurred', error })
        }

        return {
          id: profile.sub,
          name: profile.nickname,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ]
}
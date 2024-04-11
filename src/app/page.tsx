'use client'

import { useSession } from "next-auth/react";
import { Landing } from "./landing/dashboard";

export default function Home() {

  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <main>
      <div className="chitchat-loader">
        <div>
          <img src="/assets/images/logo/logo_big.png" alt="" />
          <h3>Simple, secure messaging for fast connect to world..!</h3>
        </div>
      </div>
    </main>
  }

  if (status === 'authenticated' && session !== null)
    return <Landing session={session} />

  return <div>
    Ciao
  </div>
}

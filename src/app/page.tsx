'use client'

import { useSession } from "next-auth/react";
import { Landing } from "./landing/dashboard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'authenticated' && session) {
    return router.replace("/messenger")
  }
  return <Landing />
}

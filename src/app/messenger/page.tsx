'use client'

import { Fragment, useEffect, useState } from "react";
import LeftSide from "../../containers/leftSidebar";
import Chitchat from "../../containers/chatBoard";
import RightSide from "../../containers/rightSidebar";
import ThemeCustomizer from "../../containers/themeCustomizer";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default Page

function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (!session && status === 'unauthenticated') {
    router.replace("/")
  }
  
  useEffect(() => {
    document.body.classList.add("sidebar-active");
  }, [])

  return (
    <Fragment>
      <div className="chitchat-container sidebar-toggle ">
        <LeftSide session={session} />
        <Chitchat />
        <RightSide />
      </div>
      {/* <ThemeCustomizer /> */}
    </Fragment>
  );
}

// mark as client component
"use client"

import { SessionProvider } from "next-auth/react"
import ChatContextProvider from "../helpers/chatContext/chatCtx";
import CustomizerContextProvider from "../helpers/customizerContext/customizerCtx";
import { ToastContainer } from "react-toastify"
import useUser, { UserType } from "@/utils/useUser"
import { useEffect, useState } from "react";

const ProvidersWrapper = ({ children, userId }: { children: React.ReactNode, userId: string | null | undefined }) => {
  return (
    <div>
      <link rel="stylesheet" type="text/scss" href="#javascript" media="screen" id="color" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap" rel="stylesheet" />

      <SessionProvider>
        <CustomizerContextProvider>
          <ChatContextProvider userId={userId}>
            {children}
          </ChatContextProvider>
        </CustomizerContextProvider>
        <ToastContainer />
      </SessionProvider>
    </div>
  )
}

export default ProvidersWrapper
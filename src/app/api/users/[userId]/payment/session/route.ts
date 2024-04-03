import { updateUserSession } from "@/utils/db"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  const body = await request.json()
  try {
    await updateUserSession(body.sessionId, params.userId)

  } catch (error) {
    console.error({ message: "error during save session id", userId: params.userId, sessionId: body.sessionId, error })
    return Response.json({ error: "error during save session id", userId: params.userId, sessionId: body.sessionId }, { status: 500 })
  }

  // for Stream responses visit: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#streaming
  return Response.json({ sessionId: body.sessionId })
}
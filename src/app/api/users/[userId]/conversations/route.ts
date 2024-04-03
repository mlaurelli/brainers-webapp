import { getConversations, newConversationForUser } from "@/utils/db"
import { NextRequest } from "next/server"
import { v5 as uuidv5 } from 'uuid'

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const data = await getConversations(params.userId)

  const conversations = data.map(conversation => {
    return {
      modelId: conversation.ModelID,
      conversationId: conversation.ConversationID,
      createdAt: conversation.CreatedAt
    }
  })

  return Response.json(conversations)
}

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  const body = await request.json()

  const modelId: string = body.modelId
  const conversationID = uuidv5(`${params.userId}-${modelId}`, uuidv5.DNS)

  try {
    await newConversationForUser(conversationID, modelId, params.userId)
    console.log({ message: 'Conversation added successfully' })

  } catch (error) {
    console.error({ message: "Error during saving messages", params, conversationID, error });
    return Response.json({ message: "Error during saving messages",  params, conversationID }, { status: 500 })
  }

  return Response.json({ conversationId: conversationID })
}
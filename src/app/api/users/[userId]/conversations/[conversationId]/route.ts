import { ConversationType } from "@/components/chat/chatbox"
import { AiGirlfriend } from "@/models/ai-girlfriend";
import { deleteConversationForUser, getConversationWithMessages, saveMessage } from "@/utils/db"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { userId: string, conversationId: string } }) {
  try {
    const data = await getConversationWithMessages(params.conversationId, params.userId)

    return Response.json({ conversation: data.conversation, modelId: data.modelId })
  } catch (error) {
    console.log({ message: "looking at conversationid:" + params.conversationId, error })
    return Response.json({ conversation: [], modelId: "error" })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { userId: string, conversationId: string } }) {
  const body = await request.json()

  const lastMessage: ConversationType = body.message
  const modelId: string = body.modelId
  const conversationID = params.conversationId
  const userOrModelID = lastMessage.type === 'in' ? modelId : params.userId

  const models = AiGirlfriend.map(model => model.id)
  const girlfriend = AiGirlfriend.filter(model => model.id == modelId)[0]

  const message = {
    type: lastMessage.type,
    text: lastMessage.text,
    image: lastMessage.image,
    avatar: models.indexOf(userOrModelID) === -1 ? "/dist/media/img/avatar6.jpg" : girlfriend.avatar,
    name: models.includes(userOrModelID) ? girlfriend.id : "me"
  } as ConversationType

  try {
    await saveMessage(message, params.userId, modelId, conversationID)

    console.log({ message: 'MessageId inserted successfully: ', lastMessage, conversationID })
  } catch (error) {
    console.error({ message: "Error during saving messages", lastMessage, params, conversationID, error });
    return Response.json({ message: "Error during saving messages", lastMessage, params, conversationID }, { status: 500 })
  }

  return Response.json({ conversationId: conversationID })
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string, conversationId: string } }) {
  try {
    await deleteConversationForUser(params.conversationId, params.userId)
    return Response.json({ status: "ok" })
  } catch (error) {
    console.log({ message: "cleaning up conversationid:" + params.conversationId, error })
    return Response.json({ error: error })
  }
}
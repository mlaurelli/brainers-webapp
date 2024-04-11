import { ConversationType } from "@/components/chat/chatbox"
import { AiGirlfriend } from "@/models/ai-girlfriend"
import { NextRequest } from "next/server"
import { saveMessage, updateMessageUsage } from "@/utils/db"
import { canGetMessage } from "@/utils/subscriptionUsage"
import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory"
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages"
import {
  RunnableConfig,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables"

export async function POST(request: NextRequest, { params }: { params: { userId: string, modelId: string } }) {
  const girlfriend = AiGirlfriend.filter(model => model.id = params.modelId)[0]

  const body = await request.json()

  const requestMessages: ConversationType[] = body.messages
  const conversationId: string = body.conversationId

  const lastMessage: ConversationType = requestMessages
    .filter(message => message.image === null)
    .slice(-1)[0]

  try {
    const check = await canGetMessage(params.userId)
    if (!check) {
      return Response.json({ error: "You exceeded the limits of your tier" }, { status: 403 })
    }

    saveMessage(lastMessage, params.userId, params.modelId, conversationId)
  } catch (error) {
    console.error({ message: "Error during saving messages", lastMessage, params, conversationId, error });
    return Response.json({ message: "Error during saving messages", lastMessage, params, conversationId }, { status: 500 })
  }

  // Instantiate model and prompt.
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    modelName: girlfriend.model,
    temperature: girlfriend.temperature,
    maxTokens: girlfriend.max_tokens,
    stop: girlfriend.stop,
    streaming: false,
  })

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", girlfriend.prompt],
    new MessagesPlaceholder("history_chat"),
    ["human", "{input}"],
  ])

  const chain = prompt.pipe(model)

  const messages = requestMessages
    .filter(message => message.image === null)
    .map(message => {
      if (message.type === 'in') {
        return new AIMessage(message.text!)
      } else {
        return new HumanMessage(message.text!)
      }
    })

  const messageHistory = new ChatMessageHistory(messages)

  const config: RunnableConfig = { configurable: { sessionId: conversationId } }
  const withHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: (_sessionId: string) => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history_chat",
    config
  })

  // call chatcompletion
  const output = await withHistory.invoke({
    input: lastMessage.text!,
    sessionId: conversationId
  })

  const chatCompletionText = output.content.toString()
  const completionMessage = {
    type: 'in',
    text: chatCompletionText.replaceAll("\"", "").replaceAll("\[.*?\]", "").replaceAll('"', ''),
    image: null,
    avatar: girlfriend.avatar,
    name: girlfriend.id
  } as ConversationType

  try {
    saveMessage(completionMessage, params.userId, params.modelId, conversationId)
    updateMessageUsage(params.userId)
  } catch (error) {
    console.error({ message: "Error during saving messages", completionMessage, params, conversationId, error });
    return Response.json({ message: "Error during saving messages", completionMessage, params, conversationId, error }, { status: 500 })
  }

  // for Stream responses visit: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#streaming
  return Response.json(chatCompletionText)
}
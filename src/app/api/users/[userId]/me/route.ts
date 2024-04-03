import { getSubscriptionUsageData, getUserData } from "@/utils/db"
import { UserType } from "@/utils/useUser"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {

  try {
    const userData = await getUserData(params.userId)
    const subscriptionUsageData = await getSubscriptionUsageData(params.userId)

    const user: UserType = {
      id: userData[0].id,
      email: userData[0].user_email,
      nickname: userData[0].nickname,
      subscriptionId: subscriptionUsageData[0].SubscriptionID,
      messagesUsed: subscriptionUsageData[0].MessagesUsed,
      imagesUsed: subscriptionUsageData[0].ImagesUsed,
      audioUsed: subscriptionUsageData[0].AudioUsed,
      endSubscription: subscriptionUsageData[0].EndSubscription
    }

    return Response.json(user)
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }

}